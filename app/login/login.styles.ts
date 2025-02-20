import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  /** 🔹 Main container with centered content */
  container: {
    flex: 1,
    backgroundColor: '#EDF7F6', // Soft background color
    alignItems: 'center',
    justifyContent: 'center',
  },

  /** 🔹 Enables scrolling for smaller screens */
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20, // Prevents elements from being too close when scrolling
  },

  /** 🔹 App logo styling */
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 30,
    borderRadius: 5,
  },

  /** 🔹 Form container */
  form: {
    width: '80%',
    alignItems: 'center',
  },

  /** 🔹 Input field styling */
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#000', // Ensures text is visible
    borderWidth: 1,
    borderColor: '#ccc', // Light border for better visibility
  },

  /** 🔹 Login/Register button styling */
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#333', // Dark button for contrast
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  /** 🔹 Button text */
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  /** 🔹 Sign-up link */
  link: {
    color: '#076db2',
    marginTop: 20,
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});

export default styles;
