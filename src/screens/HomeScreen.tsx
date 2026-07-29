import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../App";

type Props = NativeStackScreenProps<HomeStackParamList, "Home">;

const HomeScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-8"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between py-5">
          <View className="flex-1 pr-4">
            <Text className="text-2xl font-bold text-slate-900">
              Hello, Ricksan 👋
            </Text>

            <Text className="mt-1 text-sm text-slate-500">
              Temukan produk terbaik untukmu hari ini.
            </Text>
          </View>

          <Image
            source={require("../../assets/images.jpg")}
            className="h-14 w-14 rounded-full"
          />
        </View>

        {/* Title */}
        <View className="mb-4">
          <Text className="text-xl font-bold text-slate-900">
            Produk Pilihan
          </Text>

          <Text className="mt-1 text-sm text-slate-500">
            Pilihan populer minggu ini
          </Text>
        </View>

        {/* Card */}
        <View className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <Image
            source={require("../../assets/wireless.jpg")}
            className="h-52 w-full"
            resizeMode="cover"
          />

          <View className="p-5">
            {/* Category */}
            <View className="self-start rounded-full bg-blue-100 px-3 py-1">
              <Text className="text-xs font-semibold text-blue-700">
                POPULAR
              </Text>
            </View>

            {/* Title */}
            <Text className="mt-3 text-xl font-bold text-slate-900">
              Wireless Headphone
            </Text>

            <Text className="mt-2 text-sm leading-5 text-slate-500">
              Nikmati pengalaman mendengarkan musik dengan suara yang jernih
              dan nyaman digunakan.
            </Text>

            {/* Metrics */}
            <View className="mt-5 flex-row">
              <View className="mr-6">
                <Text className="text-xs text-slate-400">
                  Rating
                </Text>

                <Text className="mt-1 font-bold text-slate-800">
                  ⭐ 4.8
                </Text>
              </View>

              <View>
                <Text className="text-xs text-slate-400">
                  Terjual
                </Text>

                <Text className="mt-1 font-bold text-slate-800">
                  1.2K
                </Text>
              </View>
            </View>

            {/* Button */}
            <Pressable
              onPress={() =>
                navigation.navigate("Detail", {
                  id: 1,
                  name: "Wireless Headphone",
                })
              }
              className="mt-6 items-center rounded-2xl bg-[#0D47A1] px-5 py-4 active:opacity-80"
            >
              <Text className="font-bold text-white">
                Lihat Detail
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;