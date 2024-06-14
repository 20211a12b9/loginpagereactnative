import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
const SignInScreen = () => {
  const navigation = useNavigation(); // Use the navigation hook

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const signUp = () => {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('Successfully signed up!');
        // Navigate to login screen after successful sign-up
        navigation.navigate('Login');
      })
      .catch(error => {
        Alert.alert('Sign up failed', error.message);
      });
  };

  const navigateToLogin = () => {
    navigation.navigate('Login'); // Navigate to LoginScreen
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={signUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="facebook" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="twitter" size={24} color="lightblue" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="google" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={navigateToLogin} style={styles.loginLink}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
  },
  buttonContainer: {
    width: '100%',
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  socialButton: {
    marginHorizontal: 10,
  },
  loginLink: {
    marginTop: 20,
  },
  loginText: {
    color: 'blue',
    fontSize: 16,
  },
});

export default SignInScreen;
