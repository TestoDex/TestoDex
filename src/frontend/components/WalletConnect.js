import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { connectWallet } from '../utils/web3';

// Wallet connection component
export default function WalletConnect({ onConnect, onDisconnect }) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  // Handle wallet connection
  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const account = await connectWallet();
      setAddress(account);
      setIsConnected(true);
      if (onConnect) onConnect(account);
      Alert.alert('Success!', 'Wallet connected successfully! 💪');
    } catch (error) {
      Alert.alert('Connection Failed', error.message);
    } finally {
      setIsConnecting(false);
    }
  };

  // Handle wallet disconnection
  const handleDisconnect = () => {
    setAddress('');
    setIsConnected(false);
    if (onDisconnect) onDisconnect();
    Alert.alert('Disconnected', 'Wallet disconnected!');
  };

  // Format address for display
  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <View style={styles.container}>
      {!isConnected ? (
        <TouchableOpacity 
          style={[styles.connectButton, isConnecting && styles.connectingButton]} 
          onPress={handleConnect}
          disabled={isConnecting}
        >
          <Text style={styles.connectButtonText}>
            {isConnecting ? 'Connecting...' : 'Connect Wallet 💪'}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.connectedContainer}>
          <View style={styles.addressContainer}>
            <Text style={styles.connectedText}>Connected:</Text>
            <Text style={styles.addressText}>{formatAddress(address)}</Text>
          </View>
          <TouchableOpacity style={styles.disconnectButton} onPress={handleDisconnect}>
            <Text style={styles.disconnectButtonText}>Disconnect</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
  },
  connectButton: {
    backgroundColor: '#7e3ff2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  connectingButton: {
    backgroundColor: '#999',
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  connectedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addressContainer: {
    flex: 1,
  },
  connectedText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7e3ff2',
  },
  disconnectButton: {
    backgroundColor: '#ff4757',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  disconnectButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
}); 