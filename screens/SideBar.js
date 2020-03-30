import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

const SideBar = () => {
  return (
    <ScrollView>
      {/* <ImageBackground source={require("../assets/images/lightning.jpg")}> */}
        <Image
          source={require("../assets/images/Shane_Pro_Pic.jpeg")}
          style={styles.profile}
        />
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.followers}>X followers</Text>
          <Ionicons name="md-people" size={16} color="rgba(255,255,255, 0.8)" />
        </View>
      {/* </ImageBackground> */}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  profile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#FFF"
  }
});

export default SideBar;
