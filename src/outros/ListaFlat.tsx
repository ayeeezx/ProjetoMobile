import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text
} from 'react-native';

type ListaFlatProps = {
    array: {key: number; descricao: string}[]
}

const ListaFlat = (props: ListaFlatProps) => {
    return <FlatList 
        data={props.array} 
        renderItem={({item}) => <Text style={styles.item}>{item.descricao}</Text>}
    />  
}

export default ListaFlat;

const styles = StyleSheet.create({
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  });