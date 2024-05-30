import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View, ImageBackground } from "react-native";
import firestore from "@react-native-firebase/firestore";
import Carregamento from "../outros/Carregamento";
import CadastroAtendimentoScreen from "../screens/CadastroAtendimentoScreen";

interface Atendimento {
    cliente: string;
    data: string;
    hora: string;
    descricao: string;
}

export default function CadastroAtendimento({ navigation }: any) {
    const [cliente, setCliente] = useState<string>('');
    const [data, setData] = useState<string>('');
    const [hora, setHora] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const formatarData = (text: string): string => {
        let dataFormatada = text.replace(/\D/g, ''); 
        dataFormatada = dataFormatada.slice(0, 8); 
        dataFormatada = dataFormatada.replace(/(\d{2})(\d{1,2})/, '$1/$2'); 
        dataFormatada = dataFormatada.replace(/(\d{2})(\d{4})/, '$1/$2'); 
        return dataFormatada;
    };

    const handleDataTyping = (text: string): void => {
        setData(formatarData(text));
    };

    const formatarHora = (text: string): string => {
        let horaFormatada = text.replace(/\D/g, '');
        horaFormatada = horaFormatada.slice(0, 4);
        horaFormatada = horaFormatada.replace(/(\d{2})(\d{2})/, '$1:$2');
        return horaFormatada;
    };

    const handleHoraTyping = (text: string): void => {
        setHora(formatarHora(text));
    };

    const validarCampos = (): boolean => {
        if (!cliente.trim()) {
            Alert.alert("Campo obrigatório", "Por favor, preencha o nome do cliente.");
            return false;
        }

        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(data)) {
            Alert.alert("Data inválida", "Por favor, insira uma data válida.");
            return false;
        }

        if (!/^\d{2}:\d{2}$/.test(hora)) {
            Alert.alert("Hora inválida", "Por favor, insira uma hora válida.");
            return false;
        }

        if (!descricao.trim()) {
            Alert.alert("Campo obrigatório", "Por favor, preencha a descrição do atendimento.");
            return false;
        }

        return true;
    };

    const cadastrarAtendimento = async (): Promise<void> => {
        setIsLoading(true);

        if (validarCampos()) {
            try {
                await firestore().collection('atendimentos').add({
                    cliente,
                    data,
                    hora,
                    descricao,
                });
                Alert.alert("Sucesso", "Atendimento cadastrado com sucesso");
                navigation.navigate('ListarAtendimentos');
            } catch (error) {
                console.log(error);
                Alert.alert("Erro", "Ocorreu um erro ao cadastrar o atendimento. Por favor, tente novamente.");
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    };

    return (
        <ImageBackground
            source={{ uri: 'https://pbs.twimg.com/media/ESI-GDVWAAcWiLw.jpg' }}
            style={styles.background}
        >
            <View style={styles.container}>
                <Carregamento isLoading={isLoading} />
                <View style={styles.form}>
                    <Text style={styles.label}>Cliente</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setCliente(text)}
                    />
                    <Text style={styles.label}>Data</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="DD/MM/AAAA"
                        onChangeText={(text) => handleDataTyping(text)}
                        value={data}
                        maxLength={10}
                        keyboardType="numeric"
                    />
                    <Text style={styles.label}>Hora</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="HH:MM"
                        onChangeText={(text) => handleHoraTyping(text)}
                        value={hora}
                        maxLength={5}
                        keyboardType="numeric"
                    />
                    <Text style={styles.label}>Descrição</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setDescricao(text)}
                    />
                </View>
                <Pressable
                    style={styles.botao}
                    onPress={() => cadastrarAtendimento()}
                    disabled={isLoading}
                >
                    <Text style={styles.desc_botao}>Cadastrar Atendimento</Text>
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
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    form: {
        width: '80%',
    },
    label: {
        fontSize: 20,
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
        backgroundColor: 'white',
    },
    botao: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4682B4',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 4,
        marginVertical: 10,
    },
    desc_botao: {
        fontSize: 20,
        color: 'white',
    },
});
