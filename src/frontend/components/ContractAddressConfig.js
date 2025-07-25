import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

// Editable contract address config for admin panel
export default function ContractAddressConfig({ addresses, onUpdate }) {
  const [local, setLocal] = useState(addresses);

  // Handle address change
  const handleChange = (key, value) => {
    setLocal({ ...local, [key]: value });
  };

  // Save updated addresses
  const handleSave = () => {
    if (onUpdate) onUpdate(local);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contract Addresses</Text>
      {Object.keys(local).map((key) => (
        <View key={key} style={styles.row}>
          <Text style={styles.label}>{key}</Text>
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
      <Button title="Save Addresses" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', borderRadius: 12, marginVertical: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  label: { width: 120, fontWeight: '600' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginLeft: 8 },
}); 