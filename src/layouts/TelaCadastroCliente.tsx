import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View, ImageBackground } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { CadastroClienteProps } from "../types";
import Carregamento from "../outros/Carregamento";

export default function CadastroCliente({ navigation, route }: CadastroClienteProps) {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [endereco, setEndereco] = useState({
        rua: '',
        numero: '',
        bairro: '',
        complemento: '',
        cidade: '',
        estado: ''
    });
    const [dataNascimento, setDataNascimento] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [cadastroConfirmado, setCadastroConfirmado] = useState(false);

    const formatarCPF = (text: string) => {
        let cpfFormatado = text.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        cpfFormatado = cpfFormatado.slice(0, 11); // Limita o CPF a 11 dígitos
        cpfFormatado = cpfFormatado.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto após o terceiro dígito
        cpfFormatado = cpfFormatado.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto após o sexto dígito
        cpfFormatado = cpfFormatado.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca um traço após o nono dígito
        return cpfFormatado;
    }

    const handleCPFTyping = (text: string) => {
        setCpf(formatarCPF(text));
    }

    const formatarDataNascimento = (text: string) => {
        let dataFormatada = text.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        dataFormatada = dataFormatada.slice(0, 8); // Limita a data a 8 dígitos
        dataFormatada = dataFormatada.replace(/(\d{2})(\d{1,2})/, '$1/$2'); // Coloca uma barra após o segundo dígito do mês
        dataFormatada = dataFormatada.replace(/(\d{2})(\d{4})/, '$1/$2'); // Coloca uma barra após o segundo dígito do ano
        return dataFormatada;
    }

    const handleDataNascimentoTyping = (text: string) => {
        setDataNascimento(formatarDataNascimento(text));
    }

    const validarCampos = () => {
        // Validar o nome
        if (!nome.trim()) {
            Alert.alert("Campo obrigatório", "Por favor, preencha o nome.");
            return false;
        }

        // Validar o CPF
        if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
            Alert.alert("CPF inválido", "Por favor, insira um CPF válido.");
            return false;
        }

        // Validar a data de nascimento
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dataNascimento)) {
            Alert.alert("Data de nascimento inválida", "Por favor, insira uma data de nascimento válida.");
            return false;
        }

        return true;
    }

    const cadastrar = async () => {
        setIsLoading(true);

        if (validarCampos()) {
            try {
                const cliente = {
                    nome,
                    cpf,
                    endereco,
                    dataNascimento
                };

                await firestore().collection('clientes').add(cliente);
                setCadastroConfirmado(true);
                Alert.alert("Sucesso", "Cliente cadastrado com sucesso!");
                navigation.navigate('Home');
            } catch (error) {
                console.error("Erro ao cadastrar cliente:", error);
                Alert.alert("Erro", "Ocorreu um erro ao cadastrar o cliente. Por favor, tente novamente.");
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    }


    return (
        <ImageBackground
            source={{ uri: 'https://pbs.twimg.com/media/ESI-GDVWAAcWiLw.jpg' }}
            style={styles.background}
        >
            <View style={styles.container}>
                <Carregamento isLoading={isLoading} />

                <View style={styles.form}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setNome(text)}
                        placeholder="Nome Completo"
                        placeholderTextColor={'black'} />

                    <Text style={styles.label}>CPF</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => handleCPFTyping(text)}
                        value={cpf}
                        maxLength={14} // Limita o campo a 14 caracteres (com pontos e traço)
                        placeholder="Digite seu CPF"
                        placeholderTextColor={'black'}
                        keyboardType="numeric" />


                    <Text style={styles.label}>Endereço</Text>
                    <View style={styles.enderecoContainer}>
                        <TextInput
                            style={[styles.input, styles.enderecoInput]}
                            placeholder="Rua"
                            placeholderTextColor={'black'}
                            onChangeText={(text) => setEndereco({ ...endereco, rua: text })}
                        />
                        <TextInput
                            style={[styles.input, styles.enderecoInput]}
                            placeholder="Número"
                            placeholderTextColor={'black'}
                            onChangeText={(text) => {
                                // Apenas permite a entrada de números
                                const numero = text.replace(/[^0-9]/g, '');
                                setEndereco({ ...endereco, numero });
                            }}
                            keyboardType="numeric"
                        />

                        <TextInput
                            style={[styles.input, styles.enderecoInput]}
                            placeholder="Bairro"
                            placeholderTextColor={'black'}
                            onChangeText={(text) => setEndereco({ ...endereco, bairro: text })} />
                        <TextInput
                            style={[styles.input, styles.enderecoInput]}
                            placeholder="Complemento"
                            placeholderTextColor={'black'}
                            onChangeText={(text) => setEndereco({ ...endereco, complemento: text })} />
                        <TextInput
                            style={[styles.input, styles.enderecoInput]}
                            placeholder="Cidade"
                            placeholderTextColor={'black'}
                            onChangeText={(text) => setEndereco({ ...endereco, cidade: text })} />
                        <TextInput
                            style={[styles.input, styles.enderecoInput]}
                            placeholder="Estado"
                            placeholderTextColor={'black'}
                            onChangeText={(text) => setEndereco({ ...endereco, estado: text })} />
                    </View>

                    <Text style={styles.label}>Data de Nascimento</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="DD/MM/AAAA"
                        placeholderTextColor={'black'}
                        onChangeText={(text) => handleDataNascimentoTyping(text)}
                        value={dataNascimento}
                        maxLength={10} // Limita o campo a 10 caracteres (DD
                    />
                </View>

                <Pressable
                    style={styles.botao}
                    onPress={() => cadastrar()}
                    disabled={isLoading}>
                    <Text style={styles.desc_botao}>Cadastrar</Text>
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
    form: {
        width: '80%',
    },
    label: {
        fontSize: 20, // Tamanho da fonte ajustado para combinar com o estilo da tela de login
        color: 'white',
        marginVertical: 5,
    },
    input: {
        width: '100%',
        color: 'black',
        borderWidth: 1,
        borderRadius: 4,
        marginVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: 'white', // Manter fundo branco para legibilidade
    },
    enderecoContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    enderecoInput: {
        width: '48%',
    },
    botao: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4682B4', // Cor do botão ajustada para combinar com o estilo da tela de login
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 4,
        marginVertical: 10,
    },
    desc_botao: {
        fontSize: 20,
        color: 'white', // Manter texto do botão branco
    },
});
