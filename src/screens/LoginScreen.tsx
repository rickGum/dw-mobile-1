import React, { useContext, useState } from "react";
import { AuthContext } from "../../App";

import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { api } from "../config/api";
import * as SecureStore from "expo-secure-store";

const LoginScreen = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const { signIn } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email & Password di perlukan!");
      return;
    }
    try {
      const response = await api.post("/login", {
        email: email,
        password: password,
      });

      signIn(response.data.token);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-sky-50">
      <View className="flex-1 justify-center px-6">
        <View className="mb-10">
          <Text className="text-4xl font-bold text-sky-600">Welcome 👋</Text>

          <Text className="mt-2 text-base text-gray-500">
            Login untuk melanjutkan
          </Text>
        </View>

        <View className="rounded-3xl bg-white p-6">
          <Text className="mb-2 font-semibold text-gray-700">Email</Text>

          <TextInput
            className="mb-5 rounded-xl border border-sky-200 bg-sky-50 px-4 py-4 text-base"
            placeholder="Masukkan email"
            placeholderTextColor="#94A3B8"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text className="mb-2 font-semibold text-gray-700">Password</Text>

          <TextInput
            className="mb-7 rounded-xl border border-sky-200 bg-sky-50 px-4 py-4 text-base"
            placeholder="Masukkan password"
            placeholderTextColor="#94A3B8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            onPress={handleLogin}
            activeOpacity={0.8}
            className="items-center rounded-xl bg-sky-500 py-4"
          >
            <Text className="text-base font-bold text-white">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
