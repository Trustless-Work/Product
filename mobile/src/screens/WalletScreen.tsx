import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { MeridianWallet } from '../components/MeridianWallet';

interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: string;
}

export const WalletScreen: React.FC = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: '0',
  });

  const handleConnect = async () => {
    try {
      Alert.alert(
        'Conectar Carteira',
        'Esta funcionalidade requer o repositório Meridian OS configurado.',
        [
          { text: 'Cancelar', style: 'cancel' },
          { 
            text: 'Ver Documentação',
            onPress: () => {
              Alert.alert(
                'Meridian Wallet',
                'Clone o repositório Meridian OS e configure conforme documentação.'
              );
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar à carteira.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meridian Wallet</Text>
        <Text style={styles.subtitle}>Trustless Work Mobile</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Status da Conexão</Text>
        <View style={styles.statusContainer}>
          <View style={[
            styles.statusDot,
            { backgroundColor: walletState.isConnected ? '#4ade80' : '#f87171' }
          ]} />
          <Text style={styles.statusText}>
            {walletState.isConnected ? 'Conectado' : 'Desconectado'}
          </Text>
        </View>

        {walletState.address && (
          <View style={styles.addressContainer}>
            <Text style={styles.label}>Endereço:</Text>
            <Text style={styles.address} selectable>{walletState.address}</Text>
          </View>
        )}

        <View style={styles.balanceContainer}>
          <Text style={styles.label}>Saldo:</Text>
          <Text style={styles.balance}>{walletState.balance} ETH</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.connectButton}
        onPress={handleConnect}
        activeOpacity={0.8}
      >
        <Text style={styles.connectButtonText}>
          {walletState.isConnected ? 'Desconectar' : 'Conectar Meridian Wallet'}
        </Text>
      </TouchableOpacity>

      <MeridianWallet 
        isConnected={walletState.isConnected}
        onStateChange={setWalletState}
      />

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Sobre a Meridian Wallet</Text>
        <Text style={styles.infoText}>
          A Meridian Wallet é uma carteira trustless que permite interagir 
          com contratos inteligentes de forma segura e descentralizada.
        </Text>
        <Text style={styles.infoText}>
          Para usar esta funcionalidade, o repositório Meridian OS deve ser 
          configurado e disponível no ambiente.
        </Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#e94560',
    marginTop: 4,
  },
  card: {
    margin: 16,
    padding: 16,
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2a4e',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    color: '#fff',
  },
  addressContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: '#4ade80',
    fontFamily: 'monospace',
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  balance: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  connectButton: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    backgroundColor: '#e94560',
    borderRadius: 8,
    alignItems: 'center',
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoSection: {
    margin: 16,
    padding: 16,
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2a4e',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e94560',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#aaa',
    lineHeight: 20,
    marginBottom: 8,
  },
});
