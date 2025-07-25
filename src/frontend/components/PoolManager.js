import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

// Pool Manager Component for Admin Panel
export default function PoolManager({ poolType = 'staking' }) {
  const [pools, setPools] = useState([]);
  const [formData, setFormData] = useState({
    stakeToken: '',
    rewardToken: '',
    apr: '',
    fee: '',
    rewardRate: '',
  });

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Add new pool
  const handleAddPool = () => {
    if (!formData.stakeToken || !formData.rewardToken) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const newPool = {
      id: pools.length,
      ...formData,
      active: true,
    };

    setPools([...pools, newPool]);
    setFormData({ stakeToken: '', rewardToken: '', apr: '', fee: '', rewardRate: '' });
    Alert.alert('Success', `${poolType} pool added successfully! 💪`);
  };

  // Toggle pool status
  const handleTogglePool = (poolId) => {
    setPools(pools.map(pool => 
      pool.id === poolId ? { ...pool, active: !pool.active } : pool
    ));
  };

  // Remove pool
  const handleRemovePool = (poolId) => {
    Alert.alert(
      'Remove Pool',
      'Are you sure you want to remove this pool?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => {
            setPools(pools.filter(pool => pool.id !== poolId));
            Alert.alert('Success', 'Pool removed successfully!');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Manage {poolType} Pools</Text>

      {/* Add Pool Form */}
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Add New Pool</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Stake Token Address</Text>
          <TextInput
            style={styles.input}
            value={formData.stakeToken}
            onChangeText={(value) => handleInputChange('stakeToken', value)}
            placeholder="0x..."
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Reward Token Address</Text>
          <TextInput
            style={styles.input}
            value={formData.rewardToken}
            onChangeText={(value) => handleInputChange('rewardToken', value)}
            placeholder="0x..."
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {poolType === 'staking' ? (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>APR (%)</Text>
            <TextInput
              style={styles.input}
              value={formData.apr}
              onChangeText={(value) => handleInputChange('apr', value)}
              placeholder="12.5"
              keyboardType="numeric"
            />
          </View>
        ) : (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Reward Rate (tokens/day)</Text>
            <TextInput
              style={styles.input}
              value={formData.rewardRate}
              onChangeText={(value) => handleInputChange('rewardRate', value)}
              placeholder="100"
              keyboardType="numeric"
            />
          </View>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Pool Fee (basis points)</Text>
          <TextInput
            style={styles.input}
            value={formData.fee}
            onChangeText={(value) => handleInputChange('fee', value)}
            placeholder="100 (1%)"
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAddPool}>
          <Text style={styles.addButtonText}>Add Pool 💪</Text>
        </TouchableOpacity>
      </View>

      {/* Pool List */}
      <View style={styles.poolsContainer}>
        <Text style={styles.poolsTitle}>Current Pools</Text>
        {pools.map((pool) => (
          <View key={pool.id} style={styles.poolCard}>
            <View style={styles.poolHeader}>
              <Text style={styles.poolName}>
                Pool #{pool.id + 1} - {pool.active ? '🟢 Active' : '🔴 Inactive'}
              </Text>
              <View style={styles.poolActions}>
                <TouchableOpacity 
                  style={styles.actionButton} 
                  onPress={() => handleTogglePool(pool.id)}
                >
                  <Text style={styles.actionButtonText}>
                    {pool.active ? 'Deactivate' : 'Activate'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.actionButton, styles.removeButton]} 
                  onPress={() => handleRemovePool(pool.id)}
                >
                  <Text style={styles.actionButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.poolDetails}>
              <Text>Stake: {pool.stakeToken.slice(0, 8)}...</Text>
              <Text>Reward: {pool.rewardToken.slice(0, 8)}...</Text>
              {poolType === 'staking' ? (
                <Text>APR: {pool.apr}%</Text>
              ) : (
                <Text>Rate: {pool.rewardRate} tokens/day</Text>
              )}
              <Text>Fee: {pool.fee} bps</Text>
            </View>
          </View>
        ))}
        {pools.length === 0 && (
          <Text style={styles.noPools}>No pools created yet. Add your first pool above!</Text>
        )}
      </View>
    </ScrollView>
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
  formContainer: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 16,
    borderRadius: 12,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#7e3ff2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  poolsContainer: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 16,
    borderRadius: 12,
  },
  poolsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  poolCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  poolHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  poolName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  poolActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    backgroundColor: '#7e3ff2',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  removeButton: {
    backgroundColor: '#ff4757',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  poolDetails: {
    gap: 4,
  },
  noPools: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    marginTop: 16,
  },
}); 