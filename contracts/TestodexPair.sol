// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address to, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
    function balanceOf(address owner) external view returns (uint256);
}

contract TestodexPair {
    address public token0;
    address public token1;
    uint112 private reserve0;
    uint112 private reserve1;
    uint32 private blockTimestampLast;

    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
    event Swap(address indexed sender, uint amount0In, uint amount1In, uint amount0Out, uint amount1Out, address indexed to);
    event Sync(uint112 reserve0, uint112 reserve1);

    // Called once by factory at pair creation
    function initialize(address _token0, address _token1) external {
        require(token0 == address(0) && token1 == address(0), "Already initialized");
        token0 = _token0;
        token1 = _token1;
    }

    // Mint liquidity (simplified, no LP token)
    function mint(address to) external returns (uint liquidity) {
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        uint amount0 = balance0 - reserve0;
        uint amount1 = balance1 - reserve1;
        require(amount0 > 0 && amount1 > 0, "Insufficient amounts");
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        emit Mint(to, amount0, amount1);
        emit Sync(reserve0, reserve1);
        return amount0 + amount1;
    }

    // Burn liquidity (simplified, no LP token)
    function burn(address to) external returns (uint amount0, uint amount1) {
        amount0 = reserve0;
        amount1 = reserve1;
        IERC20(token0).transfer(to, amount0);
        IERC20(token1).transfer(to, amount1);
        reserve0 = 0;
        reserve1 = 0;
        emit Burn(msg.sender, amount0, amount1, to);
        emit Sync(reserve0, reserve1);
    }

    // Swap tokens
    function swap(uint amount0Out, uint amount1Out, address to) external {
        require(amount0Out > 0 || amount1Out > 0, "Insufficient output");
        require(amount0Out < reserve0 && amount1Out < reserve1, "Insufficient liquidity");
        if (amount0Out > 0) IERC20(token0).transfer(to, amount0Out);
        if (amount1Out > 0) IERC20(token1).transfer(to, amount1Out);
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        emit Swap(msg.sender, 0, 0, amount0Out, amount1Out, to);
        emit Sync(reserve0, reserve1);
    }

    // Get current reserves
    function getReserves() external view returns (uint112, uint112, uint32) {
        return (reserve0, reserve1, blockTimestampLast);
    }
} 