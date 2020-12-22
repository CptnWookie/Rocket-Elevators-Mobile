import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../core/theme'

const SubHeader = (props) => <Text style={styles.subheader} {...props} />

const styles = StyleSheet.create({
  subheader: {
    fontSize: 25,
    color: theme.colors.textwhite,
    fontWeight: 'bold',
    paddingVertical: 35,
    textShadowColor:'#000000',
    textShadowRadius:20,
    
  },
})

export default SubHeader
