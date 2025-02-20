# 🔐 SecureVault - Password Manager

SecureVault is a secure and user-friendly password manager built with React Native and Expo, designed to store, encrypt, and manage passwords locally on a mobile device. React Native was chosen for its cross-platform compatibility, allowing a seamless experience on both Android and iOS from a single codebase, while Expo simplifies development, testing, and deployment without requiring native code modifications.

The app ensures strong security by hashing user passwords with SHA-256 + unique salts before storage and encrypting service passwords using a secure key-based encryption method. Passwords are only decrypted when needed, ensuring that sensitive data is never exposed in plaintext. With a focus on both usability and cybersecurity, SecureVault provides an intuitive interface for users to securely store, view, and manage their credentials while following best practices for data protection and authentication.
## 🚀 Features

- **Secure Registration & Login**: User authentication with **hashed passwords** and **salted encryption**.
- **Password Encryption**: Uses **Expo SecureStore** and **Crypto API** for strong **SHA-256 hashing and Base64 encoding**.
- **Add, View & Manage Passwords**: Users can store service credentials, view stored passwords, and manage entries.
- **Password Visibility Protection**: Requires login password to **decrypt** and display stored passwords.
- **Secure Password Generation**: Built-in password generator ensures **strong, random passwords**.
- **Time-based Security Alerts**: Reminds users to **update passwords periodically** based on age.
- **Clipboard Integration**: Copy passwords to clipboard for quick access.
- **External URL Handling**: Allows users to open service URLs directly.
- **Session Management**: Logs users out securely after inactivity.

---

## 🛠️ Tech Stack

| **Technology**      | **Purpose** |
|---------------------|-------------|
| **React Native**   | Cross-platform mobile development |
| **Expo**           | Simplifies React Native development |
| **Expo SecureStore** | Secure data storage |
| **Expo Crypto**    | Hashing and encryption |
| **TypeScript (TSX)** | Type safety and better maintainability |
| **Expo Router**    | Navigation and screen management |

---

## 📂 Project Structure

- **SECUREVAULT/**
  
  - **app/**
      - **add-password/**
        - `add-password.styles.ts`
        - `add-password.tsx`
      - **login/**
        - `login.styles.ts`
        - `login.tsx`
      - **main/**
        - `main.styles.ts`
        - `main.tsx`
      - **register/**
        - `register.styles.ts`
        - `register.tsx`
      - `_layout.tsx`
      - `index.tsx`
  - **assets/**
    - **fonts/**
    - **images/**
  - **hooks/**
  - **utils/**
    - `encryptionKey.ts`
  - `README.md`
  
---

## 📜 Installation Guide

### 1: Prerequisites
- Install **Node.js** (LTS version)
- Install **Expo CLI** globally:
  ```bash
  npm install -g expo-cli
  ```
### 2: Clone Repository
```bash
git clone https://github.com/CodeSentinelDev/SecureVault.git
cd SecureVault
```

### 3: Install Dependencies
```bash
npm install
```

### 4: Run the App
```bash
npx expo start
```
- Scan the QR code with Expo Go (Android/iOS) to test.

📌 Note: Since the project is built with Expo, you do not need to install Android Studio or Xcode to run the app on a real device. Simply scan the QR code shown in the terminal using the Expo Go app.

## 🔐 Security & Encryption
🔸 Secure Password Storage
- Uses Expo SecureStore for local encrypted storage.
- User passwords are hashed with SHA-256 and a unique salt before storage.
- Service passwords are encrypted before being saved.

🔸 Decryption & Authentication
- Passwords are decrypted only when the user enters their login password.
- Ensures that each user has access only to their stored passwords.

🔸 Protection Against Attacks
- Brute-force protection: Login requires exact password match.
- No plaintext storage: All passwords are hashed or encrypted before storage.
- Session Management: Users must re-authenticate after logout.


## 🔄 Future Improvements
✅ Biometric Authentication (Face ID / Fingerprint)

✅ Cloud Backup & Sync (Encrypted storage for multiple devices)

✅ Multi-Factor Authentication (MFA)

✅ Password Import/Export Functionality


## 👨‍💻 Author
Created by CodeSentinelDev

## 📜 License
This project is licensed under the MIT License.
