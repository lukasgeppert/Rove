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
// import algoliasearch from "algoliasearch";
// import autocomplete from "autocomplete.js";

const Search = props => {
  // let client = algoliasearch("48RBUD3R3L", "dd31c406b6de3173a2433a0dbda70f9c");
  // let index = client.initIndex("Rove");
  const [search, setSearch] = useState(false);
  const [userList, setUserList] = useState(null);
  const [friendRequest, setFriendRequest] = useState(null);
  const renderUser = userInfo => {
    return (
      <View style={styles.feedItem}>
        <Image source={{ uri: userInfo.avatar }} style={styles.avatar}></Image>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <View>
              <Text style={styles.post}>{userInfo.name}</Text>
              <Text>Located at: {userInfo.location}</Text>
              <Text>email: {userInfo.email}</Text>
            </View>
            <Button
              title="View Their Profile"
              onPress={() => {
                props.navigation.navigate('Profile', {screen: "Friend Profile", params: {frienduid: userInfo.uid}});
              }}
            />
            {friendRequest ? (
              <Button
                title="Add as Friend"
                onPress={() => {
                  Fire.sendFriendRequest(userInfo.uid, userInfo.name);
                  setFriendRequest(true);
                }}
              />
            ) : (<Text>Friend Request Sent!</Text>)}
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Input
        name="rovers"
        type="text"
        placeholder="full email here"
        autoCapitalize="none"
        onChangeText={text => setSearch(text)}
      />
      <Button
        title="Search!!"
        onPress={async () => {
          const results = await Fire.searchUser(search);
          setUserList(results);
        }}
      />
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
  container: { flex: 1, width: 100 + "%", height: 100 + "%" }
});

export default Search;
