import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Fire from "../Firebase";
import colors from "../constants/Colors";
import { Rating } from "react-native-ratings";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";

renderCityPost = (post) => {
  return (
    <SafeAreaView style={styles.feedItem}>
      <Image source={post.avatar} style={styles.avatar}></Image>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={styles.post}>{post.name}</Text>
            <Text style={styles.timestamp}>
              {moment(post.timestamp).fromNow()}
            </Text>
          </View>
        </View>

        <Text style={styles.post}>{post.text}</Text>
        <Image
          source={post.image}
          style={styles.postImage}
          resizeMode="cover"
        />
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            activeOpacity={0.95}
            onPress={() => {
              likeToggled();
            }}
          >
            <Ionicons
              name="ios-heart-empty"
              size={25}
              color="#737888"
              style={{
                marginRight: 16,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export const CityFeed = ({ route, navigation }) => {
  return (
    <View>
      <FlatList
        style={styles.feed}
        data={posts}
        renderItem={({ item }) => renderCityPost(item)}
        keyExtractor={(index, item) => item.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFECF4",
  },
  header: {
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D64",
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 0,
  },
  feed: {
    marginHorizontal: 16,
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    flexDirection: "row",
    marginVertical: 8,
    marginRight: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginLeft: 10,
    marginRight: 5,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65",
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4,
  },
  post: {
    marginTop: 5,
    fontSize: 14,
    color: "#838899",
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
    marginRight: 25,
  },
});

posts = [
  {
    id: "1",
    name: "Shane",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    timestamp: 1569109273726,
    avatar: require("../assets/images/Shane_Pro_Pic.jpeg"),
    image: require("../assets/images/cities/austin-3.jpg"),
  },
  {
    id: "2",
    name: "Jason",
    text:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    timestamp: 1569109273726,
    avatar: require("../assets/images/Shane_Pro_Pic.jpeg"),
    image: require("../assets/images/cities/austin-2.jpg"),
  },
  {
    id: "3",
    name: "Milos",
    text:
      "Amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant.",
    timestamp: 1569109273726,
    avatar: require("../assets/images/Shane_Pro_Pic.jpeg"),
    image: require("../assets/images/cities/austin-1.jpg"),
  },
  {
    id: "4",
    name: "Wario",
    text:
      "At varius vel pharetra vel turpis nunc eget lorem. Lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor. Adipiscing tristique risus nec feugiat in fermentum.",
    timestamp: 1569109273726,
    avatar: require("../assets/images/Shane_Pro_Pic.jpeg"),
    image: require("../assets/images/cities/austin-4.jpeg"),
  },
];
export default CityFeed;
