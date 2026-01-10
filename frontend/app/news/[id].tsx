import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

export default function NewsDetailsScreen() {
  const { id, title, summary, category, date } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.category}>{category}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{date}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI Summary</Text>
        <Text style={styles.summary}>{summary}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Full News</Text>
        <Text style={styles.content}>
          This is where the full news content will appear.
          Later this will come from backend.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
