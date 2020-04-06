import * as React from "react";
// import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  FlatList,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";

export const RoversList = ({ navigation }) => {
  const renderRover = (rover) => {
    return (
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          width: "100%",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Profile", {
              screen: "Friend Profile",
              params: { frienduid: rover.uid },
            });
          }}
        >
          <Image source={rover.avatar} style={styles.avatar}></Image>
          <Text>{rover.name}</Text>
          <Text style={styles.timestamp}>
            {moment(rover.timestamp).fromNow()}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View>
        <Text onPress={() => navigation.goBack()} style={styles.closeModal}>
          X
        </Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>Rovers</Text>
        <Text>Checked In</Text>
      </View>

      <View>
        <FlatList
          style={styles.feed}
          data={rovers}
          renderItem={({ item }) => renderRover(item)}
          keyExtractor={(index, item) => item.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  closeModal: {
    color: colors.black,
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    marginVertical: 8,
  },
  timestamp: {
    fontSize: 16,
    color: "#C4C6CE",
    textAlign: "right",
    justifyContent: "flex-end",
  },
});

const rovers = [
  {
    id: "1",
    name: "Toad",
    timestamp: 1569109273726,
    avatar: require("../assets/images/Shane_Pro_Pic.jpeg"),
    uid: "ZW0nVICEJlQf6xiWRxSDd0mdVGk1",
  },
  {
    id: "2",
    name: "Jason",
    timestamp: 1569109273726,
    avatar: require("../assets/images/Shane_Pro_Pic.jpeg"),
    uid: "ZW0nVICEJlQf6xiWRxSDd0mdVGk1",
  },
  {
    id: "3",
    name: "Milos",
    timestamp: 1569109273726,
    avatar: require("../assets/images/Shane_Pro_Pic.jpeg"),
    uid: "ZW0nVICEJlQf6xiWRxSDd0mdVGk1",
  },
  {
    id: "4",
    name: "Wario",

    timestamp: 1569109273726,
    avatar: require("../assets/images/Shane_Pro_Pic.jpeg"),
    uid: "ZW0nVICEJlQf6xiWRxSDd0mdVGk1",
  },
];

export default RoversList;
