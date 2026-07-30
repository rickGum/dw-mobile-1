import React, { useContext } from "react";
import {
Alert,
Image,
Pressable,
Text,
View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthContext } from "../../App";

const ProfileScreen = () => {
const { signOut } = useContext(AuthContext);

const logout = () => {
Alert.alert(
"Logout",
"Apakah kamu yakin ingin keluar?",
[
{
text: "Batal",
style: "cancel",
},
{
text: "Logout",
style: "destructive",
onPress: async () => {
await signOut();
},
},
]
);
};

return (
<SafeAreaView className="flex-1 bg-slate-50">
<View className="flex-1 px-5 pt-8">
<Text className="text-2xl font-bold text-slate-900">
Profile
</Text>

    <Text className="mt-1 text-sm text-slate-500">
      Kelola informasi akun kamu.
    </Text>

    <View className="mt-7 items-center rounded-3xl bg-white p-6">
      <Image
        source={require("../../assets/images.jpg")}
        className="h-28 w-28 rounded-full"
      />

      <Text className="mt-4 text-xl font-bold text-slate-900">
        Ricksan
      </Text>

      <Text className="mt-1 text-sm text-slate-500">
        React Native Developer
      </Text>

      <View className="mt-6 flex-row">
        <View className="items-center px-6">
          <Text className="text-xl font-bold text-blue-600">
            12
          </Text>

          <Text className="text-xs text-slate-400">
            Project
          </Text>
        </View>

        <View className="items-center border-l border-slate-200 px-6">
          <Text className="text-xl font-bold text-blue-600">
            24
          </Text>

          <Text className="text-xs text-slate-400">
            Task
          </Text>
        </View>
      </View>
    </View>

    <Pressable
      onPress={logout}
      className="mt-6 items-center rounded-2xl bg-red-500 py-4 active:opacity-80"
    >
      <Text className="font-bold text-white">
        Logout
      </Text>
    </Pressable>
  </View>
</SafeAreaView>

);
};

export default ProfileScreen;