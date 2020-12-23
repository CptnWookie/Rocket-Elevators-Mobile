import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Button,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Background from "../assets/elevbackground5.jpeg";
import { useIsFocused } from '@react-navigation/native';
import Card from "../components/Card";
import SubHeader from "../components/SubHeader";
import axios from "axios";


// export default class Home extends React.Component {
const HomeScreen = (props) => {
  const patate = useIsFocused();
  const [state, setState] = useState(() => {
    return {
      isLoading: true,
      dataLength: 2,
      dataNumberElevatorsOff: [],
    };
  });

  useEffect(() => {getInformationAboutElevators()}, []);
  useEffect(() => {getInformationAboutElevators()}, [patate]);

  const getInformationAboutElevators = async () => {
    await axios
      .get("https://rocketrestapi.azurewebsites.net/api/ElevatorsOff")
      .then((result) => {
        if (result.status == 200) {
          let number = 0;
          result.data.forEach((elev) => number += 1);

          setState((prev) => {
            return {
              isLoading: false,
              dataLength: number,
              dataNumberElevatorsOff: result.data,
            };
          });
        }
      })
      .catch((err) => console.log(err));
  };
  
  return (
    <View style={styles.container}>
      <ImageBackground source={Background} style={styles.background}>
        <SubHeader>Currently {state.dataLength} not running</SubHeader>

        <ScrollView>
          {state.dataNumberElevatorsOff.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => props.navigation.navigate("ElevatorStatus", item)}
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
  // }
  //   };
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  // greetings: {
  //   color: 'blue',
  //   fontSize: 22,
  //   marginHorizontal: 15,
  //   marginBottom: 10,
  // },
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
