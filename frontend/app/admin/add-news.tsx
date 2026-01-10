import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import api from "../../lib/api";
import { getToken } from "../../lib/auth";

export default function AddNewsScreen() {
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Academic");
  const [isFeatured, setIsFeatured] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // 🔐 AUTH GUARD
  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      if (!token) {
        router.replace("/admin/login");
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#001f3f" />
      </View>
    );
  }

  // 📰 SUBMIT NEWS
  const handleSubmit = async () => {
    if (!title || !content || !category) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      setSubmitting(true);

      await api.post("/news", {
        title,
        content,
        category,
        is_featured: isFeatured,
      });

      Alert.alert("Success", "News added successfully");

      // reset form
      setTitle("");
      setContent("");
      setCategory("Academic");
      setIsFeatured(false);

      // go back to dashboard
      router.replace("/admin/dashboard");
    } catch (error: any) {
      console.log("ADD NEWS ERROR:", error?.response?.data || error.message);
      Alert.alert("Error", "Failed to add news");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>➕ Add News</Text>

      <TextInput
        placeholder="News Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="News Content"
        value={content}
        onChangeText={setContent}
        multiline
        style={[styles.input, styles.textArea]}
      />

      <TextInput
        placeholder="Category (Academic / Events / Research / Administrative)"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />

      <TouchableOpacity
        style={[
          styles.featuredButton,
          isFeatured && styles.featuredActive,
        ]}
        onPress={() => setIsFeatured(!isFeatured)}
      >
        <Text style={styles.featuredText}>
          {isFeatured ? "★ Featured News" : "☆ Mark as Featured"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={submitting}
      >
        <Text style={styles.submitText}>
          {submitting ? "Submitting..." : "Publish News"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
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
    padding: 24,
    backgroundColor: "#f5f6fa",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#001f3f",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  featuredButton: {
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#001f3f",
    marginBottom: 20,
    alignItems: "center",
  },
  featuredActive: {
    backgroundColor: "#001f3f",
  },
  featuredText: {
    color: "#001f3f",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#001f3f",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
