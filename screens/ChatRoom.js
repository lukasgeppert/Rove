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
export const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    Fire.get(message =>
      setMessages(prevMessages => [...prevMessages, message])
    );
  }, []);
  const grabUser = () => {
    // console.log(this.props.route.params.name);
    return {
      _id: Fire.uid,
      name: Fire.name
    };
  };
  const chat = (
    <GiftedChat
      messages={messages}
      onSend={Fire.send}
      user={grabUser}
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
const mapStateToProps = state => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);