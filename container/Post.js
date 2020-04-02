import React, { useEffect, useState, isValidEleent } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  LayoutAnimation,
  FlatList,
  ScrollView,
  RefreshControl
} from "react-native";

import * as firebase from "firebase";
import Fire from "../Firebase";

import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

const Post = props => {
  const [liked, setLiked] = useState(false);
  const { post } = props;
  const { data } = props.post;
  const likeToggled = () => {
    setLiked(!liked);
    Fire.removeLike(post.id);

  };
  const heartIconColor = liked ? "rgb(220,100, 110)" : null;

  const heartIconSize = liked ? 40 : 35;

  return (
    <View style={styles.feedItem}>
      <Image source={{ uri: data.avatar }} style={styles.avatar}></Image>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <View>
            <Text style={styles.post}>{data.name}</Text>
            <Text style={styles.timestamp}>
              {moment(data.timestamp).fromNow()}
            </Text>
          </View>
          <Ionicons name="ios-more" size={24} color="#737888" />
        </View>
        <Text style={styles.post}>{data.text}</Text>
        <Image
          source={{ uri: data.image }}
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
              size={heartIconSize}
              color="#737888"
              style={{
                marginRight: 16,
                color: heartIconColor
              }}
            />
          </TouchableOpacity>
          {/* <Ionicons
              name="ios-chatboxes"
              size={24}
              color="#737888"
              style={{ marginRight: 16 }}
            /> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFECF4"
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
    zIndex: 0
  },
  feed: {
    marginHorizontal: 16
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65"
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: "#838899"
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
    marginRight: 25
  }
});

export default Post;
