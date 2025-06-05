// src/pages/DeviceList/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Device {
  id: number;
  deviceName: string;
  bluetoothAddress: string;
  wifiDirectAddress: string;
  status: string;
  totalMessagesSent: number;
  totalMessagesReceived: number;
}

export default function DeviceList() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('http://<SEU_IP_LOCAL>:8080/api/devices') // Substitua pelo endpoint correto
      .then(response => response.json())
      .then(data => {
        setDevices(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar dispositivos:', error);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }: { item: Device }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.deviceName}</Text>
      <Text style={styles.details}>Bluetooth: {item.bluetoothAddress}</Text>
      <Text style={styles.details}>Wi-Fi Direct: {item.wifiDirectAddress}</Text>
      <Text style={styles.details}>Status: {item.status}</Text>
      <Text style={styles.details}>Mensagens Enviadas: {item.totalMessagesSent}</Text>
      <Text style={styles.details}>Mensagens Recebidas: {item.totalMessagesReceived}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Dispositivos</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#439CAC" />
      ) : (
        <FlatList
          data={devices}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34465F',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  header: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34465F',
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    color: '#34465F',
  },
});
