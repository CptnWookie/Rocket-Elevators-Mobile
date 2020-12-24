import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Image, Button } from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import ButtonConnect from "../components/ButtonConnect";
import TextInput from "../components/TextInput";
import { theme } from "../components/theme";
import axios from "axios";
import { getStatusBarHeight } from "react-native-status-bar-height";

// This is the LoginScreen View
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState(() => {
    return { value: "", error: "" };
  });

  // This is where the field for the email is set
  const changeEmailInput = (_email) => {
    setEmail((prev) => {
      return {
        value: _email,
        error: "",
      };
    });
  };

  // This is where the API Call to validate is made when the Login Button is pressed
  const onLoginPressed = async () => {
    await axios
      .get( "https://rocketrestapi.azurewebsites.net/api/Employees/employees/" + email.value )
      .then((result) => {

        // If the result from the API call is 200, which mines the email is valide, the HomeScreen page will load.
        if (result.status == 200) {
          navigation.navigate("HomeScreen");
        }
      })

      // If the email entered is invalide, a prompt error message will be displayed
      .catch(function (error) {
        console.log("Please type a valide Employee Email");
        alert("Please type a valide Employee Email");
      });
  };

  // This is where all the objects displayed on the app are set
  return (
    <Background>
      <TouchableOpacity onPress={navigation.goBack} style={styles.container}>
        <Image
          style={styles.image}
          source={require("../assets/arrow_back.png")}
        />
      </TouchableOpacity>
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
      <ButtonConnect mode="contained" onPress={() => onLoginPressed()}>
        Connect
      </ButtonConnect>
    </Background>
  );
};

// This is where the styles are defined instead of within the object's description
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
