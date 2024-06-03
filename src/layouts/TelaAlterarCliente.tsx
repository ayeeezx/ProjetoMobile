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
                    <Text>Nome</Text>
                    <TextInput
                        style={styles.caixa_texto}
                        value={clienteSelecionado.nome}
                        onChangeText={(text) => setClienteSelecionado({...clienteSelecionado, nome: text})} />

                    <Text>CPF</Text>
                    <TextInput
                        style={styles.caixa_texto}
                        value={clienteSelecionado.cpf}
                        onChangeText={(text) => setClienteSelecionado({...clienteSelecionado, cpf: text})} />

                    <Text>Data de Nascimento</Text>
                    <TextInput
                        style={styles.caixa_texto}
                        value={clienteSelecionado.dataNascimento}
                        onChangeText={(text) => setClienteSelecionado({...clienteSelecionado, dataNascimento: text})} />

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
        alignItems: 'center'
    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    itemText: {
        fontSize: 18
    },
    caixa_texto: {
        width: '70%',
        color: 'black',
        borderWidth: 1,
        borderRadius: 4,
        margin: 3
    },
    botao: {
        justifyContent: 'center',
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 30
    },
    desc_botao: {
        fontSize: 20
    },
});
