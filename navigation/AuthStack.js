import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnBoard from "../screens/OnBoard";
import Login from "../screens/Login";
import Signup from "../screens/Signup";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(false);
  let routeName;
//   React.useEffect(() => {
//     AsyncStorage.getItem("alreadyLaunched").then((value) => {
//       if (value == null) {
//         AsyncStorage.setItem("alreadyLaunched", "true");
//         setIsFirstLaunch(true);
//       } else {
//         setIsFirstLaunch(false);
//       }
//     });
//   }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    routeName = "onBoard";
  } else {
    routeName = "login";
  }

  return (
    <Stack.Navigator initialRouteName={'login'}>
      <Stack.Screen
        name="onBoard"
        component={OnBoard}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="signup"
        component={Signup}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
