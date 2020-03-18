import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";

class HomeScreen extends Component {
  // componentDidMount() {
  //   alert(Dimensions.get('window').width); --> width of 414
  // }
  render() {
    return (
      <View style={{ flex: 1, width: 100 + "%", height: 100 + "%" }}>
        <Text>HELLO WORLD</Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  nav: {
    width: 100 + "%",
    height: 60,
    marginTop: 40,
    backgroundColor: "rgb(250,250,250)",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgb(233, 233, 233)",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default HomeScreen;
