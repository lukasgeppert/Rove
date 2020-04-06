import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Button
} from "react-native";
import * as firebase from "firebase";
import { Input } from "react-native-elements";
import Fire from "../Firebase";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

// import algoliasearch from "algoliasearch";
// import autocomplete from "autocomplete.js";

const Search = props => {
  // let client = algoliasearch("48RBUD3R3L", "dd31c406b6de3173a2433a0dbda70f9c");
  // let index = client.initIndex("Rove");
  const [search, setSearch] = useState(false);
  const [userList, setUserList] = useState(null);
  const [friendRequest, setFriendRequest] = useState(1);
  const renderUser = userInfo => {
    console.log("gimme userInfo", userInfo);
    return (
      <View style={styles.feedItem}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Profile", {
                screen: "Friend Profile",
                params: { frienduid: userInfo.uid }
              });
            }}
          >
            <Image
              source={{ uri: userInfo.image }}
              style={styles.avatar}
            ></Image>
          </TouchableOpacity>

          <View
            style={{
              // flexDirection: "row",
              // justifyContent: "space-between",
              alignContent: "center",
              marginLeft: 1
              // backgroundColor: "red"
            }}
          >
            <View style={styles.center}>
              <View style={styles.nameView}>
                <MaterialCommunityIcons
                  name="account-circle"
                  size={30}
                  style={{ margin: 10 }}
                />
                <Text style={styles.post}> {userInfo.name}</Text>
              </View>
              <MaterialCommunityIcons
                style={{ margin: 10 }}
                name="map-marker"
                size={30}
              ></MaterialCommunityIcons>
              <Text style={{ fontSize: 30 }}>{userInfo.location}</Text>

              <Feather
                style={{ margin: 10 }}
                name="mail"
                size={30}
                color="black"
              />
              <Text style={{ fontSize: 30 }}>{userInfo.email}</Text>
              <View style={styles.addFriendButton}>
                {friendRequest ? (
                  <TouchableOpacity
                    onPress={() => {
                      Fire.sendFriendRequest(userInfo.uid, userInfo.name);
                      setFriendRequest(null);
                    }}
                  >
                    <Text style={{ color: "white" }}>Add a friend</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={{color: "white", fontSize: 12 }}>Request Sent!</Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Input
        name="rovers"
        margin={10}
        leftIcon={<Feather name="mail" size={24} color="black" />}
        type="text"
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={text => setSearch(text)}
      />
      <TouchableOpacity
        style={styles.searchButton}
        onPress={async () => {
          const results = await Fire.searchUser(search);
          setUserList(results)
          setFriendRequest(1)
        }}
      >
        <Text style={{ fontWeight: "500", color: "white" }}>Search</Text>
      </TouchableOpacity>
      {userList ? (
        <>
          <FlatList
            data={userList}
            keyExtractor={(index, item) => item.toString()}
            renderItem={({ item }) => renderUser(item)}
          ></FlatList>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EFECF4" },
  searchButton: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 2,
    backgroundColor: "#6495ED",
    width: 150,
    margin: 15,
    fontWeight: "bold",
    borderRadius: 12,
    borderColor: "white",
    borderWidth: 1,
    color: "white",
    fontSize: 24,
    overflow: "hidden",
    padding: 12,
    textAlign: "center",
    marginLeft: 135
  },
  addFriendButton: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 2,
    backgroundColor: "rgb(215,106,97)",
    width: 150,
    margin: 15,
    fontWeight: "bold",
    borderRadius: 12,
    borderColor: "white",
    borderWidth: 1,
    color: "white",
    fontSize: 24,
    overflow: "hidden",
    padding: 12,
    textAlign: "center",
    // marginLeft: 135,
    marginVertical: 30
  },


  feedItem: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    flexDirection: "row",
    // alignContent: "center",
    // marginVertical: 3,
    margin: 50,
    // alignContent: "center"
    alignItems: "center",
    marginTop: 12
  },
  center: {
    alignContent: "center",
    alignItems: "center"
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: 98,
    // alignSelf: "stretch",
    margin: 10,
    alignContent: "center",
    alignItems: "center"
  },
  nameView: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    color: "black"
  },
  name: {
    fontSize: 15,
    justifyContent: "center"
    // borderBottomWidth: 3
  },
  post: {
    fontSize: 30
    // fontWeight: "500",
    // color: "#454D65",
    // margin: 10,
  }
});

export default Search;
