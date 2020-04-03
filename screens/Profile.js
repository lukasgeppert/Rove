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
import { connect } from "react-redux";
import Firebase from "../Firebase";

const Profile = props => {
  // console.log("props is: ", props);
  //Jason's Wacky Experimental Chamber
  useEffect(() => {
    async function fetchUser() {
      const user = await Firebase.user;
      return user;
    }
    // fetchUser().then(user => console.log("please give me information: ", user));
  }, []);

  useEffect(() => {}, []);

  useEffect(() => {

  }, []);

  const [email, setEmail] = useState("");
  const { signOut } = React.useContext(AuthContext);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user && user.email) {
        setEmail(user.email);
      }
    });
  }, []);

  const signOutUser = () => {
    setEmail(null);
    signOut();
  };
  LayoutAnimation.easeInEaseOut();
  return (
    <View style={styles.container}>
      <Text>HELLO {email}</Text>
      <TouchableOpacity onPress={signOutUser}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate("Welcome")}>
        <Text>Build My Profile!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, width: 100 + "%", height: 100 + "%" }
});

const mapState = state => ({
  user: state.user
});

export default connect(mapState)(Profile);
