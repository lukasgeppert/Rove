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

const RatingForm = ({ route }) => {
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
      .catch((error) => {
        alert(error.message);
      });
  };

  // console.log("Weather", weather);
  // console.log("Name", name);
  // console.log("fun", fun);
  // console.log("cost", cost);

  return (
    <View style={styles.container}>
      <Text>Add a Rating for {city.name}</Text>
      <View>
        <Text>Safety</Text>
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
        <Text>Locals</Text>
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
        <Text>Cleanliness</Text>
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
        <Text>Value</Text>
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
        <Text>Co-working Space</Text>
        <AirbnbRating
          count={5}
          title={"coworkingspace"}
          reviews={["Terrible", "Bad", "Good", "Wow", "Amazing"]}
          defaultRating={0}
          size={20}
          onFinishRating={(rating) => setCoworkingspace(rating)}
        />
      </View>
      <View>
        <TouchableOpacity onPress={submitRating}>
          <Text style={{ fontWeight: "500" }}>Submit Rating</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, width: 100 + "%", height: 100 + "%" },
});

export default RatingForm;
