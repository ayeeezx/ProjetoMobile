import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View, ImageBackground, Image } from "react-native";

import auth from "@react-native-firebase/auth";
import { CadastroUsuarioProps } from "../types";
import Carregamento from "../outros/Carregamento";

export default ({ navigation, route }: CadastroUsuarioProps) => {
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
            <View style={styles.container}>
                <Carregamento isLoading={isLoading}/>

                <Image
                    source={{ uri: 'https://media.tenor.com/V2CI8sW4KMEAAAAi/jett-laugh-spray-jett.gif' }}
                    style={styles.logo}
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.caixa_texto}
                    onChangeText={(text) => { setEmail(text) }} />
                <Text style={styles.label}>Senha</Text>
                <TextInput
                    style={styles.caixa_texto}
                    onChangeText={(text) => { setSenha(text) }} />
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', // Fundo semitransparente para melhor legibilidade
    },
    logo: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
        marginBottom: 20,
        
    },
    caixa_texto: {
        width: '70%',
        color: 'black',
        borderWidth: 1,
        borderRadius: 4,
        margin: 3,
        backgroundColor: 'white', // Manter fundo branco para legibilidade
        paddingHorizontal: 10,
        
    },
    botao: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4682B4', // Cor do botão ajustada para combinar com o estilo da tela de login
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 4,
        marginTop: 10,
    },
    desc_botao: {
        fontSize: 20,
        color: 'white', // Manter texto do botão branco
    },
    label: {
        fontSize: 25, // Tamanho da fonte ajustado para combinar com o estilo da tela de login
        color: 'white',
        marginVertical: 5,
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
