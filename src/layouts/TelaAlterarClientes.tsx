import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import firestore from "@react-native-firebase/firestore";
import { IClientes } from "../models/IClientes";
import { AlterarClientesProps } from "../types";
import Carregamento from "../outros/Carregamento";

export default function AlterarClientes({ navigation, route }: AlterarClientesProps) {
    const [id] = useState(route.params.id);
    const [cliente, setCliente] = useState<IClientes | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const carregarCliente = async () => {
            setIsLoading(true);
            try {
                const clienteDoc = await firestore()
                    .collection('clientes')
                    .doc(id)
                    .get();

                if (!clienteDoc.exists) {
                    Alert.alert("Cliente não encontrado", "O cliente que você está tentando alterar não existe.");
                    navigation.goBack();
                    return;
                }

                const clienteData = clienteDoc.data() as IClientes;
                setCliente(clienteData);
            } catch (error) {
                console.error("Erro ao carregar cliente:", error);
                Alert.alert("Erro", "Não foi possível carregar os dados do cliente.");
            } finally {
                setIsLoading(false);
            }
        };

        carregarCliente();
    }, []);

    const alterarCliente = async () => {
        if (!cliente) return;

        setIsLoading(true);

        try {
            await firestore()
                .collection('clientes')
                .doc(id)
                .update({
                    nome: cliente.nome,
                    cpf: cliente.cpf,
                    endereco: cliente.endereco,
                    dataNascimento: cliente.dataNascimento,
                    // Adicione outras propriedades conforme necessário
                });

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

            {cliente && (
                <>
                    <Text>Nome</Text>
                    <TextInput
                        style={styles.caixa_texto}
                        value={cliente.nome}
                        onChangeText={(text) => setCliente({...cliente, nome: text})} />

                    <Text>CPF</Text>
                    <TextInput
                        style={styles.caixa_texto}
                        value={cliente.cpf}
                        onChangeText={(text) => setCliente({...cliente, cpf: text})} />

                    <Text>Endereço</Text>
                    {/* Adicione os campos de endereço conforme necessário */}
                    <Text>Data de Nascimento</Text>
                    <TextInput
                        style={styles.caixa_texto}
                        value={cliente.dataNascimento}
                        onChangeText={(text) => setCliente({...cliente, dataNascimento: text})} />

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
