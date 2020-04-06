import React, { useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { connect } from "react-redux";
import { setLocation } from "../store/profileSubmission";
import { TouchableOpacity } from "react-native-gesture-handler";

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
  { name: "Other", state: "" }
];

export const CreateProfile2 = props => {
  let counter = 0;
  let [loc, setLoc] = useState(null);
  const onPress = (cityName, cityState) => {
    setLoc(cityName + ", " + cityState);
    props.pushLocation(cityName + ", " + cityState);
  };
  return (
    <ScrollView>
      {!loc ? (
        <>
          <Text style={styles.header}> Where are you located? </Text>
          {cityList.map(cityObj => {
            counter++;
            return (
              <TouchableOpacity
                key={counter + "P2"}
                style={styles.cityButton}
                onPress={() => {
                  onPress(cityObj.name, cityObj.state);
                }}
              >
                <Text style={styles.name}>
                  {cityObj.name + ", " + cityObj.state}
                </Text>
              </TouchableOpacity>
            );
          })}
        </>
      ) : (
        <>
          <Text style={styles.header}>Your location is: {loc}</Text>
          <TouchableOpacity
            style={styles.currentCityButton}
            onPress={() => setLoc(null)}
          >
            <Text style={styles.name}>Set a different city as my location</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => props.navigation.navigate("Choose Profession")}
          >
            <Text style={styles.name}>Continue</Text>
          </TouchableOpacity>
          
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    alignSelf: "center",
    fontSize: 20
  },
  cityButton: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 2,
    backgroundColor: "rgb(215,106,97)",
    width: 200,
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
    marginLeft: 107
  },
  currentCityButton: {
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
  name: {
    fontSize: 15,
    justifyContent: "center",
    // borderBottomWidth: 3
    color: "white"
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
