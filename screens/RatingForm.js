import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Picker,
  Button
} from "react-native";
import { Rating, AirbnbRating } from "react-native-ratings";

import * as firebase from "firebase";
import Fire from "../Firebase";

const RatingForm = ({ route }) => {
  const { name } = route.params;
  // const [roveScore, setRoveScore] = useState(0);
  const [cost, setCost] = useState(0);
  const [weather, setWeather] = useState(0);
  const [internet, setInternet] = useState(0);
  const [fun, setFun] = useState(0);
  const [safety, setSafety] = useState(0);

  const submitRating = () => {
    Fire.addRating(name, cost, weather, internet, fun, safety)
      .then(ref => {
        setCost(0);
        setWeather(0);
        setInternet(0);
        setFun(0);
        setSafety(0);
      })
      .catch(error => {
        alert(error.message);
      });
  };

  console.log("Weather", weather);
  console.log("Name", name);
  console.log("fun", fun);
  console.log("cost", cost);

  return (
    <View style={styles.container}>
      <Text>Add a Rating for {name}</Text>
      <View>
        <Text>Cost</Text>
        <AirbnbRating
          count={6}
          title={"cost"}
          reviews={[
            "Overpriced",
            "Pricey",
            "Meh",
            "Reasonable",
            "Good Deal",
            "A Bargain!"
          ]}
          defaultRating={1}
          size={20}
          onFinishRating={rating => setCost(rating)}
        />
      </View>
      <View>
        <Text>Weather</Text>
        <AirbnbRating
          count={6}
          title={"cost"}
          reviews={["Terrible", "Bad", "Meh", "Good", "Wow", "Amazing"]}
          defaultRating={0}
          size={20}
          onFinishRating={rating => setWeather(rating)}
        />
      </View>
      <View>
        <Text>Internet</Text>
        <AirbnbRating
          count={6}
          title={"cost"}
          reviews={["Terrible", "Bad", "Meh", "Good", "Wow", "Amazing"]}
          defaultRating={0}
          size={20}
          onFinishRating={rating => setInternet(rating)}
        />
      </View>
      <View>
        <Text>Fun</Text>
        <AirbnbRating
          count={6}
          title={"cost"}
          reviews={["Terrible", "Bad", "Meh", "Good", "Wow", "Amazing"]}
          defaultRating={0}
          size={20}
          onFinishRating={rating => setFun(rating)}
        />
      </View>
      <View>
        <Text>Safety</Text>
        <AirbnbRating
          count={6}
          title={"cost"}
          reviews={["Terrible", "Bad", "Meh", "Good", "Wow", "Amazing"]}
          defaultRating={0}
          size={20}
          onFinishRating={rating => setSafety(rating)}
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
  container: { flex: 1, width: 100 + "%", height: 100 + "%" }
});

export default RatingForm;
