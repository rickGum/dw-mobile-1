import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  image: string;
}

const books: Book[] = [
  {
    id: "1",
    title: "Atomic Habits",
    author: "James Clear",
    description: "Buku tentang membangun kebiasaan kecil yang berdampak besar.",
    image: "https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg",
  },
  {
    id: "2",
    title: "Deep Work",
    author: "Cal Newport",
    description: "Cara meningkatkan fokus dalam bekerja.",
    image: "https://images-na.ssl-images-amazon.com/images/I/71QKQ9mwV7L.jpg",
  },
  {
    id: "3",
    title: "Clean Code",
    author: "Robert C. Martin",
    description: "Panduan menulis kode yang bersih dan mudah dipelihara.",
    image: "https://images-na.ssl-images-amazon.com/images/I/41SH-SvWPxL.jpg",
  },
];

const App = () => {
  return (
    <SafeAreaProvider style={{ backgroundColor: "#87CEEB" }}>
      <SafeAreaView >
        <FlatList
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />

              <View style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.author}>{item.author}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 12,
    padding: 12,
    borderRadius: 10,
    elevation: 3,
  },

  image: {
    width: 80,
    height: 120,
    borderRadius: 8,
  },

  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
  },

  author: {
    marginTop: 6,
    color: "gray",
  },

  description: {
    marginTop: 8,
  },
});

export default App;
