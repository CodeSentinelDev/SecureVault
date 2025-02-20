import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, Image, Alert, 
  KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, 
  Keyboard, Platform 
} from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';
import styles from './login.styles';

const LoginScreen: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  /** 🔹 Handles user login */
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      const storedUsers = await SecureStore.getItemAsync('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      const user = users.find((u: { email: string }) => u.email === email);

      if (!user) {
        Alert.alert('Error', 'User not found. Please register first.');
        return;
      }

      // 🔹 Hash entered password with stored salt
      const hashedInputPassword = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password + user.salt
      );

      if (hashedInputPassword !== user.hashedPassword) {
        Alert.alert('Error', 'Incorrect password.');
        return;
      }

      // ✅ Store the logged-in user
      await SecureStore.setItemAsync('currentUser', email);
      router.replace('/main/main');

    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          {/* 🔹 App Logo */}
          <Image 
            source={require('../../assets/images/logo.png')} 
            style={styles.logo} 
          />

          {/* 🔹 Login Form */}
          <View style={styles.form}>
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor="#555"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              placeholder="Enter your password"
              placeholderTextColor="#555"
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>

          {/* 🔹 Sign Up Link */}
          <TouchableOpacity onPress={() => router.push('/register/register')}>
            <Text style={styles.link}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>

        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
