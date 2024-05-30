import ListaFlat from "./ListaFlat";

const lista = [
    {key: 1, descricao: 'teste'},
    {key: 2, descricao: 'teste2'},
    {key: 3, descricao: 'teste3'},
    {key: 4, descricao: 'teste4'}
  ];
  
  export default () => {
    return (
        <ListaFlat array={lista} />
    );
  }