// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Ownable {
    address public owner;
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    constructor() { owner = msg.sender; }
    modifier onlyOwner() { require(msg.sender == owner, "Not owner"); _; }
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}

interface ITestodexPair {
    function initialize(address token0, address token1) external;
}

contract TestodexFactory is Ownable {
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
    address public pairImplementation;

    constructor(address _pairImplementation) {
        pairImplementation = _pairImplementation;
    }

    // Create a new pair for tokenA and tokenB
    function createPair(address tokenA, address tokenB) external onlyOwner returns (address pair) {
        require(tokenA != tokenB, "Identical addresses");
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), "Zero address");
        require(getPair[token0][token1] == address(0), "Pair exists");
        // Deploy minimal proxy (or clone) for pair
        bytes20 impl = bytes20(pairImplementation);
        assembly {
            let clone := mload(0x40)
            mstore(clone, 0x3d602d80600a3d3981f3)
            mstore(add(clone, 0x14), shl(0x60, impl))
            mstore(add(clone, 0x28), 0x5af43d82803e903d91602b57fd5bf3)
            pair := create(0, clone, 0x37)
        }
        ITestodexPair(pair).initialize(token0, token1);
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair;
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }

    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
} 