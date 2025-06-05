import React, { useState } from "react";
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, 
  Alert, KeyboardAvoidingView, Platform, ScrollView 
} from "react-native";
import * as Animatable from 'react-native-animatable';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../routes'; // ajuste o caminho conforme sua estrutura

type NavigationPropType = NavigationProp<RootStackParamList, 'CreateMessage'>;

export default function CreateMessage() {
  const navigation = useNavigation<NavigationPropType>();
  const [message, setMessage] = useState('');

  const handleSave = () => {
    if (message.trim() === '') {
      Alert.alert('Erro', 'Por favor, digite uma mensagem.');
      return;
    }

    fetch('http://<SEU_IP_LOCAL>:8080/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: message,
        senderId: 1,
        recipientId: 2,
        messageType: 'INFO',
      }),
    })
      .then((response) => {
        if (response.ok) {
          Alert.alert('Sucesso', 'Mensagem cadastrada!', [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Welcome'),
            },
          ]);
        } else {
          Alert.alert('Erro', 'Não foi possível cadastrar a mensagem.');
        }
      })
      .catch((error) => {
        console.error('Erro ao cadastrar mensagem:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao cadastrar a mensagem.');
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <Animatable.View animation="fadeInUp" style={styles.containerForm}>
          <Text style={styles.label}>Digite sua mensagem:</Text>
          <TextInput
            style={styles.input}
            placeholder="Escreva aqui..."
            placeholderTextColor="#ccc"
            multiline
            value={message}
            onChangeText={setMessage}
          />

          <TouchableOpacity style={styles.buttonPrimary} onPress={handleSave}>
            <Text style={styles.buttonPrimaryText}>Salvar Mensagem</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.navigate('Welcome')}
            activeOpacity={0.7}
          >
            <Text style={styles.backButtonText}>Voltar para o início</Text>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  containerForm: {
    flex: 1,
    backgroundColor: "#34465F",
    marginHorizontal: 20,
    borderRadius: 25,
    padding: 20,
    justifyContent: "center",
  },
  label: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 12,
  },
  input: {
    height: 120,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#34465F',
  },
  buttonPrimary: {
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingVertical: 14,
    marginTop: 20,
    alignItems: "center",
  },
  buttonPrimaryText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#34465F",
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
