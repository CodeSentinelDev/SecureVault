import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';
import styles from './register.styles';

const RegisterScreen: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const generateSalt = async (): Promise<string> => {
    return await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, Math.random().toString());
  };

  const hashPassword = async (password: string, salt: string): Promise<string> => {
    return await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password + salt);
  };

  const saveUser = async (email: string, hashedPassword: string, salt: string) => {
    const existingUsers = await SecureStore.getItemAsync('users');
    const users = existingUsers ? JSON.parse(existingUsers) : [];

    users.push({ email, hashedPassword, salt });
    await SecureStore.setItemAsync('users', JSON.stringify(users));
  };

  const isUserUnique = async (email: string): Promise<boolean> => {
    const existingUsers = await SecureStore.getItemAsync('users');
    const users = existingUsers ? JSON.parse(existingUsers) : [];
    return !users.some((user: { email: string }) => user.email === email);
  };

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    const uniqueUser = await isUserUnique(email);
    if (!uniqueUser) {
      Alert.alert('Error', 'This email is already registered.');
      return;
    }

    const salt = await generateSalt();
    const hashedPassword = await hashPassword(password, salt);
    await saveUser(email, hashedPassword, salt);

    Alert.alert('Success', 'Your account has been created.');
    router.replace('/login/login');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Register</Text>

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
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <TextInput
            placeholder="Confirm your password"
            placeholderTextColor="#555"
            style={styles.input}
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
