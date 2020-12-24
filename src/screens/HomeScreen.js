Global = require("../core/Global");
import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, Button, ImageBackground, TouchableOpacity, StyleSheet, } from "react-native";
import Background from "../assets/elevbackground5.jpeg";
import { useIsFocused } from "@react-navigation/native";
import Card from "../components/Card";
import SubHeader from "../components/SubHeader";
import axios from "axios";

// This is the HomeScreen view
const HomeScreen = (props) => {
  const isFocused = useIsFocused();
  const [state, setState] = useState(() => {
    return {
      isLoading: true,
      dataLength: undefined,
      dataNumberElevatorsOff: [],
    };
  });

  // This is where the Not in Operation Elevators are loaded but only once. If the page is refreshed from Elevator Status page, only the list will be updated
  useEffect(() => {
    getInformationAboutElevators();
  }, []);

  // This is where the Not in Operation Elevators are loaded when coming back from ElevatorStatus View
  useEffect(() => {
    removeTempFromListIfActive();
    
    state.dataNumberElevatorsOff.map((item, i) => console.log("ItemId: " + item.id + " - Index: " + i))
    console.log(Global.tempElev);
  }, [isFocused]);

  // This is where the Elevator whom got his status updated will be removed from the list
  const removeTempFromListIfActive = () => {
    if (Global.tempElev.isActive) {
      setState((prev) => {
        let tempList = [];
        let num = 0;

        for (let i = 0; i < prev.dataLength; i++) {
          const elev = prev.dataNumberElevatorsOff[i];
          if (
            elev.id != Global.tempElev.elevatorId
          ) {
            console.log(elev)
            num++;
            tempList.push(elev);
          }
        }

        Global.tempElev.isActive = false;
        
        let tempState = {
          isLoading: false,
          dataLength: num,
          dataNumberElevatorsOff: tempList,
        }
        console.log(tempState)

        return tempState;
      });
    }
  };

  // This is where the API call is made to gather the list of Not in Operation Elevators is made
  const getInformationAboutElevators = async () => {
    await axios
      .get("https://rocketrestapi.azurewebsites.net/api/ElevatorsOff")
      .then((result) => {

        // If the result from the call is 200 (which means the API is getting a response from the database), it will add 1 elevator to the list for each Elevator read
        if (result.status == 200) {
          let number = 0;
          result.data.forEach((elev) => (number += 1));

          setState((prev) => {
            return {
              isLoading: false,
              dataLength: number,
              dataNumberElevatorsOff: result.data,
            };
          });
        }
      })
      .catch((error) => console.log(error));
  };

  // This is the navigation action triggered by the button in the object below
  const navigateToElevatorStatus = (_item) => {
    Global.tempElev.elevatorId = _item.id;
    props.navigation.navigate("ElevatorStatus", _item);
  };

  // This is where all the objects displayed on the app are set
  return (
    <View style={styles.container}>
      <ImageBackground source={Background} style={styles.background}>
        <SubHeader>Currently {state.dataLength} not running</SubHeader>

        <ScrollView>
          {state.dataNumberElevatorsOff.map((item, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => navigateToElevatorStatus(item)}
            >
              <Card>
                <Text>
                  Elevator #{item.id} Status : {item.elevatorStatus}
                </Text>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Button
          style={styles.button}
          title="LogOut"
          onPress={() => props.navigation.popToTop()}
        />
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;

// This is where the styles are defined instead of within the object's description
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listElevator: {
    color: "blue",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  information: {
    color: "blue",
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    marginBottom: 20,
    borderRadius: 5,
  },
});
