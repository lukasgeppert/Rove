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
  RefreshControl,
} from "react-native";

import Fire from "../Firebase";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

const Post = (props) => {
  let uid = "1";

  const [liked, setLiked] = useState(false);
  const { post } = props;
  const { data } = props.post;
  const [avatar, setAvatar] = useState("")
  if (data.uid === props.user.uid) {
    uid = null;
  }
  const addAvatar = () => {
    Fire.getAvatar(data.uid).then(item => {
      setAvatar(item);
    });
  };
  useEffect(() => {
    addAvatar();
    if (data.likes) {
      data.likes.map((like) => {
        if (like.uid === Fire.uid) {
          setLiked(true);
        }
      });
    }
  }, []);

  const likeToggled = () => {
    if (liked) {
      setLiked(false);
      Fire.removeLike(post.id);
    } else {
      setLiked(true);
      Fire.addLike(post.id);
    }
  };
  
  const heartIconColor = liked ? "rgb(220,100, 110)" : null;

  const heartIconSize = liked ? 40 : 39.5;

  return (
    <View style={styles.feedItem}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            {uid ? (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("Profile", {
                    screen: "Friend Profile",
                    params: { frienduid: data.uid, request: true },
                  })
                }
              >
                <Text style={styles.post}>{data.name}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Profile")}
              >
                <Text style={styles.post}>{data.name}</Text>
              </TouchableOpacity>
            )}
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
                color: heartIconColor,
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
    padding: 8,
    flexDirection: "row",
    marginVertical: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
    marginTop: 6,
    marginLeft: 5
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
    marginTop: 16,
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

const mapState = (state) => ({
  user: state.user,
});

export default connect(mapState)(Post);
