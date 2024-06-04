import React from "react";
import { AlterarClientesProps } from "../types";
import AlterarClientes from "../layouts/TelaAlterarCliente";

const AlterarClientesScreen = ({ navigation, route }: AlterarClientesProps) => {
    return (
        <AlterarClientes navigation={navigation} route={route} />
    );
};

export default AlterarClientesScreen;
