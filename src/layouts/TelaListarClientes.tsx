import React, { useEffect, useState } from "react";
import { Alert, Pressable, FlatList, StyleSheet, Text, View, ActivityIndicator, ImageBackground } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { ListarClientesProps } from "../types";
import { IClientes } from "../models/IClientes";

const ListarClientes: React.FC<ListarClientesProps> = ({ navigation, route }) => {
    const [clientes, setClientes] = useState<IClientes[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

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

        // Adicione um listener para atualizações em tempo real
        const unsubscribe = firestore().collection('clientes').onSnapshot((snapshot) => {
            const data: IClientes[] = [];
            snapshot.forEach((doc) => {
                const cliente = doc.data() as IClientes;
                cliente.id = doc.id;
                data.push(cliente);
            });
            setClientes(data);
        });

        // Retorne a função de limpeza no useEffect para garantir que o listener seja removido quando o componente for desmontado
        return () => unsubscribe();
    }, []);

    const deletarCliente = async (id: string) => {
        setIsLoading(true);

        try {
            await firestore().collection('clientes').doc(id).delete();
            Alert.alert("Cliente", "Removido com sucesso");
        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Não foi possível remover o cliente.");
        } finally {
            setIsLoading(false);
        }
    };

    const alterarCliente = (id: string) => {
        navigation.navigate("AlterarClientes", { id, palavra: '' });
    };

    return (
        <ImageBackground
            source={{ uri: 'https://wallpapers.com/images/high/phone-valorant-agent-cypher-0x88jswvi32zt96o.webp' }}
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Listagem de Clientes</Text>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#87CEEB" />
                ) : (
                    <FlatList
                        data={clientes}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => (
                            <View style={styles.card}>
                                <View style={styles.dados_card}>
                                    <Text style={[styles.index, { color: 'black' }]}>{index + 1}</Text>
                                    <Text style={styles.cardTitle}>Nome: {item.nome}</Text>
                                    <Text style={styles.cardDescription}>CPF: {item.cpf}</Text>
                                    <Text style={styles.cardDescription}>Rua: {item.endereco.rua}</Text>
                                    <Text style={styles.cardDescription}>Número: {item.endereco.numero}</Text>
                                    <Text style={styles.cardDescription}>Bairro: {item.endereco.bairro}</Text>
                                    <Text style={styles.cardDescription}>Complemento: {item.endereco.complemento}</Text>
                                    <Text style={styles.cardDescription}>Cidade: {item.endereco.cidade}</Text>
                                    <Text style={styles.cardDescription}>Estado: {item.endereco.estado}</Text>
                                    <Text style={styles.cardDescription}>Data de Nascimento: {item.dataNascimento}</Text>
                                    <Pressable style={styles.botao_alterar} onPress={() => alterarCliente(item.id)}>
                                        <Text style={[styles.botaoText, { color: '#3498db' }]}>✎</Text>
                                    </Pressable>
                                </View>
                                <Pressable style={styles.botao_deletar} onPress={() => deletarCliente(item.id)}>
                                    <Text style={[styles.botaoText, { color: '#E74C3C' }]}>❌</Text>
                                </Pressable>
                            </View>
                        )}
                    />
                )}
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
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'sans-serif-condensed',
    },
    card: {
        borderWidth: 1,
        borderColor: 'grey',
        margin: 5,
        borderRadius: 10,
        padding: 15,
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    dados_card: {
        flex: 1,
    },
    index: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    cardDescription: {
        fontSize: 18,
        color: '#666',
    },
    botao_deletar: {
        backgroundColor: 'transparent',
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginLeft: 10,
    },
    botao_alterar: {
        backgroundColor: 'transparent',
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginLeft: 10,
    },
    botaoText: {
        fontSize: 24,
        textAlign: 'center',
        lineHeight: 40,
        fontFamily: 'sans-serif-light',
    },
});

export default ListarClientes;
