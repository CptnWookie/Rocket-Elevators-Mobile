import React from 'react'
import { Image, StyleSheet } from 'react-native'

const Logo = () => (
  <Image source={require('../assets/logorocket.png')} style={styles.image} />
)

const styles = StyleSheet.create({
  image: {
    width: 188,
    height: 250,
    marginTop: 60,
    marginBottom: 60,
  },
})

export default Logo
