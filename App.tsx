import "./global.css";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import DetailScreen from "./src/screens/DetailScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import ActivityScreen from "./src/screens/ActivityScreen";
import AnalyticsScreen from "./src/screens/AnalyticsScreen";

export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
};

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

const RootStack = createNativeStackNavigator<RootStackParamList>();

const HomeStackNavigator = createNativeStackNavigator<HomeStackParamList>();

const Tab = createBottomTabNavigator<RootTabParamList>();

function HomeStack() {
  return (
    <HomeStackNavigator.Navigator>
      <HomeStackNavigator.Screen
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

      <HomeStackNavigator.Screen
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
    </HomeStackNavigator.Navigator>
  );
}

function MainTabs() {
  return (
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
            icon = focused ? "notifications" : "notifications-outline";
          } else if (route.name === "ProfileTab") {
            icon = focused ? "person" : "person-outline";
          }

          return <Ionicons name={icon} size={size} color={color} />;
        },

        tabBarStyle: {
          backgroundColor: "#E3F2FD",
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
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          title: "Analytics",
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
  );
}

export const AuthContext = createContext<any>(null);
export default function App() {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("userToken");
        setUserToken(token);
      } catch (error) {
        console.log("Something went wrong", error);
      } finally {
        setIsLoading(false);
      }
    };
  });

  const authContext = useMemo(
    () => ({
      signIn: async (token: string) => {
        await SecureStore.setItemAsync("userToken", token);
        setUserToken(token);
      },
      signOut: async () => {
        await SecureStore.deleteItemAsync("userToken");
        setUserToken(null);
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Login">
          {userToken == null ? (
            <RootStack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
          ) : (
            <RootStack.Screen
              name="MainTabs"
              component={MainTabs}
              options={{
                headerShown: false,
              }}
            />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
