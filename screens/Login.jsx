import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  ImageBackground
} from "react-native";
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
    <SafeAreaView style={styles.container}>
      <View>
        <ImageBackground
          source={require("../assets/images/welcomeSplash.jpg")}
          style={styles.image}
        >
          <Text style={styles.greeting}>{`Welcome Back, Traveler`}</Text>
        </ImageBackground>
      </View>
      <View style={styles.container}>
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
        <TouchableOpacity style={styles.loginButton} onPress={login}>
          <Text style={{ color: "white" }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ color: "red" }}
          onPress={() => navigation.navigate("RegisterScreen")}
        >
          <Text style={styles.text}>
            New around here?
            <Text style={{ fontWeight: "500", color: "red" }}>
              {" "}
              Come explore
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    resizeMode: "contain",
    minHeight: 300,
    borderRadius: 2,
    marginTop: 12,
    // margin: 6,
    padding:20
  },
  greeting: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
    textShadowColor: "#000000",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
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
  },
  loginButton: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 2,
    backgroundColor: "rgb(215,106,97)",
    width: 150,
    margin: 15,
    fontWeight: "bold",
    borderRadius: 12,
    borderColor: "white",
    borderWidth: 1,
    color: "white",
    fontSize: 24,
    overflow: "hidden",
    padding: 12,
    textAlign: "center",
    marginLeft: 135
  }
});

export default Login;
