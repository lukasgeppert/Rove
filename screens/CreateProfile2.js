import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";
import { setLocation } from "../store/profileSubmission";

const cityList = [
  { name: "Austin", state: "TX" },
  { name: "Chicago", state: "IL" },
  { name: "San Francisco", state: "CA" },
  { name: "Los Angeles", state: "CA" },
  { name: "Denver", state: "CO" },
  { name: "Seattle", state: "WA" },
  { name: "New York", state: "NY" },
  { name: "Charlotte", state: "NC" },
  { name: "Portland", state: "OR" },
  { name: "Miami", state: "FL" },
  { name: "Philadelphia", state: "PA" },
  { name: "Other", state: ""}
];

export const CreateProfile2 = props => {
  let counter = 0;
  let [loc, setLoc] = useState(null);
  const onPress = (cityName, cityState) => {
    setLoc(cityName + ", " + cityState);
    props.pushLocation(cityName + ", " + cityState)
  };
  return (
    <View>
      {!loc ? (
        <>
          <Text style={styles.header}> Where are you located? </Text>
          {cityList.map(cityObj => {
            counter++;
            return (
              <Button
                key={counter + "P2"}
                style={styles.button}
                color="rgb(215,106,97)"
                title={cityObj.name + ", " + cityObj.state}
                onPress={() => {
                  onPress(cityObj.name, cityObj.state);
                }}
              ></Button>
            );
          })}
        </>
      ) : (
        <>
          <Text style={styles.header}>Your location is: {loc}</Text>
          <Button
            style={styles.button}
            title="Set a different city as my location"
            color="rgb(215,106,97)"
            onPress={() => setLoc(null)}
          ></Button>
          <Button
            style={styles.button}
            color="rgb(215,106,97)"
            title="Continue"
            onPress={() => props.navigation.navigate("Choose Profession")} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignSelf: "center",
    fontSize: 20
  },
  button: {
    color: "rgb(215,106,97)"
  }
});

const mapStateToProps = state => ({
  profileSubmission: state.profileSubmission,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  pushLocation: location => dispatch(setLocation(location))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile2);
