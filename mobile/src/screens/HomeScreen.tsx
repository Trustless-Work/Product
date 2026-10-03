import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export const HomeScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Trustless Work</Text>
        <Text style={styles.subtitle}>Mobile Version</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Sobre o Projeto</Text>
          <Text style={styles.cardText}>
            Trustless Work é uma plataforma descentralizada que permite 
            trabalho autônomo sem intermediários.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Meridian Wallet</Text>
          <Text style={styles.cardText}>
            Integre com Meridian Wallet para transações trustless 
            e seguras na blockchain.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Status</Text>
          <Text style={styles.cardText}>
            Versão inicial em desenvolvimento. Aguardando integração 
            com Meridian OS.
          </Text>
        </View>

        <TouchableOpacity style={styles.getStartedButton}>
          <Text style={styles.getStartedText}>Começar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
  },
  header: {
    padding: 20,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#e94560',
    marginTop: 4,
  },
  content: {
    padding: 16,
  },
  infoCard: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2a4e',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e94560',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#aaa',
    lineHeight: 20,
  },
  getStartedButton: {
    marginVertical: 16,
    padding: 16,
    backgroundColor: '#e94560',
    borderRadius: 8,
    alignItems: 'center',
  },
  getStartedText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
