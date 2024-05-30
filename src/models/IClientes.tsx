// models/IClientes.ts

export interface IClientes {
    id: string;
    nome: string;
    cpf: string;
    endereco: {
        rua: string;
        numero: string;
        bairro: string;
        complemento: string;
        cidade: string;
        estado: string;
    };
    dataNascimento: string;
}
