import * as React from "react";
import {
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  Text
} from "react-native";
import Fire from "../Firebase";
import firebase from "firebase"
import { connect } from "react-redux";

import ChatRoom from "./ChatRoom";
import { getMessages } from "../store/messages";
const ChatScreen = props => {
  const [chatRoomId, setChatRoomId] = React.useState([]);
  const [messages, setMessages] = React.useState([])
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
    return () => {
      Fire.off();
    };
  }, []);
  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate("ChatRoom", { chatRoomId: chatRoomId[0] })
        }
      >
        <Text>Move to ChatRoom</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  messages: state.messages
});
const mapDispatchToProps = dispatch => ({
  fetchMessages: chatRoomId => dispatch(getMessages(chatRoomId))
});
export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
