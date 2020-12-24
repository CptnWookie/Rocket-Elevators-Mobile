import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'


// This is where the user lands when opening the app.
// The Button will load the LoginScreen page when pressed.

const StartScreen = ({ navigation }) => (
  <Background>
    <Header>Rocket Elevators</Header>
    <Header>Mobile</Header>
    <Logo />
    <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
      Login
    </Button>
  </Background>
)

export default StartScreen
