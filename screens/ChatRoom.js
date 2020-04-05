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
import firebase from "firebase";

export const ChatRoom = props => {
  console.log('props from ChatRoom', props)
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    let unsub = firebase
      .firestore()
      .collection("chatRoom")
      .doc(props.route.params.chatRoomId)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot(querySnapshot => {

        let tempResults = {};

        querySnapshot.forEach(doc => {
          tempResults[doc.id] = doc.data();
        });
        let messageArr = [];
        for (let i = 0; i < Object.keys(tempResults).length; i++) {
          let idKey = Object.keys(tempResults)[i];
          let newObj = {
            _id: idKey,
            text: tempResults[idKey].text,
            createdAt: tempResults[idKey].createdAt,
            user: tempResults[idKey].user
          };
          messageArr.push(newObj);
        }

        setMessages(messageArr);
        return tempResults;
        
      });
    return () => unsub();
  }, []);

  const grabUser = () => {
    return {
      _id: props.user.uid,
      name: props.user.name,
      avatar: props.user.avatar
    };
  };
  const chat = (
    <GiftedChat
      messages={messages}
      onSend={message => {
        Fire.addChatPost(
          props.user.name,
          props.user.avatar,
          message[0].text,
          props.user.uid,
          props.route.params.chatRoomId
        );
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
