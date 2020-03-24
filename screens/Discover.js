import * as React from "react";
// import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Button
} from "react-native";

export const Discover = ({ navigation }) => (
  <View style={styles.container}>
    <Text>Search Screen</Text>
    <Button title="Search" onPress={() => navigation.push("Search")} />
    <Button
      title="Details"
      onPress={() => {
        navigation.navigate("Details", {
          screen: "Details",
          params: { name: "Details" }
        });
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, width: 100 + "%", height: 100 + "%" }
});

export default Discover;
