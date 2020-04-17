import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  LayoutAnimation
} from "react-native";
import { AuthContext } from "./AuthContext";
import { connect } from "react-redux";
import Fire from "../Firebase";

const FriendProfile = props => {

  const [user, setUser] = useState(null);
  let name = props.user.name || "traveler";
  useEffect(() => {
    Fire.getUser(props.route.params.frienduid).then(userInfo =>
      setUser(userInfo)
    );
  }, []);

  const sendRequest = user => {
    Fire.sendFriendRequest(user.uid, user.name);
    props.navigation.navigate("Profile");
  };

  LayoutAnimation.easeInEaseOut();
  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.header}>{user.name}&apos;s Profile Page</Text>
          <Image
            source={{ uri: user.image }}
            style={styles.avatar}
            resizeMode="contain"
          />
          <Text style={styles.header2}> {user.name}&apos;s Bio:</Text>
          <Text style={styles.paragraph}>{user.aboutMe}</Text>
          <Text style={styles.header2}>{user.name}&apos;s Location:</Text>
          <Text style={styles.paragraph}> {user.location}</Text>
          <Text style={styles.header2}>{user.name}&apos;s interests are: </Text>
          {user.interests.map(interest => {
            return (
              <Text style={styles.interestList} key={interest}>
                {interest}
              </Text>
            );
          })}
        </>
      ) : (
        <>
          <Text>Hello, {name}</Text>
          <Text>Your friend has not built out their profile yet!</Text>
        </>
      )}
      <TouchableOpacity>
        <Text style={styles.buttonProfile} onPress={() => props.navigation.navigate("Profile")}>Back to Profile</Text>
      </TouchableOpacity>
      {!props.route.params.request ? (
        <TouchableOpacity>
          <Text style={styles.buttonProfile} onPress={() => sendRequest(user)}>
            Send a Friend Request
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, width: 100 + "%", height: 100 + "%" },
  header: {
    fontSize: 30,
    alignSelf: "center",
    marginTop: 10
  },
  header2: {
    marginTop: 10,
    fontSize: 18,
    alignSelf: "center",
    textDecorationLine: "underline"
  },
  paragraph: {
    fontSize: 14,
    alignSelf: "center"
  },
  buttonProfile: {
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    color: "rgb(215,106,97)"
  },
  buttonLogout: {
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    color: "rgb(215,106,97)"
  },
  interestList: {
    alignSelf: "center",
    fontSize: 14
  },
  buildingButton: {
    alignSelf: "center",
    height: 300,
    aspectRatio: 1.5
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  avatar: {
    height: 150,
    margin: 15
  }
});

const mapState = state => ({
  user: state.user
});

export default connect(mapState)(FriendProfile);
