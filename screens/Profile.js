import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import * as firebase from "firebase";
import {connect} from 'react-redux'

const Profile = (props) => {
  console.log('props is: ', props)
  return (
    <View style={styles.container}>
      <Text>HELLO </Text>
      <TouchableOpacity>
        <Text>Here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, width: 100 + "%", height: 100 + "%" }
});

const mapState = (state) => ({
  user: state.user
})

export default connect(mapState)(Profile);
