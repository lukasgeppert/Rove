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
import Fire from "../Firebase";
import { useSelector } from "react-redux";

// To Do  - Plug in Redux

const ChatFriendsList = props => {
  const user = useSelector(state => state.user);
  console.log("UID", user.uid);

  const [friends, setFriends] = useState([]);

  const fetchFriends = async () => {
    const friends = await Fire.getFriends(user.uid);
    console.log("F is for Friends who do stuff together", friends);

    return friends;
  };

  useEffect(() => {
    fetchFriends().then(friends => setFriends(friends));
  }, []);

  const renderFriend = friend => {
    console.log("gimme friend", friend);
    return (
      <View>
        <TouchableOpacity
          onPress={async () => {
            let chat = await Fire.getSingleChatRoom(friend.friend._id);
            let chatRoomId = Object.keys(chat)[0];
            props.navigation.navigate("ChatRoom", { chatRoomId });
          }}
        >
          <Text>{friend.friend.name}</Text>
        </TouchableOpacity>
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
