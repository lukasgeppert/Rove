import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { connect } from "react-redux";

//Image styling, as far as I can tell, will not work properly for larger screens and tablets.

export const CreateProfile1 = (props) => {
  return (
    <View>
        <View style={styles.imageContainer}>
            <Image source={require("../assets/images/RoveIntro1.jpg")} style={styles.introImage}>
            </Image>
        </View>
      <Text style={styles.header}> Welcome to our community!</Text>
      <Text style={styles.paragraph}>Show the ROVE community who you are by adding some basic info to your profile. We can add more details later on. </Text>
      <Button
        onPress={() => props.navigation.navigate("Choose Location")}
        style={styles.button}
        color= "rgb(215,106,97)"
        title="Continue">
      </Button>
    </View>
  );
};  

const styles = StyleSheet.create({
    button: {
        paddingVertical: 20,
        paddingHorizontal: 35,
    },
    header: {
        margin: 10,
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        color: "rgb(215,106,97)"
    },
    paragraph: {
        margin: 10,
        textAlign: "center",
        fontSize: 16,
    },
    imageContainer: {
    },
    introImage: {
        height: 300,
        aspectRatio: 3/2,
        resizeMode: "contain",
        borderWidth: 1,
    }
})

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile1);