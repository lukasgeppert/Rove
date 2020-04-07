import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import { setProfession } from "../store/profileSubmission";

const professionList = [
  { name: "Plumber", Picture: null },
  { name: "Software Engineer", Picture: null },
  { name: "Contractor", Picture: null },
  { name: "Business Negotiator", Picture: null },
  { name: "Architect", Picture: null },
  { name: "Diplomat", Picture: null },
  { name: "Transportation", Picture: null },
  { name: "Psychotic Serial Killer", Picture: null },
  { name: "Marketing", Picture: null },
  { name: "Other", Picture: null }
];

export const CreateProfile3 = props => {
  let counter = 0;
  const [prof, setProf] = useState(null);
  const onPress = profession => {
    props.setProfession(profession);
    setProf(profession);
  };
  return (
    <ScrollView>
      {!prof ? (
        <>
          <Text style={styles.header}> What is your profession? </Text>
          {professionList.map(profession => {
            counter++;
            return (
              <TouchableOpacity
                key={counter + "P3"}
                style={styles.currentProfession}
                onPress={() => {
                  onPress(profession.name);
                }}
              >
                <Text style={styles.name}>{profession.name}</Text>
              </TouchableOpacity>
            );
          })}
        </>
      ) : (
        <>
          <Text style={styles.header}>Your chosen profession is:</Text>
          <Text style={styles.header}>{prof}</Text>
          <TouchableOpacity
            style={styles.currentProfession}
            onPress={() => setProf(null)}
          >
            <Text style={styles.name}>Set a different profession</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.currentProfession}
            title="Continue"
            onPress={() => props.navigation.navigate("Interests and Bio")}
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
  professionButton: {
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
  currentProfession: {
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
  }
});

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  setProfession: profession => dispatch(setProfession(profession))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile3);
