import { useState, useEffect } from "react";
import {
    Alert, Pressable, FlatList, StyleSheet, Text, View, ActivityIndicator, ImageBackground
} from "react-native";

import firestore from "@react-native-firebase/firestore";
import { ListarClientesProps } from "../types";
import { IClientes } from "../models/IClientes";

export default function ListarClientes({ navigation, route }: ListarClientesProps) {
    const [clientes, setClientes] = useState<IClientes[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        const subscribe = firestore()
            .collection('clientes')
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as IClientes[];

                setClientes(data);
                setIsLoading(false);
            }, (error) => {
                console.error(error);
                Alert.alert("Erro", "Não foi possível carregar os clientes.");
                setIsLoading(false);
            });

        return () => subscribe();
    }, []);

    function deletarCliente(id: string) {
        setIsLoading(true);

        firestore()
            .collection('clientes')
            .doc(id)
            .delete()
            .then(() => {
                Alert.alert("Cliente", "Removido com sucesso");
            })
            .catch((error) => {
                console.error(error);
                Alert.alert("Erro", "Não foi possível remover o cliente.");
            })
            .finally(() => setIsLoading(false));
    }

    function alterarCliente(id: string) {
        navigation.navigate("AlterarClientes", { id: id, palavra: '' });
    }
    

    return (
        <ImageBackground
            source={{ uri: 'https://wallpapers.com/images/high/phone-valorant-agent-cypher-0x88jswvi32zt96o.webp' }}
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Listagem de Clientes</Text>

                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <FlatList
                        data={clientes}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => (
                            <View style={styles.card}>
                                <View style={styles.dados_card}>
                                    <Text style={styles.index}>{index + 1}</Text>
                                    <Text style={styles.cardTitle}>{item.nome}</Text>
                                    <Text style={styles.cardDescription}>CPF: {item.cpf}</Text>
                                    <Text style={styles.cardDescription}>Rua: {item.endereco.rua}</Text>
                                    <Text style={styles.cardDescription}>Número: {item.endereco.numero}</Text>
                                    <Text style={styles.cardDescription}>Bairro: {item.endereco.bairro}</Text>
                                    <Text style={styles.cardDescription}>Complemento: {item.endereco.complemento}</Text>
                                    <Text style={styles.cardDescription}>Cidade: {item.endereco.cidade}</Text>
                                    <Text style={styles.cardDescription}>Estado: {item.endereco.estado}</Text>
                                    {/* Adicione outros campos conforme necessário */}
                                </View>
                                <Pressable style={styles.botao_alterar} onPress={() => alterarCliente(item.id)}>
                                    <Text style={[styles.botaoText, { color: '#4A90E2' }]}>✏️</Text>
                                </Pressable>
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
        backgroundColor: 'rgba(0,0,0,0.5)', // Fundo semitransparente para legibilidade
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginVertical: 20,
    },
    card: {
        borderWidth: 1,
        borderColor: 'grey',
        margin: 5,
        borderRadius: 10,
        padding: 15,
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fundo branco semitransparente para melhor contraste
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
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
        fontSize: 24, // Aumentei o tamanho da fonte
        fontWeight: 'bold', // Adicionei negrito
        color: '#333',
        marginBottom: 5, // Adicionei margem inferior para separar o título da descrição
    },
    cardDescription: {
        fontSize: 18, // Aumentei o tamanho da fonte
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
        marginRight: 10,
    },
    botaoText: {
        fontSize: 24,
        textAlign: 'center', // Centraliza o emoji horizontalmente
        lineHeight: 40, // Centraliza o emoji verticalmente
    },
});
