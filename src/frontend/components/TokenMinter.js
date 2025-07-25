import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

// Token Minter Component for Admin Panel
export default function TokenMinter() {
  const [mintData, setMintData] = useState({
    tokenType: 'TESTO',
    recipient: '',
    amount: '',
  });

  // Handle input changes
  const handleInputChange = (field, value) => {
    setMintData({ ...mintData, [field]: value });
  };

  // Validate inputs
  const validateInputs = () => {
    if (!mintData.recipient || !mintData.amount) {
      Alert.alert('Error', 'Please fill in all fields');
      return false;
    }
    
    if (!mintData.recipient.startsWith('0x') || mintData.recipient.length !== 42) {
      Alert.alert('Error', 'Please enter a valid Ethereum address');
      return false;
    }
    
    const amount = parseFloat(mintData.amount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return false;
    }
    
    return true;
  };

  // Handle token minting
  const handleMint = () => {
    if (!validateInputs()) return;

    // TODO: Implement actual minting logic with Web3
    console.log(`Minting ${mintData.amount} ${mintData.tokenType} to ${mintData.recipient}`);
    
    Alert.alert(
      'Mint Tokens',
      `Mint ${mintData.amount} ${mintData.tokenType} to ${mintData.recipient.slice(0, 8)}...?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Mint', 
          onPress: () => {
            // Simulate minting
            setTimeout(() => {
              Alert.alert('Success', `${mintData.amount} ${mintData.tokenType} minted successfully! 💪`);
              setMintData({ tokenType: 'TESTO', recipient: '', amount: '' });
            }, 1000);
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Token Minting</Text>
      
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Mint New Tokens</Text>
        
        {/* Token Type Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Token Type</Text>
          <View style={styles.tokenSelector}>
            <TouchableOpacity
              style={[
                styles.tokenOption,
                mintData.tokenType === 'TESTO' && styles.selectedToken
              ]}
              onPress={() => handleInputChange('tokenType', 'TESTO')}
            >
              <Text style={[
                styles.tokenOptionText,
                mintData.tokenType === 'TESTO' && styles.selectedTokenText
              ]}>
                🏋️‍♂️ TESTO
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tokenOption,
                mintData.tokenType === 'TS' && styles.selectedToken
              ]}
              onPress={() => handleInputChange('tokenType', 'TS')}
            >
              <Text style={[
                styles.tokenOptionText,
                mintData.tokenType === 'TS' && styles.selectedTokenText
              ]}>
                🪙 TSonic
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recipient Address */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Recipient Address</Text>
          <TextInput
            style={styles.input}
            value={mintData.recipient}
            onChangeText={(value) => handleInputChange('recipient', value)}
            placeholder="0x..."
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Amount */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            value={mintData.amount}
            onChangeText={(value) => handleInputChange('amount', value)}
            placeholder="1000"
            keyboardType="numeric"
          />
        </View>

        {/* Mint Button */}
        <TouchableOpacity style={styles.mintButton} onPress={handleMint}>
          <Text style={styles.mintButtonText}>Mint Tokens 💪</Text>
        </TouchableOpacity>
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Minting Info</Text>
        <Text style={styles.infoText}>
          • Only the contract owner can mint tokens
        </Text>
        <Text style={styles.infoText}>
          • TESTO: Native DEX token for rewards and governance
        </Text>
        <Text style={styles.infoText}>
          • TSonic: Stable token pegged to Sonic network
        </Text>
        <Text style={styles.infoText}>
          • All minted tokens are sent directly to the recipient
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
  tokenSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  tokenOption: {
    flex: 1,
    padding: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedToken: {
    borderColor: '#7e3ff2',
    backgroundColor: '#7e3ff2',
  },
  tokenOptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  selectedTokenText: {
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  mintButton: {
    backgroundColor: '#7e3ff2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  mintButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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