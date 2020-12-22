import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../core/theme'

const Header = (props) => <Text style={styles.header} {...props} />

const styles = StyleSheet.create({
  header: {
    fontSize: 35,
    color: theme.colors.textwhite,
    fontWeight: 'bold',
    paddingVertical: 5,
    textShadowColor:'#000000',
    textShadowRadius:20,
    
  },
})

export default Header
