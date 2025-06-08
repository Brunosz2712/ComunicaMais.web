// src/pages/Welcome/index.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../routes';

type WelcomeScreenNavigationProp = NavigationProp<RootStackParamList, 'Welcome'>;

export default function Welcome() {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Animatable.Image
          animation="flipInY"
          source={require('../../assets/ComunicaMais.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
          <Text style={styles.title}>CONECTADOS NA CRISE, UNIDOS PELA VIDA</Text>
          <Text style={styles.text}>Faça o login para começar</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Signin')}
          >
            <Text style={styles.buttonText}>Acessar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary]}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={[styles.buttonText, styles.buttonSecondaryText]}>Criar Conta</Text>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  containerLogo: {
    flex: 1.5,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: 230,
    marginTop: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#34465F',
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    padding: '5%',
    paddingTop: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginTop: 10,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  text: {
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34465F',
  },
  buttonSecondary: {
    backgroundColor: '#439CAC',
  },
  buttonSecondaryText: {
    color: '#fff',
  },
});
