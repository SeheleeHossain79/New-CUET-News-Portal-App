import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { getToken, removeToken } from "../../lib/auth";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  // 🔐 AUTH GUARD
  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();

      if (!token) {
        // not logged in → redirect to login
        router.replace("/admin/login");
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // ⏳ While checking token
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#001f3f" />
      </View>
    );
  }

  // 🚪 Logout
  const handleLogout = async () => {
    await removeToken();
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

      {/* ➕ Add News */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/admin/add-news")}
      >
        <Text style={styles.cardText}>➕ Add News</Text>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#001f3f",
  },
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  logout: {
    marginTop: 40,
    alignItems: "center",
  },
  logoutText: {
    color: "red",
    fontWeight: "bold",
  },
});
