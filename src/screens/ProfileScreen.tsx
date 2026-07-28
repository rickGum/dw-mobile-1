import React from "react";
import { View, Text, Button, Alert } from "react-native";

const ProfileScreen = () => {
  const logout = () => {
    Alert.alert("Logout", "Berhasil Logout");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Profile Screen</Text>

      <Button
        title="Logout"
        color="red"
        onPress={logout}
      />
    </View>
  );
};

export default ProfileScreen;