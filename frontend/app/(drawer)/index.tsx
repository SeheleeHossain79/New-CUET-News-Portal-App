import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useEffect, useMemo, useState } from "react";
import { router } from "expo-router";
import api from "../../lib/api";

type NewsItem = {
  id: number;
  title: string;
  summary: string;
  category: string;
  date: string;
};

export default function HomeScreen() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/news")
      .then((res) => {
        const formatted = res.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          summary:
            typeof item.summary === "string" && item.summary.trim().length > 0
              ? item.summary
              : "AI summary not available",
          category: item.category,
          date: new Date(item.created_at).toDateString(),
        }));
        setNews(formatted);
      })
      .catch((err) => {
        console.log("❌ News fetch error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // 🔍 Home page = only search filter
  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      if (search.trim() === "") return true;

      return (
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.summary.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [news, search]);

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <TextInput
        placeholder="Search news..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      <FlatList
        data={filteredNews}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          loading ? (
            <Text style={styles.empty}>Loading news...</Text>
          ) : (
            <Text style={styles.empty}>No news found.</Text>
          )
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/news/[id]",
                params: item,
              })
            }
          >
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>{item.date}</Text>

            <Text style={styles.summaryTitle}>🤖 AI Summary</Text>
            <Text style={styles.summary}>{item.summary}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    padding: 16,
  },
  search: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    elevation: 2,
  },
  category: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0050a0",
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  date: {
    fontSize: 12,
    color: "#777",
    marginBottom: 8,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#001f3f",
    marginBottom: 4,
  },
  summary: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#777",
  },
});
