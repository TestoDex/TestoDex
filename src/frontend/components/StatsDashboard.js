import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// Mock statistics data
const MOCK_STATS = {
  totalUsers: 1250,
  totalValueLocked: 2500000,
  activePools: 8,
  totalTransactions: 15420,
  dailyVolume: 450000,
  weeklyVolume: 2800000,
  totalFees: 12500,
  averageAPR: 15.5,
};

// Stats Dashboard Component
export default function StatsDashboard() {
  // Format numbers for display
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  // Format currency
  const formatCurrency = (num) => {
    return '$' + formatNumber(num);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📊 Platform Statistics</Text>

      {/* Main Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>👥</Text>
          <Text style={styles.statValue}>{formatNumber(MOCK_STATS.totalUsers)}</Text>
          <Text style={styles.statLabel}>Total Users</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>💰</Text>
          <Text style={styles.statValue}>{formatCurrency(MOCK_STATS.totalValueLocked)}</Text>
          <Text style={styles.statLabel}>Total Value Locked</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>🏊‍♂️</Text>
          <Text style={styles.statValue}>{MOCK_STATS.activePools}</Text>
          <Text style={styles.statLabel}>Active Pools</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>📈</Text>
          <Text style={styles.statValue}>{formatNumber(MOCK_STATS.totalTransactions)}</Text>
          <Text style={styles.statLabel}>Total Transactions</Text>
        </View>
      </View>

      {/* Volume Stats */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Trading Volume</Text>
        <View style={styles.volumeStats}>
          <View style={styles.volumeCard}>
            <Text style={styles.volumeLabel}>24h Volume</Text>
            <Text style={styles.volumeValue}>{formatCurrency(MOCK_STATS.dailyVolume)}</Text>
          </View>
          <View style={styles.volumeCard}>
            <Text style={styles.volumeLabel}>7d Volume</Text>
            <Text style={styles.volumeValue}>{formatCurrency(MOCK_STATS.weeklyVolume)}</Text>
          </View>
        </View>
      </View>

      {/* Performance Stats */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Performance Metrics</Text>
        <View style={styles.performanceStats}>
          <View style={styles.performanceCard}>
            <Text style={styles.performanceLabel}>Total Fees Collected</Text>
            <Text style={styles.performanceValue}>{formatCurrency(MOCK_STATS.totalFees)}</Text>
          </View>
          <View style={styles.performanceCard}>
            <Text style={styles.performanceLabel}>Average APR</Text>
            <Text style={styles.performanceValue}>{MOCK_STATS.averageAPR}%</Text>
          </View>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityList}>
          <View style={styles.activityItem}>
            <Text style={styles.activityEmoji}>💪</Text>
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>New user staked 1,000 TESTO</Text>
              <Text style={styles.activityTime}>2 minutes ago</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityEmoji}>🌾</Text>
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>Farming rewards claimed: 50 TS</Text>
              <Text style={styles.activityTime}>5 minutes ago</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityEmoji}>🔄</Text>
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>Large swap: 500 TESTO → 450 TS</Text>
              <Text style={styles.activityTime}>12 minutes ago</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Fun Stats */}
      <View style={styles.funStatsContainer}>
        <Text style={styles.funStatsTitle}>Fun Facts 💪</Text>
        <Text style={styles.funStatsText}>
          • Users have earned enough gains to buy {Math.floor(MOCK_STATS.totalFees / 1000)} protein shakes!
        </Text>
        <Text style={styles.funStatsText}>
          • Average user has been flexing for 3.2 days
        </Text>
        <Text style={styles.funStatsText}>
          • Most popular pool: TESTO-TS LP (45% of TVL)
        </Text>
        <Text style={styles.funStatsText}>
          • Community is growing stronger every day! 💪
        </Text>
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
  },
  statEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7e3ff2',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  sectionContainer: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  volumeStats: {
    flexDirection: 'row',
    gap: 12,
  },
  volumeCard: {
    flex: 1,
    alignItems: 'center',
  },
  volumeLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  volumeValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7e3ff2',
  },
  performanceStats: {
    flexDirection: 'row',
    gap: 12,
  },
  performanceCard: {
    flex: 1,
    alignItems: 'center',
  },
  performanceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    textAlign: 'center',
  },
  performanceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7e3ff2',
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  activityEmoji: {
    fontSize: 20,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#666',
  },
  funStatsContainer: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  funStatsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  funStatsText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
}); 