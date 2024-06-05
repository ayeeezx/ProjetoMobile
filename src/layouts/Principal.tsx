import React from 'react';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { HomeProps } from '../types';

const HomeScreen = ({ navigation }: HomeProps) => {

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1519681393784-d120267933ba' }} // Imagem de fundo impactante
      style={styles.background}
    >
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.6)']}
        style={styles.overlay}
      >
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
      </LinearGradient>
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
    width: '100%',
    padding: 20,
  },
  title: {
    fontSize: 36,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'sans-serif-condensed', // Fonte personalizada
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#87CEEB',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    elevation: 3, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    fontFamily: 'sans-serif-light', // Fonte estilizada
  },
});

export default HomeScreen;
