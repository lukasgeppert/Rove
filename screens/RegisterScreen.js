import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  Button
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase";
import { AuthContext } from "./AuthContext";

// const DismissKeyboard = ({ children }) => (
//   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
//     {children}
//   </TouchableWithoutFeedback>
// );

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);
  const { signUp } = React.useContext(AuthContext);

  const register = () => {
    if (password === confirmPassword) {
      signUp(email, password, displayName);
    } else {
      setError("Passwords do not match");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="md-arrow-back"
            size={38}
            color="rgb(215,106,97)"
            style={{ marginLeft: 18 }}
          />
        </TouchableOpacity>
        <Text style={styles.rove}>ROVE</Text>
        <Text style={styles.signUp}>SIGN UP</Text>
        <View style={styles.errorMessage}>
          {error && <Text style={styles.errorMessage}>{error}</Text>}
        </View>

        <View styles={styles.form}>
          <Text style={styles.inputTitle}>First & Last Name</Text>
          <TextInput
            style={styles.input}
            required
            onChangeText={displayName => setDisplayName(displayName)}
            value={displayName}
          />

          <Text style={styles.inputTitle}>Email Address</Text>
          <TextInput
            style={styles.input}
            required
            autoCapitalize="none"
            onChangeText={email => setEmail(email)}
            value={email}
          />

          <View>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              required
              secureTextEntry
              autoCapitalize="none"
              onChangeText={password => setPassword(password)}
              value={password}
            />
          </View>

          <View>
            <Text style={styles.inputTitle}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              required
              secureTextEntry
              autoCapitalize="none"
              onChangeText={confirmPassword =>
                setConfirmPassword(confirmPassword)
              }
              value={confirmPassword}
            />
          </View>
        </View>
        <Button
          style={styles.button}
          title="Continue"
          onPress={register}
        ></Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rove: {
    marginTop: 12,
    marginLeft: 18,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "left",
    color: "rgb(95,84,115)"
  },
  signUp: {
    marginTop: 18,
    marginLeft: 18,
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "left",
    color: "rgb(95,84,115)"
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 14,
    textTransform: "uppercase",
    marginHorizontal: 25,
    marginBottom: 10
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 17,
    marginBottom: 40,
    marginHorizontal: 25,
    justifyContent: "center",
    textAlign: "center"
  },
  text: {
    textAlign: "center"
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "rgb(215,106,97)",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default RegisterScreen;
