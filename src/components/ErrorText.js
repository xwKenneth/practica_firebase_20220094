import React from 'react';
import { Text, StyleSheet } from 'react-native';

const ErrorText = ({ error }) => {
  return error ? <Text style={styles.errorText}>{error}</Text> : null;
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default ErrorText;
