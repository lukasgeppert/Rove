import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import * as firebase from "firebase";
import { AuthContext } from "./AuthContext";
import { connect } from "react-redux";
import Fire from "../Firebase";

//Jason's Wacky Experimental Chamber
const Profile = (props) => {
  // console.log("props is: ", props);
  //Jason's Wacky Experimental Chamber

  // useEffect(() => {
  //   async function addFollow() {
  //     console.log("adding Follower");

  //     const follower = await Fire.follow(
  //       "7Wh0cZlq1CdvZwaTe1Va0LsH6Ec2",
  //       "Riley"
  //     );
  //     console.log("Follower", follower);

  //     return follower;
  //   }

  //   addFollow().then(follower =>
  //     console.log("please give me information about follower: ", follower)
  //   );
  // }, []);

  // useEffect(() => {
  //   async function fetchFollowing() {
  //     console.log("getting Following");

  //     const following = await Fire.getFollowing("UOjKnWlgrTXa4PbAQ4aYHRau42o2");
  //     console.log("Follower", following);

  //     return following;
  //   }

  //   fetchFollowing().then(following =>
  //     console.log("please give me information about following: ", following)
  //   );
  // }, []);

  // useEffect(() => {
  //   Firebase.getFollowers("UOjKnWlgrTXa4PbAQ4aYHRau42o2").then(follower =>
  //     console.log("follower in getFollowers", follower)
  //   );
  // }, []);

  // useEffect(() => {
  //   async function request() {
  //     console.log("sending friend request");

  //     const friendRequest = await Fire.sendFriendRequest(
  //       "UOjKnWlgrTXa4PbAQ4aYHRau42o2",
  //       "Shane"
  //     );

  //     console.log("Can I be your friend??", friendRequest);
  //     return friendRequest;
  //   }

  //   request().then(request =>
  //     console.log("Give me information about a request", request)
  //   );
  // }, []);

  // useEffect(() => {
  //   Fire.sendFriendRequest("UOjKnWlgrTXa4PbAQ4aYHRau42o2", "Shane");
  // }, []);

  // useEffect(() => {
  //   Fire.sendFriendRequest("mkqSACTTJnYjMgD7pTqgoj9N26o1", "Milos");
  // }, []);

  // useEffect(() => {
  //   Fire.acceptFriendRequest("UOjKnWlgrTXa4PbAQ4aYHRau42o2", "Shane");
  // }, []);

  // useEffect(() => {
  //   Fire.acceptFriendRequest("mkqSACTTJnYjMgD7pTqgoj9N26o1", "Milos");
  // }, []);

  // useEffect(() => {
  //   Fire.addUser(props.user.uid, "", "", "", "", "")
  // })

  // }, []);
  // useEffect(() => {
  //   async function getSingleChatId() {
  //     const room = await Fire.getSingleChatRoom("UOjKnWlgrTXa4PbAQ4aYHRau42o2");
  //     return room;
  //   }
  // }, []);

  // useEffect(() => {
  //   async function getId() {
  //     const id = await Fire.getPostId("UOjKnWlgrTXa4PbAQ4aYHRau42o2");
  //     return id;
  //   }
  //   getId().then(id => console.log("gimme id please", id));
  // });
  // useEffect(() => {
  //   Fire.getPostId();
  // });

  // useEffect(() => {
  //   async function fetchRatings() {
  //     console.log("getting Ratings");

  //     const ratings = await Fire.getRatings("Seattle");
  //     console.log("ratings", ratings);

  //     return ratings;
  //   }

  //   fetchRatings().then(ratingsList =>
  //     console.log("Show me ratings", ratingsList)
  //   );
  // }, []);
  // useEffect(() => {
  //   Fire.searchUser("todd@firebase.com").then(searchArray =>
  //     console.log("Search Array", searchArray)
  //   );
  // });

  // useEffect(() => {
  //   Fire.getAvatar("ciA7L0XP38SmIgYXw9vvQLEyyKX2").then((avatarUrl) =>
  //     console.log("AVATRURL", avatarUrl)
  //   );
  // }, []);

  const [email, setEmail] = useState("");
  const { signOut } = React.useContext(AuthContext);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user && user.email) {
        setEmail(user.email);
      }
    });
  }, []);

  const signOutUser = () => {
    setEmail(null);
    signOut();
  };

  LayoutAnimation.easeInEaseOut();
  return (
    <View style={styles.container}>
      <Text>HELLO {email}</Text>
      <TouchableOpacity onPress={signOutUser}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate("Welcome")}>
        <Text>Build My Profile!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, width: 100 + "%", height: 100 + "%" },
});

const mapState = (state) => ({
  user: state.user,
});

export default connect(mapState)(Profile);
