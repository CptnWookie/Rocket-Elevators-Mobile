import React, { useState } from 'react'
import { Text, View, ActivityIndicator, Button, FlatList, ImageBackground, TouchableOpacity, StyleSheet} from 'react-native'
import Background from '../assets/elevbackground5.jpeg'
import Card from '../components/Card'
import SubHeader from '../components/SubHeader'


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataNumberElevatorsOff: null
        }
    }

    componentDidMount() {
        this.getInformationAboutElevators();
    }

    getInformationAboutElevators = async () => {
        const response = await fetch('https://rocketrestapi.azurewebsites.net/api/ElevatorsOff')
        
        const ElevatorsOff = await response.json(response.body)
        
        this.setState({
            isLoading: false,
            dataElevatorsOff: ElevatorsOff,
        })
    }

    
//https://reactnative.dev/docs/flatlist
    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator />
                </View>
            )
        } else {
            return (
            <View style={styles.container} >
                <ImageBackground source={Background} style={styles.background}>

                  {/* <Text style={styles.information} >There are currently {this.state.dataElevatorsOff.length} who are not running</Text> */}
                  <SubHeader>Currently {this.state.dataElevatorsOff.length} not running</SubHeader>
                  
                  <FlatList style={styles.listElevator}
                      data = {this.state.dataElevatorsOff}  //data = reserved word
                      keyExtractor = {(key, val) => val.toString()}
                      renderItem = {({ item }) => (
                          <TouchableOpacity onPress={() => this.props.navigation.navigate('elevatorStatus', item)}>
                          <Card>
                              <Text>Elevator #{item.id} Status : {item.elevatorStatus}</Text>
                          </Card>
                          </TouchableOpacity>
                      )}
                  />

                  <Button style={styles.button} title='LogOut' onPress={() => this.props.navigation.navigate('StartupApplication')} />

                </ImageBackground>
            </View>
            )
        }
    }
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    listElevator: {
        color: 'blue',
      },
    background: {
      flex: 1,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    // greetings: {
    //   color: 'blue',
    //   fontSize: 22,
    //   marginHorizontal: 15,
    //   marginBottom: 10,
    // },
    information: {
      color: 'blue',
      fontSize: 18,
      marginHorizontal: 15,
      marginBottom: 10,
    },
    button: {
      backgroundColor: "blue",
      padding: 20,
      margin: 10,
      borderRadius: 5,
    },
})