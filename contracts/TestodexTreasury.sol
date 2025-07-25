// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Ownable contract for access control
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

// Minimal interface for ERC20
interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
}

// Testodex Treasury: collects fees, owner can withdraw
contract TestodexTreasury is Ownable {
    // Accept native token (Sonic) fees
    receive() external payable {}

    // Withdraw native token (Sonic) balance to owner
    function withdrawNative() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    // Withdraw ERC20 token balance to owner
    function withdrawToken(address token) external onlyOwner {
        uint256 bal = IERC20(token).balanceOf(address(this));
        require(bal > 0, "No balance");
        IERC20(token).transfer(owner, bal);
    }
} 