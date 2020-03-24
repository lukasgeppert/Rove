import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  SafeAreaView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Fire from "../Firebase";

const firebase = require("firebase");
require("firebase/firestore");

const PostScreen = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    getPhotoPermission();
  });

  const getPhotoPermission = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status != "granted") {
        alert("We need permission to access your camera");
      }
    }
  };

  const handlePost = () => {
    console.log("Hello From handlePost");

    Fire.shared
      .addPost({ text: text.trim(), localUri: image })
      .then(ref => {
        setText("");
        setImage(null);
        // this.props.navigation.goBack()
      })
      .catch(error => {
        alert(error);
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity></TouchableOpacity>

        <TouchableOpacity onPress={handlePost}>
          <Text style={{ fontWeight: "500" }}>Post</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Image
          source={require("../assets/images/Shane_Pro_Pic.jpeg")}
          style={styles.avatar}
        ></Image>
        <TextInput
          autoFocus={true}
          multiline={true}
          numberOfLines={4}
          style={{ flex: 1 }}
          placeholder="Want to share your travels?"
          onChangeText={text => setText(text)}
        ></TextInput>
      </View>
      <TouchableOpacity style={styles.photo} onPress={pickImage}>
        <Text>*camera access button*</Text>
      </TouchableOpacity>

      <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
        <Image
          source={{ uri: image }}
          style={{ width: "100%", height: "100%" }}
        ></Image>
      </View>
    </SafeAreaView>
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
    borderBottomColor: "#D8D9DB"
  },
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
