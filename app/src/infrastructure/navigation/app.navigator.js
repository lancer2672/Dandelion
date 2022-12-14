import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import User from "../../views/User/User";
import Home from "../../views/Home/Home";
export const AppNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "User") {
            iconName = focused ? "user-check" : "user";
          }
          // You can return any component that you like here!
          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        options={{ headerShown: false }}
        component={Home}
      />
      <Tab.Screen
        name="User"
        options={{ headerShown: false }}
        component={User}
      />
    </Tab.Navigator>
  );
};
