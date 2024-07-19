import React, { useState, useEffect } from 'react'; // Importa React y hooks useState y useEffect
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'; // Importa componentes de React Native
import { database } from '../config/firebase'; // Importa la configuración de Firebase
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'; // Importa funciones de Firestore
import CardProductos from '../components/CardProductos'; // Importa el componente CardProductos
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Importa funciones de autenticación de Firebase

const Home = ({ navigation }) => { // Define el componente funcional Home, que recibe "navigation" como prop
  const [productos, setProductos] = useState([]); // Estado para almacenar los productos
  const [user, setUser] = useState(null); // Estado para almacenar el usuario autenticado

  // useEffect para manejar el estado de autenticación del usuario
  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Si el usuario está autenticado, actualiza el estado
      } else {
        navigation.navigate('Login'); // Si no hay usuario autenticado, navega a la pantalla de Login
      }
    });

    return () => unsubscribeAuth(); // Limpia el suscriptor al desmontar el componente
  }, [navigation]);

  // useEffect para obtener y suscribirse a los datos de los productos en Firestore
  useEffect(() => {
    const q = query(collection(database, 'productos'), orderBy('creado', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() }); // Agrega cada documento al array de productos
      });
      setProductos(docs); // Actualiza el estado de productos
    });

    return () => unsubscribe(); // Limpia el suscriptor al desmontar el componente
  }, []);

  // Función para navegar a la pantalla de agregar producto
  const goToAdd = () => {
    navigation.navigate('Add');
  };

  // Función para renderizar cada producto en la lista
  const renderItem = ({ item }) => (
    <CardProductos
      id={item.id}
      nombre={item.nombre}
      precio={item.precio}
      vendido={item.vendido}
      imagen={item.imagen}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Productos Disponibles</Text>
      {productos.length !== 0 ? ( // Si hay productos disponibles
        <FlatList
          data={productos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      ) : ( // Si no hay productos disponibles
        <Text style={styles.Subtitle}>No hay productos disponibles</Text>
      )}
      <TouchableOpacity style={styles.Button} onPress={goToAdd}>
        <Text style={styles.ButtonText}>Agregar Producto</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { // Estilos para el contenedor principal
    flex: 1,
    backgroundColor: '#FEFEFE',
    justifyContent: 'center',
    padding: 20,
  },
  title: { // Estilos para el título
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  Subtitle: { // Estilos para el subtítulo
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#ff9800',
  },
  Button: { // Estilos para el botón
    backgroundColor: '#0288d1',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    marginHorizontal: 50,
    paddingVertical: 20,
  },
  ButtonText: { // Estilos para el texto del botón
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  list: { // Estilos para la lista
    flexGrow: 1,
  },
});
