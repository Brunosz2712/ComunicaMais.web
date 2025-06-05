import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../routes'; // ajuste o caminho conforme sua estrutura

type NavigationPropType = NavigationProp<RootStackParamList, 'Messages'>;

type Message = {
  id: number;
  content: string;
  senderId: number;
  recipientId: number;
  messageType: string;
};

export default function Messages() {
  const navigation = useNavigation<NavigationPropType>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://<SEU_IP_LOCAL>:8080/api/messages')
      .then(res => res.json())
      .then(data => {
        setMessages(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }: { item: Message }) => (
    <View style={styles.messageBox}>
      <Text style={styles.messageText}>{item.content}</Text>
      <Text style={styles.messageMeta}>Tipo: {item.messageType}</Text>
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
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
            style={{ marginTop: 10 }}
          />
        )}

        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.navigate('Welcome')}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>Voltar para o início</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  containerForm: {
    flex: 1,
    backgroundColor: "#34465F",
    borderRadius: 25,
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  messageBox: {
    backgroundColor: "#486c8c",
    borderRadius: 15,
    padding: 15,
    marginVertical: 6,
  },
  messageText: {
    color: "#fff",
    fontSize: 16,
  },
  messageMeta: {
    marginTop: 6,
    color: "#ccc",
    fontSize: 12,
    fontStyle: "italic",
  },
  backButton: {
    marginTop: 20,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
