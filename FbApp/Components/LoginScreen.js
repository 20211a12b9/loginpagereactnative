import React,{useState} from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet,Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import auth from '@react-native-firebase/auth'; 
const LoginScreen = () => {
  const navigation = useNavigation(); // Use the hook

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      // Handle successful login
      console.log('User logged in:', userCredential.user.email);
      // Navigate to another screen upon successful login
      navigation.navigate('SignIn'); // Replace 'SignIn' with the screen you want to navigate to
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  };
  const navigateToSignUp = () => {
    navigation.navigate('SignIn'); // Navigate to SignInScreen
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
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
      <TouchableOpacity onPress={navigateToSignUp}>
        <Text style={{ marginTop: 20 }}>New user? Sign Up here!</Text>
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
});

export default LoginScreen;
