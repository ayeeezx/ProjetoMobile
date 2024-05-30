import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { HomeProps } from '../types';

export default ({ navigation, route }: HomeProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Listar Clientes"
          color={'#4682B4'}
          onPress={() => navigation.navigate('ListarClientes')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Cadastrar Cliente"
          color={'#4682B4'}
          onPress={() => navigation.navigate('CadastroCliente')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Cadastro Atendimento"
          color={'#4682B4'}
          onPress={() => navigation.navigate('CadastroAtendimento')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
});
