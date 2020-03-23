import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import * as firebase from "firebase";

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <Text>HELLO </Text>
      <TouchableOpacity>
        <Text>Here are your notifications!!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, width: 100 + "%", height: 100 + "%" }
});

export default NotificationScreen;
