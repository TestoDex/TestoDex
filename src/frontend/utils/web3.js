// Web3 utilities for TestoDex
// Note: This is a placeholder for actual ethers.js integration
// In a real implementation, you would import ethers from 'ethers'

// Mock ethers.js setup (replace with actual ethers import when available)
const ethers = {
  providers: {
    Web3Provider: class {
      constructor(provider) {
        this.provider = provider;
      }
      getSigner() {
        return {
          getAddress: async () => '0x1234567890123456789012345678901234567890',
          signMessage: async (message) => '0x' + '0'.repeat(130),
        };
      }
    }
  },
  Contract: class {
    constructor(address, abi, signer) {
      this.address = address;
      this.abi = abi;
      this.signer = signer;
    }
    async balanceOf(address) {
      return ethers.BigNumber.from('1000000000000000000000'); // Mock 1000 tokens
    }
    async totalSupply() {
      return ethers.BigNumber.from('10000000000000000000000'); // Mock 10k total supply
    }
    async mint(to, amount) {
      console.log(`Mock minting ${amount} tokens to ${to}`);
      return { hash: '0x' + '0'.repeat(64) };
    }
    async transfer(to, amount) {
      console.log(`Mock transferring ${amount} tokens to ${to}`);
      return { hash: '0x' + '0'.repeat(64) };
    }
    async approve(spender, amount) {
      console.log(`Mock approving ${spender} to spend ${amount} tokens`);
      return { hash: '0x' + '0'.repeat(64) };
    }
    async allowance(owner, spender) {
      return ethers.BigNumber.from('0');
    }
    async transferFrom(from, to, amount) {
      console.log(`Mock transferFrom ${amount} tokens from ${from} to ${to}`);
      return { hash: '0x' + '0'.repeat(64) };
    }
  },
  BigNumber: {
    from: (value) => ({
      toString: () => value.toString(),
      toNumber: () => parseInt(value),
      mul: (other) => ethers.BigNumber.from((parseInt(value) * parseInt(other)).toString()),
      div: (other) => ethers.BigNumber.from((parseInt(value) / parseInt(other)).toString()),
      add: (other) => ethers.BigNumber.from((parseInt(value) + parseInt(other)).toString()),
      sub: (other) => ethers.BigNumber.from((parseInt(value) - parseInt(other)).toString()),
    }),
    utils: {
      parseEther: (value) => ethers.BigNumber.from((parseFloat(value) * 1e18).toString()),
      formatEther: (value) => (parseInt(value) / 1e18).toString(),
    }
  }
};

// Network configuration for Sonic
export const NETWORK_CONFIG = {
  chainId: 146,
  chainName: 'Sonic',
  nativeCurrency: {
    name: 'Sonic',
    symbol: 'S',
    decimals: 18,
  },
  rpcUrls: ['https://rpc.soniclabs.com'],
  blockExplorerUrls: ['https://sonicscan.org'],
};

// Contract ABIs (minimal for basic operations)
export const CONTRACT_ABIS = {
  ERC20: [
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function decimals() view returns (uint8)',
    'function totalSupply() view returns (uint256)',
    'function balanceOf(address) view returns (uint256)',
    'function transfer(address to, uint256 amount) returns (bool)',
    'function allowance(address owner, address spender) view returns (uint256)',
    'function approve(address spender, uint256 amount) returns (bool)',
    'function transferFrom(address from, address to, uint256 amount) returns (bool)',
    'function mint(address to, uint256 amount)',
  ],
  Router: [
    'function swapExactTokensForTokens(uint256 amountIn, uint256 amountOutMin, address[] calldata path, address to, uint256 deadline) returns (uint256[] memory amounts)',
    'function addLiquidity(address tokenA, address tokenB, uint256 amountADesired, uint256 amountBDesired, uint256 amountAMin, uint256 amountBMin, address to, uint256 deadline) returns (uint256 amountA, uint256 amountB, uint256 liquidity)',
    'function removeLiquidity(address tokenA, address tokenB, uint256 liquidity, uint256 amountAMin, uint256 amountBMin, address to, uint256 deadline) returns (uint256 amountA, uint256 amountB)',
  ],
  Staking: [
    'function pools(uint256) view returns (address stakeToken, address rewardToken, uint256 apr, uint256 fee, bool active)',
    'function userInfo(uint256, address) view returns (uint256 amount, uint256 rewardDebt, uint256 lastUpdate)',
    'function stake(uint256 pid, uint256 amount)',
    'function withdraw(uint256 pid, uint256 amount)',
    'function claim(uint256 pid)',
    'function pendingReward(uint256 pid, address user) view returns (uint256)',
    'function addPool(address stakeToken, address rewardToken, uint256 apr, uint256 fee)',
    'function updatePool(uint256 pid, uint256 apr, uint256 fee, bool active)',
  ],
  Farming: [
    'function pools(uint256) view returns (address lpToken, address rewardToken, uint256 rewardRate, uint256 fee, bool active)',
    'function userInfo(uint256, address) view returns (uint256 amount, uint256 rewardDebt, uint256 lastUpdate)',
    'function stake(uint256 pid, uint256 amount)',
    'function withdraw(uint256 pid, uint256 amount)',
    'function claim(uint256 pid)',
    'function pendingReward(uint256 pid, address user) view returns (uint256)',
    'function addPool(address lpToken, address rewardToken, uint256 rewardRate, uint256 fee)',
    'function updatePool(uint256 pid, uint256 rewardRate, uint256 fee, bool active)',
  ],
};

// Global state
let provider = null;
let signer = null;
let contracts = {};

// Connect wallet (MetaMask or similar)
export async function connectWallet() {
  try {
    // Check if MetaMask is installed
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask is not installed. Please install MetaMask to use TestoDex.');
    }

    // Request account access
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    
    if (accounts.length === 0) {
      throw new Error('No accounts found. Please connect your wallet.');
    }

    // Create provider and signer
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    
    // Check network
    const network = await provider.getNetwork();
    if (network.chainId !== NETWORK_CONFIG.chainId) {
      throw new Error(`Please switch to ${NETWORK_CONFIG.chainName} network (Chain ID: ${NETWORK_CONFIG.chainId})`);
    }

    return accounts[0];
  } catch (error) {
    console.error('Wallet connection error:', error);
    throw error;
  }
}

// Initialize contracts with addresses
export function initializeContracts(addresses) {
  try {
    contracts = {
      TestoToken: new ethers.Contract(addresses.TestoToken, CONTRACT_ABIS.ERC20, signer),
      TSonicToken: new ethers.Contract(addresses.TSonicToken, CONTRACT_ABIS.ERC20, signer),
      Router: new ethers.Contract(addresses.TestodexRouter, CONTRACT_ABIS.Router, signer),
      Staking: new ethers.Contract(addresses.TestodexStaking, CONTRACT_ABIS.Staking, signer),
      Farming: new ethers.Contract(addresses.TestodexFarming, CONTRACT_ABIS.Farming, signer),
    };
    console.log('Contracts initialized successfully');
  } catch (error) {
    console.error('Contract initialization error:', error);
    throw error;
  }
}

// Get token balance
export async function getTokenBalance(tokenAddress, userAddress) {
  try {
    const tokenContract = new ethers.Contract(tokenAddress, CONTRACT_ABIS.ERC20, provider);
    const balance = await tokenContract.balanceOf(userAddress);
    return ethers.BigNumber.utils.formatEther(balance);
  } catch (error) {
    console.error('Get token balance error:', error);
    throw error;
  }
}

// Swap tokens
export async function swapTokens(tokenIn, tokenOut, amountIn, amountOutMin, userAddress) {
  try {
    if (!contracts.Router) {
      throw new Error('Router contract not initialized');
    }

    const path = [tokenIn, tokenOut];
    const deadline = Math.floor(Date.now() / 1000) + 1200; // 20 minutes

    const tx = await contracts.Router.swapExactTokensForTokens(
      ethers.BigNumber.utils.parseEther(amountIn.toString()),
      ethers.BigNumber.utils.parseEther(amountOutMin.toString()),
      path,
      userAddress,
      deadline
    );

    return await tx.wait();
  } catch (error) {
    console.error('Swap tokens error:', error);
    throw error;
  }
}

// Add liquidity
export async function addLiquidity(tokenA, tokenB, amountA, amountB, userAddress) {
  try {
    if (!contracts.Router) {
      throw new Error('Router contract not initialized');
    }

    const deadline = Math.floor(Date.now() / 1000) + 1200; // 20 minutes

    const tx = await contracts.Router.addLiquidity(
      tokenA,
      tokenB,
      ethers.BigNumber.utils.parseEther(amountA.toString()),
      ethers.BigNumber.utils.parseEther(amountB.toString()),
      0, // amountAMin
      0, // amountBMin
      userAddress,
      deadline
    );

    return await tx.wait();
  } catch (error) {
    console.error('Add liquidity error:', error);
    throw error;
  }
}

// Remove liquidity
export async function removeLiquidity(tokenA, tokenB, liquidity, userAddress) {
  try {
    if (!contracts.Router) {
      throw new Error('Router contract not initialized');
    }

    const deadline = Math.floor(Date.now() / 1000) + 1200; // 20 minutes

    const tx = await contracts.Router.removeLiquidity(
      tokenA,
      tokenB,
      ethers.BigNumber.utils.parseEther(liquidity.toString()),
      0, // amountAMin
      0, // amountBMin
      userAddress,
      deadline
    );

    return await tx.wait();
  } catch (error) {
    console.error('Remove liquidity error:', error);
    throw error;
  }
}

// Staking functions
export async function stakeTokens(poolId, amount) {
  try {
    if (!contracts.Staking) {
      throw new Error('Staking contract not initialized');
    }

    const tx = await contracts.Staking.stake(
      poolId,
      ethers.BigNumber.utils.parseEther(amount.toString())
    );

    return await tx.wait();
  } catch (error) {
    console.error('Stake tokens error:', error);
    throw error;
  }
}

export async function withdrawTokens(poolId, amount) {
  try {
    if (!contracts.Staking) {
      throw new Error('Staking contract not initialized');
    }

    const tx = await contracts.Staking.withdraw(
      poolId,
      ethers.BigNumber.utils.parseEther(amount.toString())
    );

    return await tx.wait();
  } catch (error) {
    console.error('Withdraw tokens error:', error);
    throw error;
  }
}

export async function claimRewards(poolId) {
  try {
    if (!contracts.Staking) {
      throw new Error('Staking contract not initialized');
    }

    const tx = await contracts.Staking.claim(poolId);
    return await tx.wait();
  } catch (error) {
    console.error('Claim rewards error:', error);
    throw error;
  }
}

// Farming functions (similar to staking but for LP tokens)
export async function farmStake(poolId, amount) {
  try {
    if (!contracts.Farming) {
      throw new Error('Farming contract not initialized');
    }

    const tx = await contracts.Farming.stake(
      poolId,
      ethers.BigNumber.utils.parseEther(amount.toString())
    );

    return await tx.wait();
  } catch (error) {
    console.error('Farm stake error:', error);
    throw error;
  }
}

export async function farmWithdraw(poolId, amount) {
  try {
    if (!contracts.Farming) {
      throw new Error('Farming contract not initialized');
    }

    const tx = await contracts.Farming.withdraw(
      poolId,
      ethers.BigNumber.utils.parseEther(amount.toString())
    );

    return await tx.wait();
  } catch (error) {
    console.error('Farm withdraw error:', error);
    throw error;
  }
}

export async function farmClaim(poolId) {
  try {
    if (!contracts.Farming) {
      throw new Error('Farming contract not initialized');
    }

    const tx = await contracts.Farming.claim(poolId);
    return await tx.wait();
  } catch (error) {
    console.error('Farm claim error:', error);
    throw error;
  }
}

// Get user info for staking/farming
export async function getUserInfo(contractType, poolId, userAddress) {
  try {
    const contract = contractType === 'staking' ? contracts.Staking : contracts.Farming;
    
    if (!contract) {
      throw new Error(`${contractType} contract not initialized`);
    }

    const userInfo = await contract.userInfo(poolId, userAddress);
    const pendingReward = await contract.pendingReward(poolId, userAddress);

    return {
      stakedAmount: ethers.BigNumber.utils.formatEther(userInfo.amount),
      rewardDebt: ethers.BigNumber.utils.formatEther(userInfo.rewardDebt),
      lastUpdate: userInfo.lastUpdate.toNumber(),
      pendingReward: ethers.BigNumber.utils.formatEther(pendingReward),
    };
  } catch (error) {
    console.error('Get user info error:', error);
    throw error;
  }
}

// Get pool info
export async function getPoolInfo(contractType, poolId) {
  try {
    const contract = contractType === 'staking' ? contracts.Staking : contracts.Farming;
    
    if (!contract) {
      throw new Error(`${contractType} contract not initialized`);
    }

    const pool = await contract.pools(poolId);
    
    return {
      stakeToken: pool.stakeToken || pool.lpToken,
      rewardToken: pool.rewardToken,
      apr: pool.apr ? pool.apr.toNumber() : null,
      rewardRate: pool.rewardRate ? ethers.BigNumber.utils.formatEther(pool.rewardRate) : null,
      fee: pool.fee.toNumber(),
      active: pool.active,
    };
  } catch (error) {
    console.error('Get pool info error:', error);
    throw error;
  }
}

// Mint tokens (admin function)
export async function mintTokens(tokenType, recipient, amount) {
  try {
    const contract = tokenType === 'TESTO' ? contracts.TestoToken : contracts.TSonicToken;
    
    if (!contract) {
      throw new Error(`${tokenType} contract not initialized`);
    }

    const tx = await contract.mint(
      recipient,
      ethers.BigNumber.utils.parseEther(amount.toString())
    );

    return await tx.wait();
  } catch (error) {
    console.error('Mint tokens error:', error);
    throw error;
  }
}

// Admin pool management functions
export async function addPool(contractType, stakeToken, rewardToken, apr, fee) {
  try {
    const contract = contractType === 'staking' ? contracts.Staking : contracts.Farming;
    
    if (!contract) {
      throw new Error(`${contractType} contract not initialized`);
    }

    let tx;
    if (contractType === 'staking') {
      tx = await contract.addPool(stakeToken, rewardToken, apr, fee);
    } else {
      tx = await contract.addPool(stakeToken, rewardToken, ethers.BigNumber.utils.parseEther(apr.toString()), fee);
    }

    return await tx.wait();
  } catch (error) {
    console.error('Add pool error:', error);
    throw error;
  }
}

export async function updatePool(contractType, poolId, apr, fee, active) {
  try {
    const contract = contractType === 'staking' ? contracts.Staking : contracts.Farming;
    
    if (!contract) {
      throw new Error(`${contractType} contract not initialized`);
    }

    let tx;
    if (contractType === 'staking') {
      tx = await contract.updatePool(poolId, apr, fee, active);
    } else {
      tx = await contract.updatePool(poolId, ethers.BigNumber.utils.parseEther(apr.toString()), fee, active);
    }

    return await tx.wait();
  } catch (error) {
    console.error('Update pool error:', error);
    throw error;
  }
}

// Export network config and ABIs
// NETWORK_CONFIG and CONTRACT_ABIS are already exported above 