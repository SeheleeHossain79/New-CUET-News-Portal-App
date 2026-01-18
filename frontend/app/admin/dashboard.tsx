// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import { useEffect, useState } from "react";
// import { router } from "expo-router";
// import { getToken, removeToken } from "../../lib/auth";
// import api from "../../lib/api";

// type AdminStats = {
//   total_news: number;
//   featured_news: number;
// };

// export default function AdminDashboard() {
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState<AdminStats | null>(null);

//   // 🔐 AUTH GUARD + STATS FETCH
//   useEffect(() => {
//     const init = async () => {
//       const token = await getToken();

//       if (!token) {
//         router.replace("/admin/login");
//         return;
//       }

//       try {
//         const res = await api.get("/admin/stats");
//         setStats(res.data);
//       } catch (err) {
//         console.log("❌ Failed to fetch admin stats");
//       } finally {
//         setLoading(false);
//       }
//     };

//     init();
//   }, []);

//   // ⏳ Loading
//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#001f3f" />
//       </View>
//     );
//   }

//   // 🚪 Logout
//   const handleLogout = async () => {
//     Alert.alert("Logout", "Are you sure you want to logout?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Logout",
//         style: "destructive",
//         onPress: async () => {
//           await removeToken();
//           router.replace("/");
//         },
//       },
//     ]);
//   };

//   return (
//     <View style={styles.container}>
//       {/* 👋 Header */}
//       <View style={styles.header}>
//         <Text style={styles.title}>Admin Dashboard</Text>
//         <Text style={styles.subtitle}>
//           Manage CUET news, featured posts and updates
//         </Text>
//       </View>

//       {/* 📊 Stats */}
//       {stats && (
//         <View style={styles.statsRow}>
//           <View style={styles.statCard}>
//             <Text style={styles.statNumber}>{stats.total_news}</Text>
//             <Text style={styles.statLabel}>Total News</Text>
//           </View>

//           <View style={styles.statCard}>
//             <Text style={styles.statNumber}>{stats.featured_news}</Text>
//             <Text style={styles.statLabel}>Featured</Text>
//           </View>
//         </View>
//       )}

//       {/* ➕ Add News */}
//       <TouchableOpacity
//         style={styles.card}
//         onPress={() => router.push("/admin/add-news")}
//       >
//         <Text style={styles.cardIcon}>➕</Text>
//         <View>
//           <Text style={styles.cardTitle}>Add News</Text>
//           <Text style={styles.cardSub}>
//             Publish academic, event or notice
//           </Text>
//         </View>
//       </TouchableOpacity>

//       {/* 🗂 Manage News */}
//       <TouchableOpacity
//         style={styles.card}
//         onPress={() => router.push("/admin/news")}
//       >
//         <Text style={styles.cardIcon}>🗂</Text>
//         <View>
//           <Text style={styles.cardTitle}>Manage News</Text>
//           <Text style={styles.cardSub}>
//             Edit, update or delete news
//           </Text>
//         </View>
//       </TouchableOpacity>

//       {/* 🚪 Logout */}
//       <TouchableOpacity style={styles.logout} onPress={handleLogout}>
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f5f6fa",
//   },
//   container: {
//     flex: 1,
//     padding: 24,
//     backgroundColor: "#f5f6fa",
//   },
//   header: {
//     marginBottom: 24,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "bold",
//     color: "#001f3f",
//   },
//   subtitle: {
//     fontSize: 14,
//     color: "#555",
//     marginTop: 4,
//   },
//   statsRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 24,
//   },
//   statCard: {
//     flex: 1,
//     backgroundColor: "#001f3f",
//     padding: 16,
//     borderRadius: 14,
//     marginHorizontal: 6,
//   },
//   statNumber: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#fff",
//     textAlign: "center",
//   },
//   statLabel: {
//     fontSize: 13,
//     color: "#dbe9ff",
//     textAlign: "center",
//     marginTop: 4,
//   },
//   card: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     padding: 18,
//     borderRadius: 14,
//     marginBottom: 16,
//     elevation: 3,
//   },
//   cardIcon: {
//     fontSize: 28,
//     marginRight: 16,
//   },
//   cardTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#001f3f",
//   },
//   cardSub: {
//     fontSize: 13,
//     color: "#666",
//     marginTop: 2,
//   },
//   logout: {
//     marginTop: 40,
//     alignItems: "center",
//   },
//   logoutText: {
//     color: "red",
//     fontWeight: "bold",
//     fontSize: 15,
//   },
// });

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useCallback, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import { getToken, removeToken } from "../../lib/auth";
import api from "../../lib/api";

type AdminStats = {
  total_news: number;
  featured_news: number;
};

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<AdminStats | null>(null);

  // 🔁 FETCH STATS EVERY TIME SCREEN IS FOCUSED
  useFocusEffect(
    useCallback(() => {
      const loadStats = async () => {
        const token = await getToken();

        if (!token) {
          router.replace("/admin/login");
          return;
        }

        try {
          const res = await api.get("/admin/stats", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setStats(res.data);
        } catch (err) {
          console.log("❌ Failed to fetch admin stats", err);
        } finally {
          setLoading(false);
        }
      };

      loadStats();
    }, [])
  );

  // ⏳ Loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#001f3f" />
      </View>
    );
  }

  // 🚪 Logout
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await removeToken();
          router.replace("/");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* 👋 Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Admin Dashboard</Text>
        <Text style={styles.subtitle}>
          Manage CUET news, featured posts and updates
        </Text>
      </View>

      {/* 📊 Stats */}
      {stats && (
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.total_news}</Text>
            <Text style={styles.statLabel}>Total News</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.featured_news}</Text>
            <Text style={styles.statLabel}>Featured</Text>
          </View>
        </View>
      )}

      {/* ➕ Add News */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/admin/add-news")}
      >
        <Text style={styles.cardIcon}>➕</Text>
        <View>
          <Text style={styles.cardTitle}>Add News</Text>
          <Text style={styles.cardSub}>Publish academic, event or notice</Text>
        </View>
      </TouchableOpacity>

      {/* 🗂 Manage News */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/admin/news")}
      >
        <Text style={styles.cardIcon}>🗂</Text>
        <View>
          <Text style={styles.cardTitle}>Manage News</Text>
          <Text style={styles.cardSub}>Edit, update or delete news</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/admin/activity")}
      >
        <Text style={styles.cardIcon}>📜</Text>
        <View>
          <Text style={styles.cardTitle}>Activity Log</Text>
          <Text style={styles.cardSub}>Track admin actions</Text>
        </View>
      </TouchableOpacity>

      {/* 🚪 Logout */}
      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f6fa",
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f5f6fa",
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#001f3f",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#001f3f",
    padding: 16,
    borderRadius: 14,
    marginHorizontal: 6,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  statLabel: {
    fontSize: 13,
    color: "#dbe9ff",
    textAlign: "center",
    marginTop: 4,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 14,
    marginBottom: 16,
    elevation: 3,
  },
  cardIcon: {
    fontSize: 28,
    marginRight: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#001f3f",
  },
  cardSub: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  logout: {
    marginTop: 40,
    alignItems: "center",
  },
  logoutText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 15,
  },
});
