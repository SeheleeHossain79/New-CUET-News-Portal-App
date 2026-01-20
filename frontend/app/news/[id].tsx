
// // frontend/app/news/[id].tsx
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import { useLocalSearchParams, router } from "expo-router";
// import { useEffect, useState } from "react";
// import api from "../../lib/api";

// type NewsDetail = {
//   id: number;
//   title: string;
//   summary: string;
//   content: string;
//   category: string;
//   created_at: string;
// };

// export default function NewsDetailsScreen() {
//   const { id } = useLocalSearchParams();
//   const [news, setNews] = useState<NewsDetail | null>(null);
//   const [loading, setLoading] = useState(true);

//   // 🔄 Fetch full news from backend
//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const res = await api.get(`/news/${id}`);
//         setNews(res.data);
//       } catch (err) {
//         console.log("❌ Failed to load news details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNews();
//   }, [id]);

//   // ⏳ Loading state
//   if (loading) {
//     return (
//       <View style={styles.loading}>
//         <ActivityIndicator size="large" color="#001f3f" />
//       </View>
//     );
//   }

//   if (!news) {
//     return (
//       <View style={styles.loading}>
//         <Text>News not found</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       {/* 🔙 Back */}
//       <TouchableOpacity onPress={() => router.back()}>
//         <Text style={styles.back}>← Back</Text>
//       </TouchableOpacity>

//       {/* 🏷 Category */}
//       <Text style={styles.category}>{news.category}</Text>

//       {/* 📰 Title */}
//       <Text style={styles.title}>{news.title}</Text>

//       {/* 📅 Date */}
//       <Text style={styles.date}>
//         {new Date(news.created_at).toDateString()}
//       </Text>

//       {/* 🤖 AI Summary */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>AI Summary</Text>
//         <Text style={styles.summary}>{news.summary}</Text>
//       </View>

//       {/* 📰 Full News */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Full News</Text>
//         <Text style={styles.content}>{news.content}</Text>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   loading: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f5f6fa",
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f6fa",
//     padding: 16,
//   },
//   back: {
//     color: "#0050a0",
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   category: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "#0050a0",
//     marginBottom: 4,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#001f3f",
//     marginBottom: 6,
//   },
//   date: {
//     fontSize: 12,
//     color: "#777",
//     marginBottom: 16,
//   },
//   section: {
//     backgroundColor: "#fff",
//     padding: 14,
//     borderRadius: 12,
//     marginBottom: 14,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#001f3f",
//     marginBottom: 6,
//   },
//   summary: {
//     fontSize: 14,
//     color: "#555",
//     lineHeight: 20,
//   },
//   content: {
//     fontSize: 14,
//     color: "#444",
//     lineHeight: 22,
//   },
// });

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import api from "../../lib/api";

type NewsDetail = {
  id: number;
  title: string;
  summary: string;
  content: string;
  category: string;
  image?: string | null;
  created_at: string;
};

export default function NewsDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [news, setNews] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch full news from backend
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get(`/news/${id}`);
        setNews(res.data);
      } catch (err) {
        console.log("❌ Failed to load news details");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  // ⏳ Loading
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#001f3f" />
      </View>
    );
  }

  if (!news) {
    return (
      <View style={styles.loading}>
        <Text>News not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* 🔙 Back */}
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      {/* 🖼 News Image */}
      {news.image && (
        <Image
          source={{ uri: `${api.defaults.baseURL}/${news.image}` }}
          style={styles.image}
        />
      )}

      {/* 🏷 Category */}
      <Text style={styles.category}>{news.category}</Text>

      {/* 📰 Title */}
      <Text style={styles.title}>{news.title}</Text>

      {/* 📅 Date */}
      <Text style={styles.date}>
        {new Date(news.created_at).toDateString()}
      </Text>

      {/* 🤖 AI Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI Summary</Text>
        <Text style={styles.summary}>{news.summary}</Text>
      </View>

      {/* 📰 Full News */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Full News</Text>
        <Text style={styles.content}>{news.content}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f6fa",
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    padding: 16,
  },
  back: {
    color: "#0050a0",
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 14,
    marginBottom: 14,
  },
  category: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0050a0",
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#001f3f",
    marginBottom: 6,
  },
  date: {
    fontSize: 12,
    color: "#777",
    marginBottom: 16,
  },
  section: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#001f3f",
    marginBottom: 6,
  },
  summary: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  content: {
    fontSize: 14,
    color: "#444",
    lineHeight: 22,
  },
});
