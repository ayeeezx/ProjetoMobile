import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  CadastroUsuario: undefined;
  CadastroCliente: undefined;
  CadastroAtendimento: undefined;
  CadastroNota: undefined;
  ListarClientes: undefined;
  ListarAtendimento: undefined;
  AlterarClientes: { id: string; palavra: string };
};

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

type CadastroUsuarioProps = NativeStackScreenProps<RootStackParamList, 'CadastroUsuario'>;

type ListarClientesProps = NativeStackScreenProps<RootStackParamList, 'ListarClientes'>;

type AlterarClientesProps = NativeStackScreenProps<RootStackParamList, 'AlterarClientes'>;

type CadastroClienteProps = NativeStackScreenProps<RootStackParamList, 'CadastroCliente'>;

type CadastroAtendimentoProps = NativeStackScreenProps<RootStackParamList, 'CadastroAtendimento'>;

type ListarAtendimentoProps = NativeStackScreenProps<RootStackParamList, 'ListarAtendimento'>;

export type {
  RootStackParamList,
  HomeProps,
  LoginProps,
  CadastroUsuarioProps,
  ListarClientesProps,
  AlterarClientesProps,
  CadastroClienteProps,
  CadastroAtendimentoProps,
  ListarAtendimentoProps
};
