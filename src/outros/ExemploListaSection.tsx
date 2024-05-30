import ListaSection from "./ListaSection";

const listaSection = [
    { title: 'A', data: [{ key: 1, descricao: 'Ana' }] },
    { title: 'B', data: [{ key: 2, descricao: 'Bruno' }] },
    { title: 'C', data: [{ key: 3, descricao: 'Carlos' }] },
    { title: 'D', data: [{ key: 4, descricao: 'Douglas' }] },
    { title: 'E', data: [{ key: 5, descricao: 'Elio' }] },
    { title: 'F', data: [{ key: 6, descricao: 'Fábio' }] },
];


export default () => {
    return (
        <ListaSection array={listaSection} />
    );
}
