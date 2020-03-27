import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import { GiftedChat } from "react-native-gifted-chat";
import Fire from "../Firebase";
export const ChatRoom = props => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    let messageArr = [];
    for (let i = 0; i < Object.keys(props.messages).length; i++) {
      let idKey = Object.keys(props.messages)[i];
      let newObj = {
        _id: idKey,
        text: props.messages[idKey].text,
        createdAt: props.messages[idKey].createdAt,
        user: props.messages[idKey].user
      };
      messageArr.push(newObj);
    }

    setMessages(messageArr);
  }, []);
  const grabUser = () => {
    // console.log(this.props.route.params.name);
    return {
      _id: props.user.uid,
      name: props.user.name
    };
  };
  console.log("props", props);
  const chat = (
    <GiftedChat
      messages={messages}
      onSend={message => {
          console.log('message', message)
        Fire.addChatPost(props.user.name, message[0].text, props.user.uid, props.route.params.chatRoomId );
      }}
        user={grabUser()}
        renderUsernameOnMessage={true}
    />
  );
  if (Platform.OS === "android") {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={30}
        enabled
      >
        {chat}
      </KeyboardAvoidingView>
    );
  }
  return <SafeAreaView style={{ flex: 1 }}>{chat}</SafeAreaView>;
};
const mapStateToProps = state => ({
  messages: state.messages,
  user: state.user
});
export default connect(mapStateToProps, null)(ChatRoom);
