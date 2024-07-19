import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import RegisterForm from '../components/RegisterForm';
import ErrorText from '../components/ErrorText';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Registered with:', user.email);
        setError('');
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('Error registering:', error);
        setError('Failed to register. Please check your email and password.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <ErrorText error={error} />
      <RegisterForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleRegister={handleRegister}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default RegisterScreen;
