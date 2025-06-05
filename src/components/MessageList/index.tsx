// src/pages/MessageList/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Message {
  id: number;
  content: string;
  messageType: string;
  timestamp: string;
  sender: {
    deviceName: string;
  };
  recipient: {
    deviceName: string;
  };
}

export default function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('http://<SEU_IP_LOCAL>:8080/api/messages') // Substitua pelo endpoint correto
      .then(response => response.json())
      .then(data => {
        setMessages(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar mensagens:', error);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }: { item: Message }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.content}</Text>
      <Text style={styles.details}>Tipo: {item.messageType}</Text>
      <Text style={styles.details}>De: {item.sender.deviceName} Para: {item.recipient.deviceName}</Text>
      <Text style={styles.details}>Data: {new Date(item.timestamp).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Mensagens</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#439CAC" />
      ) : (
        <FlatList
          data={messages}
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
