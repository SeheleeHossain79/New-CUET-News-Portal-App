// //  frontend/app/admin/add-news.tsx
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   ActivityIndicator,
//   ScrollView,
// } from "react-native";
// import { useEffect, useState } from "react";
// import { router } from "expo-router";
// import api from "../../lib/api";
// import { getToken } from "../../lib/auth";
// import { Picker } from "@react-native-picker/picker";
// import * as ImagePicker from "expo-image-picker";
// import { Image } from "react-native";

// export default function AddNewsScreen() {
//   const [loading, setLoading] = useState(true);

//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [category, setCategory] = useState("Academic");
//   const [isFeatured, setIsFeatured] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [image, setImage] = useState<any>(null);

//   // 🔐 AUTH GUARD
//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = await getToken();
//       if (!token) {
//         router.replace("/admin/login");
//       } else {
//         setLoading(false);
//       }
//     };
//     checkAuth();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#001f3f" />
//       </View>
//     );
//   }

//   // 📰 SUBMIT NEWS
//   const handleSubmit = async () => {
//     if (!title || !content || !category) {
//       Alert.alert("Error", "All fields are required");
//       return;
//     }

//     try {
//       setSubmitting(true);

//       await api.post("/news", {
//         title,
//         content,
//         category,
//         is_featured: isFeatured,
//       });

//       Alert.alert("Success", "News added successfully");

//       // reset form
//       setTitle("");
//       setContent("");
//       setCategory("Academic");
//       setIsFeatured(false);

//       // go back to dashboard
//       router.replace("/admin/dashboard");
//     } catch (error: any) {
//       console.log("ADD NEWS ERROR:", error?.response?.data || error.message);
//       Alert.alert("Error", "Failed to add news");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 0.7,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0]);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>➕ Add News</Text>

//       <TextInput
//         placeholder="News Title"
//         value={title}
//         onChangeText={setTitle}
//         style={styles.input}
//       />

//       <TextInput
//         placeholder="News Content"
//         value={content}
//         onChangeText={setContent}
//         multiline
//         style={[styles.input, styles.textArea]}
//       />

//       {/* <TextInput
//         placeholder="Category (Academic / Events / Research / Administrative)"
//         value={category}
//         onChangeText={setCategory}
//         style={styles.input}
//       /> */}

//       <View style={styles.pickerWrapper}>
//         <Picker
//           selectedValue={category}
//           onValueChange={(itemValue) => setCategory(itemValue)}
//         >
//           <Picker.Item label="Academic" value="Academic" />
//           <Picker.Item label="Research" value="Research" />
//           <Picker.Item label="Administrative" value="Administrative" />
//           <Picker.Item label="Events" value="Events" />
//         </Picker>
//       </View>

//       <TouchableOpacity style={styles.imageBtn} onPress={pickImage}>
//         <Text style={styles.imageBtnText}>📷 Select Image</Text>
//       </TouchableOpacity>

//       {image && (
//         <Image
//           source={{ uri: image.uri }}
//           style={{ height: 180, borderRadius: 12, marginBottom: 16 }}
//         />
//       )}

//       <TouchableOpacity
//         style={[styles.featuredButton, isFeatured && styles.featuredActive]}
//         onPress={() => setIsFeatured(!isFeatured)}
//       >
//         <Text style={styles.featuredText}>
//           {isFeatured ? "★ Featured News" : "☆ Mark as Featured"}
//         </Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.submitButton}
//         onPress={handleSubmit}
//         disabled={submitting}
//       >
//         <Text style={styles.submitText}>
//           {submitting ? "Submitting..." : "Publish News"}
//         </Text>
//       </TouchableOpacity>
//     </ScrollView>
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
//     padding: 24,
//     backgroundColor: "#f5f6fa",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 20,
//     color: "#001f3f",
//     textAlign: "center",
//   },
//   input: {
//     backgroundColor: "#fff",
//     padding: 14,
//     borderRadius: 10,
//     marginBottom: 14,
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   textArea: {
//     height: 120,
//     textAlignVertical: "top",
//   },
//   featuredButton: {
//     padding: 14,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#001f3f",
//     marginBottom: 20,
//     alignItems: "center",
//   },
//   featuredActive: {
//     backgroundColor: "#001f3f",
//   },
//   featuredText: {
//     color: "#001f3f",
//     fontWeight: "bold",
//   },
//   submitButton: {
//     backgroundColor: "#001f3f",
//     padding: 16,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   submitText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   // pickerWrapper: {
//   //   backgroundColor: "#fff",
//   //   borderRadius: 10,
//   //   marginBottom: 20,
//   //   borderWidth: 1,
//   //   borderColor: "#ddd",
//   //   overflow: "hidden",
//   // },
//   pickerWrapper: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     marginBottom: 16,
//     overflow: "hidden",
//   },
// });

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import api from "../../lib/api";
import { getToken } from "../../lib/auth";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";

export default function AddNewsScreen() {
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Academic");
  const [isFeatured, setIsFeatured] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [image, setImage] = useState<any>(null);

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

  // 📷 Pick image
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  // 📰 SUBMIT NEWS (multipart/form-data)
  // const handleSubmit = async () => {
  //   if (!title || !content || !category) {
  //     Alert.alert("Error", "All fields are required");
  //     return;
  //   }

  //   try {
  //     setSubmitting(true);

  //     const formData = new FormData();
  //     formData.append("title", title);
  //     formData.append("content", content);
  //     formData.append("category", category);
  //     formData.append("is_featured", String(isFeatured));

  //     if (image) {
  //       formData.append("image", {
  //         uri: image.uri,
  //         name: image.fileName || "news.jpg",
  //         type: image.mimeType || "image/jpeg",
  //       } as any);
  //     }

  //     await api.post("/news", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     Alert.alert("Success", "News added successfully");

  //     // reset form
  //     setTitle("");
  //     setContent("");
  //     setCategory("Academic");
  //     setIsFeatured(false);
  //     setImage(null);

  //     router.replace("/admin/dashboard");
  //   } catch (error: any) {
  //     console.log("ADD NEWS ERROR:", error?.response?.data || error.message);
  //     Alert.alert("Error", "Failed to add news");
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleSubmit = async () => {
  if (!title || !content || !category) {
    Alert.alert("Error", "All fields are required");
    return;
  }

  try {
    setSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("is_featured", String(isFeatured));

    if (image) {
      formData.append("image", {
        uri: image.uri,
        name: "news.jpg",
        type: "image/jpeg",
      } as any);
    }

    await api.post("/news/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    Alert.alert("Success", "News added successfully");

    setTitle("");
    setContent("");
    setCategory("Academic");
    setIsFeatured(false);
    setImage(null);

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

      {/* 📂 Category Dropdown */}
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Picker.Item label="Academic" value="Academic" />
          <Picker.Item label="Research" value="Research" />
          <Picker.Item label="Administrative" value="Administrative" />
          <Picker.Item label="Events" value="Events" />
        </Picker>
      </View>

      {/* 📷 Image picker */}
      <TouchableOpacity style={styles.imageBtn} onPress={pickImage}>
        <Text style={styles.imageBtnText}>📷 Select Image</Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image.uri }}
          style={styles.previewImage}
        />
      )}

      {/* ⭐ Featured toggle */}
      <TouchableOpacity
        style={[styles.featuredButton, isFeatured && styles.featuredActive]}
        onPress={() => setIsFeatured(!isFeatured)}
      >
        <Text
          style={[
            styles.featuredText,
            isFeatured && { color: "#fff" },
          ]}
        >
          {isFeatured ? "★ Featured News" : "☆ Mark as Featured"}
        </Text>
      </TouchableOpacity>

      {/* 🚀 Submit */}
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
  pickerWrapper: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 16,
    overflow: "hidden",
  },
  imageBtn: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    alignItems: "center",
    marginBottom: 14,
  },
  imageBtnText: {
    fontWeight: "bold",
    color: "#001f3f",
  },
  previewImage: {
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
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
