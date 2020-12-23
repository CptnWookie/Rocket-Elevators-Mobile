import React, { useState, useEffect } from "react";
import Background from "../components/Background";
import { Text, Button, ScrollView, StyleSheet, View } from "react-native";

const ElevatorStatus = ({ route }) => {
  const [elevator, setElevator] = useState(() => route.params);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>Id: {elevator.id}</Text>
        <Text>Status: {elevator.status}</Text>
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
});
