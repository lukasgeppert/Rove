import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  LayoutAnimation
} from "react-native";
import * as firebase from "firebase";
import { AuthContext } from "./AuthContext";

const HomeScreen = () => {
  const [email, setEmail] = useState("");
  const { signOut } = React.useContext(AuthContext);

  useEffect(() => {
    const { email } = firebase.auth().currentUser;
    console.log('gimme email', email);
    console.log(firebase.auth().currentUser);

    setEmail(email);
  });

  const signOutUser = () => {
    signOut();
  };
  LayoutAnimation.easeInEaseOut();

  return (
    <View style={styles.container}>
      <Text>HELLO {email}</Text>
      <TouchableOpacity onPress={signOutUser}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, width: 100 + "%", height: 100 + "%" }
});

export default HomeScreen;
