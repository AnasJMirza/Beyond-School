import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '../navigation/AuthProvider';

const Home = () => {
    const { logout, user } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      <Text>{user.email}</Text>
      <Button onPress={()=>logout()} title='logout' />
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    }
})