import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import firestore from "@react-native-firebase/firestore";

interface Atendimento {
    id: string;
    cliente: string;
    data: string;
    hora: string;
    descricao: string;
}

export default function AlterarAtendimento({ route, navigation }: any) {
    const { id } = route.params;
    const [cliente, setCliente] = useState<string>("");
    const [data, setData] = useState<string>("");
    const [hora, setHora] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");

    useEffect(() => {
        // Buscar os dados do atendimento pelo ID e preencher os campos
        const fetchAtendimento = async () => {
            try {
                const documentSnapshot = await firestore().collection('atendimentos').doc(id).get();
                const atendimentoData = documentSnapshot.data() as Atendimento;
                setCliente(atendimentoData.cliente);
                setData(atendimentoData.data);
                setHora(atendimentoData.hora);
                setDescricao(atendimentoData.descricao);
            } catch (error) {
                console.error(error);
                Alert.alert("Erro", "Não foi possível carregar os detalhes do atendimento.");
            }
        };
        fetchAtendimento();
    }, [id]);

    const salvarAlteracoes = async () => {
        try {
            await firestore().collection('atendimentos').doc(id).update({
                cliente,
                data,
                hora,
                descricao,
            });
            Alert.alert("Sucesso", "Atendimento alterado com sucesso!");
            navigation.goBack();
        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Não foi possível salvar as alterações no atendimento.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Alterar Atendimento</Text>
            <TextInput
                style={styles.input}
                value={cliente}
                onChangeText={setCliente}
                placeholder="Cliente"
            />
            <TextInput
                style={styles.input}
                value={data}
                onChangeText={setData}
                placeholder="Data"
            />
            <TextInput
                style={styles.input}
                value={hora}
                onChangeText={setHora}
                placeholder="Hora"
            />
            <TextInput
                style={styles.input}
                value={descricao}
                onChangeText={setDescricao}
                placeholder="Descrição"
                multiline={true}
            />
            <Pressable style={styles.botaoSalvar} onPress={salvarAlteracoes}>
                <Text style={styles.desc_botaoSalvar}>Salvar Alterações</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    botaoSalvar: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    desc_botaoSalvar: {
        color: 'white',
        fontWeight: 'bold',
    },
});
