import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, Alert, TextInput, 
  KeyboardAvoidingView, ScrollView, Platform, TouchableWithoutFeedback, Keyboard, Linking 
} from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';
import * as Clipboard from 'expo-clipboard';
import styles from './main.styles';
import { getStoredKey } from '@/utils/encryptionKey';

const MainScreen: React.FC = () => {
  const router = useRouter();

  // 🔹 State Variables
  const [savedPasswords, setSavedPasswords] = useState<any[]>([]);
  const [enteredPasswords, setEnteredPasswords] = useState<{ [key: string]: string }>({});
  const [selectedPasswords, setSelectedPasswords] = useState<{ [key: string]: string }>({});
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [encryptionKey, setEncryptionKey] = useState<string | null>(null);

  // 🔹 Load User Session & Fetch Passwords
  useEffect(() => {
    const initialize = async () => {
      const user = await SecureStore.getItemAsync('currentUser');
      if (!user) {
        Alert.alert('Session Expired', 'Please log in again.');
        router.replace('/login/login');
        return;
      }

      setCurrentUser(user);

      // Fetch Encryption Key
      const key = await getStoredKey();
      if (!key) {
        Alert.alert('Error', 'Encryption key not found.');
        return;
      }
      setEncryptionKey(key);

      // Load Stored Passwords
      const storedData = await SecureStore.getItemAsync('passwords');
      const passwords = storedData ? JSON.parse(storedData) : {};
      setSavedPasswords(passwords[user] || []);
    };

    initialize();
  }, []);

  // 🔹 Copy Password to Clipboard
  const copyToClipboard = async (password: string) => {
    await Clipboard.setStringAsync(password);
    Alert.alert("Copied!", "Password copied to clipboard.");
  };

  // 🔹 Calculate Days Since Last Password Change
  const calculateDaysSinceLastChange = (lastModified: string) => {
    const lastChangeDate = new Date(lastModified);
    return Math.floor((new Date().getTime() - lastChangeDate.getTime()) / (1000 * 3600 * 24));
  };

  // 🔹 Get Banner Color Based on Password Age
  const getBannerColor = (days: number) => {
    return days <= 30 ? 'green' : days <= 59 ? 'orange' : 'red';
  };

  // 🔹 Decrypt Password
  const decryptPassword = async (encryptedPassword: string) => {
    if (!encryptionKey) return 'Error: No Key Found';

    try {
      const decoded = atob(encryptedPassword);
      return decoded.replace(encryptionKey, '');
    } catch (error) {
      console.error('Error decrypting password:', error);
      return 'Decryption Failed';
    }
  };

  // 🔹 Handle Password Access
  const handlePasswordAccess = async (item: any) => {
    if (!currentUser || !encryptionKey) {
      Alert.alert('Error', 'Session or key missing. Please log in again.');
      router.replace('/login/login');
      return;
    }

    // Fetch Stored Users
    const storedUsers = await SecureStore.getItemAsync('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    const user = users.find((u: { email: string }) => u.email === currentUser);

    if (!user) {
      Alert.alert('Error', 'User not found. Please log in again.');
      router.replace('/login/login');
      return;
    }

    // Verify Login Password
    const hashedInputPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      enteredPasswords[item.id] + user.salt
    );

    if (hashedInputPassword === user.hashedPassword) {
      const decryptedPassword = await decryptPassword(item.password);
      setSelectedPasswords((prev) => ({ ...prev, [item.id]: decryptedPassword || 'Decryption Error' }));
    } else {
      Alert.alert('Error', 'Incorrect login password.');
    }
  };

  // 🔹 Delete Password Entry
  const handleDeletePassword = async (itemId: string) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this password? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete', style: 'destructive', onPress: async () => {
            if (!currentUser) return;

            const storedData = await SecureStore.getItemAsync('passwords');
            const passwords = storedData ? JSON.parse(storedData) : {};
            passwords[currentUser] = passwords[currentUser].filter((item: any) => item.id !== itemId);

            await SecureStore.setItemAsync('passwords', JSON.stringify(passwords));
            setSavedPasswords(passwords[currentUser]);
          },
        },
      ]
    );
  };

  // 🔹 Logout User
  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('currentUser');
    router.replace('/login/login');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <Text style={styles.title}>Password Vault</Text>

            {savedPasswords.length === 0 ? (
              <Text style={styles.emptyMessage}>No saved passwords yet.</Text>
            ) : (
              <FlatList
                data={savedPasswords}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                scrollEnabled={true}
                ListFooterComponent={<View style={{ height: 1 }} />}
                renderItem={({ item }) => {
                  const daysSinceLastChange = calculateDaysSinceLastChange(item.lastModified);
                  return (
                    <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={Keyboard.dismiss}>
                      <View style={styles.passwordItem}>
                        <Text style={styles.passwordText}>{item.service}</Text>
                        <View style={[styles.banner, { backgroundColor: getBannerColor(daysSinceLastChange) }]}>
                          <Text style={styles.bannerText}>{daysSinceLastChange} days since last modification</Text>
                        </View>

                        <TextInput
                          placeholder="Enter your login password"
                          placeholderTextColor="#555"
                          style={styles.input}
                          secureTextEntry
                          value={enteredPasswords[item.id] || ""}
                          onChangeText={(text) =>
                            setEnteredPasswords((prev) => ({ ...prev, [item.id]: text }))
                          }
                        />

                        <TouchableOpacity style={styles.accessButton} onPress={() => handlePasswordAccess(item)}>
                          <Text style={styles.accessButtonText}>View Password</Text>
                        </TouchableOpacity>

                        {selectedPasswords[item.id] && (
                          <>
                            <TouchableOpacity onPress={() => copyToClipboard(selectedPasswords[item.id])}>
                              <Text style={styles.revealedPassword}>🔑 {selectedPasswords[item.id]} (Tap to Copy)</Text>
                            </TouchableOpacity>

                            {item.url && (
                              <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                                <Text style={styles.urlText}>🔗 {item.url}</Text>
                              </TouchableOpacity>
                            )}

                            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeletePassword(item.id)}>
                              <Text style={styles.deleteButtonText}>Delete</Text>
                            </TouchableOpacity>
                          </>
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            )}

            <TouchableOpacity style={styles.addButton} onPress={() => router.push("/add-password/add-password")}>
              <Text style={styles.addButtonText}>+ Add Password</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default MainScreen;
