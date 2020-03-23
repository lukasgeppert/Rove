import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase";
import { AuthContext } from "./AuthContext";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { signIn } = React.useContext(AuthContext);

  const login = () => {
    signIn(email, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{`Welcome back, traveler`}</Text>

      <View style={styles.errorMessage}>
        {error && <Text style={styles.errorMessage}>{error}</Text>}
      </View>

      <View styles={styles.form}>
        <Text style={styles.inputTitle}>Email Address</Text>
        <TextInput
          style={styles.input}
          required
          autoCapitalize="none"
          onChangeText={email => setEmail(email)}
          value={email}
        />

        <View styles={{ marginTop: 32 }}>
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
      </View>

      <Button style={styles.login} title="Login" onPress={login} />

      <TouchableOpacity
        style={{ color: "red" }}
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        <Text style={styles.text}>
          New around here?
          <Text style={{ fontWeight: "500", color: "red" }}> Come explore</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center"
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase",
    marginHorizontal: 25
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 17,
    borderRadius: 50,
    marginBottom: 25,
    justifyContent: "center",
    textAlign: "center"
  },
  text: {
    textAlign: "center"
  }
});

export default Login;
