// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(address from, address to, uint256 value) external returns (bool);
    function transfer(address to, uint256 value) external returns (bool);
    function balanceOf(address owner) external view returns (uint256);
}

interface ITestodexFactory {
    function getPair(address tokenA, address tokenB) external view returns (address);
}

interface ITestodexPair {
    function mint(address to) external returns (uint);
    function burn(address to) external returns (uint, uint);
    function swap(uint amount0Out, uint amount1Out, address to) external;
    function token0() external view returns (address);
    function token1() external view returns (address);
}

contract TestodexRouter {
    address public factory;

    constructor(address _factory) {
        factory = _factory;
    }

    // Add liquidity to a pair
    function addLiquidity(address tokenA, address tokenB, uint amountA, uint amountB) external {
        address pair = ITestodexFactory(factory).getPair(tokenA, tokenB);
        require(pair != address(0), "Pair not found");
        IERC20(tokenA).transferFrom(msg.sender, pair, amountA);
        IERC20(tokenB).transferFrom(msg.sender, pair, amountB);
        ITestodexPair(pair).mint(msg.sender);
    }

    // Remove liquidity from a pair
    function removeLiquidity(address tokenA, address tokenB) external {
        address pair = ITestodexFactory(factory).getPair(tokenA, tokenB);
        require(pair != address(0), "Pair not found");
        ITestodexPair(pair).burn(msg.sender);
    }

    // Swap exact tokens for tokens (single pair, simplified)
    function swapExactTokensForTokens(address tokenIn, address tokenOut, uint amountIn, uint amountOutMin, address to) external {
        address pair = ITestodexFactory(factory).getPair(tokenIn, tokenOut);
        require(pair != address(0), "Pair not found");
        (address token0, address token1) = tokenIn < tokenOut ? (tokenIn, tokenOut) : (tokenOut, tokenIn);
        (uint amount0Out, uint amount1Out) = tokenIn == token0 ? (uint(0), amountIn) : (amountIn, uint(0));
        IERC20(tokenIn).transferFrom(msg.sender, pair, amountIn);
        ITestodexPair(pair).swap(amount0Out, amount1Out, to);
        // No slippage check for simplicity
    }
} 