# TestoDex Deployed Contracts

This document contains all the deployed contract addresses for the TestoDex protocol on the Sonic Network (Chain ID: 146).

## Network Information
- **Network**: Sonic
- **Chain ID**: 146
- **RPC URL**: https://rpc.soniclabs.com
- **Block Explorer**: https://sonicscan.org

## Contract Addresses

### Token Contracts
| Contract | Address | Purpose |
|----------|---------|---------|
| TestoToken | `0x01705137870121ee52A0FF93882d39AC4E847C7a` | Main governance token |
| TSonicToken | `0x98d776848fCac3623f7eF2046325770068820ffB` | Utility token |

### Core DEX Contracts
| Contract | Address | Purpose |
|----------|---------|---------|
| TestodexPair | `0x981c0196F7c0d5f316036E3ecC867F395938739D` | Pair template for liquidity pools |
| TestodexFactory | `0x5889D34c608500523803846aA00308B61373f377` | Creates and manages trading pairs |
| TestodexRouter | `0x3c2f38Aba1De515209f635A4737d10946986BC56` | Handles swaps and liquidity operations |

### DeFi Contracts
| Contract | Address | Purpose |
|----------|---------|---------|
| TestodexTreasury | `0x4F19F7eD285488A4B3b6f6c8ae56185A1950EC0e` | Collects fees and manages protocol funds |
| TestodexStaking | `0x92676465F681F67Ac3ad7696D5B084fE477f4E35` | Staking pools for earning rewards |
| TestodexFarming | `0xE410e583B04d1B1E35a125494479eadFFE5F70e8` | Yield farming with LP tokens |

## Contract Dependencies

```
TestodexFactory
├── TestodexPair (implementation template)
└── Creates pairs for any two tokens

TestodexRouter
├── TestodexFactory (for pair lookups)
└── Handles swaps and liquidity

TestodexStaking
├── TestodexTreasury (for fee collection)
└── Manages staking pools

TestodexFarming
├── TestodexTreasury (for fee collection)
└── Manages farming pools
```

## Usage Examples

### Initialize Web3 with Contracts
```javascript
import { initializeContracts } from './utils/web3.js';
import { CONTRACT_ADDRESSES } from './config/contracts.js';

// Initialize all contracts with deployed addresses
initializeContracts(CONTRACT_ADDRESSES);
```

### Get Contract Address
```javascript
import { getContractAddress } from './config/contracts.js';

const routerAddress = getContractAddress('TestodexRouter');
const stakingAddress = getContractAddress('TestodexStaking');
```

## Verification

All contracts have been deployed and verified on the Sonic Network. You can view them on the block explorer:

- [TestoToken](https://sonicscan.org/address/0x01705137870121ee52A0FF93882d39AC4E847C7a)
- [TSonicToken](https://sonicscan.org/address/0x98d776848fCac3623f7eF2046325770068820ffB)
- [TestodexFactory](https://sonicscan.org/address/0x5889D34c608500523803846aA00308B61373f377)
- [TestodexRouter](https://sonicscan.org/address/0x3c2f38Aba1De515209f635A4737d10946986BC56)
- [TestodexStaking](https://sonicscan.org/address/0x92676465F681F67Ac3ad7696D5B084fE477f4E35)
- [TestodexFarming](https://sonicscan.org/address/0xE410e583B04d1B1E35a125494479eadFFE5F70e8)
- [TestodexTreasury](https://sonicscan.org/address/0x4F19F7eD285488A4B3b6f6c8ae56185A1950EC0e)

## Security Notes

- All contracts have been audited and tested
- Owner functions are restricted to the deployer address
- Emergency pause functionality is available on critical contracts
- Fee collection is automated and sent to the Treasury contract

## Support

For technical support or questions about the deployed contracts, please refer to the main documentation or contact the development team. 