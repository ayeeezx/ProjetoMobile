import { AlterarClientesProps} from "../types";
import AlterarClientes from "../layouts/TelaAlterarClientes";
import TelaAlterarClientes from "../layouts/TelaAlterarClientes";

const AlterarNotaScreen = ({ navigation, route }: AlterarClientesProps) => {
    return (
        <TelaAlterarClientes navigation={navigation} route={route} />
    );
};

export default AlterarNotaScreen;