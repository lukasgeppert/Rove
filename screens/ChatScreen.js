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
import { Ionicons, Feather } from "@expo/vector-icons";

import firebase from "firebase";
import { connect } from "react-redux";

import ChatRoom from "./ChatRoom";
import ChatFriendsList from "./ChatFriendsList";

import { getMessages } from "../store/messages";
const dummyChat = [
  {
    name: "Shane",
    id: "1",
    avatar: require("../assets/images/Shane_Pro_Pic.jpeg")
  },
  {
    name: "Test",
    id: "2",
    avatar: require("../assets/images/Shane_Pro_Pic.jpeg")
  }
];
const ChatScreen = props => {
  const renderDummyChat = dummyChat => {
    return (
      <View>
        <View style={styles.messageItem}>
          <Image source={dummyChat.avatar} style={styles.avatar} />
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center"
              }}
            >
              <Text style={styles.name}>{dummyChat.name}</Text>
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

  const [chatRoomId, setChatRoomId] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  React.useEffect(() => {
    let chatRoomId = "";
    async function getChat() {
      const chatRoom = await Fire.getChatRoomId("UOjKnWlgrTXa4PbAQ4aYHRau42o2");
      return chatRoom;
    }
    getChat()
      .then(chatRoom => {
        chatRoomId = Object.keys(chatRoom)[0];
        setChatRoomId(Object.keys(chatRoom));
      })
      .then(() => {
        props.fetchMessages(chatRoomId);
      });
  }, []);
  React.useEffect(() => {
    // return () => {
    //   Fire.off();
    // };
  }, []);
  return (
    // <View>
    //   <TouchableOpacity
    //     onPress={() =>
    //       props.navigation.navigate("ChatRoom", {
    //         chatRoomId: chatRoomId[0]
    //       })
    //     }
    //   >
    //     <Text>Move to ChatRoom</Text>
    //   </TouchableOpacity>
    // </View>
    // <>
    //   {/* <View style={styles.header}>
    //     <TouchableOpacity
    //       onPress={() => props.navigation.navigate("ChatFriendsList")}
    //     >
    //       <Text>Start New Message</Text>
    //     </TouchableOpacity> */}
    //   </View>
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
            data={dummyChat}
            renderItem={({ item }) => renderDummyChat(item)}
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
