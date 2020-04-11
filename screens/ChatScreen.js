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
import moment from "moment"
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
    avatar: require("../assets/images/Shane_Pro_Pic.jpeg"),
    timestamp: "1569109273726"

  },
  {
    name: "Test",
    id: "2",
    avatar: require("../assets/images/Shane_Pro_Pic.jpeg"),
    timestamp: "1569109273726"
  }
];
const ChatScreen = props => {
  const [chatRoomId, setChatRoomId] = React.useState([]);
  const [conversations, setConversations] = React.useState([]);
  async function fetchChats() {
    const chatRoom = await Fire.getChatRoomId(user.uid);
    return chatRoom;
  }
  React.useEffect(() => {
    let chatRoomIds = "";
    let conversationsArr = [];
    fetchChats()
      .then(chatRoom => {
        chatRoomIds = Object.keys(chatRoom);

        setChatRoomId(Object.keys(chatRoom));
        const usersArr = Object.values(chatRoom);
        let chatObj;
        for (let i = 0; i < usersArr.length; i++) {
          chatObj = usersArr[i];
          let chatUsers = chatObj.users;
          let friend = chatUsers.filter(
            cUsers => cUsers.uid !== props.user.uid
          )[0];
          friend.chatRoomId = chatRoomIds[i];

          conversationsArr.push(friend);
        }

        return conversationsArr;
      })
      .then(conversationsArr1 => setConversations(conversationsArr1));
  }, []);
  const user = useSelector(state => state.user);

  const renderFriend = cArr => {
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("ChatRoom", {
              chatRoomId: cArr.chatRoomId,
              avatar: cArr.avatar
            })
          }
        >
          <View style={styles.messageItem}>
            <Image source={{ uri: cArr.avatar }} style={styles.avatar} />
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center"
                }}
              >
                <Text style={styles.name}>{cArr.name}</Text>
                <Text style={styles.timestamp}>
              {moment(dummyChat.timestamp).fromNow()}
            </Text>
                {/* <Feather
                name="trash"
                size={24}
                color="#737888"
                style={{ marginLeft: 50, alignItems: "flex-end" }}
              /> */}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.feed}
        data={conversations}
        renderItem={({ item }) => renderFriend(item)}
        keyExtractor={(index, item) => item.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
    // </>
  );
};

const mapStateToProps = state => ({
  user: state.user,
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
  },
  timestamp: {
    fontSize: 11,
    // color: "#C4C6CE",
    color: "#454D65",

    marginTop: 4,
    marginLeft: 170
  },
});
