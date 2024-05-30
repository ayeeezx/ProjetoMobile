import React, { useState, useEffect } from "react";
import {
    Alert, Pressable, FlatList, StyleSheet, Text, View, ActivityIndicator, ImageBackground
} from "react-native";
import firestore from "@react-native-firebase/firestore";

interface Atendimento {
    id: string;
    cliente: string;
    data: string;
    hora: string;
    descricao: string;
}

export default function ListarAtendimentos({ navigation }: any) {
    const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);

        const subscribe = firestore()
            .collection('atendimentos')
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as Atendimento));
                setAtendimentos(data);
                setIsLoading(false);
            }, (error) => {
                console.error(error);
                Alert.alert("Erro", "Não foi possível carregar os atendimentos.");
                setIsLoading(false);
            });

        return () => subscribe();
    }, []);

    return (
        <ImageBackground
            source={{ uri: 'https://example.com/background_image.jpg' }} // Substitua pela URL da imagem de fundo desejada
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Listagem de Atendimentos</Text>

                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <FlatList
                        data={atendimentos}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => (
                            <View style={styles.card}>
                                <View style={styles.dados_card}>
                                    <Text style={styles.index}>{index + 1}</Text>
                                    <Text style={styles.cardTitle}>{item.cliente}</Text>
                                    <Text style={styles.cardDescription}>Data: {item.data}</Text>
                                    <Text style={styles.cardDescription}>Hora: {item.hora}</Text>
                                    <Text style={styles.cardDescription}>Descrição: {item.descricao}</Text>
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
        flexDirection: 'row',
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
    index: {
        fontSize: 16,
        fontWeight: 'bold',
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
});
