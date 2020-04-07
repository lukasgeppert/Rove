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
      <View style={styles.listItem}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Profile", {
              screen: "Friend Profile",
              params: { frienduid: rover.uid },
            });
          }}
        >
          <Image source={rover.avatar} style={styles.avatar} />

          <Text style={styles.name}>{rover.name}</Text>
        </TouchableOpacity>
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
        {/* <Text style={{ alignSelf: "baseline", marginTop: 10 }}>Checked In</Text> */}
      </View>

      <View style={styles.roverContainer}>
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
  container: {
    flex: 1,
    backgroundColor: "#EFECF4",
  },
  closeModal: {
    color: colors.black,
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  header: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D64",
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 0,
    padding: 5,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
    alignSelf: "stretch",
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65",
  },
  listItem: {
    // borderWidth: 1,
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
    marginTop: 12,
  },
  feed: {
    marginHorizontal: 5,
  },
  timestamp: {
    fontSize: 11,
    // color: "#C4C6CE",
    color: "#454D65",
    marginTop: 4,
    marginLeft: 170,
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
