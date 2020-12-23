import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Button,
} from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import ButtonConnect from "../components/ButtonConnect";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../components/theme";
import { emailValidator } from "../components/EmailValidator";
import axios from "axios";
import { getStatusBarHeight } from "react-native-status-bar-height";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState(() => {
    return { value: "", error: "" };
  });

  const changeEmailInput = (_email) => {
    setEmail((prev) => {
      return {
        value: _email,
        error: "",
      };
    });
  };

  const onLoginPressed = async () => {
    await axios
      .get(
        "https://rocketrestapi.azurewebsites.net/api/Employees/employees/" +
          email.value
      )
      .then((result) => {
        if (result.status == 200) {
          navigation.navigate("HomeScreen");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Background>
      <TouchableOpacity onPress={navigation.goBack} style={styles.container}>
        <Image
          style={styles.image}
          source={require("../assets/arrow_back.png")}
        />
      </TouchableOpacity>
      <Button title="some title" onPress={() => navigation.goBack()} />
      {/* <Header>Rocket Elevators</Header>
      <Header>Mobile</Header> */}
      <Header>Login</Header>
      <Logo />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={changeEmailInput}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      {/* <Button mode="contained" onPress={onLoginPressed}>
        Connect
      </Button> */}

      <ButtonConnect
        mode="contained"
        onPress={() => navigation.navigate("HomeScreen")}
      >
        Connect
      </ButtonConnect>
    </Background>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.secondary,
  },
  container: {
    position: "absolute",
    top: 10 + getStatusBarHeight(),
    left: 4,
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default LoginScreen;
