// Contract addresses for TestoDex
// Deployed on Sonic Network (Chain ID: 146)

export const CONTRACT_ADDRESSES = {
  // Token Contracts
  TestoToken: '0x01705137870121ee52A0FF93882d39AC4E847C7a',
  TSonicToken: '0x98d776848fCac3623f7eF2046325770068820ffB',
  
  // Core DEX Contracts
  TestodexPair: '0x981c0196F7c0d5f316036E3ecC867F395938739D',
  TestodexFactory: '0x5889D34c608500523803846aA00308B61373f377',
  TestodexRouter: '0x3c2f38Aba1De515209f635A4737d10946986BC56',
  
  // DeFi Contracts
  TestodexTreasury: '0x4F19F7eD285488A4B3b6f6c8ae56185A1950EC0e',
  TestodexStaking: '0x92676465F681F67Ac3ad7696D5B084fE477f4E35',
  TestodexFarming: '0xE410e583B04d1B1E35a125494479eadFFE5F70e8',
};

// Network configuration
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

// Contract names for easy reference
export const CONTRACT_NAMES = {
  TestoToken: 'Testo Token',
  TSonicToken: 'TSonic Token',
  TestodexPair: 'TestoDex Pair',
  TestodexFactory: 'TestoDex Factory',
  TestodexRouter: 'TestoDex Router',
  TestodexTreasury: 'TestoDex Treasury',
  TestodexStaking: 'TestoDex Staking',
  TestodexFarming: 'TestoDex Farming',
};

// Get contract address by name
export function getContractAddress(contractName) {
  return CONTRACT_ADDRESSES[contractName];
}

// Get all contract addresses
export function getAllContractAddresses() {
  return CONTRACT_ADDRESSES;
}

// Validate contract address
export function isValidContractAddress(address) {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
} 