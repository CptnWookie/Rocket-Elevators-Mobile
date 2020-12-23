import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../components/theme'
import { emailValidator } from '../components/EmailValidator'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: '' })
  
  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeScreen' }],
    })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      {/* <Header>Rocket Elevators</Header>
      <Header>Mobile</Header> */}
      <Header>Login</Header>
      <Logo />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <Button mode="contained" onPress={onLoginPressed}>
        Connect
      </Button>
      
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.secondary,
  },
})

export default LoginScreen
