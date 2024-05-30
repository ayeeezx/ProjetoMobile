import { CadastroNotaProps, CadastroUsuarioProps, ListarNotasProps, LoginProps } from "../types";
import TelaCadastroUsuario from "../layouts/TelaCadastroUsuario";
import TelaCadastroNota from "../layouts/TelaCadastroNota";
import TelaListarNotas from "../layouts/TelaListarClientes";

const ListarNotasScreen = ({ navigation, route }: ListarNotasProps) => {
    return (
        <TelaListarNotas navigation={navigation} route={route} />
    );
};

export default ListarNotasScreen;