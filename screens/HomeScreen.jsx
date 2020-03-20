import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import * as firebase from "firebase";

const HomeScreen = () => {
  // componentDidMount() {
  //   alert(Dimensions.get('window').width); --> width of 414
  // }
  // const [email, setEmail] = useState("");
  // const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const { email, displayName } = firebase.auth().currentUser;
    console.log(firebase.auth().currentUser);

    setEmail(email);
    setDisplayName(displayName);
  });

  signOutUser = () => {
    firebase.auth().signOut();
  };

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
