// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import { useLocalSearchParams, router } from "expo-router";
// import { useState } from "react";
// import api from "../../lib/api";

// export default function EditNewsScreen() {
//   const params = useLocalSearchParams();

//   const [title, setTitle] = useState(String(params.title || ""));
//   const [category, setCategory] = useState(String(params.category || ""));
//   const [summary, setSummary] = useState(String(params.summary || ""));
//   const id = params.id;

//   const handleUpdate = async () => {
//     try {
//       await api.put(`/admin/news/${id}`, {
//         title,
//         category,
//         summary,
//       });

//       Alert.alert("Success", "News updated");
//       router.back();
//     } catch {
//       Alert.alert("Error", "Update failed");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Edit News</Text>

//       <TextInput
//         value={title}
//         onChangeText={setTitle}
//         placeholder="Title"
//         style={styles.input}
//       />

//       <TextInput
//         value={category}
//         onChangeText={setCategory}
//         placeholder="Category"
//         style={styles.input}
//       />

//       <TextInput
//         value={summary}
//         onChangeText={setSummary}
//         placeholder="Summary"
//         multiline
//         style={[styles.input, { height: 120 }]}
//       />

//       <TouchableOpacity style={styles.button} onPress={handleUpdate}>
//         <Text style={styles.buttonText}>Update</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 20,
//     color: "#001f3f",
//   },
//   input: {
//     backgroundColor: "#fff",
//     padding: 14,
//     borderRadius: 10,
//     marginBottom: 14,
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   button: {
//     backgroundColor: "#001f3f",
//     padding: 14,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useState } from "react";
import api from "../../lib/api";

export default function EditNewsScreen() {
  const params = useLocalSearchParams();

  const id = params.id as string;

  const [title, setTitle] = useState(String(params.title || ""));
  const [category, setCategory] = useState(String(params.category || ""));
  const [content, setContent] = useState(String(params.content || ""));
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!title || !category || !content) {
      Alert.alert("Error", "All fields required");
      return;
    }

    try {
      setLoading(true);

      await api.put(`/admin/news/${id}`, {
        title,
        category,
        content,
      });

      Alert.alert("Success", "News updated");

      // 🔁 Go back & refresh admin news list
      router.back();
    } catch (e) {
      Alert.alert("Error", "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit News</Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        style={styles.input}
      />

      <TextInput
        value={category}
        onChangeText={setCategory}
        placeholder="Category"
        style={styles.input}
      />

      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="Content"
        multiline
        style={[styles.input, { height: 120 }]}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleUpdate}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Updating..." : "Update"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#001f3f",
  },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#001f3f",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
