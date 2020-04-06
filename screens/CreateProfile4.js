import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { CheckBox } from "react-native-elements";
import { setInterests, setBio } from "../store/profileSubmission";

export const CreateProfile4 = props => {
  const [love, setLove] = useState(false);
  const [movies, setMovies] = useState(false);
  const [hiking, setHiking] = useState(false);
  const [biking, setBiking] = useState(false);
  const [books, setBooks] = useState(false);
  const [bunker, setBunker] = useState(false);
  const [interests, setInterests] = useState(false);
  const [bioText, setBioText] = useState(null);
  const [bio, setBio] = useState(false);

  const handleNext = () => {
    let intArr = [];
    if (movies) intArr.push("Movies");
    if (hiking) intArr.push("Hiking");
    if (biking) intArr.push("Biking");
    if (books) intArr.push("Books");
    if (love) intArr.push("Long walks along the beach");
    if (bunker) intArr.push("Underground Apocalypse Bunkers");

    props.setReduxBio(bioText);
    props.setReduxInterests(intArr);

    props.navigation.navigate("Upload Photo");
  };

  return (
    <View>
      {!interests ? (
        <>
          <Text style={styles.header}>Tell us about you!</Text>
          <Text style={styles.paragraph}>What are some of your interests?</Text>
          <CheckBox
            title="Movies"
            checked={movies}
            onPress={() => {
              setMovies(!movies);
            }}
          />
          <CheckBox
            title="Hiking"
            checked={hiking}
            onPress={() => {
              setHiking(!hiking);
            }}
          />
          <CheckBox
            title="Books"
            checked={books}
            onPress={() => {
              setBooks(!books);
            }}
          />
          <CheckBox
            title="Long walks along the beach"
            checked={love}
            onPress={() => {
              setLove(!love);
            }}
          />
          <CheckBox
            title="Biking"
            checked={biking}
            onPress={() => {
              setBiking(!biking);
            }}
          />
          <CheckBox
            title="Building an Underground Apocalypse Bunker"
            checked={bunker}
            onPress={() => {
              setBunker(!bunker);
            }}
          />
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => {
              setInterests(true);
            }}
          >
            <Text style={styles.name}>Continue</Text>
          </TouchableOpacity>
        </>
      ) : !bio ? (
        <>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/images/readingBio.jpg")}
              style={styles.introImage}
            />
          </View>
          <Text style={styles.header2}>Give us a short bio about you!</Text>
          {/* <Text style={styles.paragraph}>One or two sentences is fine.</Text> */}
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 5,
              padding: 8,
              marginHorizontal: 8

            }}
            onChangeText={text => setBioText(text)}
          />
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => {
              setBio(true);
            }}
          >
            <Text style={styles.name}>Continue</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.header2}>Your interests are: </Text>
          {hiking ? <Text style={styles.paragraph2}>Hiking</Text> : null}
          {movies ? <Text style={styles.paragraph2}>Movies</Text> : null}
          {biking ? <Text style={styles.paragraph2}>Biking</Text> : null}
          {books ? <Text style={styles.paragraph2}>Books</Text> : null}
          {love ? (
            <Text style={styles.paragraph2}>Long Walks Along the Beach</Text>
          ) : null}
          {bunker ? (
            <Text style={styles.paragraph2}>
              Building an Underground Apocalypse Bunker
            </Text>
          ) : null}

          <TouchableOpacity
            style={styles.changeButton}
            onPress={() => setInterests(false)}
          >
            <Text style={styles.name}>Choose different interests</Text>
          </TouchableOpacity>
          <Text style={styles.header2}>Your bio is:</Text>
          <Text style={styles.paragraph}>{bioText}</Text>
          <TouchableOpacity
            style={styles.changeButton}
            onPress={() => setBio(false)}
          >
            <Text style={styles.name}>Rewrite your bio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.continueButton} onPress={handleNext}>
            <Text style={styles.name}>Continue</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignSelf: "center",
    fontSize: 40,
    color: "rgb(215,106,97)",
    fontWeight: "bold",
    margin: 20
  },
  header2: {
    alignSelf: "center",
    fontSize: 20,
    color: "rgb(215,106,97)",
    fontWeight: "bold",
    margin: 10
  },
  paragraph: {
    alignSelf: "center",
    fontSize: 18,
    margin: 10
  },
  paragraph2: {
    alignSelf: "center",
    fontSize: 14
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    
  },
  introImage: {
    height: 300,
    aspectRatio: 1.68,
    resizeMode: "contain",
    borderWidth: 1
  },
  name: {
    fontSize: 15,
    justifyContent: "center",
    // borderBottomWidth: 3
    color: "white"
  },
  continueButton: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 2,
    backgroundColor: "rgb(215,106,97)",
    width: 300,
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
    marginLeft: 60
  },
  changeButton: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 2,
    backgroundColor: "#6495ED",
    width: 300,
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
    marginLeft: 60
  }
});

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  setReduxInterests: interests => dispatch(setInterests(interests)),
  setReduxBio: bio => dispatch(setBio(bio))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile4);
