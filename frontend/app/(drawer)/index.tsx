// // frontend/app/%28drawer%29/index.tsx
// // 🔧 Utility: normalize strings (trim + lowercase)
// const normalize = (value: string) =>
//   value.trim().toLowerCase();

// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   TextInput,
// } from "react-native";
// import { useEffect, useMemo, useState, useRef } from "react";
// import { router, usePathname } from "expo-router";
// import api from "../../lib/api";
// import { Animated } from "react-native";

// type NewsItem = {
//   id: number;
//   title: string;
//   summary: string;
//   category: string;
//   date: string;
//   is_featured?: boolean;
// };

// export default function HomeScreen() {
//   const pathname = usePathname();

//   // 📂 Current category from route
//   const currentCategory = useMemo(() => {
//     if (pathname === "/" || pathname.endsWith("index")) {
//       return "all";
//     }
//     const parts = pathname.split("/");
//     return normalize(parts[parts.length - 1]);
//   }, [pathname]);

//   const [news, setNews] = useState<NewsItem[]>([]);
//   const [search, setSearch] = useState("");

//   // ⭐ Featured rotation
//   const [featuredIndex, setFeaturedIndex] = useState(0);
//   const slideAnim = useRef(new Animated.Value(20)).current;

//   // 📡 Fetch news
//   useEffect(() => {
//     api.get("/news").then((res) => {
//       const formatted = res.data.map((item: any) => ({
//         id: item.id,
//         title: item.title,
//         summary:
//           typeof item.summary === "string" && item.summary.trim().length > 0
//             ? item.summary
//             : "AI summary not available",
//         category: item.category,
//         date: new Date(item.created_at).toDateString(),
//         is_featured: item.is_featured,
//       }));
//       setNews(formatted);
//     });
//   }, []);

//   // ⭐ Featured list
//   const featuredNews = useMemo(
//     () => news.filter((n) => n.is_featured),
//     [news]
//   );

//   // 🎞 Smooth text-only slide animation
//   useEffect(() => {
//     if (featuredNews.length <= 1) return;

//     const interval = setInterval(() => {
//       slideAnim.setValue(20);

//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 500,
//         useNativeDriver: true,
//       }).start();

//       setFeaturedIndex((prev) => (prev + 1) % featuredNews.length);
//     }, 2500);

//     return () => clearInterval(interval);
//   }, [featuredNews, slideAnim]);

//   // 📰 Filtered news
//   const filteredNews = useMemo(() => {
//     return news.filter((item) => {
//       const matchCategory =
//         currentCategory === "all" ||
//         normalize(item.category) === currentCategory;

//       const matchSearch =
//         search.trim() === "" ||
//         item.title.toLowerCase().includes(search.toLowerCase()) ||
//         item.summary.toLowerCase().includes(search.toLowerCase());

//       return matchCategory && matchSearch;
//     });
//   }, [news, search, currentCategory]);

//   return (
//     <View style={styles.container}>
//       {/* 🔍 Search */}
//       <TextInput
//         placeholder="Search news..."
//         value={search}
//         onChangeText={setSearch}
//         style={styles.search}
//       />

//       {/* ⭐ Featured */}
//       {featuredNews.length > 0 && (
//         <>
//           <Text style={styles.sectionTitle}>Featured News</Text>

//           <View style={styles.featuredCard}>
//             <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
//               <Text style={styles.featuredTitle}>
//                 {featuredNews[featuredIndex].title}
//               </Text>
//               <Text style={styles.featuredSummary}>
//                 {featuredNews[featuredIndex].summary}
//               </Text>
//             </Animated.View>
//           </View>
//         </>
//       )}

//       {/* 📰 Latest News */}
//       <Text style={styles.sectionTitle}>Latest News</Text>

//       <FlatList
//         data={filteredNews}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={
//           filteredNews.length === 0 ? { flex: 1 } : undefined
//         }
//         ListEmptyComponent={
//           <Text style={styles.empty}>No news found.</Text>
//         }
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.card}
//             onPress={() =>
//               router.push({
//                 pathname: "/news/[id]",
//                 params: {
//                   id: item.id,
//                   title: item.title,
//                   summary: item.summary,
//                   category: item.category,
//                   date: item.date,
//                 },
//               })
//             }
//           >
//             <Text style={styles.category}>{item.category}</Text>
//             <Text style={styles.title}>{item.title}</Text>
//             <Text style={styles.date}>{item.date}</Text>
//             <Text style={styles.summary}>{item.summary}</Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// }

// // 🎨 Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f6fa",
//     padding: 16,
//   },
//   search: {
//     backgroundColor: "#fff",
//     padding: 12,
//     borderRadius: 20,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginVertical: 12,
//     color: "#001f3f",
//   },
//   featuredCard: {
//     backgroundColor: "#001f3f",
//     padding: 18,
//     borderRadius: 16,
//   },
//   featuredTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#fff",
//     marginBottom: 6,
//   },
//   featuredSummary: {
//     color: "#dbe9ff",
//     fontSize: 14,
//   },
//   card: {
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 14,
//     elevation: 2,
//   },
//   category: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "#0050a0",
//     marginBottom: 4,
//   },
//   title: {
//     fontSize: 17,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   date: {
//     fontSize: 12,
//     color: "#777",
//     marginBottom: 6,
//   },
//   summary: {
//     fontSize: 14,
//     color: "#555",
//   },
//   empty: {
//     textAlign: "center",
//     marginTop: 40,
//     color: "#777",
//   },
// });

// frontend/app/(drawer)/index.tsx

// 🔧 Utility: normalize strings (trim + lowercase)
const normalize = (value: string) => value.trim().toLowerCase();

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { useEffect, useMemo, useState, useRef } from "react";
import { router, usePathname } from "expo-router";
import api from "../../lib/api";
import { Animated } from "react-native";
import Footer from "../../components/Footer";


type NewsItem = {
  id: number;
  title: string;
  summary: string;
  category: string;
  date: string;
  is_featured?: boolean;
  image?: string | null; // ✅ IMAGE FIELD
};

export default function HomeScreen() {
  const pathname = usePathname();

  // 📂 Current category from route
  const currentCategory = useMemo(() => {
    if (pathname === "/" || pathname.endsWith("index")) {
      return "all";
    }
    const parts = pathname.split("/");
    return normalize(parts[parts.length - 1]);
  }, [pathname]);

  const [news, setNews] = useState<NewsItem[]>([]);
  const [search, setSearch] = useState("");

  // ⭐ Featured rotation
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const slideAnim = useRef(new Animated.Value(20)).current;

  // 📡 Fetch news
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
        is_featured: item.is_featured,
        image: item.image || null, // ✅ IMAGE FROM BACKEND
      }));
      setNews(formatted);
    });
  }, []);

  // ⭐ Featured list
  const featuredNews = useMemo(
    () => news.filter((n) => n.is_featured),
    [news]
  );

  // 🎞 Smooth featured text animation
  useEffect(() => {
    if (featuredNews.length <= 1) return;

    const interval = setInterval(() => {
      slideAnim.setValue(20);

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();

      setFeaturedIndex((prev) => (prev + 1) % featuredNews.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [featuredNews, slideAnim]);

  // 📰 Filtered news
  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const matchCategory =
        currentCategory === "all" ||
        normalize(item.category) === currentCategory;

      const matchSearch =
        search.trim() === "" ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.summary.toLowerCase().includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [news, search, currentCategory]);

  return (
    <View style={styles.container}>
      {/* 🔍 Search */}
      <TextInput
        placeholder="Search news..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      {/* ⭐ Featured */}
      {featuredNews.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Featured News</Text>

          <View style={styles.featuredCard}>
            <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
              <Text style={styles.featuredTitle}>
                {featuredNews[featuredIndex].title}
              </Text>
              <Text style={styles.featuredSummary}>
                {featuredNews[featuredIndex].summary}
              </Text>
            </Animated.View>
          </View>
        </>
      )}

      {/* 📰 Latest News */}
      <Text style={styles.sectionTitle}>Latest News</Text>

      <FlatList
        data={filteredNews}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={<Footer />}
        contentContainerStyle={
          filteredNews.length === 0 ? { flex: 1 } : undefined
        }
        ListEmptyComponent={
          <Text style={styles.empty}>No news found.</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/news/[id]",
                params: {
                  id: item.id,
                  title: item.title,
                  summary: item.summary,
                  category: item.category,
                  date: item.date,
                },
              })
            }
          >
            {/* 🖼 IMAGE ON HOME CARD */}
            {item.image && (
              <Image
                source={{ uri: `${api.defaults.baseURL}/${item.image}` }}
                style={styles.newsImage}
              />
            )}

            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.summary}>{item.summary}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// 🎨 Styles
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 12,
    color: "#001f3f",
  },
  featuredCard: {
    backgroundColor: "#001f3f",
    padding: 18,
    borderRadius: 16,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 6,
  },
  featuredSummary: {
    color: "#dbe9ff",
    fontSize: 14,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    elevation: 2,
  },
  newsImage: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    marginBottom: 10,
  },
  category: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0050a0",
    marginBottom: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
  },
  date: {
    fontSize: 12,
    color: "#777",
    marginBottom: 6,
  },
  summary: {
    fontSize: 14,
    color: "#555",
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#777",
  },
});
