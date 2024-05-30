import { CadastroClienteProps } from "../types";
import TelaCadastroCliente from "../layouts/TelaCadastroCliente";

const CadastroClienteScreen = ({ navigation, route }: CadastroClienteProps) => {
    return (
        <TelaCadastroCliente navigation={navigation} route={route} />
    );
};

export default CadastroClienteScreen;