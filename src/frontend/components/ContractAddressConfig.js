import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { CONTRACT_ADDRESSES, CONTRACT_NAMES } from '../config/contracts.js';

// Editable contract address config for admin panel
export default function ContractAddressConfig({ addresses, onUpdate }) {
  const [local, setLocal] = useState(CONTRACT_ADDRESSES);
  
  // Update local state when addresses prop changes
  useEffect(() => {
    if (addresses) {
      setLocal(addresses);
    }
  }, [addresses]);

  // Handle address change
  const handleChange = (key, value) => {
    setLocal({ ...local, [key]: value });
  };

  // Save updated addresses
  const handleSave = () => {
    if (onUpdate) onUpdate(local);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Contract Addresses</Text>
      <Text style={styles.subtitle}>Deployed on Sonic Network (Chain ID: 146)</Text>
      
      {Object.keys(local).map((key) => (
        <View key={key} style={styles.row}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>{CONTRACT_NAMES[key] || key}</Text>
            <Text style={styles.keyName}>{key}</Text>
          </View>
          <TextInput
            style={styles.input}
            value={local[key]}
            onChangeText={(v) => handleChange(key, v)}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder={`0x... (${key})`}
          />
        </View>
      ))}
      
      <View style={styles.buttonContainer}>
        <Button title="Save Addresses" onPress={handleSave} />
        <Button title="Reset to Default" onPress={() => setLocal(CONTRACT_ADDRESSES)} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 16, 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    marginVertical: 16,
    maxHeight: 600
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 8,
    color: '#333'
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16
  },
  row: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12,
    paddingVertical: 8
  },
  labelContainer: {
    width: 140,
    marginRight: 8
  },
  label: { 
    fontWeight: '600',
    fontSize: 14,
    color: '#333'
  },
  keyName: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'monospace'
  },
  input: { 
    flex: 1, 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 8, 
    padding: 12,
    fontSize: 12,
    fontFamily: 'monospace',
    backgroundColor: '#f9f9f9'
  },
  buttonContainer: {
    marginTop: 16,
    gap: 8
  }
}); 