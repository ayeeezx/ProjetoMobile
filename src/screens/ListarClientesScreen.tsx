import { ListarClientesProps } from "../types";

import ListarClientes from "../layouts/TelaListarClientes";

const ListarClientesScreen = ({ navigation, route }: ListarClientesProps) => {
    return (
        <ListarClientes navigation={navigation} route={route} />
    );
};

export default ListarClientesScreen;