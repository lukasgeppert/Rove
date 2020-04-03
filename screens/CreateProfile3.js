import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
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
  { name: "Other", Picture: null}
];

export const CreateProfile3 = props => {
  let counter = 0;
  const [prof, setProf] = useState(null);
  const onPress = profession => {
    props.setProfession(profession);
    setProf(profession);
  };
  return (
    <View>
      {!prof ? (
        <>
          <Text style={styles.header}> What is your profession? </Text>
          {professionList.map(profession => {
            counter++;
            return (
              <Button
                key={counter + "P3"}
                style={styles.button}
                color="rgb(215,106,97)"
                title={profession.name}
                onPress={() => {
                  onPress(profession.name);
                }}
              ></Button>
            );
          })}
        </>
      ) : (
        <>
          <Text style={styles.header}>Your chosen profession is:</Text>
          <Text style={styles.header}>{prof}</Text>
          <Button
            style={styles.button}
            title="Set a different profession"
            color="rgb(215,106,97)"
            onPress={() => setProf(null)}
          ></Button>
          <Button
            style={styles.button}
            title="Continue"
            color="rgb(215,106,97)"
            onPress={() => props.navigation.navigate("Interests and Bio")} />
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
    color: "#000000"
  }
});

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  setProfession: profession => dispatch(setProfession(profession))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile3);
