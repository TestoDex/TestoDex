import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

// Documentation sections
const DOC_SECTIONS = [
  { id: 'overview', title: 'Overview', emoji: '📖' },
  { id: 'tokens', title: 'Tokens', emoji: '🪙' },
  { id: 'usage', title: 'Usage Guide', emoji: '📚' },
  { id: 'admin', title: 'Admin Panel', emoji: '⚙️' },
  { id: 'contracts', title: 'Smart Contracts', emoji: '🔧' },
  { id: 'faq', title: 'FAQ', emoji: '❓' },
  { id: 'theme', title: 'Theme & Humor', emoji: '🎭' },
];

// Mock documentation content (replace with actual markdown parsing)
const DOC_CONTENT = {
  overview: `# TestoDex Overview

TestoDex is a decentralized exchange (DEX) built on the Sonic network, inspired by Uniswap V2, with a humorous bodybuilding/monster theme. Swap, stake, farm, and laugh!

## Goals
- Deliver a modern, low-fee DEX experience on Sonic
- Empower users to swap, stake, and farm with flexible rewards
- Offer a unique, themed UI/UX full of jokes and monster mascots
- Provide full admin control over pools, rewards, and platform content

## Core Features
- **Swap:** Uniswap V2-style token swaps
- **Staking:** Multiple, admin-configurable staking pools
- **Farming:** LP token-based farming pools
- **Admin Panel:** On-chain management of pools, rewards, and content
- **Docs:** Themed, markdown-based documentation

## Why TestoDex?
- Fast, fun, and user-friendly
- Fully open source and community-driven
- Themed for maximum gains (and laughs!)`,

  tokens: `# Tokenomics & Tokens

TestoDex uses two main tokens:

## Testo (TESTO)
- **Type:** Native DEX token
- **Standard:** ERC20, mintable, ownable
- **Use Cases:** Platform rewards, staking/farming incentives, governance (future)
- **Minting:** Only admin can mint

## TSonic (TS)
- **Type:** Sonic-pegged stable token
- **Standard:** ERC20, mintable, ownable
- **Use Cases:** Stable rewards, staking/farming, liquidity pools
- **Minting:** Only admin can mint

## Treasury
- **Purpose:** Collects staking/farming fees
- **Withdrawals:** Only owner can withdraw`,

  usage: `# Usage Guide

Welcome to the TestoDex gym! Here's how to get those DeFi gains:

## 1. Swapping Tokens
1. Go to the Swap page
2. Select the tokens you want to swap (e.g., TESTO for TSonic)
3. Enter the amount and click 'Swap'
4. Confirm the transaction in your wallet
5. Flex! You just swapped like a monster

## 2. Staking & Farming
1. Go to the Staking or Farming page
2. Choose a pool and click 'Stake' or 'Farm'
3. Enter the amount and confirm
4. Watch your rewards grow—don't skip leg day!

For more details, see the FAQ or ask in the community.`,

  admin: `# Admin Panel Guide

The TestoDex admin panel gives you full control over pools, rewards, and platform content.

## 1. Pool Management
- **Add Pool:** Choose stake token, reward token, APR, and pool fee
- **Edit Pool:** Update APR, fee, or status (active/inactive)
- **Remove Pool:** Deactivate a pool to stop new staking

## 2. Fee Settings
- Set a fee (in basis points, e.g., 100 = 1%) for each staking pool
- All fees are sent to the Testodex Treasury contract
- Only the owner can withdraw from the Treasury

## 3. Token Minting
- Mint new TESTO or TSonic tokens directly from the admin panel
- Only the contract owner can mint

All admin actions are on-chain and require wallet confirmation.`,

  contracts: `# Smart Contract Architecture

TestoDex uses a set of minimal, secure smart contracts:

| Contract | Purpose |
|----------|---------|
| TestoToken | Mintable, ownable ERC20 token for platform rewards |
| TSonicToken | Mintable, ownable ERC20 stable token pegged to Sonic |
| TestodexTreasury | Collects staking/farming fees, owner can withdraw |
| TestodexFactory | Deploys and tracks all DEX pairs (Uniswap V2 style) |
| TestodexPair | Holds liquidity, enables swaps between two tokens |
| TestodexRouter | User-facing contract for swaps and liquidity management |

## Manual Contract Deployment
- All smart contracts are deployed manually (no deployer package)
- After deployment, copy each contract address
- In the admin panel, enter the deployed addresses
- The app will use these addresses for all contract interactions`,

  faq: `# Frequently Asked Questions (FAQ)

**Q: What is TestoDex?**
A: TestoDex is a decentralized exchange (DEX) on the Sonic network, inspired by Uniswap V2, with a bodybuilding/monster theme. Swap, stake, farm, and laugh!

**Q: How do I use TestoDex?**
A: Connect your wallet, go to the Swap, Staking, or Farming pages, and follow the on-screen steps.

**Q: What tokens can I use?**
A: You can use TESTO, TSonic, and any tokens supported by the Sonic network and TestoDex pools.

**Q: How are fees handled?**
A: Each pool has a configurable fee. All fees go to the Testodex Treasury contract and can only be withdrawn by the owner.

**Q: Is TestoDex safe?**
A: Contracts are minimal, open source, and use OpenZeppelin patterns. Always DYOR and use at your own risk!

**Q: Why the bodybuilding/monster theme?**
A: Because DeFi should be fun! Stake for gains, farm for protein, and swap like a beast.`,

  theme: `# Theming & Humor

TestoDex isn't just a DEX—it's a gym for your tokens! Our platform is packed with bodybuilding and monster-themed jokes, mascots, and visuals.

## Theme Elements
- **Mascots:** Buff monsters, flexing tokens, and protein-shake shakers
- **Icons:** Dumbbells, barbells, muscle arms, monster footprints
- **Animations:** Flexing loaders, dumbbell spinners, "gains" progress bars
- **Copywriting:** Gym slang, monster puns, and motivational DeFi quotes

## Humor Style
- Light-hearted, gym-bro jokes ("Don't skip leg day—stake for gains!")
- Monster puns ("Swap like a beast! Farm for protein!")
- Playful, never offensive—everyone's welcome in the TestoDex gym

## Contributing Themed Content
- Add new jokes, mascot images, or themed icons
- Suggest new animations or copy
- Keep it fun, positive, and on-theme!

Let's make DeFi a place for both gains and grins!`,
};

// Documentation Screen Component
export default function DocsScreen() {
  const [selectedSection, setSelectedSection] = useState('overview');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 TestoDex Documentation</Text>
      
      {/* Section Navigation */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.navContainer}>
        {DOC_SECTIONS.map((section) => (
          <TouchableOpacity
            key={section.id}
            style={[styles.navButton, selectedSection === section.id && styles.selectedNavButton]}
            onPress={() => setSelectedSection(section.id)}
          >
            <Text style={styles.navButtonEmoji}>{section.emoji}</Text>
            <Text style={[styles.navButtonText, selectedSection === section.id && styles.selectedNavButtonText]}>
              {section.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Documentation Content */}
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.content}>{DOC_CONTENT[selectedSection]}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  navContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  navButton: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  selectedNavButton: {
    backgroundColor: '#7e3ff2',
  },
  navButtonEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  navButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  selectedNavButtonText: {
    color: '#fff',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
}); 