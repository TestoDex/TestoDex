import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

// Available tokens for swapping
const TOKENS = [
  { symbol: 'TESTO', name: 'Testo Token', address: '0x...' },
  { symbol: 'TS', name: 'TSonic', address: '0x...' },
  { symbol: 'SONIC', name: 'Sonic', address: '0x...' },
];

// Swap Screen Component
export default function SwapScreen() {
  const [fromToken, setFromToken] = useState(TOKENS[0]);
  const [toToken, setToToken] = useState(TOKENS[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');

  // Handle token swap (reverse from/to)
  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  // Handle swap execution
  const handleSwap = () => {
    if (!fromAmount || !toAmount) return;
    // TODO: Implement actual swap logic with Web3
    console.log(`Swapping ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>💪 Swap Like a Monster!</Text>
      
      {/* From Token */}
      <View style={styles.tokenSection}>
        <Text style={styles.label}>From</Text>
        <View style={styles.tokenRow}>
          <TextInput
            style={styles.amountInput}
            value={fromAmount}
            onChangeText={setFromAmount}
            placeholder="0.0"
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.tokenButton}>
            <Text style={styles.tokenSymbol}>{fromToken.symbol}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Swap Button */}
      <TouchableOpacity style={styles.swapButton} onPress={handleSwapTokens}>
        <Text style={styles.swapButtonText}>🔄</Text>
      </TouchableOpacity>

      {/* To Token */}
      <View style={styles.tokenSection}>
        <Text style={styles.label}>To</Text>
        <View style={styles.tokenRow}>
          <TextInput
            style={styles.amountInput}
            value={toAmount}
            onChangeText={setToAmount}
            placeholder="0.0"
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.tokenButton}>
            <Text style={styles.tokenSymbol}>{toToken.symbol}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Swap Button */}
      <TouchableOpacity style={styles.swapActionButton} onPress={handleSwap}>
        <Text style={styles.swapActionText}>Swap for Gains! 💪</Text>
      </TouchableOpacity>

      {/* Info */}
      <Text style={styles.info}>Connect your wallet to start swapping!</Text>
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
  tokenSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  tokenRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountInput: {
    flex: 1,
    fontSize: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginRight: 12,
  },
  tokenButton: {
    backgroundColor: '#7e3ff2',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  tokenSymbol: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  swapButton: {
    alignSelf: 'center',
    backgroundColor: '#7e3ff2',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  swapButtonText: {
    fontSize: 20,
  },
  swapActionButton: {
    backgroundColor: '#7e3ff2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  swapActionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  info: {
    textAlign: 'center',
    color: '#666',
    marginTop: 16,
    fontSize: 14,
  },
}); 