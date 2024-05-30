import { CadastroAtendimentoProps } from "../types";
import TelaCadastroAtendimento from "../layouts/TelaCadastroAtendimento";

const CadastroAtendimentoScreen = ({ navigation, route }: CadastroAtendimentoProps) => {
    return (
        <TelaCadastroAtendimento navigation={navigation} route={route} />
    );
};

export default CadastroAtendimentoScreen;