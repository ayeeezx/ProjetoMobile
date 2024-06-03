import React from "react";
import { ListarAtendimentosProps } from "../types";
import ListarAtendimentos from "../layouts/ListarAtendimentos";

const ListarAtendimentosScreen = ({ navigation, route }: ListarAtendimentosProps) => {
    return (
        <ListarAtendimentos navigation={navigation} route={route} />
    );
};

export default ListarAtendimentosScreen;
