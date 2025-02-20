import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  /** 🔹 Main container */
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  /** 🔹 Scroll container to handle keyboard adjustments */
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },

  /** 🔹 Page title */
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },

  /** 🔹 Input fields */
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
  },

  /** 🔹 Register button */
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  /** 🔹 Show/Hide Password Toggle */
  togglePassword: {
    marginBottom: 15,
  },

  togglePasswordText: {
    fontSize: 16,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});

export default styles;
