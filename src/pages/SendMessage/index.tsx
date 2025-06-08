import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../../contexts/AuthContext';
import { sendMessage } from '../../services/api';

export default function SendMessage() {
  const { token } = useContext(AuthContext);
  const [content, setContent] = useState('');
  const [senderId, setSenderId] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSend = async () => {
    if (!content || !senderId || !recipientId || !messageType) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    try {
      const messageData = {
        content,
        senderId: parseInt(senderId),
        recipientId: parseInt(recipientId),
        messageType,
      };

      const response = await sendMessage(token!, messageData);
      console.log('Mensagem enviada:', response.data);

      Alert.alert('Sucesso', 'Mensagem enviada com sucesso!');
      setContent('');
      setSenderId('');
      setRecipientId('');
      setMessageType('');
    } catch (error) {
      console.error('Erro ao enviar mensagem', error);
      Alert.alert('Erro', 'Erro ao enviar mensagem');
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Enviar Mensagem</Text>

        <TextInput
          placeholder="Conteúdo"
          style={styles.input}
          value={content}
          onChangeText={setContent}
        />
        <TextInput
          placeholder="ID Remetente"
          style={styles.input}
          value={senderId}
          onChangeText={setSenderId}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="ID Destinatário"
          style={styles.input}
          value={recipientId}
          onChangeText={setRecipientId}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Tipo da Mensagem"
          style={styles.input}
          value={messageType}
          onChangeText={setMessageType}
        />

        <TouchableOpacity style={styles.button} onPress={handleSend}>
          <Text style={styles.buttonText}>Enviar</Text>
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
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#439CAC',
    borderRadius: 8,
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
