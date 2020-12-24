Global = require("../core/Global");
import axios from "axios";
import React, { useState } from "react";
import Background from "../assets/elevbackground.jpeg";
import { Text, Button, ScrollView, StyleSheet, View, ImageBackground } from "react-native";

// This is the ElevatorStatus View
const ElevatorStatus = ({ navigation, route }) => {
  const [elevator, setElevator] = useState(() => route.params);
  const [isActive, setIsActive] = useState(() => false);

  // This is where the constant for the params of Elevators are set
  const {
    id,
    serialNumber,
    elevatorModel,
    elevatorType,
  } = elevator;

  // This is the funtion that will redirect the user to the HomeScreen the GoBack button is pressed
  const goBackToHome = () => navigation.goBack();

  // This is the function that will change the status of an elevator from his current state to "ACTIVE"
  // An API call (PUT) is made to update the status based on the endpoint of the REST API
  const changeStatus = async () => {
    await axios
      .put(
        `https://rocketrestapi.azurewebsites.net/api/Elevators/${elevator.id}/active`,
        {
          id: elevator.id,
          elevatorStatus: "ACTIVE",
        }
      )
      .then((result) => {

        // If the result is 200 and do not return "Request Invalid", the value of IsActive will be set to "true"
        if (result.status == 200 && result.data != "Request Invalid") {
          setIsActive((prev) => true);
          Global.tempElev.isActive = true;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // This is where all the objects displayed on the app are set
  // If IsActive is set to "true", based on the status change of the Elevator to Active, the function of the button will change to goBackHome and will redirect the user to HomeScreen if pressed
  // If IsActive is set to "false" (which is the default value), the function is to change the status to Active when pressed
  // If the Status is "INACTIVE", the text color of the Status is set to RED or (255, 0, 0)
  // If the Status is "ACTIVE", the text color of the Status is set to GREEN or (0, 255, 0)
  return (
    <ImageBackground source={Background} style={styles.background}>
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.cardTextElse}>Elevator Id: {elevator.id}</Text>
          {isActive ? (
            <Text style={styles.cardTextActive}>Status: ACTIVE</Text>
          ) : (
            <Text style={styles.cardTextInactive}>
              Status: {elevator.elevatorStatus}
            </Text>
          )}
          <Text style={styles.cardTextElse}>Serial Number: {serialNumber}</Text>
          <Text style={styles.cardTextElse}>Model: {elevatorModel}</Text>
          <Text style={styles.cardTextElse}>Type: {elevatorType}</Text>

          {isActive ? (
            <Button
              title="Go Back"
              onPress={() => goBackToHome()}
            />
          ) : (
            <Button
              title="Change the status to active"
              onPress={() => changeStatus()}
            />
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default ElevatorStatus;

// This is where the styles are defined instead of within the object's description
const styles = StyleSheet.create({
  container: {
    marginTop: 300,
    justifyContent: "center",
    alignItems: "center",
    opacity: 100,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "105%",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTextActive: {
    fontSize: 20,
    fontWeight: "bold",
    color: "rgb(0, 255, 0)",
    textShadowColor:'#000000',
    textShadowRadius:10,
  },
  cardTextInactive: {
    fontSize: 20,
    fontWeight: "bold",
    color: "rgb(255, 0, 0)",
    textShadowColor:'#000000',
    textShadowRadius:2,
  },
  cardTextElse: {
    fontSize: 22,
    fontWeight: "bold",
    color: "rgb(255, 255, 255)",
    textShadowColor:'#000000',
    textShadowRadius: 7,
  },
});
