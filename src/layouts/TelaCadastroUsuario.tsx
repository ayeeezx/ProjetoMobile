import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View, ImageBackground } from "react-native";
import LinearGradient from 'react-native-linear-gradient'; // Import the linear gradient component

import auth from "@react-native-firebase/auth";
import { CadastroUsuarioProps } from "../types";
import Carregamento from "../outros/Carregamento";

const CadastroUsuario: React.FC<CadastroUsuarioProps> = ({ navigation, route }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function cadastrar() {
        setIsLoading(true);

        if (email && senha) {
            auth()
                .createUserWithEmailAndPassword(email, senha)
                .then(() => {
                    Alert.alert("Conta", "Cadastrado com sucesso");
                    navigation.navigate('Login');
                })
                .catch((error) => {
                    console.log(error);
                    Alert.alert("Erro", String(error));
                })
                .finally(() => { setIsLoading(false) });
        } else setIsLoading(false);
    }

    return (
        <ImageBackground
            source={{ uri: 'https://pbs.twimg.com/media/ESI-GDVWAAcWiLw.jpg' }}
            style={styles.background}
        >
            <LinearGradient // Add a LinearGradient overlay
                colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.5)']} // Start and end color of the gradient
                style={styles.overlay}
            >
                <View style={styles.container}>
                    <Carregamento isLoading={isLoading} />

                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.caixa_texto}
                        onChangeText={(text) => { setEmail(text) }} />
                    <Text style={styles.label}>Senha</Text>
                    <TextInput
                        style={styles.caixa_texto}
                        onChangeText={(text) => { setSenha(text) }} secureTextEntry />
                    <Pressable
                        style={styles.botao}
                        onPress={() => cadastrar()}
                        disabled={isLoading}>
                        <Text style={styles.desc_botao}>Cadastrar</Text>
                    </Pressable>

                    <Pressable
                        style={styles.botaoVoltar}
                        onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.desc_botaoVoltar}>Entrar</Text>
                    </Pressable>
                </View>
            </LinearGradient>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100, 
    },
    caixa_texto: {
        width: '70%',
        color: 'black',
        borderWidth: 1,
        borderRadius: 4,
        margin: 3,
        backgroundColor: 'white', 
        paddingHorizontal: 10,
    },
    botao: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4682B4', 
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 4,
        marginTop: 20, 
    },
    desc_botao: {
        fontSize: 20,
        color: 'white', 
    },
    label: {
        fontSize: 25, 
        color: 'white',
        marginVertical: 15, 
    },
    botaoVoltar: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: '#4682B4',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 4,
    },
    desc_botaoVoltar: {
        fontSize: 16,
        color: 'white',
    },
});

export default CadastroUsuario;
