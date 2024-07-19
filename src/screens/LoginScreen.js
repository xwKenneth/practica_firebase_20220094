import React, { useState } from 'react'; // Importamos React y useState para manejar el estado del componente
import { View, StyleSheet, Text } from 'react-native'; // Importamos componentes de React Native
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Importamos funciones de autenticación de Firebase
import LoginForm from '../components/LoginForm'; // Importamos el componente LoginForm
import ErrorText from '../components/ErrorText'; // Importamos el componente ErrorText

const LoginScreen = ({ navigation }) => { // Definimos el componente funcional LoginScreen, que recibe "navigation" como prop
  // Definimos estados locales para email, password y error
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    const auth = getAuth(); // Obtenemos la instancia de autenticación de Firebase
    // Intentamos iniciar sesión con email y password
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => { // Si la autenticación es exitosa
        const user = userCredential.user; // Obtenemos el usuario autenticado
        console.log('Logged in with:', user.email); // Imprimimos en consola el email del usuario
        setError(''); // Reseteamos el mensaje de error
        navigation.navigate('Home'); // Navegamos a la pantalla "Home"
      })
      .catch((error) => { // Si ocurre un error en la autenticación
        console.error('Error logging in:', error); // Imprimimos el error en consola
        // Actualizamos el estado de error con un mensaje de error amigable
        setError('Failed to log in. Please check your email and password.');
      });
  };

  return (
    // Renderizamos la vista del componente
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text> // Título de la pantalla de login
      <ErrorText error={error} /> // Componente para mostrar el mensaje de error
      <LoginForm
        email={email} // Pasamos el estado del email al componente LoginForm
        setEmail={setEmail} // Pasamos la función para actualizar el estado del email
        password={password} // Pasamos el estado del password al componente LoginForm
        setPassword={setPassword} // Pasamos la función para actualizar el estado del password
        handleLogin={handleLogin} // Pasamos la función handleLogin para manejar el inicio de sesión
        navigation={navigation} // Pasamos el objeto de navegación al componente LoginForm
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

export default LoginScreen; // Exportamos el componente LoginScreen por defecto
