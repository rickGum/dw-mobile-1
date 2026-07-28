import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./src/screens/HomeScreen";
import DetailScreen from "./src/screens/DetailScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

export type HomeStackParamList = {
  Home: undefined;
  Detail: {
    id: number;
    name: string;
  };
};

export type RootTabParamList = {
  HomeTab: undefined;
  ProfileTab: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          headerStyle: {
            backgroundColor: "#3E3E75",
          },
          headerTintColor: "#fff",
        }}
      />

      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          title: "Detail Product",
          headerStyle: {
            backgroundColor: "#3E3E75",
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "#e67e22",
          tabBarInactiveTintColor: "gray",

          tabBarIcon: ({ focused, color, size }) => {
            let icon: keyof typeof Ionicons.glyphMap = "home";

            if (route.name === "HomeTab") {
              icon = focused ? "home" : "home-outline";
            } else {
              icon = focused ? "person" : "person-outline";
            }

            return (
              <Ionicons
                name={icon}
                size={size}
                color={color}
              />
            );
          },
        })}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStack}
          options={{
            title: "Home",
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="ProfileTab"
          component={ProfileScreen}
          options={{
            title: "Profile",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}