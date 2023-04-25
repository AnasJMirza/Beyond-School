import { View, Text } from "react-native";
import Home from "../screens/Home";
import Mentor from "../screens/Mentor";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="home"
        component={Home}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="mentor"
        component={Mentor}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};

export default HomeScreen;
