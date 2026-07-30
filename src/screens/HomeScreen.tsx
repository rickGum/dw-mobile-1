import React, { useCallback, useEffect, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import * as SecureStore from "expo-secure-store";

import { HomeStackParamList } from "../../App";

import { api } from "../config/api";

type Props = NativeStackScreenProps<HomeStackParamList, "Home">;

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  image: string | null;
};

const HomeScreen = ({ navigation }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  const getProducts = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const token = await SecureStore.getItemAsync("userToken");

      const response = await api.get("/product", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(response.data.data);
    } catch (error) {
      console.log("Gagal mengambil produk:", error);

      setError("Gagal mengambil data produk.");

      if (isRefresh) {
        Alert.alert("Error", "Data produk gagal diperbarui.");
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleRefresh = useCallback(() => {
    getProducts(true);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const renderProduct = ({ item }: { item: Product }) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate("Detail", {
            id: item.id,
            name: item.name,
          })
        }
        className="mb-4 overflow-hidden rounded-3xl bg-white active"
      >
        <View className="flex-row p-4">
          <View className="h-24 w-24 items-center justify-center rounded-2xl bg-blue-100">
            {item.image ? (
              <Image
                source={{
                  uri: `http://192.168.1.5:3000/uploads/${item.image}`,
                }}
                className="h-24 w-24 rounded-2xl"
                resizeMode="cover"
              />
            ) : (
              <Text className="text-4xl">📦</Text>
            )}
          </View>

          <View className="flex-1 px-4">
            <View className="self-start rounded-full bg-blue-100 px-3 py-1">
              <Text className="text-xs font-semibold text-blue-700">
                {item.category}
              </Text>
            </View>

            <Text
              numberOfLines={1}
              className="mt-2 text-lg font-bold text-slate-900"
            >
              {item.name}
            </Text>

            <Text className="mt-1 font-bold text-blue-700">
              {formatPrice(item.price)}
            </Text>

            <Text className="mt-1 text-xs text-slate-500">
              Stok: {item.stock}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-slate-50">
        <ActivityIndicator size="large" color="#0D47A1" />

        <Text className="mt-4 text-slate-500">Mengambil data produk...</Text>
      </SafeAreaView>
    );
  }

  if (error && products.length === 0) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-slate-50 px-6">
        <Text className="text-center text-lg font-bold text-red-500">
          {error}
        </Text>

        <Pressable
          onPress={() => getProducts()}
          className="mt-5 rounded-xl bg-blue-700 px-6 py-3"
        >
          <Text className="font-bold text-white">Coba Lagi</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <FlatList
        data={products}

        keyExtractor={(item) => item.id.toString()}

        renderItem={renderProduct}

        showsVerticalScrollIndicator={false}

        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 30,
        }}

        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#0D47A1"]}
          />
        }

        ListHeaderComponent={
          <View>
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

            <View className="mb-5">
              <Text className="text-xl font-bold text-slate-900">
                Semua Produk
              </Text>

              <Text className="mt-1 text-sm text-slate-500">
                {products.length} produk tersedia
              </Text>
            </View>
          </View>
        }

        ListEmptyComponent={
          <View className="items-center py-20">
            <Text className="text-5xl">📦</Text>

            <Text className="mt-4 text-lg font-bold text-slate-700">
              Produk belum tersedia
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
