import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import colors from "../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";

export const RoversList = ({ navigation }) => {
  const renderRover = (rover) => {
    return (
      <View>
        <View style={styles.messageItem}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Profile", {
                screen: "Friend Profile",
                params: { frienduid: rover.uid },
              });
            }}
          >
            <Image source={rover.avatar} style={styles.avatar} />
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Text style={styles.name}>{rover.name}</Text>
                <Text style={styles.timestamp}>
                  {moment(rover.timestamp).fromNow()}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ marginLeft: 15 }}>
      <View>
        <Text onPress={() => navigation.goBack()} style={styles.closeModal}>
          X
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: colors.lightgray,
        }}
      >
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Rovers</Text>
        <Text style={{ alignSelf: "baseline", marginTop: 10 }}>Checked In</Text>
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
    color: colors.black,
    marginRight: 30,
  },
  messageItem: {
    // borderWidth: 1,
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 10,
    flexDirection: "row",
    marginVertical: 3,
    marginTop: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65",
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
    name: "Luigi",
    timestamp: 1569109273726,
    avatar: require("../assets/images/Shane_Pro_Pic.jpeg"),
    uid: "ZW0nVICEJlQf6xiWRxSDd0mdVGk1",
  },
  {
    id: "3",
    name: "Peach",
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
