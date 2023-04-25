import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from 'react'
import Home from "../screens/Home";


const Stack = createNativeStackNavigator();

export default function AppStack() {

  return (
    <Stack.Navigator initialRouteName={'home'}>
      <Stack.Screen
        name="home"
        component={Home}
        options={{ header: () => null }}
      />
     
    </Stack.Navigator>
  )
}

