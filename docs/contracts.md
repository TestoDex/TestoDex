# Smart Contract Architecture

TestoDex uses a set of minimal, secure smart contracts to power its DEX, staking, and admin features. Below is an overview of each contract and its purpose.

| Contract              | Purpose                                                      |
|-----------------------|--------------------------------------------------------------|
| TestoToken            | Mintable, ownable ERC20 token for platform rewards           |
| TSonicToken           | Mintable, ownable ERC20 stable token pegged to Sonic         |
| TestodexTreasury      | Collects staking/farming fees, owner can withdraw            |
| TestodexFactory       | Deploys and tracks all DEX pairs (Uniswap V2 style)          |
| TestodexPair          | Holds liquidity, enables swaps between two tokens            |
| TestodexRouter        | User-facing contract for swaps and liquidity management      |

## Contract Details

### TestoToken & TSonicToken
- ERC20, mintable by admin
- Used for rewards, staking, and liquidity

### TestodexTreasury
- Receives pool fees
- Only owner can withdraw (native or ERC20)

### TestodexFactory
- Deploys new Pair contracts for token pairs
- Tracks all pairs and their addresses

### TestodexPair
- Holds reserves for two tokens
- Allows minting, burning, and swapping

### TestodexRouter
- User interface for adding/removing liquidity and swapping
- Calls Factory and Pair contracts under the hood

---

For full ABIs and deployment addresses, see the `contracts/` folder and deployment notes. 