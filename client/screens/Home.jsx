import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { UserContext } from '../navigation/Routes';


const Home = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  console.log(user);
  return (
    <SafeAreaView style={styles.container}>
      <Text>{user.email}</Text>
      <Button title='mentor' onPress={()=>navigation.navigate('mentor')} />
      <Button title='logout' onPress={()=>setUser(null)} />
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