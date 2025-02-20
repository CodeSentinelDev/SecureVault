import React, { useState, useEffect } from 'react'; 
import { 
  View, Text, TextInput, TouchableOpacity, Alert, 
  KeyboardAvoidingView, ScrollView, Platform, 
  TouchableWithoutFeedback, Keyboard 
} from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import styles from './add-password.styles';
import { getStoredKey } from '@/utils/encryptionKey';

const AddPasswordScreen: React.FC = () => {
  const router = useRouter();
  const [serviceName, setServiceName] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  /** 🔹 Fetch the currently logged-in user */
  useEffect(() => {
    const fetchUser = async () => {
      const user = await SecureStore.getItemAsync('currentUser');
      if (!user) {
        Alert.alert('Error', 'No authenticated user.');
        router.replace('/login/login');
        return;
      }
      setCurrentUser(user);
    };
    fetchUser();
  }, []);

  /** 🔹 Generate a secure password */
  const generateSecurePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    setPassword(Array.from({ length: 16 }, () => chars[Math.floor(Math.random() * chars.length)]).join(''));
  };

  /** 🔹 Encrypt and Save the password */
  const savePassword = async () => {
    if (!currentUser || !serviceName || !password) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    const encryptionKey = await getStoredKey();
    if (!encryptionKey) {
      Alert.alert('Error', 'Encryption key not found.');
      return;
    }

    // 🔹 Encrypt password using Base64 (or AES if implemented)
    const encryptedPassword = btoa(password + encryptionKey);

    // 🔹 Store the encrypted password
    const storedData = await SecureStore.getItemAsync('passwords');
    const passwords = storedData ? JSON.parse(storedData) : {};
    passwords[currentUser] = [...(passwords[currentUser] || []), {
      id: Date.now().toString(),
      service: serviceName,
      password: encryptedPassword,
      url,
      lastModified: new Date().toISOString(),
    }];

    await SecureStore.setItemAsync('passwords', JSON.stringify(passwords));
    Alert.alert('Success', 'Password saved!');
    router.replace('/main/main');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Add Password</Text>

          <TextInput
            placeholder="Service Name"
            placeholderTextColor="#555"
            style={styles.input}
            value={serviceName}
            onChangeText={setServiceName}
          />

          <TextInput
            placeholder="Enter Password"
            placeholderTextColor="#555"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.generateButton} onPress={generateSecurePassword}>
            <Text style={styles.generateButtonText}>Generate Secure Password</Text>
          </TouchableOpacity>

          <TextInput
            placeholder="Service URL (optional)"
            placeholderTextColor="#555"
            style={styles.input}
            value={url}
            onChangeText={setUrl}
          />

          <TouchableOpacity style={styles.saveButton} onPress={savePassword}>
            <Text style={styles.saveButtonText}>Save Password</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AddPasswordScreen;
