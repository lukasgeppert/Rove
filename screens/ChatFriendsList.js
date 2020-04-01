import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList
} from "react-native";
import * as firebase from "firebase";
import Firebase from "../Firebase";

// To Do  - Plug in Redux

const ChatFriendsList = props => {
  const [friends, setFriends] = useState([]);

  const fetchFriends = async () => {
    const friends = await Firebase.getFriends(props.user.uid);
    console.log("F is for Friends who do stuff together", friends);

    return friends;
  };

  useEffect(() => {
    fetchFriends().then(friends => setFriends(friends));
  }, []);

  const renderFriend = friend => {
    return (
      <View>
        <Text>{friend.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={friends}
        renderItem={({ item }) => renderFriend(item)}
        keyExtractor={(index, item) => item.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, width: 100 + "%", height: 100 + "%" }
});

export default ChatFriendsList;
