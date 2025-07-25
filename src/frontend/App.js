import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AdminScreen from './screens/AdminScreen';
import SwapScreen from './screens/SwapScreen';
import StakingScreen from './screens/StakingScreen';
import FarmingScreen from './screens/FarmingScreen';
import DocsScreen from './screens/DocsScreen';
import StatsDashboard from './components/StatsDashboard';
import WalletConnect from './components/WalletConnect';

// Available screens
const SCREENS = ['Home', 'Swap', 'Staking', 'Farming', 'Stats', 'Admin', 'Docs'];

export default function App() {
  const [screen, setScreen] = React.useState('Home');
  const [walletAddress, setWalletAddress] = React.useState('');

  // Handle wallet connection
  const handleWalletConnect = (address) => {
    setWalletAddress(address);
  };

  const handleWalletDisconnect = () => {
    setWalletAddress('');
  };

  // Render content based on selected screen
  let content;
  switch (screen) {
    case 'Admin':
      content = <AdminScreen />;
      break;
    case 'Swap':
      content = <SwapScreen />;
      break;
    case 'Staking':
      content = <StakingScreen />;
      break;
    case 'Farming':
      content = <FarmingScreen />;
      break;
    case 'Stats':
      content = <StatsDashboard />;
      break;
    case 'Docs':
      content = <DocsScreen />;
      break;
    default:
      content = (
        <View style={styles.homeContent}>
          <Text style={styles.welcomeTitle}>🏋️‍♂️ Welcome to TestoDex! 💪</Text>
          <Text style={styles.welcomeText}>
            The most muscular DEX on the Sonic network! Get ready to flex those gains and earn some serious rewards.
          </Text>
          
          <View style={styles.featureGrid}>
            <View style={styles.featureCard}>
              <Text style={styles.featureEmoji}>🔄</Text>
              <Text style={styles.featureTitle}>Swap Tokens</Text>
              <Text style={styles.featureDesc}>Trade with lightning speed</Text>
            </View>
            <View style={styles.featureCard}>
              <Text style={styles.featureEmoji}>🏋️‍♂️</Text>
              <Text style={styles.featureTitle}>Stake & Earn</Text>
              <Text style={styles.featureDesc}>Build those gains</Text>
            </View>
            <View style={styles.featureCard}>
              <Text style={styles.featureEmoji}>🌾</Text>
              <Text style={styles.featureTitle}>Farm Rewards</Text>
              <Text style={styles.featureDesc}>Harvest your profits</Text>
            </View>
            <View style={styles.featureCard}>
              <Text style={styles.featureEmoji}>📊</Text>
              <Text style={styles.featureTitle}>Track Stats</Text>
              <Text style={styles.featureDesc}>Monitor your progress</Text>
            </View>
          </View>

          {walletAddress ? (
            <View style={styles.connectedInfo}>
              <Text style={styles.connectedText}>Connected: {walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}</Text>
              <Text style={styles.readyText}>Ready to get swole! 💪</Text>
            </View>
          ) : (
            <View style={styles.connectPrompt}>
              <Text style={styles.connectText}>Connect your wallet to start flexing!</Text>
            </View>
          )}
        </View>
      );
      break;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Home screen greeting */}
      {screen === 'Home' && (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>TestoDex</Text>
          <Text style={styles.headerSubtitle}>Where gains meet gains! 💪</Text>
        </View>
      )}

      {/* Wallet connection component */}
      <WalletConnect onConnect={handleWalletConnect} onDisconnect={handleWalletDisconnect} />

      {/* Navigation buttons */}
      <View style={styles.nav}>
        {SCREENS.map((screenName) => (
          <TouchableOpacity
            key={screenName}
            style={[styles.button, screen === screenName && styles.activeButton]}
            onPress={() => setScreen(screenName)}
          >
            <Text style={[styles.buttonText, screen === screenName && styles.activeButtonText]}>
              {screenName}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Main content area */}
      <View style={styles.content}>
        {content}
      </View>

      {/* Footer for home screen */}
      {screen === 'Home' && (
        <Text style={styles.footer}>💪 Don't skip leg day—stake for gains!</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#7e3ff2',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  nav: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 2,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  activeButton: {
    backgroundColor: '#7e3ff2',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  activeButtonText: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  homeContent: {
    padding: 24,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
    marginBottom: 32,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  featureCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
  },
  featureEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  connectedInfo: {
    backgroundColor: '#e8f5e8',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  connectedText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 8,
  },
  readyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  connectPrompt: {
    backgroundColor: '#fff3cd',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  connectText: {
    fontSize: 16,
    color: '#856404',
    textAlign: 'center',
  },
  footer: {
    textAlign: 'center',
    padding: 16,
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});
