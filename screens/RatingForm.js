import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Picker,
  Button,
} from "react-native";
import { Rating, AirbnbRating } from "react-native-ratings";

import * as firebase from "firebase";
import Fire from "../Firebase";

const RatingForm = ({ route, navigation }) => {
  const { city } = route.params;
  // const [roveScore, setRoveScore] = useState(0);
  const [safety, setSafety] = useState(0);
  const [locals, setLocals] = useState(0);
  const [cleanliness, setCleanliness] = useState(0);
  const [value, setValue] = useState(0);
  const [coworkingspace, setCoworkingspace] = useState(0);

  const submitRating = () => {
    Fire.addRating(
      city.name,
      safety,
      locals,
      cleanliness,
      value,
      coworkingspace
    )
      .then((ref) => {
        setSafety(0);
        setLocals(0);
        setCleanliness(0);
        setValue(0);
        setCoworkingspace(0);
      })
      .then(() => navigation.goBack())
      .catch((error) => {
        alert(error.message);
      });
  };



  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 28, textAlign: "center", marginBottom: 20 }}>
        Add a Rating for {city.name}
      </Text>
      <View>
        <Text style={{ fontSize: 22, textAlign: "center" }}>Safety</Text>
        <AirbnbRating
          count={5}
          title={"safety"}
          reviews={["Terrible", "Bad", "Good", "Wow", "Amazing"]}
          defaultRating={0}
          size={20}
          onFinishRating={(rating) => setSafety(rating)}
        />
      </View>
      <View>
        <Text style={{ fontSize: 22, marginTop: 15, textAlign: "center" }}>
          Locals
        </Text>
        <AirbnbRating
          count={5}
          title={"cost"}
          reviews={["Terrible", "Bad", "Good", "Wow", "Amazing"]}
          defaultRating={0}
          size={20}
          onFinishRating={(rating) => setLocals(rating)}
        />
      </View>
      <View>
        <Text style={{ fontSize: 22, marginTop: 15, textAlign: "center" }}>
          Cleanliness
        </Text>
        <AirbnbRating
          count={5}
          title={"cleanliness"}
          reviews={["Terrible", "Bad", "Good", "Wow", "Amazing"]}
          defaultRating={0}
          size={20}
          onFinishRating={(rating) => setCleanliness(rating)}
        />
      </View>
      <View>
        <Text style={{ fontSize: 22, marginTop: 15, textAlign: "center" }}>
          Value
        </Text>
        <AirbnbRating
          count={5}
          title={"cost"}
          reviews={["Terrible", "Bad", "Good", "Wow", "Amazing"]}
          defaultRating={0}
          size={20}
          onFinishRating={(rating) => setValue(rating)}
        />
      </View>
      <View>
        <Text style={{ fontSize: 22, marginTop: 15, textAlign: "center" }}>
          Co-working Space
        </Text>
        <AirbnbRating
          count={5}
          title={"coworkingspace"}
          reviews={["Terrible", "Bad", "Good", "Wow", "Amazing"]}
          defaultRating={0}
          size={20}
          onFinishRating={(rating) => setCoworkingspace(rating)}
        />
      </View>
      <View style={styles.addFriendButton}>
        <TouchableOpacity onPress={submitRating}>
          <Text style={{ fontWeight: "500", color: "white" }}>
            Submit Rating
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, width: 100 + "%", height: 100 + "%" },
  addFriendButton: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 2,
    backgroundColor: "rgb(215,106,97)",
    width: 120,
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
    marginLeft: 140,
    marginVertical: 30,
  },
});

export default RatingForm;
