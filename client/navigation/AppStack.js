import React, { useContext } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/CustomDrawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import Universities from "../screens/Universities";
import Upgrade from "../screens/Upgrade";
import Guidence from "../screens/Guidence";
import { UserContext } from "./Routes";

const Drawer = createDrawerNavigator();
// const Tab = createMaterialBottomTabNavigator();

// function TabRoutes() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Profile" component={ProfileScreen} />
//     </Tab.Navigator>
//   );
// }

export default function AppStack() {
  const { user } = useContext(UserContext);
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#7E57C2",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: { fontFamily: "Roboto_400Regular", fontSize: 16, marginLeft: -20 },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ focused, color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ focused, color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
        }}
      />
      {user?.role != "mentor" && (
        <>
          <Drawer.Screen
            name="Universities"
            component={Universities}
            options={{
              drawerIcon: ({ focused, color, size }) => <Ionicons name="school-outline" size={size} color={color} />,
            }}
          />

          <Drawer.Screen
            name="Guidence"
            component={Guidence}
            options={{
              drawerIcon: ({ focused, color, size }) => <Ionicons name="megaphone-outline" size={size} color={color} />,
            }}
          />
          <Drawer.Screen
            name="Upgrade"
            component={Upgrade}
            options={{
              drawerIcon: ({ focused, color, size }) => <Ionicons name="rocket-outline" size={size} color={color} />,
            }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
}
