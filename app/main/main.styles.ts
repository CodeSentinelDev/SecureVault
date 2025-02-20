import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  /** 📌 Main Container */
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },

  /** 📌 Title Styling */
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  /** 📌 Empty Message Styling */
  emptyMessage: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#888',
    marginTop: 50,
  },

  /** 📌 Individual Password Item Container */
  passwordItem: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  /** 📌 Password Service Name */
  passwordText: {
    fontSize: 18,
  },

  /** 📌 Security Banner */
  banner: {
    marginTop: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },

  /** 📌 Banner Text */
  bannerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },

  /** 📌 Text Input Styling */
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 10,
    fontSize: 16,
    color: '#000',
    borderWidth: 1,
    borderColor: '#ccc',
  },

  /** 📌 View Password Button */
  accessButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  /** 📌 View Password Button Text */
  accessButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  /** 📌 Revealed Password Text */
  revealedPassword: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginTop: 5,
    paddingVertical: 5,
    textDecorationLine: 'underline',
  },

  /** 📌 Add Password Button */
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },

  /** 📌 Add Password Button Text */
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  /** 📌 Logout Button */
  logoutButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  /** 📌 Logout Button Text */
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  /** 📌 URL Link Styling */
  urlText: {
    fontSize: 14,
    color: '#3498db',
    marginTop: 5,
    textDecorationLine: 'underline',
  },

  /** 📌 Delete Button */
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#e74c3c',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },

  /** 📌 Delete Button Text */
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default styles;
