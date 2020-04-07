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
import moment from "moment";


// To Do  - Plug in Redux

const ChatFriendsList = props => {
  const user = useSelector(state => state.user);

  const [friends, setFriends] = useState([]);
  const fetchFriends = async () => {
    const friends1 = await Fire.getFriends(user.uid);
    return friends1;
  };

  useEffect(() => {
    fetchFriends().then(friends2 => {
      setFriends(friends2);
    });
  }, []);

  const renderFriend = friend => {
    // let friendAvatar = await Fire.getAvatar(friend.friend._id);
    // console.log("friendAvatar", friendAvatar);
    return (
      <View>
        <View style={styles.messageItem}>
          {/* <Image source={{ uri: friendAvatar }} style={styles.avatar} /> */}
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                style={styles.messageButton}
                onPress={async () => {
                  let chat = await Fire.getSingleChatRoom(
                    friend.friend._id,
                    friend.friend.name
                  );
                  if (chat){
                  let chatRoomId = Object.keys(chat)[0];
                  props.navigation.navigate("ChatRoom", { chatRoomId });
                  } 
                }}
              >
                <Text style={styles.name}>Message {friend.friend.name} </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.seeProfileButton}
                onPress={() =>
                  props.navigation.navigate("Profile", {
                    screen: "Friend Profile",
                    params: { frienduid: friend.friend._id }
                  })
                }
              >
                <Text style={styles.nameProfile}>See {friend.friend.name}&apos;s profile</Text>
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
    backgroundColor: "#EFECF4"
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
    padding: 5
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
    alignSelf: "stretch"
  },
  name: {
    fontSize: 14,
    justifyContent: "center",
    color: "white"
  },
  nameProfile: {
    fontSize: 14,
    justifyContent: "center",
    color: "white",
    // margin: 5
  },
  messageItem: {
    // borderWidth: 1,
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 10,
    flexDirection: "row",
    marginVertical: 3,
    marginTop: 12
  },
  seeProfileButton: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 2,
    backgroundColor: "rgb(215,106,97)",
    width: 159,
    // height: 65,
    // margin: 15,
    fontWeight: "bold",
    borderRadius: 12,
    borderColor: "white",
    borderWidth: 1,
    color: "white",
    fontSize: 24,
    overflow: "hidden",
    padding: 12,
    textAlign: "center",
    // marginLeft: 20
  },
  messageButton: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 2,
    backgroundColor: "#3CB371",
    width: 155,
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
    marginLeft: 80,
    marginRight: 150
  },

  feed: {
    marginHorizontal: 5
  }
});

export default ChatFriendsList;
