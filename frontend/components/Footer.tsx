

// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// export default function Footer() {
//   return (
//     <View style={styles.footer}>
//       {/* University Name */}
//       <Text style={styles.university}>
//         Chittagong University of Engineering and Technology
//       </Text>

//       {/* Divider */}
//       <View style={styles.divider} />

//       {/* Address */}
//       <View style={styles.row}>
//         <Ionicons name="location-outline" size={16} color="#FFD700" />
//         <Text style={styles.text}>
//           Pahartoli, Raozan, Chattogram – 4349, Bangladesh
//         </Text>
//       </View>

//       {/* Email */}
//       <View style={styles.row}>
//         <Ionicons name="mail-outline" size={16} color="#FFD700" />
//         <Text style={styles.text}>registrar@cuet.ac.bd</Text>
//       </View>

//       {/* Phone */}
//       <View style={styles.row}>
//         <Ionicons name="call-outline" size={16} color="#FFD700" />
//         <Text style={styles.text}>+880-31-714946</Text>
//       </View>

//       {/* Social Icons */}
//       <View style={styles.socialRow}>
//         <TouchableOpacity>
//           <Ionicons name="logo-facebook" size={22} color="#ffffff" />
//         </TouchableOpacity>

//         <TouchableOpacity>
//           <Ionicons name="logo-linkedin" size={22} color="#ffffff" />
//         </TouchableOpacity>

//         <TouchableOpacity>
//           <Ionicons name="logo-youtube" size={22} color="#ffffff" />
//         </TouchableOpacity>
//       </View>

//       {/* Footer bottom text */}
//       <Text style={styles.copyright}>
//         © 2025 Chittagong University of Engineering and Technology
//       </Text>
//       <Text style={styles.rights}>All rights reserved.</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   footer: {
//     backgroundColor: "#001f3f", // 🔵 SAME AS FEATURED NEWS BOX
//     paddingVertical: 24,
//     paddingHorizontal: 18,
//     marginTop: 24,
//   },
//   university: {
//     color: "#ffffff",
//     fontSize: 16,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   divider: {
//     height: 1,
//     backgroundColor: "rgba(255,255,255,0.2)",
//     marginVertical: 12,
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 6,
//   },
//   text: {
//     color: "#e6ecf5",
//     marginLeft: 8,
//     fontSize: 13,
//     flex: 1,
//   },
//   socialRow: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 14,
//     marginBottom: 10,
//     gap: 22,
//   },
//   copyright: {
//     color: "#cfd8e3",
//     fontSize: 12,
//     textAlign: "center",
//   },
//   rights: {
//     color: "#cfd8e3",
//     fontSize: 11,
//     textAlign: "center",
//     marginTop: 2,
//   },
// });

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Footer() {
  return (
    <View style={styles.footer}>
      {/* 🔷 Top row: Logo + Info */}
      <View style={styles.topRow}>
        {/* 🖼 CUET Logo */}
        <Image
          source={require("../assets/cuet-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* ℹ️ Info */}
        <View style={styles.info}>
          <Text style={styles.university}>
            Chittagong University of Engineering and Technology
          </Text>

          <View style={styles.row}>
            <Ionicons name="location-outline" size={16} color="#FFD700" />
            <Text style={styles.text}>
              Pahartoli, Raozan, Chattogram – 4349, Bangladesh
            </Text>
          </View>

          {/* 📧 Clickable Email */}
          <TouchableOpacity
            style={styles.row}
            onPress={() =>
              Linking.openURL("mailto:registrar@cuet.ac.bd")
            }
          >
            <Ionicons name="mail-outline" size={16} color="#FFD700" />
            <Text style={[styles.text, styles.link]}>
              registrar@cuet.ac.bd
            </Text>
          </TouchableOpacity>

          {/* 📞 Clickable Phone */}
          <TouchableOpacity
            style={styles.row}
            onPress={() => Linking.openURL("tel:+88031714946")}
          >
            <Ionicons name="call-outline" size={16} color="#FFD700" />
            <Text style={[styles.text, styles.link]}>
              +880-31-714946
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 🌐 Social Icons */}
      <View style={styles.socialRow}>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://www.facebook.com/cuetchittagong")
          }
        >
          <Ionicons name="logo-facebook" size={22} color="#ffffff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://www.youtube.com/@CUETOfficial")
          }
        >
          <Ionicons name="logo-youtube" size={22} color="#ffffff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://www.linkedin.com/school/cuetchittagong/")
          }
        >
          <Ionicons name="logo-linkedin" size={22} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* © Copyright */}
      <Text style={styles.copyright}>
        © 2025 Chittagong University of Engineering and Technology
      </Text>
      <Text style={styles.rights}>All rights reserved.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#001f3f", // Featured news color
    paddingVertical: 22,
    paddingHorizontal: 16,
    marginTop: 24,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  university: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  text: {
    color: "#e6ecf5",
    marginLeft: 8,
    fontSize: 13,
    flex: 1,
  },
  link: {
    textDecorationLine: "underline",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 12,
    gap: 24,
  },
  copyright: {
    color: "#cfd8e3",
    fontSize: 12,
    textAlign: "center",
  },
  rights: {
    color: "#cfd8e3",
    fontSize: 11,
    textAlign: "center",
    marginTop: 2,
  },
});
