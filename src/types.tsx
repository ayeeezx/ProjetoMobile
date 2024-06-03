import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  CadastroUsuario: undefined;
  CadastroCliente: undefined;
  CadastroAtendimento: undefined;
  ListarClientes: undefined;
  ListarAtendimentos: undefined;
  RemoverClientes: undefined;
  AlterarClientes: { id: string; palavra: string };
  AlterarAtendimento: undefined;
};

type ScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

type HomeProps = ScreenProps<'Home'>;
type LoginProps = ScreenProps<'Login'>;
type CadastroUsuarioProps = ScreenProps<'CadastroUsuario'>;
type ListarClientesProps = ScreenProps<'ListarClientes'>;
type RemoverClientesProps = ScreenProps<'RemoverClientes'>;
type AlterarClientesProps = ScreenProps<'AlterarClientes'>;
type CadastroClienteProps = ScreenProps<'CadastroCliente'>;
type CadastroAtendimentoProps = ScreenProps<'CadastroAtendimento'>;
type ListarAtendimentosProps = ScreenProps<'ListarAtendimentos'>;
type AlterarAtendimentoProps = ScreenProps<'AlterarAtendimento'>;

export type {
  RootStackParamList,
  HomeProps,
  LoginProps,
  CadastroUsuarioProps,
  ListarClientesProps,
  AlterarClientesProps,
  CadastroClienteProps,
  CadastroAtendimentoProps,
  ListarAtendimentosProps,
  RemoverClientesProps,
  AlterarAtendimentoProps
};
