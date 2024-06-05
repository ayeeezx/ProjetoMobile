import React, { useState, useEffect } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View, ImageBackground, ScrollView } from "react-native";
import firestore from "@react-native-firebase/firestore";
import Carregamento from "../outros/Carregamento";
import ListarAtendimentos from "./ListarAtendimentos";

interface Cliente {
    id: string;
    nome: string;
}

const CadastroAtendimento: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [cliente, setCliente] = useState<string>('');
    const [clientesEncontrados, setClientesEncontrados] = useState<Cliente[]>([]);
    const [data, setData] = useState<string>('');
    const [hora, setHora] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [mostrarListaClientes, setMostrarListaClientes] = useState<boolean>(false);

    useEffect(() => {
        if (cliente.trim()) {
            buscarClientes();
        } else {
            setClientesEncontrados([]);
            setMostrarListaClientes(false);
        }
    }, [cliente]);

    const buscarClientes = async (): Promise<void> => {
        try {
            const snapshot = await firestore().collection('clientes')
                .where('nome', '>=', cliente)
                .where('nome', '<=', cliente + '\uf8ff')
                .get();
            const clientes: Cliente[] = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                clientes.push({ id: doc.id, nome: data.nome });
            });
            setClientesEncontrados(clientes);
            setMostrarListaClientes(clientes.length > 0); // Mostrar lista apenas se houver clientes encontrados
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
            setClientesEncontrados([]);
        }
    };

    const selecionarCliente = (nome: string): void => {
        setCliente(nome);
        setClientesEncontrados([]); 
        setMostrarListaClientes(false); 
    };

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
        if (!cliente.trim() || !data.trim() || !hora.trim() || !descricao.trim()) {
            Alert.alert('Campos obrigatórios não preenchidos.');
            return false;
        }

        return true;
    };

    const cadastrarAtendimento = async (): Promise<void> => {
        if (!validarCampos()) {
            return;
        }

        try {
            setIsLoading(true);
            await firestore().collection('atendimentos').add({
                cliente,
                data,
                hora,
                descricao,
            });
            setIsLoading(false);
            Alert.alert('Atendimento cadastrado com sucesso.');
        } catch (error) {
            console.error("Erro ao cadastrar atendimento:", error);
            setIsLoading(false);
            Alert.alert('Erro ao cadastrar atendimento. Por favor, tente novamente.');
        }
    };

    return (
        <ImageBackground
            source={{ uri: 'https://pbs.twimg.com/media/ESI-GDVWAAcWiLw.jpg' }}
            style={styles.background}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Carregamento isLoading={isLoading} />
                <View style={styles.form}>
                    <Text style={styles.label}>Cliente</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setCliente(text)}
                        value={cliente}
                    />
                    {mostrarListaClientes && // Renderizar lista somente se mostrarListaClientes for true
                        clientesEncontrados.map((cliente, index) => (
                            <Pressable
                            
                                key={index}
                                style={styles.clienteEncontrado}
                                onPress={() => selecionarCliente(cliente.nome)}
                            >
                                <Text>{cliente.nome}</Text>
                            </Pressable>
                        ))
                    }

                    <Text style={styles.label}>Data</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="DD/MM/AAAA"
                        placeholderTextColor={'black'}
                        onChangeText={(text) => handleDataTyping(text)}
                        value={data}
                        maxLength={10}
                        keyboardType="numeric"
                    />
                    <Text style={styles.label}>Hora</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="HH:MM"
                        placeholderTextColor={'black'}
                        onChangeText={(text) => handleHoraTyping(text)}
                        value={hora}
                        maxLength={5}
                        keyboardType="numeric"
                    />
                    <Text style={styles.label}>Descrição</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setDescricao(text)}
                        placeholder="Descrição"
                        placeholderTextColor={'black'}
                    />
                </View>
                <Pressable
                    style={styles.botao}
                    onPress={cadastrarAtendimento}
                    disabled={isLoading}
                >
                    <Text style={styles.desc_botao}>Cadastrar Atendimento</Text>
                </Pressable>
            </ScrollView>
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flexGrow: 1,
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
    clienteEncontrado: {
        backgroundColor: '#87CEFA',
        padding: 10,
        marginVertical: 5,
        borderRadius: 4,
    },
    clearButton: {
        position: 'absolute',
        top: 15,
        right: 15,
        padding: 10,
    },
    clearButtonText: {
        fontSize: 20,
        color: '#FF0000',
    },
});

export default CadastroAtendimento;
