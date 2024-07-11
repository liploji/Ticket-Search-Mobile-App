import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigation = useNavigation();

  const handleLogin = () => {
    if (username === 'John123' && password === '123456') {
      dispatch({ type: 'SET_USER', payload: { name: 'John' } });
      navigation.navigate('Home');
    } else {
      Alert.alert('Invalid Credentials','Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome, {user.name}!</Text>
        </View>
      ) : (
        <View style={styles.loginContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <Button title="Login" onPress={handleLogin} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loginContainer: {
    width: '80%',
    padding: 20,
    borderRadius: 8,
  },
  input: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  welcomeContainer: {
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
