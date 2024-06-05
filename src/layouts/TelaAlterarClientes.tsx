import React, { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View, ActivityIndicator, ImageBackground, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { AlterarClientesProps } from "../types";
import { IClientes } from "../models/IClientes";
import { MaskedTextInput } from 'react-native-mask-text';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const AlterarClientes = ({ navigation, route }: AlterarClientesProps) => {
    const { id } = route.params;
    const [cliente, setCliente] = useState<IClientes | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    

    useEffect(() => {
        const carregarCliente = async () => {
            setIsLoading(true);
            try {
                const doc = await firestore().collection('clientes').doc(id).get();
                if (doc.exists) {
                    setCliente(doc.data() as IClientes);
                } else {
                    Alert.alert("Erro", "Cliente não encontrado.");
                    navigation.goBack();
                }
            } catch (error) {
                console.error("Erro ao carregar cliente:", error);
                Alert.alert("Erro", "Não foi possível carregar o cliente.");
            } finally {
                setIsLoading(false);
            }
        };

        carregarCliente();
    }, [id, navigation]);

    const handleSave = async () => {
        if (!cliente) return;

        setIsSaving(true);
        try {
            await firestore().collection('clientes').doc(id).set(cliente);
            Alert.alert("Sucesso", "Cliente atualizado com sucesso.");
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao salvar cliente:", error);
            Alert.alert("Erro", "Não foi possível salvar as alterações.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleChange = (key: keyof IClientes, value: any) => {
        if (cliente) {
            setCliente({ ...cliente, [key]: value });
        }
    };

    const handleEnderecoChange = (key: keyof IClientes['endereco'], value: any) => {
        if (cliente) {
            setCliente({ ...cliente, endereco: { ...cliente.endereco, [key]: value } });
        }

        const formatarDataNascimento = (text: string) => {
            let dataFormatada = text.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
            dataFormatada = dataFormatada.slice(0, 8); // Limita a data a 8 dígitos
            dataFormatada = dataFormatada.replace(/(\d{2})(\d{1,2})/, '$1/$2'); // Coloca uma barra após o segundo dígito do mês
            dataFormatada = dataFormatada.replace(/(\d{2})(\d{4})/, '$1/$2'); // Coloca uma barra após o segundo dígito do ano
            return dataFormatada;
        }
    };



    return (
        <ScrollView>
            <ImageBackground
                source={{ uri: 'https://wallpapers.com/images/high/phone-valorant-agent-cypher-0x88jswvi32zt96o.webp' }}
                style={styles.background}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.container}
                >
                    <Text style={styles.title}>Alterar Cliente</Text>
                    {isLoading ? (
                        <ActivityIndicator size="large" color="#87CEEB" />
                    ) : (
                        cliente && (
                            <View style={styles.form}>
                                <Text style={styles.label}>Nome</Text>
                                <TextInput
                                    style={styles.input}
                                    value={cliente.nome}
                                    onChangeText={(text) => handleChange('nome', text)}
                                    maxLength={50} // Defina o limite de caracteres
                                />
                                <Text style={styles.label}>CPF</Text>
                                <MaskedTextInput
                                    mask="999.999.999-99"
                                    style={styles.input}
                                    value={cliente.cpf}
                                    onChangeText={(text) => handleChange('cpf', text)}
                                />
                                <Text style={styles.label}>Rua</Text>
                                <TextInput
                                    style={styles.input}
                                    value={cliente.endereco.rua}
                                    onChangeText={(text) => handleEnderecoChange('rua', text)}
                                />
                                <Text style={styles.label}>Número</Text>
                                <MaskedTextInput
                                    mask="99999" // Defina o formato para 5 dígitos
                                    style={styles.input}
                                    value={cliente.endereco.numero}
                                    onChangeText={(text) => handleEnderecoChange('numero', text)}
                                />
                                <Text style={styles.label}>Bairro</Text>
                                <TextInput
                                    style={styles.input}
                                    value={cliente.endereco.bairro}
                                    onChangeText={(text) => handleEnderecoChange('bairro', text)}
                                    maxLength={20} // Defina o limite de caracteres
                                />
                                <Text style={styles.label}>Complemento</Text>
                                <TextInput
                                    style={styles.input}
                                    value={cliente.endereco.complemento}
                                    onChangeText={(text) => handleEnderecoChange('complemento', text)}
                                    maxLength={20} // Defina o limite de caracteres
                                />
                                <Text style={styles.label}>Cidade</Text>
                                <TextInput
                                    style={styles.input}
                                    value={cliente.endereco.cidade}
                                    onChangeText={(text) => handleEnderecoChange('cidade', text)}
                                    maxLength={20} // Defina o limite de caracteres
                                />
                                <Text style={styles.label}>Estado</Text>
                                <TextInput
                                    style={styles.input}
                                    value={cliente.endereco.estado}
                                    onChangeText={(text) => handleEnderecoChange('estado', text)}
                                    maxLength={20} // Defina o limite de caracteres
                                />
                                <Text style={styles.label}>Data de Nascimento</Text>
                                <TextInput
                                    style={styles.input}
                                    value={cliente.dataNascimento}
                                    onChangeText={(text) => handleChange('dataNascimento', text)}
                                    placeholder="DD/MM/AAAA" // Placeholder para orientar o formato da data
                                />

                                <Pressable style={styles.botaoSalvar} onPress={handleSave}>
                                    {isSaving ? (
                                        <ActivityIndicator size="small" color="#fff" />
                                    ) : (
                                        <Text style={styles.botaoText}>Salvar</Text>
                                    )}
                                </Pressable>
                            </View>
                        )

                    )}
                </KeyboardAvoidingView>
            </ImageBackground>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'sans-serif-condensed',
    },
    form: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 10,
        padding: 20,
        width: '90%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5,
        marginTop: 10,
        alignSelf: 'flex-start',
    },
    input: {
        fontSize: 16,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff',
        color: 'black',
        width: '100%',
    },
    botaoSalvar: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius:
            10,
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
    },
    botaoText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default AlterarClientes;
