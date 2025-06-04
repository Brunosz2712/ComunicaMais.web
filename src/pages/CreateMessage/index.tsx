import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';

type CreateMessageNavigationProp = NavigationProp<RootStackParamList, 'CreateMessage'>;

export default function CreateMessage() {
  const navigation = useNavigation<CreateMessageNavigationProp>();
  const [message, setMessage] = useState('');

  function handleSave() {
    if (message.trim() === '') {
      Alert.alert('Erro', 'Por favor, digite uma mensagem.');
      return;
    }

    // Aqui você pode salvar a mensagem (ex: API, AsyncStorage)
    // Por enquanto, só mostramos um alerta e voltamos

    Alert.alert('Sucesso', 'Mensagem cadastrada!', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Welcome'), // Volta para a tela inicial
      },
    ]);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.form}>
        <Text style={styles.label}>Digite sua mensagem:</Text>
        <TextInput
          style={styles.input}
          placeholder="Escreva aqui..."
          placeholderTextColor="#999"
          multiline
          value={message}
          onChangeText={setMessage}
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar Mensagem</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonBack]}
          onPress={() => navigation.navigate('Welcome')}
        >
          <Text style={[styles.buttonText, styles.buttonBackText]}>Voltar para Início</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34465F',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  form: {
    borderRadius: 20,
    padding: 20,
    // fundo transparente, sem backgroundColor definido
  },
  label: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#439CAC',
    paddingVertical: 12,
    borderRadius: 50,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonBack: {
    backgroundColor: '#439CAC',
  },
  buttonBackText: {
    color: '#eee',
  },
});
