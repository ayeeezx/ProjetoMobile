import React from 'react';
import { Button, View, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { HomeProps } from '../types';

const HomeScreen = ({ navigation, route }: HomeProps) => {

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1562076781-6a61aa1c5b87' }} // Uma imagem de fundo moderna
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Menu Principal</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('CadastroCliente')}
          >
            <Text style={styles.buttonText}>Cadastrar Cliente</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ListarClientes')}
          >
            <Text style={styles.buttonText}>Listar Clientes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('CadastroAtendimento')}
          >
            <Text style={styles.buttonText}>Cadastro Atendimento</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ListarAtendimentos')}
          >
            <Text style={styles.buttonText}>Listar Atendimento</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparência para destacar o conteúdo
    padding: 20,
    width: '100%',
  },
  title: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#4682B4',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
