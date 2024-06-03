import React from "react";
import { RemoverClientesProps } from "../types";
import TelaRemoverClientes from "../layouts/TelaRemoverClientes";

const RemoverClientesScreen = ({ navigation, route }: RemoverClientesProps) => {
    return (
        <TelaRemoverClientes navigation={navigation} route={route} />
    );
};

export default RemoverClientesScreen;
