import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from './theme'

const SubHeader = (props) => <Text style={styles.subheader} {...props} />

const styles = StyleSheet.create({
  subheader: {
    fontSize: 25,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 40,
    textShadowColor:'#000000',
    textShadowRadius:20,
    
  },
})

export default SubHeader
