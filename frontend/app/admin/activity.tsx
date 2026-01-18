import { View, Text, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import api from "../../lib/api";

const actionLabel: Record<string, string> = {
  CREATE_NEWS: "created a news",
  UPDATE_NEWS: "updated a news",
  DELETE_NEWS: "deleted a news",
  TOGGLE_FEATURED: "changed featured status of news",
};

type Activity = {
  id: number;
  admin_name: string;
  action: string;
  target_type: string;
  target_id: number | null;
  created_at: string;
};

export default function AdminActivityScreen() {
  const [activity, setActivity] = useState<Activity[]>([]);

  useEffect(() => {
    api.get("/admin/activity").then((res) => {
      setActivity(res.data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Activity</Text>

      <FlatList
        data={activity}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.actionText}>
              {item.admin_name} {actionLabel[item.action] || item.action}
            </Text>

            <Text style={styles.subText}>News ID: #{item.target_id}</Text>

            <Text style={styles.time}>
              {new Date(item.created_at).toLocaleString()}
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
    color: "#001f3f",
  },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  action: {
    fontWeight: "bold",
    color: "#001f3f",
  },
  meta: {
    fontSize: 13,
    color: "#555",
    marginTop: 2,
  },
  time: {
    fontSize: 11,
    color: "#999",
    marginTop: 4,
  },

  actionText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#001f3f",
  },
  subText: {
    fontSize: 13,
    color: "#555",
    marginTop: 2,
  },
  
});
