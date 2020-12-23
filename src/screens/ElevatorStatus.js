Global = require("../core/Global");
import axios from "axios";
import React, { useState, useEffect } from "react";
import Background from "../components/Background";
import { Text, Button, ScrollView, StyleSheet, View } from "react-native";

const ElevatorStatus = ({ navigation, route }) => {
  const [elevator, setElevator] = useState(() => route.params);
  const [isActive, setIsActive] = useState(() => false);

  const goBackToHome = () => navigation.goBack();

  const changeStatus = async () => {
    await axios
      .put(
        `https://rocketrestapi.azurewebsites.net/api/Elevators/${elevator.id}/Status`,
        {
          id: elevator.id,
          elevatorStatus: "Active",
        }
      )
      .then((result) => {
        if (result.status == 200 && result.data != "Request Invalid") {
          setIsActive((prev) => true);
          Global.tempElev.isActive = true;
        };
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>Id: {elevator.id}</Text>
        {isActive ? (
          <Text style={{ color: "rgb(0, 255, 0)" }}>Status: ACTIVE</Text>
        ) : (
          <Text style={{ color: "rgb(255, 0, 0)" }}>
            Status: {elevator.elevatorStatus}
          </Text>
        )}

        {isActive ? (
          <Button
            // style={styles.buttonActive}
            title="Go Back"
            onPress={() => goBackToHome()}
          />
        ) : (
          <Button
            // style={styles.buttonNotActive}
            title="Change the status to active"
            onPress={() => changeStatus()}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default ElevatorStatus;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonActive: {},
  buttonNotActive: {},
});

// {
//   "id": 3,
//   "columnId": 1,
//   "serialNumber": "000-24-6173",
//   "elevatorModel": "Elevatroma",
//   "elevatorType": "Hybrid",
//   "elevatorStatus": "Inactive",
//   "dateOfCommissioning": "2017-10-04T00:00:00",
//   "dateOfLastInspection": "2020-01-12T00:00:00",
//   "certificateOfInspection": "General",
//   "information": "Sed consectetur sint perspiciatis dolores nam est totam natus.",
//   "notes": "Voluptates ratione magni.",
//   "createdAt": "2018-07-08T09:30:31",
//   "updatedAt": "2020-11-07T03:59:09"
// }
