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
import { FlatList } from "react-native-gesture-handler";
import Fire from "../Firebase";

export const Details = ({ route, navigation }) => {
  // const { id } = route.params;
  const { name } = route.params;
  const [ratings, setRatings] = useState([]);

  const fetchRatings = async () => {
    const ratings = await Fire.getRatings(name);
    console.log("All ratings for a city", ratings);

    return ratings;
  };

  useEffect(() => {
    fetchRatings().then(ratings => setRatings(ratings));
  }, []);

  const renderRatings = rating => {
    return (
      <View>
        <Text>{rating.user.name}'s Rating</Text>
        <Text>Cost: {rating.rating.cost}</Text>
        <Text>Fun: {rating.rating.fun}</Text>
        <Text>Internet: {rating.rating.internet}</Text>
        <Text>Safety: {rating.rating.safety}</Text>
        <Text>Weather: {rating.rating.weather}</Text>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Text>{name}</Text>
        {/* <Text>city: {id}</Text> */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("RatingForm", {
              name: name
            });
          }}
        >
          <Text>Add New Rating</Text>
        </TouchableOpacity>
      </View>

      <View>
        <FlatList
          data={ratings}
          renderItem={({ item }) => renderRatings(item)}
          keyExtractor={(index, item) => item.toString()}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, width: 100 + "%", height: 100 + "%" }
});

export default Details;
