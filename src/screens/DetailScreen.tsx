import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../App";

type Props = NativeStackScreenProps<HomeStackParamList, "Detail">;

const DetailScreen = ({ route, navigation }: Props) => {
  const { id, name } = route.params;

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="flex-1" contentContainerClassName="px-5 py-5">
        <Image
          source={require("../../assets/wireless.jpg")}
          className="h-72 w-full rounded-3xl"
          resizeMode="cover"
        />

        <View className="mt-6 rounded-3xl bg-white p-5">
          <Text className="text-xs font-semibold text-blue-600">
            PRODUCT #{id}
          </Text>

          <Text className="mt-2 text-2xl font-bold text-slate-900">{name}</Text>

          <Text className="mt-4 text-sm leading-6 text-slate-500">
            Produk ini dirancang dengan tampilan modern dan nyaman digunakan.
            Cocok untuk kebutuhan sehari-hari.
          </Text>

          <View className="mt-6 flex-row">
            <View className="mr-8">
              <Text className="text-xs text-slate-400">Rating</Text>

              <Text className="mt-1 text-lg font-bold text-slate-800">
                ⭐ 4.8
              </Text>
            </View>

            <View>
              <Text className="text-xs text-slate-400">Terjual</Text>

              <Text className="mt-1 text-lg font-bold text-slate-800">
                1.2K
              </Text>
            </View>
          </View>

          <Pressable
            onPress={() => navigation.goBack()}
            className="mt-7 items-center rounded-2xl bg-[#0D47A1] py-4 active:opacity-80"
          >
            <Text className="font-bold text-white">Kembali ke Home</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailScreen;
