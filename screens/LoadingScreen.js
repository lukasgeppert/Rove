import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

export default LoadingScreen = () => {
  // const [state, setstate] = useState(initialState);
  const { navigate } = useNavigation();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      // console.log("user at loading screen", user);

      navigate(user ? "Home" : "Login");
    });
  });

  return (
    <View style={styles.container}>
      <Text>Loading Screen...</Text>
      <ActivityIndicator size="large"></ActivityIndicator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
