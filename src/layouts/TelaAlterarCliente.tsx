import React, { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import firestore from "@react-native-firebase/firestore";
import { IClientes } from "../models/IClientes";
import { AlterarClientesProps } from "../types";
import Carregamento from "../outros/Carregamento";

export default function AlterarClientes({ navigation, route }: AlterarClientesProps) {
    const [clientes, setClientes] = useState<IClientes[]>([]);
    const [clienteSelecionado, setClienteSelecionado] = useState<IClientes | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const carregarClientes = async () => {
            setIsLoading(true);
            try {
                const snapshot = await firestore().collection('clientes').get();
                const data: IClientes[] = [];
                snapshot.forEach((doc) => {
                    const cliente = doc.data() as IClientes;
                    cliente.id = doc.id;    
                    data.push(cliente);
                });
                setClientes(data);
            } catch (error) {
                console.error("Erro ao carregar clientes:", error);
                Alert.alert("Erro", "Não foi possível carregar os clientes.");
            } finally {
                setIsLoading(false);
            }
        };

        carregarClientes();
    }, []);

    const selecionarCliente = (cliente: IClientes) => {
        setClienteSelecionado(cliente);
    };

    const alterarCliente = async () => {
        if (!clienteSelecionado) return;

        setIsLoading(true);

        try {
            await firestore()
                .collection('clientes')
                .doc(clienteSelecionado.id)
                .update(clienteSelecionado);

            Alert.alert("Cliente", "Cliente alterado com sucesso");
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao alterar cliente:", error);
            Alert.alert("Erro", "Não foi possível alterar o cliente. Por favor, tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Carregamento isLoading={isLoading} />

            <FlatList
                data={clientes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Pressable style={styles.itemContainer} onPress={() => selecionarCliente(item)}>
                        <Text style={styles.itemText}>{item.nome}</Text>
                    </Pressable>
                )}
            />

            {clienteSelecionado && (
                <>
                    <View style={styles.form}>
                        <Text style={styles.label}>Nome</Text>
                        <TextInput
                            style={styles.input}
                            value={clienteSelecionado.nome}
                            onChangeText={(text) => setClienteSelecionado({...clienteSelecionado, nome: text})} />

                        <Text style={styles.label}>CPF</Text>
                        <TextInput
                            style={styles.input}
                            value={clienteSelecionado.cpf}
                            onChangeText={(text) => setClienteSelecionado({...clienteSelecionado, cpf: text})} />

                        <Text style={styles.label}>Data de Nascimento</Text>
                        <TextInput
                            style={styles.input}
                            value={clienteSelecionado.dataNascimento}
                            onChangeText={(text) => setClienteSelecionado({...clienteSelecionado, dataNascimento: text})} />
                    </View>

                    <Pressable
                        style={styles.botao}
                        onPress={alterarCliente}
                        disabled={isLoading}>
                        <Text style={styles.desc_botao}>Alterar</Text>
                    </Pressable>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', // cor de fundo suave para melhor visualização
    },
    form: {
        width: '80%', // largura do formulário
        alignItems: 'center', // centraliza os itens horizontalmente
    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
    itemText: {
        fontSize: 18,
        color: 'black', // cor do texto preto para melhor visibilidade
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        color: 'black',
    },
    input: {
        width: '100%', // largura do campo de entrada
        color: 'black',
        borderWidth: 1,
        borderRadius: 4,
        marginVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: 'white', // fundo branco para melhor contraste
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
        color: 'white', // texto branco para melhor visibilidade
    },
});

