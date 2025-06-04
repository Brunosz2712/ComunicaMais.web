import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView
} from "react-native";
import * as Animatable from "react-native-animatable";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterDevice({ navigation }: any) {
  const [plate, setPlate] = useState("");

  const handleSave = async () => {
    if (!plate) {
      Alert.alert("Erro", "Digite o Dispositivo!");
      return;
    }

    try {
      const storedData = await AsyncStorage.getItem("@devices");
      const devices = storedData ? JSON.parse(storedData) : [];
      devices.push({ plate });
      await AsyncStorage.setItem("@devices", JSON.stringify(devices));
      Alert.alert("Sucesso", "Dispositivo salvo!");
      setPlate("");
      navigation.navigate("RegisteredMotorcycles");
    } catch (error) {
      Alert.alert("Erro", "Erro ao salvar dispositivo.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.header}>
          <Animatable.Text animation="fadeInLeft" delay={500} style={styles.title}>
            Cadastrar Dispositivo
          </Animatable.Text>
        </View>

        <Animatable.View animation="fadeInUp" style={styles.form}>
          <Text style={styles.label}>Dispositivo</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: ABC1234"
            placeholderTextColor="#ccc"
            value={plate}
            onChangeText={setPlate}
          />

          <TouchableOpacity style={styles.buttonPrimary} onPress={handleSave}>
            <Text style={styles.buttonPrimaryText}>Salvar</Text>
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
  title: { fontSize: 40, fontWeight: "bold", color: "#fff" },
  form: {
    flex: 1,
    backgroundColor: "#34465F",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20
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
