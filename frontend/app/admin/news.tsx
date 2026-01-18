import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import api from "../../lib/api";
import { router } from "expo-router";

type NewsItem = {
  id: number;
  title: string;
  category: string;
  is_featured: boolean;
};

export default function AdminNewsScreen() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/news");
      setNews(res.data);
    } catch {
      Alert.alert("Error", "Failed to load news");
    } finally {
      setLoading(false);
    }
  };

  const toggleFeatured = async (id: number) => {
    try {
      await api.patch(`/admin/news/${id}/feature`);
      // refresh list
      fetchNews();
    } catch (err) {
      console.log("❌ Feature toggle failed");
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id: number) => {
    Alert.alert("Confirm", "Delete this news?", [
      { text: "Cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await api.delete(`/admin/news/${id}`);
          fetchNews();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All News (Admin)</Text>

      <FlatList
        data={news}
        keyExtractor={(item) => item.id.toString()}
        refreshing={loading}
        onRefresh={fetchNews}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text style={styles.meta}>
              {item.category} • {item.is_featured ? "⭐ Featured" : "Normal"}
            </Text>

            <View style={styles.actions}>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/admin/edit-news",
                    params: {
                      id: item.id.toString(),
                      title: item.title,
                      category: item.category,
                      is_featured: item.is_featured.toString(),
                    },
                  })
                }
              >
                <Text style={styles.edit}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.delete}>Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.featureBtn,
                  item.is_featured && styles.featuredActive,
                ]}
                onPress={() => toggleFeatured(item.id)}
              >
                <Text style={styles.featureText}>
                  {item.is_featured ? "⭐ Featured" : "☆ Make Featured"}
                </Text>
              </TouchableOpacity>

              {/* <TouchableOpacity
                onPress={async () => {
                  await api.patch(`/admin/news/${item.id}/feature`);
                  fetchNews();
                }}
              >
                <Text style={{ color: "#ff9800", fontWeight: "bold" }}>
                  {item.is_featured ? "Unfeature" : "Feature"}
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#001f3f",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  newsTitle: { fontSize: 16, fontWeight: "bold" },
  meta: { color: "#777", marginVertical: 4 },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  edit: { color: "#0050a0", fontWeight: "bold" },
  delete: { color: "red", fontWeight: "bold" },

  featureBtn: {
  marginTop: 8,
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 8,
  backgroundColor: "#eaeaea",
  alignSelf: "flex-start",
},
featuredActive: {
  backgroundColor: "#001f3f",
},
featureText: {
  fontSize: 12,
  fontWeight: "bold",
  color: "#fff",
},

});
