import React from 'react'
import { TouchableHighlight, Text, StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    button: {
        fontSize: 40,
        width: Dimensions.get('window').width / 4,
        height: Dimensions.get('window').width / 4,
        padding: 20,
        backgroundColor: '#f0f0f0',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#888',
    },
    operation: {
        color: '#fff',
        backgroundColor: '#fa8231',
    },
    btnDouble: {
        width: (Dimensions.get('window').width / 4) * 2
    },
    btnTriple: {
        width: (Dimensions.get('window').width / 4) * 3
    }
})

export default props => {
    const styleButton = [styles.button]
    if (props.double) styleButton.push(styles.btnDouble)
    if (props.triple) styleButton.push(styles.btnTriple)
    if (props.operation) styleButton.push(styles.operation)
    return (
        <TouchableHighlight onPress={props.onClick}>
            <Text style={styleButton}>{props.label}</Text>
        </TouchableHighlight>
    )
}