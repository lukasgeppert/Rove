import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button
} from "react-native";
import { connect } from "react-redux";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import { setImage } from "../store/profileSubmission";
import Fire from "../Firebase";

export const CreateProfile5 = props => {
  //Photo Permissions
  const getPhotoPermission = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status != "granted") {
        alert("To upload an image, we need permission to access your camera!");
      }
    }
  };
  useEffect(() => {
    getPhotoPermission();
  }, []);
  //End Photo Permissions

  //Pick your image here
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      props.setImageLocal(result.uri);
      setImage(result.uri);
    }
  };

  //handleSubmit
  const handleSubmit = async () => {
    Fire.addUser(
      props.user.uid,
      props.user.name,
      image,
      props.profileSubmission.location,
      props.profileSubmission.interests,
      props.profileSubmission.bio
    );
    props.navigation.navigate("Profile");
  };

  return !props.profileSubmission.image ? (
    <View>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={require("../assets/images/missingavatar.png")}
            style={styles.photo}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>Say Cheese!</Text>
      <Text style={styles.paragraph}>Upload a profile picture in order</Text>
      <Text style={styles.paragraph}>to complete your profile!</Text>
    </View>
  ) : (
    <View>
      <Text style={styles.paragraph}>Your chosen avatar is: </Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.photo}
          source={{ uri: props.profileSubmission.image }}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity style={styles.newButton}
        onPress={() => {
          props.setImageLocal(null);
          setImage(null);
        }}
      >
        <Text style={styles.name}>Choose a different avatar</Text>
      </TouchableOpacity>
        <TouchableOpacity style={styles.continueButton} onPress={handleSubmit}>
          <Text style={styles.name}>Submit</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignSelf: "center",
    fontSize: 40,
    color: "rgb(215,106,97)",
    fontWeight: "bold",
    margin: 20
  },
  paragraph: {
    alignSelf: "center",
    fontSize: 18,
    margin: 10
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  photo: {
    height: 300,
    aspectRatio: 1,
    borderWidth: 0
  },
  button: {
    color: "#000000"
  },
  submitContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  submitButton: {
    height: 100,
    aspectRatio: 2.09
  },
  newButton: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 2,
    backgroundColor: "#6495ED",
    width: 300,
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
    marginLeft: 60
  },
  continueButton:{
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 2,
    backgroundColor: "rgb(215,106,97)",
    width: 300,
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
    marginLeft: 60
  },
  name: {
    fontSize: 15,
    justifyContent: "center",
    // borderBottomWidth: 3
    color: "white"
  },
});

const mapStateToProps = state => ({
  user: state.user,
  profileSubmission: state.profileSubmission
});

const mapDispatchToProps = dispatch => ({
  setImageLocal: localUri => dispatch(setImage(localUri))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile5);
