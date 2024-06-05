import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import CadastroUsuarioScreen from "../screens/CadastroUsuarioScreen";
import ListarClientesScreen from "../screens/ListarClientesScreen";
import CadastroClienteScreen from "../screens/CadastroClienteScreen";
import CadastroAtendimentoScreen from "../screens/CadastroAtendimentoScreen";
import ListarAtendimentosScreen from "../screens/ListarAtendimentosScreen";
import AlterarClientesScreen from "../screens/AlterarClientesScreen";


const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="CadastroUsuario" component={CadastroUsuarioScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ListarClientes" component={ListarClientesScreen} />
            <Stack.Screen name="CadastroCliente" component={CadastroClienteScreen} />
            <Stack.Screen name="CadastroAtendimento" component={CadastroAtendimentoScreen} />
            <Stack.Screen name="ListarAtendimentos" component={ListarAtendimentosScreen} />
            <Stack.Screen name="AlterarClientes" component={AlterarClientesScreen} />

        </Stack.Navigator>
    );
};

export default HomeNavigator;
