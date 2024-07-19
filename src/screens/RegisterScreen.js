import React, { useState } from 'react'; // Importa React y useState para manejar el estado del componente
import { View, StyleSheet, Text } from 'react-native'; // Importa componentes de React Native
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Importa funciones de autenticación de Firebase
import RegisterForm from '../components/RegisterForm'; // Importa el componente RegisterForm
import ErrorText from '../components/ErrorText'; // Importa el componente ErrorText

const RegisterScreen = ({ navigation }) => { // Define el componente funcional RegisterScreen, que recibe "navigation" como prop
  // Define estados locales para email, password y error
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Función para manejar el registro de usuario
  const handleRegister = () => {
    const auth = getAuth(); // Obtiene la instancia de autenticación de Firebase
    createUserWithEmailAndPassword(auth, email, password) // Intenta crear un nuevo usuario con email y password
      .then((userCredential) => { // Si el registro es exitoso
        const user = userCredential.user; // Obtiene el usuario registrado
        console.log('Registered with:', user.email); // Imprime en consola el email del usuario registrado
        setError(''); // Resetea el mensaje de error
        navigation.navigate('Login'); // Navega a la pantalla "Login"
      })
      .catch((error) => { // Si ocurre un error en el registro
        console.error('Error registering:', error); // Imprime el error en consola
        // Actualiza el estado de error con un mensaje amigable
        setError('Failed to register. Please check your email and password.');
      });
  };

  return (
    // Renderiza la vista del componente
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text> // Título de la pantalla de registro
      <ErrorText error={error} /> // Componente para mostrar el mensaje de error
      <RegisterForm
        email={email} // Pasa el estado del email al componente RegisterForm
        setEmail={setEmail} // Pasa la función para actualizar el estado del email
        password={password} // Pasa el estado del password al componente RegisterForm
        setPassword={setPassword} // Pasa la función para actualizar el estado del password
        handleRegister={handleRegister} // Pasa la función handleRegister para manejar el registro de usuario
        navigation={navigation} // Pasa el objeto de navegación al componente RegisterForm
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { // Estilos para el contenedor principal
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: { // Estilos para el título
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default RegisterScreen; // Exporta el componente RegisterScreen por defecto
