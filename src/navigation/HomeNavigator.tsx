import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import CadastroUsuarioScreen from "../screens/CadastroUsuarioScreen";
import ListarClientesScreen from "../screens/ListarClientesScreen";
import CadastroScreen from "../screens/CadastroClienteScreen";
import AlterarNotaScreen from "../screens/AlterarClientesScreen";
import CadastroClientes from "../layouts/TelaCadastroCliente";
import CadastroClienteScreen from "../screens/CadastroClienteScreen";
import TelaAlterarClientes from "../layouts/TelaAlterarClientes";
import telaCadastroAtendimento from "../layouts/TelaCadastroAtendimento";
import CadastroAtendimentoScreen from "../screens/CadastroAtendimentoScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="CadastroUsuario" component={CadastroUsuarioScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />

            <Stack.Screen name="ListarClientes" component={ListarClientesScreen} />
            <Stack.Screen name="AlterarClientes" component={TelaAlterarClientes} />
            <Stack.Screen name="CadastroCliente" component={CadastroClienteScreen} />
            <Stack.Screen name="CadastroAtendimento" component={CadastroAtendimentoScreen} />
        </Stack.Navigator>
    );
}

export default HomeNavigator;