import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

export default LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Loading Screen...</Text>
      <ActivityIndicator size="large"></ActivityIndicator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
