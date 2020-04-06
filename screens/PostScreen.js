import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  SafeAreaView
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Fire from "../Firebase";
import { set } from "react-native-reanimated";
const firebase = require("firebase");
require("firebase/firestore");

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const PostScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(" ");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    getPhotoPermission();
  }, []);

  const getPhotoPermission = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status != "granted") {
        alert("We need permission to access your camera");
      }
    }
  };

  const handlePost = () => {
    Fire.addPost({ name: name, text: text.trim(), localUri: image })
      .then(ref => {
        setName("");
        setText("");
        setImage(" ");
        navigation.goBack();
      })
      .catch(error => {
        alert(error.message);
      });
  };

  const addAvatar = () => {
    Fire.getAvatar(Fire.uid).then(item => {
      setAvatar(item);
      console.log("avatar prr", avatar);
    });
  };
  useEffect(() => {
    addAvatar();
  }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <DismissKeyboard>
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <Image source={{ uri: avatar }} style={styles.avatar}></Image>
          <TextInput
            autoFocus={true}
            multiline={true}
            numberOfLines={4}
            borderColor="#71A6D2"
            borderWidth={1}
            style={{ flex: 1 }}
            placeholder="Want to share your travels?"
            onChangeText={text => setText(text)}
          ></TextInput>
        </View>
        <View style={styles.postButton}>
          <TouchableOpacity onPress={handlePost}>
            <Text style={{ fontWeight: "500", color: 'white' }}>Post</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.photo} onPress={pickImage}>
          <View style={styles.cameraButton}>
            <Feather name="camera" size={24} color="#737888" />
          </View>
        </TouchableOpacity>

        <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
          <Image
            source={{ uri: image }}
            style={{ width: "100%", height: "100%" }}
          ></Image>
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, width: 100 + "%", height: 100 + "%" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB",
    margin: 32
  },
  postButton: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 2,
    backgroundColor: "#6495ED",
    width: 150,
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
    marginLeft: 135,
  },
  // cameraButton: {
  //   paddingHorizontal: 32,
  //   justifyContent: "center",
  //   flexDirection: "row",
  //   paddingVertical: 12,
  //   borderBottomWidth: 2,
  //   backgroundColor: "white",
  //   width: 100,
  //   margin: 15,
  //   fontWeight: "bold",
  //   borderRadius: 12,
  //   borderColor: "black",
  //   borderWidth: 1,
  //   color: "white",
  //   fontSize: 24,
  //   overflow: "hidden",
  //   padding: 12,
  //   textAlign: "center"
  // },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16
  },
  inputContainer: {
    margin: 32,
    flexDirection: "row"
  },
  photo: {
    alignItems: "flex-end",
    marginHorizontal: 32
  }
});

export default PostScreen;
