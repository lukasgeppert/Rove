import * as React from "react";
import {
  View,
  Platform,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  Text,
  StyleSheet,
  FlatList
} from "react-native";
import Fire from "../Firebase";
import { useSelector } from "react-redux";

import { Ionicons, Feather } from "@expo/vector-icons";

import firebase from "firebase";
import { connect } from "react-redux";

import ChatRoom from "./ChatRoom";
import ChatFriendsList from "./ChatFriendsList";

import { getMessages } from "../store/messages";
// const dummyChat = [
//   {
//     name: "Shane",
//     id: "1",
//     avatar: require("../assets/images/Shane_Pro_Pic.jpeg")
//   },
//   {
//     name: "Test",
//     id: "2",
//     avatar: require("../assets/images/Shane_Pro_Pic.jpeg")
//   }
// ];
const ChatScreen = props => {
  const [chatRoomId, setChatRoomId] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  const [conversationsArr, setconversationArr] = React.useState([]);
  async function fetchChats() {
    const chatRoom = await Fire.getChatRoomId(user.uid);
    return chatRoom;
  }
  React.useEffect(() => {
    let chatRoomId = "";

    fetchChats()
      .then(chatRoom => {
        chatRoomId = Object.keys(chatRoom)[0];
        console.log("gimme chatRoom from getChat func", chatRoom);

        setChatRoomId(Object.keys(chatRoom));
        const usersArr = Object.values(chatRoom);
        let chatObj;
        for (let i = 0; i < usersArr.length; i++) {
          chatObj = usersArr[i];
          let chatUsers = chatObj.users;
          let friend = chatUsers[1];
          conversationsArr.push(friend);
        }
        return conversationsArr;
      })
      .then(conversationsArr => setconversationArr(conversationsArr))
      .then(() => {
        props.fetchMessages(chatRoomId);
      });
  }, []);
  const user = useSelector(state => state.user);
  console.log("gimmme user", user);

  const renderFriend = conversationsArr => {
    return (
      <View>
        <View style={styles.messageItem}>
          <Image
            source={{ uri: conversationsArr.avatar }}
            style={styles.avatar}
          />
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center"
              }}
            >
              <Text style={styles.name}>{conversationsArr.name}</Text>
              {/* <Feather
                name="trash"
                size={24}
                color="#737888"
                style={{ marginLeft: 50, alignItems: "flex-end" }}
              /> */}
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate("ChatRoom", {
            chatRoomId: chatRoomId[0]
          })
        }
      >
        <FlatList
          style={styles.feed}
          data={conversationsArr}
          renderItem={({ item }) => renderFriend(item)}
          keyExtractor={(index, item) => item.toString()}
          showsVerticalScrollIndicator={false}
        />
      </TouchableOpacity>
    </View>
    // </>
  );
};

const mapStateToProps = state => ({
  messages: state.messages
});
const mapDispatchToProps = dispatch => ({
  fetchMessages: chatRoomId => dispatch(getMessages(chatRoomId))
});
export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);

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
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65"
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

  feed: {
    marginHorizontal: 5
  }
});
