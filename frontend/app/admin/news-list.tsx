import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import api from "../../lib/api";

type NewsItem = {
  id: number;
  title: string;
  category: string;
  is_featured: boolean;
};

export default function AdminNewsList() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    api.get("/admin/news")
      .then((res) => setNews(res.data))
      .catch(() => alert("Failed to load news"));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage News</Text>

      <FlatList
        data={news}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text style={styles.meta}>
              {item.category} {item.is_featured ? "⭐ Featured" : ""}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f6fa",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  meta: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
});
