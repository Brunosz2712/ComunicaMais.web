import React, { useState, useContext } from "react";
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, 
  Alert, KeyboardAvoidingView, Platform, ScrollView 
} from "react-native";
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../../contexts/AuthContext';

export default function SignIn({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useContext(AuthContext);

    const handleLogin = async () => {
        const success = await signIn(email, password);
        if (success) {
            Alert.alert('Sucesso', 'Login realizado com sucesso!');
            navigation.navigate('Messages'); // ou 'Devices', você escolhe
        } else {
            Alert.alert('Erro', 'E-mail ou senha inválidos!');
        }
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.containerHeader}>
                    <Animatable.Text animation="fadeInLeft" delay={500} style={styles.message}>
                        Bem-Vindo(a)
                    </Animatable.Text>
                </View>

                <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                    <Text style={styles.title}>E-mail</Text>
                    <TextInput
                        placeholder="Digite seu e-mail"
                        style={styles.input}
                        placeholderTextColor="#ccc"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Text style={styles.title}>Senha</Text>
                    <TextInput
                        placeholder="Digite sua senha"
                        style={styles.input}
                        secureTextEntry
                        placeholderTextColor="#ccc"
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TouchableOpacity 
                        style={styles.buttonPrimary}
                        onPress={handleLogin}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonPrimaryText}>Acessar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.buttonSecondary}
                        onPress={() => navigation.navigate('Register')}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.buttonSecondaryText}>Não possui uma conta? Cadastre-se</Text>
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
    containerHeader: {
        marginTop: '38%',
        marginBottom: '8%',
        paddingStart: '5%',
    },
    message: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
    },
    containerForm: {
        flex: 1,
        backgroundColor: "#34465F",
        borderTopEndRadius: 25,
        borderTopStartRadius: 25,
        paddingHorizontal: "5%",
        paddingTop: 20,
        paddingBottom: 30,
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        marginTop: 28,
        color: "#fff",
        fontWeight: '600',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        height: 40,
        marginBottom: 12,
        fontSize: 16,
        color: "#fff",
        paddingHorizontal: 5,
    },
    buttonPrimary: {
        backgroundColor: "#fff",
        width: "100%",
        borderRadius: 50,
        paddingVertical: 12,
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
    },
    buttonPrimaryText: {
        color: "#34465F",
        fontSize: 18,
        fontWeight: "bold",
    },
    buttonSecondary: {
        marginTop: 20,
        alignSelf: "center",
    },
    buttonSecondaryText: {
        color: "#439CAC",
        fontSize: 16,
        textDecorationLine: "underline",
    },
    backButton: {
        marginTop: 15,
        alignItems: "center",
    },
    backButtonText: {
        color: "#fff",
        fontSize: 16,
        textDecorationLine: "underline",
    },
});
