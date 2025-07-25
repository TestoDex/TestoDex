import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import ContractAddressConfig from '../components/ContractAddressConfig';
import PoolManager from '../components/PoolManager';
import TokenMinter from '../components/TokenMinter';
import { CONTRACT_ADDRESSES } from '../config/contracts.js';

// Admin panel tabs
const ADMIN_TABS = [
  { id: 'addresses', title: 'Contract Addresses', emoji: '📍' },
  { id: 'staking', title: 'Staking Pools', emoji: '🏋️‍♂️' },
  { id: 'farming', title: 'Farming Pools', emoji: '🌾' },
  { id: 'minting', title: 'Token Minting', emoji: '🪙' },
];

// Initial contract address keys - use deployed addresses
const defaultAddresses = CONTRACT_ADDRESSES;

// Main Admin Panel Screen
export default function AdminScreen() {
  const [addresses, setAddresses] = useState(defaultAddresses);
  const [activeTab, setActiveTab] = useState('addresses');

  // Handle address update
  const handleUpdateAddresses = (newAddresses) => {
    setAddresses(newAddresses);
    // TODO: Persist addresses (e.g., AsyncStorage or on-chain if needed)
  };

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'addresses':
        return <ContractAddressConfig addresses={addresses} onUpdate={handleUpdateAddresses} />;
      case 'staking':
        return <PoolManager poolType="staking" />;
      case 'farming':
        return <PoolManager poolType="farming" />;
      case 'minting':
        return <TokenMinter />;
      default:
        return <ContractAddressConfig addresses={addresses} onUpdate={handleUpdateAddresses} />;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Panel</Text>
      
      {/* Tab Navigation */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
        {ADMIN_TABS.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tabButton, activeTab === tab.id && styles.activeTabButton]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={styles.tabEmoji}>{tab.emoji}</Text>
            <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Tab Content */}
      <View style={styles.contentContainer}>
        {renderTabContent()}
      </View>

      {/* Admin Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Admin Panel Info</Text>
        <Text style={styles.infoText}>
          • Only the contract owner can access these functions
        </Text>
        <Text style={styles.infoText}>
          • All changes require wallet confirmation
        </Text>
        <Text style={styles.infoText}>
          • Pool fees are sent to the Treasury contract
        </Text>
        <Text style={styles.infoText}>
          • Keep your private keys secure! 🔐
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  tabContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tabButton: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    minWidth: 100,
  },
  activeTabButton: {
    backgroundColor: '#7e3ff2',
  },
  tabEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#fff',
  },
  contentContainer: {
    flex: 1,
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 16,
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
}); 