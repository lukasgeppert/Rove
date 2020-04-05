import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import * as firebase from "firebase";
import Fire from "../Firebase";
import { useSelector } from "react-redux";

// To Do  - Plug in Redux

const ChatFriendsList = (props) => {
  const user = useSelector((state) => state.user);

  const [friends, setFriends] = useState([]);

  const fetchFriends = async () => {
    const friends = await Fire.getFriends(user.uid);

    return friends;
  };

  useEffect(() => {
    fetchFriends().then((friends) => setFriends(friends));
  }, []);

  const renderFriend = (friend) => {
    console.log("gimme friend", friend);
    return (
      <View>
        <View style={styles.messageItem}>
          {/* <Image source={dummyChat.avatar} style={styles.avatar} /> */}
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={async () => {
                  let chat = await Fire.getSingleChatRoom(
                    friend.friend._id,
                    friend.friend.name
                  );
                  let chatRoomId = Object.keys(chat)[0];
                  props.navigation.navigate("ChatRoom", { chatRoomId });
                }}
              >
                <Text style={styles.name}>Message {friend.friend.name} </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => props.navigation.navigate('Profile', {screen: "Friend Profile", params: {frienduid: friend.friend._id}})}>
                <Text>Check {friend.friend.name}&apos;s profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.feed}
        data={friends}
        renderItem={({ item }) => renderFriend(item)}
        keyExtractor={(index, item) => item.toString()}
      />
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: { flex: 1, width: 100 + "%", height: 100 + "%" }
// });
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFECF4",
  },
  header: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D64",
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 0,
    padding: 5,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
    alignSelf: "stretch",
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65",
  },
  messageItem: {
    // borderWidth: 1,
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 10,
    flexDirection: "row",
    marginVertical: 3,
    marginTop: 12,
  },

  feed: {
    marginHorizontal: 5,
  },
});

export default ChatFriendsList;
