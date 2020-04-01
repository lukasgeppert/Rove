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
import { useSelector } from "react-redux";

// To Do  - Plug in Redux

const ChatFriendsList = props => {
  const user = useSelector(state => state.user);
  console.log("UID", user.uid);

  const [friends, setFriends] = useState([]);

  const fetchFriends = async () => {
    const friends = await Firebase.getFriends(user.uid);
    console.log("F is for Friends who do stuff together", friends);

    return friends;
  };

  useEffect(() => {
    fetchFriends().then(friends => setFriends(friends));
  }, []);

  const renderFriend = friend => {
    console.log('gimme friend', friend)
    return (
      <View>
        <Text>{friend.friend.name}</Text>
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
