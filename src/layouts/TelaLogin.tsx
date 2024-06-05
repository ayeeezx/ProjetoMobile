import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Alert, ImageBackground, Image } from 'react-native';
import { LoginProps } from "../types";
import auth from "@react-native-firebase/auth";
import Carregamento from '../outros/Carregamento';

export default ({ navigation, route }: LoginProps) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function logar() {
        if (!email || !senha) {
            Alert.alert("Campos vazios", "Por favor, preencha o email e a senha antes de continuar.");
            return;
        }

        setIsLoading(true);

        auth()
            .signInWithEmailAndPassword(email, senha)
            .then(() => { navigation.navigate('Home') })
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false))
    }

    function redefinirSenha() {
        if (email) {
            auth()
                .sendPasswordResetEmail(email)
                .then(() => Alert.alert("Redefinir senha", "Enviamos um email para você"))
                .catch((error) => console.log(error))
        } else {
            Alert.alert("Campo de e-mail vazio", "Por favor, digite um e-mail válido antes de redefinir a senha.");
        }
    }

    return (
        <ImageBackground
            source={{ uri: 'https://i.pinimg.com/originals/e8/86/4b/e8864bcd4ceaa608f9632ba0aa22af25.jpg' }}
            style={styles.background}
        >
            <View style={styles.container}>
                <Carregamento isLoading={isLoading} />

                <View style={styles.logoContainer}>
                    <Image
                        source={{ uri: 'https://media.tenor.com/Ip3LYNcDTu0AAAAi/valorant-omen.gif' }}
                        style={styles.logo}
                    /> 
                </View>

                <View style={styles.container_login}>
                    <Text style={styles.label}>Login</Text>
                    <TextInput
                        style={styles.caixa_texto}
                        onChangeText={(text) => { setEmail(text) }}
                        placeholder="Email"
                        placeholderTextColor="gray"
                    />
                    <Text style={styles.label}>Senha</Text>
                    <TextInput
                        style={styles.caixa_texto}
                        onChangeText={(text) => { setSenha(text) }}
                        placeholder="Senha"
                        placeholderTextColor="grey"
                        secureTextEntry={true}
                    />
                    <Pressable
                        style={styles.botao}
                        onPress={() => logar()}
                        disabled={isLoading}>
                        <Text style={styles.desc_botao}>Entrar</Text>
                    </Pressable>
                </View>

                <View style={styles.container_botoes}>
                    <Pressable
                        style={styles.botao}
                        onPress={() => { navigation.navigate('CadastroUsuario') }}>
                        <Text style={styles.desc_botao}>Cadastrar-se</Text>
                    </Pressable>

                    <Pressable
                        style={styles.botao}
                        onPress={redefinirSenha}>
                        <Text style={styles.desc_botao}>Esqueci a senha</Text>
                    </Pressable>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)', 
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: -15, 
        marginVertical: -80,
    },
    logo: {
        width: 180,
        height: 180,
        resizeMode: 'contain',
    },
    container_login: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 100, 
        marginTop: 100,
    },
    container_botoes: {
        position: 'absolute',
        bottom: 20, 
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
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
        backgroundColor: '#4682B4',
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginHorizontal: 10, 
    },
    desc_botao: {
        fontSize: 20,
        color: 'white', 
    },
    label: {
        fontSize: 24, 
        color: 'white',
        marginVertical: 5,
    }
});
