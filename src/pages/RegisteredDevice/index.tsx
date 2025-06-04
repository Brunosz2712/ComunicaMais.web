import React, { useEffect, useState } from "react";
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Animatable from "react-native-animatable";

export default function RegisteredDevice({ navigation }: any) {
  const [devices, setDevices] = useState<any[]>([]);

  useEffect(() => {
    const loadDevices = async () => {
      const stored = await AsyncStorage.getItem("@devices");
      if (stored) setDevices(JSON.parse(stored));
    };
    loadDevices();
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.title}>
        Dispositivos Cadastrados
      </Animatable.Text>

      <FlatList
        data={devices}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.deviceBox}>
            <Text style={styles.deviceText}>{item.plate}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum Dispositivo Cadastrado</Text>}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
      />

      <TouchableOpacity
        style={styles.buttonPrimary}
        onPress={() => navigation.navigate("RegisterDevice")}
      >
        <Text style={styles.buttonPrimaryText}>Cadastrar novo Dispositivo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate("Welcome")}>
        <Text style={styles.buttonSecondaryText}>Voltar para início</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },
  title: { color: "#fff", fontSize: 30, fontWeight: "bold", marginVertical: 20 },
  deviceBox: {
    backgroundColor: "#34465F",
    borderRadius: 8,
    padding: 15,
    marginBottom: 12
  },
  deviceText: { color: "#fff", fontSize: 18 },
  emptyText: { color: "#ccc", fontSize: 16, textAlign: "center", marginTop: 40 },
  buttonPrimary: {
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingVertical: 12,
    marginTop: 20,
    alignItems: "center"
  },
  buttonPrimaryText: { color: "#34465F", fontSize: 18, fontWeight: "bold" },
  buttonSecondary: { marginTop: 15, alignItems: "center" },
  buttonSecondaryText: { color: "#439CAC", fontSize: 16, textDecorationLine: "underline" }
});
