import { CadastroUsuarioProps, LoginProps } from "../types";
import TelaCadastroUsuario from "../layouts/TelaCadastroUsuario";

const CadastroUsuarioScreen = ({ navigation, route }: CadastroUsuarioProps) => {
    return (
        <TelaCadastroUsuario navigation={navigation} route={route} />
    );
};

export default CadastroUsuarioScreen;