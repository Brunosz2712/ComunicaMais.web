import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../routes'; // ajuste conforme seu projeto
import { AuthContext } from '../../contexts/AuthContext';
import { getDevices } from '../../services/api';

type NavigationPropType = NavigationProp<RootStackParamList, 'Devices'>;

type DeviceDTO = {
  id: number;
  name: string;
  type: string;
};

export default function Devices() {
  const navigation = useNavigation<NavigationPropType>();
  const { token } = useContext(AuthContext);
  const [devices, setDevices] = useState<DeviceDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDevices() {
      if (token) {
        try {
          setLoading(true);
          const response = await getDevices(token);
          console.log('Devices:', response.data);
          setDevices(response.data); // a API retorna List<Device>
        } catch (error) {
          console.error('Erro ao buscar devices', error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchDevices();
  }, [token]);

  const renderItem = ({ item }: { item: DeviceDTO }) => (
    <View style={styles.deviceBox}>
      <Text style={styles.deviceName}>{item.name}</Text>
      <Text style={styles.deviceMeta}>Tipo: {item.type}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Dispositivos</Text>

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
    fontSize: 16,
  },
  deviceMeta: {
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
