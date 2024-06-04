import React from 'react';
import { AlterarAtendimentoProps, AlterarClientesProps } from "../types";
import TelaAlterarAtendimento from "../layouts/TelaAlterarAtendimento";

const AlterarAtendimentoScreen = ({ navigation, route }: AlterarAtendimentoProps) => {
    return (
        <TelaAlterarAtendimento navigation={navigation} route={route} />
    );
};

export default AlterarAtendimentoScreen;
