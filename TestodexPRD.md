# TestoDex Product Requirements Document (PRD)

## 1. Project Overview

**TestoDex** is a decentralized exchange (DEX) built on the Sonic network, inspired by the Uniswap V2 model. The project features a humorous bodybuilding/monster theme, providing a modern, engaging, and user-friendly experience. TestoDex enables users to swap tokens, stake, and farm with flexible, admin-controlled pools. The platform includes its own native token (Testo) and a mintable stable token (TSonic), both managed via a comprehensive admin panel.

---

## 2. Purpose & Goals
- Provide a fast, low-fee, and fun DEX experience on the Sonic network.
- Enable users to swap, stake, and farm tokens with flexible reward structures.
- Offer a unique, humorous bodybuilding-themed UI/UX.
- Allow full admin control over pools, rewards, and platform content.

---

## 3. Target Audience
- Crypto investors and DeFi users
- Sonic network participants
- Fans of themed, community-driven projects
- Users seeking a fun and modern DEX experience

---

## 4. Network & Token Details
- **Network Name:** Sonic
- **RPC URL:** https://rpc.soniclabs.com
- **Explorer URL:** https://sonicscan.org
- **Chain ID:** 146
- **Currency Symbol:** S

### Tokens
- **Testo (TESTO):** Native DEX token, mintable ERC20
- **TSonic (TS):** Mintable, Sonic-pegged stable token

---

## 5. Core Features

### 5.1 Swap (Uniswap V2 Model)
- Token swaps using Uniswap V2-style liquidity pools
- Minimal dependencies, no Hardhat or Truffle (manual deployment)
- Custom contracts for pools and routing

### 5.2 Staking
- Multiple staking pools, configurable by admin
- Users can stake various tokens (e.g., Sonic, TSonic) to earn rewards (e.g., TSonic, Testo)
- Fixed APR or pool-based reward system, settable via admin panel
- Add/remove/edit staking pools dynamically
- **Admin can set a pool fee for each staking pool via the admin panel**
- **Staking fees are collected in the Testodex Treasury contract and can be withdrawn by the owner**

### 5.3 Farming
- LP token-based farming pools (e.g., Testo-TSonic, TSonic-Sonic)
- Admin can configure which pairs are available and their reward rates
- Add/remove/edit farm pools dynamically

### 5.4 Admin Panel
- Full control over staking/farming pools (add, edit, remove)
- Set APR, reward types, and pool parameters
- **Set pool fee for each staking pool**
- Mint Testo and TSonic tokens
- Manage platform content (theme jokes, images, docs)
- View user and pool statistics
- Simple authentication (password or wallet-based)

### 5.5 Frontend (React Native, Static)
- Modern, bodybuilding/monster-themed UI/UX
- Pages: Home, Swap, Staking, Farm, Docs, Admin
- Responsive, static build (no SSR), deployable to Netlify
- Humorous elements: bodybuilding jokes, monster mascots, themed animations

### 5.6 Documentation Page
- Technical and conceptual project details
- User guides and FAQs
- Themed, humorous explanations

---

## 6. Technological Architecture (Detailed)

### 6.1 Smart Contracts
- **Language:** Solidity (>=0.8.x)
- **Deployment:** Manual (no Hardhat/Truffle)
- **Token Contracts:**
  - Minimal ERC20 implementation (OpenZeppelin or custom, mintable, ownable)
  - Testo and TSonic tokens, both mintable by admin
- **DEX Contracts:**
  - Uniswap V2-style Factory, Pair, and Router contracts
  - Minimal dependencies, only essential libraries (e.g., OpenZeppelin for security)
  - Custom staking and farming contracts:
    - Configurable pools (token addresses, reward rates, duration, APR type, **pool fee**)
    - **Staking pool fees are sent to a dedicated Testodex Treasury contract**
    - **Treasury contract allows owner to withdraw accumulated fees**
    - Admin functions for pool management
    - Emergency withdraw and pause features
- **Security:**
  - Use OpenZeppelin’s Ownable, ReentrancyGuard, and SafeMath (if needed)
  - Manual code review and basic test scripts

### 6.2 Frontend
- **Framework:** React Native (Expo or bare, but static export for Netlify)
- **State Management:** React Context API or Redux (minimal, only if needed)
- **Web3 Integration:**
  - Use ethers.js for wallet connection and contract interaction
  - Support for MetaMask and WalletConnect (if possible in static RN)
- **UI/UX:**
  - Custom bodybuilding/monster theme
  - Modular, reusable components (Cards, Pools, Forms, etc.)
  - Responsive design for mobile and desktop
  - Themed animations (e.g., dumbbell spinners, muscle flex loaders)
- **Routing:** React Navigation (for SPA-like experience)
- **Deployment:** Static build, deployed directly to Netlify

### 6.3 Admin Panel
- **Access:** Password or wallet-based authentication (simple, no backend)
- **Features:**
  - Dynamic pool management (CRUD for staking/farming pools)
  - Token minting interface
  - APR and reward configuration
  - Themed content management (jokes, images)
  - Stats dashboard (user, pool, and platform metrics)
- **Implementation:**
  - Admin-only routes/components
  - All settings stored on-chain or in static config (no backend server)

### 6.4 Documentation
- **Format:** Markdown-based, rendered in-app
- **Content:**
  - Project overview, tokenomics, usage guides
  - Themed explanations and FAQs
  - Technical details for developers

---

## 7. User Flows

1. **Home:** Project intro, stats, theme content
2. **Swap:** Token exchange via Uniswap V2 pools
3. **Staking:** Stake tokens, view rewards, claim earnings
4. **Farm:** Provide LP, stake, view/claim rewards
5. **Docs:** Read about project, guides, and FAQs
6. **Admin:** Manage pools, mint tokens, configure platform

---

## 8. Security & Compliance
- Minimal dependencies, open-source code
- Admin-only minting and pool management
- Emergency withdraw and pause for all pools
- Manual contract review and basic test coverage
- User funds safety prioritized

---

## 9. Deployment & Delivery
- **Frontend:** Static export, deployed to Netlify
- **Contracts:** Manually deployed to Sonic network
- **Open Source:** All code and docs published publicly

---

## 10. File & Documentation Structure
- `/contracts`: Solidity smart contracts (**including Testodex Treasury contract**)
- `/src`: React Native frontend code
- `/public`: Static assets, themed images
- `/docs`: Markdown documentation and guides

---

## 11. Theming & Humor
- Bodybuilding/monster jokes and references throughout UI
- Mascot illustrations, themed icons, and animations
- Fun, engaging copywriting (e.g., “Stake for gains!”, “Farm protein!”)

---

## 12. Notes
- Community feedback will be incorporated during development
- Simplicity and minimalism prioritized in both code and dependencies
- All features and pools are configurable via the admin panel

---

This PRD outlines all requirements, features, and technical details for TestoDex. The document can be updated as the project evolves.
