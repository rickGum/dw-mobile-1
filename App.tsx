import "./global.css";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./src/screens/HomeScreen";
import DetailScreen from "./src/screens/DetailScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import ActivityScreen from "./src/screens/ActivityScreen";
import AnalyticsScreen from "./src/screens/AnalyticsScreen";

export type HomeStackParamList = {
  Home: undefined;
  Detail: {
    id: number;
    name: string;
  };
};

export type RootTabParamList = {
  HomeTab: undefined;
  Analytics: undefined;
  Activity: undefined;
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
            backgroundColor: "#2196F3",
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
            backgroundColor: "#2196F3",
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
          tabBarActiveTintColor: "#0D47A1",
          tabBarInactiveTintColor: "gray",

          tabBarIcon: ({ focused, color, size }) => {
            let icon: keyof typeof Ionicons.glyphMap = "home";

            if (route.name === "HomeTab") {
              icon = focused ? "home" : "home-outline";
            } else if (route.name === "Analytics") {
              icon = focused ? "analytics" : "analytics-outline";
            } else if (route.name === "Activity") {
              icon = focused ? "notifications-sharp" : "notifications-outline";
            } else if (route.name === "ProfileTab") {
              icon = focused ? "person" : "person-outline";
            }

            return <Ionicons name={icon} size={size} color={color} />;
          },
          tabBarStyle: {backgroundColor: '#E3F2FD'}
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
          name="Analytics"
          component={AnalyticsScreen}
          options={{
            title: "Analitics",
          }}
        />
         <Tab.Screen
          name="Activity"
          component={ActivityScreen}
          options={{
            title: "Activity",
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
