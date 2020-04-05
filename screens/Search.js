import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Button
} from "react-native";
import * as firebase from "firebase";
import { Input } from "react-native-elements";
import algoliasearch from "algoliasearch";
// import autocomplete from "autocomplete.js";

const Search = () => {
  let client = algoliasearch("48RBUD3R3L", "dd31c406b6de3173a2433a0dbda70f9c");
  let index = client.initIndex("Rove");

  return (
    <View style={styles.container}>
      <Input name="rovers" type="text" placeholder="Search our community" />
      <Button title="Search!!" onPress={() => alert("Hello!")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, width: 100 + "%", height: 100 + "%" }
});

export default Search;
