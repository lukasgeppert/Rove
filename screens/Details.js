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

export const Details = ({ route }) => (
  <View style={styles.container}>
    <Text>Details Screen</Text>
    {route.params.name && <Text>{route.params.name}</Text>}
  </View>
);
const styles = StyleSheet.create({
  container: { flex: 1, width: 100 + "%", height: 100 + "%" }
});

export default Details;
