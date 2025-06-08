import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../../contexts/AuthContext';
import { getMessages } from '../../services/api';

type MessageDTO = {
  idMessage: number;
  content: string;
  messageType: string;
  timestamp: string;
  delivered: boolean;
};

export default function Messages() {
  const { token, signOut } = useContext(AuthContext);
  const [messages, setMessages] = useState<MessageDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMessages() {
      if (token) {
        try {
          setLoading(true);
          const response = await getMessages(token);
          console.log('Mensagens:', response.data);
          setMessages(response.data.content); // a API retorna Page<MessageDTO>
        } catch (error) {
          console.error('Erro ao buscar mensagens', error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchMessages();
  }, [token]);

  const renderItem = ({ item }: { item: MessageDTO }) => (
    <View style={styles.messageBox}>
      <Text style={styles.messageText}>{item.content}</Text>
      <Text style={styles.messageMeta}>Tipo: {item.messageType}</Text>
      <Text style={styles.messageMeta}>Entregue: {item.delivered ? 'Sim' : 'Não'}</Text>
      <Text style={styles.messageMeta}>Data: {new Date(item.timestamp).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Mensagens</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={messages}
            keyExtractor={(item) => item.idMessage.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
            style={{ marginTop: 10 }}
          />
        )}

        {/* BOTÃO LOGOUT */}
        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#34465F',
    borderRadius: 25,
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  messageBox: {
    backgroundColor: '#486c8c',
    borderRadius: 15,
    padding: 15,
    marginVertical: 6,
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  messageMeta: {
    marginTop: 6,
    color: '#ccc',
    fontSize: 12,
    fontStyle: 'italic',
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#ff4d4d',
    borderRadius: 50,
    paddingVertical: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
