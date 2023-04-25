import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Line = ({ ...rest }) => {
  return (
    <View style={styles.container} {...rest}>
        <View style={styles.line}></View>
        <Text>Or continue with</Text>
        <View style={styles.line}></View>
    </View>
  )
}

export default Line;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        gap: 10,
    },
    
    line: {
        width: 80,
        height: 1,
        backgroundColor: '#3b3a3b21',
    }
})