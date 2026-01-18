// import { View, Text } from "react-native";

// export default function Screen() {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Coming soon...</Text>
//     </View>
//   );
// }

// export { default } from "./index";

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

export default function AcademicScreen() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/news").then((res) => {
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
    });
  }, []);

  const academicNews = useMemo(() => {
    return news.filter((item) => item.category.toLowerCase() === "academic");
  }, [news]);

  return (
    <View style={styles.container}>
      {/* 🔍 Search */}
      <TextInput
        placeholder="Search news..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />
      <FlatList
        data={academicNews}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.empty}>No academic news found.</Text>
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
  search: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    fontSize: 14,
    borderColor: "#ddd",
    borderWidth: 1,
  },
});
