import React, { useState, useEffect } from "react";
import { Alert, FlatList, StyleSheet, Text, View, Pressable, ActivityIndicator, ImageBackground } from "react-native";
import firestore from "@react-native-firebase/firestore";

interface Cliente {
    id: string;
    nome: string;
    cpf: string;
    endereco: string;
    dataNascimento: string;
}

export default function RemoverClientes({ navigation }: any) {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);

        const subscribe = firestore()
            .collection('clientes')
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as Cliente));
                setClientes(data);
                setIsLoading(false);
            }, (error) => {
                console.error(error);
                Alert.alert("Erro", "Não foi possível carregar os clientes.");
                setIsLoading(false);
            });

        return () => subscribe();
    }, []);

    const removerCliente = async (id: string) => {
        setIsLoading(true);
        try {
            await firestore().collection('clientes').doc(id).delete();
            Alert.alert("Sucesso", "Cliente removido com sucesso");
        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Não foi possível remover o cliente.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ImageBackground
            source={{ uri: 'https://example.com/background_image.jpg' }} // Substitua pela URL da imagem de fundo desejada
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Remover Clientes</Text>

                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <FlatList
                        data={clientes}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <View style={styles.dados_card}>
                                    <Text style={styles.cardTitle}>{item.nome}</Text>
                                    <Text style={styles.cardDescription}>CPF: {item.cpf}</Text>
                                    <Text style={styles.cardDescription}>Endereço: {item.endereco}</Text>
                                    <Text style={styles.cardDescription}>Data de Nascimento: {item.dataNascimento}</Text>
                                    <Pressable
                                        style={styles.botao}
                                        onPress={() => removerCliente(item.id)}
                                    >
                                        <Text style={styles.desc_botao}>Remover</Text>
                                    </Pressable>
                                </View>
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
    },
    card: {
        borderWidth: 1,
        borderColor: 'grey',
        margin: 5,
        borderRadius: 10,
        padding: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    dados_card: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardDescription: {
        fontSize: 16,
        color: '#666',
    },
    botao: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF6347',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 4,
        marginTop: 10,
    },
    desc_botao: {
        fontSize: 20,
        color: 'white',
    },
});
