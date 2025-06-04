import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Animatable from "react-native-animatable";

export default function Register({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      await AsyncStorage.setItem("@user_data", JSON.stringify({ email, password }));
      Alert.alert("Sucesso", "Cadastro realizado!");
      navigation.navigate("SignIn");
    } catch (error) {
      Alert.alert("Erro", "Erro ao cadastrar.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.header}>
          <Animatable.Text animation="fadeInLeft" delay={500} style={styles.titleHeader}>
            Criar conta
          </Animatable.Text>
        </View>

        <Animatable.View animation="fadeInUp" style={styles.form}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#ccc"
            onChangeText={setEmail}
            value={email}
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#ccc"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />

          <TouchableOpacity style={styles.buttonPrimary} onPress={handleRegister}>
            <Text style={styles.buttonPrimaryText}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonSecondaryText}>Voltar</Text>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  header: { marginTop: "38%", marginBottom: "8%", paddingStart: "5%" },
  titleHeader: { fontSize: 40, fontWeight: "bold", color: "#fff" },
  form: {
    flex: 1,
    backgroundColor: "#34465F",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: "5%",
    paddingVertical: 20
  },
  label: { color: "#fff", fontSize: 20, marginTop: 28 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    height: 40,
    color: "#fff",
    fontSize: 16,
    marginBottom: 12
  },
  buttonPrimary: {
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingVertical: 12,
    marginTop: 20,
    alignItems: "center"
  },
  buttonPrimaryText: { color: "#34465F", fontSize: 18, fontWeight: "bold" },
  buttonSecondary: { marginTop: 20, alignItems: "center" },
  buttonSecondaryText: { color: "#439CAC", fontSize: 16, textDecorationLine: "underline" }
});
