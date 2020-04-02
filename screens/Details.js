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

export const Details = ({ route }) => {
  const { id } = route.params;
  const { name } = route.params;

  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Text>city: {id}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, width: 100 + "%", height: 100 + "%" }
});

export default Details;
