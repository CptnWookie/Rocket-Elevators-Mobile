import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Card(props) {
    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                { props.children }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 8,
        elevation: 4,
        backgroundColor: 'white',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#444',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 6,
        marginVertical: 8 
    },
    cardContent: {
        marginHorizontal: 20,
        marginVertical: 15
    },
    cardTextActive: {
        fontSize: 20,
        color: "rgb(0, 255, 0)",
        textShadowColor:'#000000',
        textShadowRadius: 10,
    },
    cardTextInactive: {
        fontSize: 20,
        color: "rgb(255, 0, 0)",
        textShadowColor:'#000000',
        textShadowRadius: 10,
    },
    cardTextElse: {
        fontSize: 22,
        color: "rgb(255, 255, 255)",
        textShadowColor:'#000000',
        textShadowRadius: 10,
      }
});