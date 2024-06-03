import React from 'react';
import { AlterarClientesProps } from "../types";
import TelaAlterarAtendimento from "../layouts/TelaAlterarAtendimento";

const AlterarAtendimentoScreen = ({ navigation, route }: AlterarClientesProps) => {
    return (
        <TelaAlterarAtendimento navigation={navigation} route={route} />
    );
};

export default AlterarAtendimentoScreen;
