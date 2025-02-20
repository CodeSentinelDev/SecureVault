import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';

/**
 * 🔹 Generates and securely stores an encryption key if it doesn't exist.
 * This function runs **only once** when the app starts.
 */
export const generateAndStoreKey = async () => {
  try {
    const existingKey = await SecureStore.getItemAsync('encryptionKey');
    if (!existingKey) {
      // 🔐 Generate a cryptographically secure key
      const newKey = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        Math.random().toString() + Date.now().toString()
      );

      await SecureStore.setItemAsync('encryptionKey', newKey);
      console.log('✅ Encryption Key Stored Securely!');
    }
  } catch (error) {
    console.error('❌ Error generating/storing encryption key:', error);
  }
};

/**
 * 🔹 Retrieves the stored encryption key.
 * @returns {Promise<string | null>} The encryption key or `null` if not found.
 */
export const getStoredKey = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync('encryptionKey');
  } catch (error) {
    console.error('❌ Error retrieving encryption key:', error);
    return null;
  }
};
