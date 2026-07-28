import React from "react";
import { View, Text, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../App";

type Props = NativeStackScreenProps<HomeStackParamList, "Detail">;

const DetailScreen = ({ route, navigation }: Props) => {
  const { id, name } = route.params;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>ID : {id}</Text>
      <Text>Nama : {name}</Text>

      <Button
        title="Kembali"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default DetailScreen;