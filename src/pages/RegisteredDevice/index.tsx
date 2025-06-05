import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../routes'; // ajuste conforme seu projeto

type NavigationPropType = NavigationProp<RootStackParamList, 'RegisteredDevice'>;

type Device = {
  id: number;
  name: string;
  serialNumber: string;
  registeredAt: string;
};

export default function RegisteredDevice() {
  const navigation = useNavigation<NavigationPropType>();
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://<SEU_IP_LOCAL>:8080/api/devices')
      .then(res => res.json())
      .then(data => {
        setDevices(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }: { item: Device }) => (
    <View style={styles.deviceBox}>
      <Text style={styles.deviceName}>{item.name}</Text>
      <Text style={styles.deviceInfo}>Série: {item.serialNumber}</Text>
      <Text style={styles.deviceInfo}>Registrado em: {new Date(item.registeredAt).toLocaleDateString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Dispositivos Cadastrados</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={devices}
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
  deviceBox: {
    backgroundColor: "#486c8c",
    borderRadius: 15,
    padding: 15,
    marginVertical: 6,
  },
  deviceName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  deviceInfo: {
    color: "#ccc",
    fontSize: 14,
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
