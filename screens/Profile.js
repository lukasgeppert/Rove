import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  LayoutAnimation,
  RefreshControl,
  FlatList,
} from "react-native";
import * as firebase from "firebase";
import { AuthContext } from "./AuthContext";
import { connect } from "react-redux";
import Fire from "../Firebase";
import Post from "../container/Post";

//TODO: Find a better picture for building a profile
//TODO: Refresh the profile page upon scroll up.

const Profile = (props) => {
  //Jason's Wacky Experimental Chamber

  // useEffect(() => {
  //
  // }, []);
  const [posts, setPosts] = useState([]);

  async function fetchPosts() {
    const posts = await Fire.getUserPosts();
    return posts;
  }
  useEffect(() => {
    fetchPosts().then((promisePosts) => {
      setPosts(promisePosts);
    });
  }, []);

  const [user, setUser] = useState(null);
  const [profileStatus, setProfileStatus] = useState(null);
  const [friendRequests, setFriendRequests] = useState(null);
  let name = props.user.name || "traveler";
  const { signOut } = React.useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setRefresh(true);
    Fire.getUser(props.user.uid).then((userInfo) => {
      setUser(userInfo);
      if (userInfo.location) setProfileStatus(true);
    });

    Fire.getPendingFriends(props.user.uid)
      .then((friendPendingRequests) => setFriendRequests(friendPendingRequests))
      .finally(setRefresh(false));
  }, []);

  const signOutUser = () => {
    signOut();
  };

  LayoutAnimation.easeInEaseOut();

  renderPost = (post) => {
    return <Post post={post} navigation={props.navigation} />;
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => {
            Fire.getUser(props.user.uid)
              .then((userInfo) => {
                setUser(userInfo);
                setProfileStatus(true);
              })
              .finally(() => setRefresh(false));

            Fire.getPendingFriends(props.user.uid)
              .then((friendPendingRequests) =>
                setFriendRequests(friendPendingRequests)
              )
              .finally(setRefresh(false));
          }}
        />
      }
      style={styles.container}
    >
      {profileStatus ? (
        <>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
            }}
          >
            <Image source={{ uri: user.image }} style={styles.avatar} />
            <View style={{ alignSelf: "center" }}>
              <Text style={styles.header}>{name}</Text>
              <Text style={{ alignSelf: "center" }}> {user.location}</Text>
              <Text style={styles.header2}>About Me</Text>
              <Text style={styles.paragraph}>{user.aboutMe}</Text>
            </View>
            {/* <View style={styles.imageContainer}> */}
          </View>
          {/* </View> */}
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignSelf: "center",
            }}
          >
            <Text style={styles.header2}>Interests</Text>
            {user.interests.map((interest) => {
              return (
                <Text style={styles.interestList} key={interest}>
                  {interest}
                </Text>
              );
            })}
          </View>

          {/* <TouchableOpacity
            onPress={() => props.navigation.navigate("Welcome")}
          >
            <Text style={styles.buttonProfile}>Edit My Profile!</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={signOutUser}>
            <Text style={styles.buttonLogout}>Logout</Text>
          </TouchableOpacity> */}
        </>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Welcome")}
          >
            <Image
              style={styles.buildingButton}
              resizeMode="contain"
              source={require("../assets/images/boatbuilding.jpg")}
            />
            <Text style={styles.buttonProfile}>Build My Profile!</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={signOutUser}>
            <Text style={styles.buttonLogout}>Logout</Text>
          </TouchableOpacity>
        </>
      )}
      {//do friend requests exist?
      friendRequests ? (
        <>
          {//if so, map over them to check each friend request
          friendRequests.map((friendRequestObj) => {
            let friendName = friendRequestObj.friend.name || "A Traveler";
            let frienduid = friendRequestObj.friend._id;
            //are any of the friend requests incoming? If so, display them. Else, don't display any.
            //TODO: Build out a component where you can see outgoing friend requests
            if (friendRequestObj.friend.type === "incoming") {
              return (
                <View key={friendRequestObj.friend.name}>
                  <Text style={styles.header2}>
                    {friendName} wants to be your friend!
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate("Friend Profile", {
                        frienduid,
                        request: true,
                      })
                    }
                  >
                    <Text style={styles.buttonProfile}>
                      View Their Profile Page
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      Fire.acceptFriendRequest(frienduid, friendName);
                      setFriendRequests(
                        friendRequests.filter(
                          (friendRequestObject) =>
                            friendRequestObject.friend._id !== frienduid
                        )
                      );
                    }}
                  >
                    <Text style={styles.acceptButton}>
                      Accept Friend Request
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      Fire.denyFriendRequest(frienduid);
                      setFriendRequests(
                        friendRequests.filter(
                          (friendRequestObject) =>
                            friendRequestObject.friend._id !== frienduid
                        )
                      );
                    }}
                  >
                    <Text style={styles.rejectButton}>
                      Reject Friend Request
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }
            return null;
          })}
        </>
      ) : null}
      <View style={{ marginTop: 25 }}>
        <Text style={styles.header2}>My Posts</Text>
        <FlatList
          style={styles.feed}
          data={posts}
          renderItem={({ item }) => renderPost(item)}
          keyExtractor={(index, item) => item.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, width: 100 + "%", height: 100 + "%" },

  header: {
    fontSize: 30,
    alignSelf: "center",
    marginLeft: 25,
    marginTop: 10,
  },
  header2: {
    marginTop: 10,
    fontSize: 18,
    textDecorationLine: "underline",
    alignSelf: "center",
  },
  paragraph: {
    fontSize: 14,
    alignSelf: "center",
    fontStyle: "italic",
  },
  buttonProfile: {
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    color: "rgb(215,106,97)",
    padding: 10,
    borderWidth: 1,
    borderColor: "#000000",
  },
  buttonLogout: {
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    color: "rgb(215,106,97)",
    padding: 10,
    borderWidth: 1,
    borderColor: "#000000",
  },
  interestList: {
    alignSelf: "center",
    fontSize: 14,
  },
  buildingButton: {
    alignSelf: "center",
    height: 300,
    aspectRatio: 1.5,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 175,
    height: 175,
    margin: 15,
    borderRadius: 100,
  },
  acceptButton: {
    width: 240,
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#00e660",
    color: "#ffffff",
    alignSelf: "center",
    padding: 10,
  },
  rejectButton: {
    width: 240,
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#fc0303",
    color: "#ffffff",
    alignSelf: "center",
    padding: 10,
  },
});

const mapState = (state) => ({
  user: state.user,
});

export default connect(mapState)(Profile);
