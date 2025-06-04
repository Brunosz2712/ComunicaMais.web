import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../App'; // ajuste o caminho conforme seu projeto

type MessagesScreenNavigationProp = NavigationProp<RootStackParamList, 'Messages'>;

export default function Messages() {
  const navigation = useNavigation<MessagesScreenNavigationProp>();
  const [message, setMessage] = useState('');

  function handleSend() {
    if (message.trim().length === 0) {
      Alert.alert('Erro', 'Por favor, digite uma mensagem.');
      return;
    }
    Alert.alert('Mensagem enviada', message);
    setMessage('');
  }

  function goToWelcome() {
    navigation.navigate('Welcome');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Mensagem</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite sua mensagem"
        value={message}
        onChangeText={setMessage}
        multiline
      />

      <Button title="Enviar" onPress={handleSend} />

      <TouchableOpacity style={styles.backButton} onPress={goToWelcome}>
        <Text style={styles.backButtonText}>Voltar ao Início</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#34465F',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    height: 100,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  backButton: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#439CAC',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
