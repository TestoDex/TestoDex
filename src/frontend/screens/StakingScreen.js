import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

// Mock staking pools data
const STAKING_POOLS = [
  {
    id: 0,
    name: 'TESTO Staking',
    stakeToken: 'TESTO',
    rewardToken: 'TS',
    apr: '12.5%',
    totalStaked: '1,000,000',
    userStaked: '0',
    pendingRewards: '0',
  },
  {
    id: 1,
    name: 'TSonic Staking',
    stakeToken: 'TS',
    rewardToken: 'TESTO',
    apr: '8.0%',
    totalStaked: '500,000',
    userStaked: '0',
    pendingRewards: '0',
  },
];

// Staking Screen Component
export default function StakingScreen() {
  const [selectedPool, setSelectedPool] = useState(null);
  const [stakeAmount, setStakeAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  // Handle stake action
  const handleStake = () => {
    if (!selectedPool || !stakeAmount) return;
    // TODO: Implement actual staking logic with Web3
    console.log(`Staking ${stakeAmount} ${selectedPool.stakeToken}`);
  };

  // Handle withdraw action
  const handleWithdraw = () => {
    if (!selectedPool || !withdrawAmount) return;
    // TODO: Implement actual withdraw logic with Web3
    console.log(`Withdrawing ${withdrawAmount} ${selectedPool.stakeToken}`);
  };

  // Handle claim rewards
  const handleClaim = () => {
    if (!selectedPool) return;
    // TODO: Implement actual claim logic with Web3
    console.log(`Claiming rewards from pool ${selectedPool.id}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🏋️‍♂️ Stake for Gains!</Text>

      {/* Pool List */}
      {STAKING_POOLS.map((pool) => (
        <TouchableOpacity
          key={pool.id}
          style={[styles.poolCard, selectedPool?.id === pool.id && styles.selectedPool]}
          onPress={() => setSelectedPool(pool)}
        >
          <View style={styles.poolHeader}>
            <Text style={styles.poolName}>{pool.name}</Text>
            <Text style={styles.poolApr}>{pool.apr} APR</Text>
          </View>
          <View style={styles.poolDetails}>
            <Text>Stake: {pool.stakeToken} → Earn: {pool.rewardToken}</Text>
            <Text>Total Staked: {pool.totalStaked}</Text>
            <Text>Your Stake: {pool.userStaked}</Text>
            <Text>Pending: {pool.pendingRewards}</Text>
          </View>
        </TouchableOpacity>
      ))}

      {/* Pool Actions */}
      {selectedPool && (
        <View style={styles.actionsContainer}>
          <Text style={styles.actionsTitle}>Pool Actions</Text>
          
          {/* Stake */}
          <View style={styles.actionSection}>
            <Text style={styles.actionLabel}>Stake {selectedPool.stakeToken}</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.amountInput}
                value={stakeAmount}
                onChangeText={setStakeAmount}
                placeholder="0.0"
                keyboardType="numeric"
              />
              <TouchableOpacity style={styles.actionButton} onPress={handleStake}>
                <Text style={styles.buttonText}>Stake</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Withdraw */}
          <View style={styles.actionSection}>
            <Text style={styles.actionLabel}>Withdraw {selectedPool.stakeToken}</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.amountInput}
                value={withdrawAmount}
                onChangeText={setWithdrawAmount}
                placeholder="0.0"
                keyboardType="numeric"
              />
              <TouchableOpacity style={styles.actionButton} onPress={handleWithdraw}>
                <Text style={styles.buttonText}>Withdraw</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Claim Rewards */}
          <TouchableOpacity style={styles.claimButton} onPress={handleClaim}>
            <Text style={styles.claimButtonText}>Claim Rewards 💪</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.info}>Connect your wallet to start staking!</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  poolCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedPool: {
    borderColor: '#7e3ff2',
  },
  poolHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  poolName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  poolApr: {
    fontSize: 16,
    color: '#7e3ff2',
    fontWeight: '600',
  },
  poolDetails: {
    gap: 4,
  },
  actionsContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  actionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  actionSection: {
    marginBottom: 16,
  },
  actionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountInput: {
    flex: 1,
    fontSize: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginRight: 12,
  },
  actionButton: {
    backgroundColor: '#7e3ff2',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  claimButton: {
    backgroundColor: '#7e3ff2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  claimButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  info: {
    textAlign: 'center',
    color: '#666',
    marginTop: 16,
    fontSize: 14,
  },
}); 