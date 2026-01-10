import { Drawer } from "expo-router/drawer";
import { Image, Text, View, Pressable } from "react-native";
import { router } from "expo-router";
import { useRef } from "react";

export default function RootLayout() {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);


  // start counting when logo pressed
  const handlePressIn = () => {
    timerRef.current = setTimeout(() => {
      router.push("/admin/login");
    }, 3000); // 3 seconds
  };

  // cancel if released early
  const handlePressOut = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  return (
    <Drawer
      screenOptions={{
        headerTitle: () => (
          <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../assets/cuet-logo.png")}
                style={{ width: 28, height: 28, marginRight: 8 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                CUET News Portal
              </Text>
            </View>
          </Pressable>
        ),
      }}
    >
      {/* ===== Visible drawer items ===== */}
      <Drawer.Screen name="index" options={{ title: "Home" }} />
      <Drawer.Screen name="academic" options={{ title: "Academic" }} />
      <Drawer.Screen name="events" options={{ title: "Events" }} />
      <Drawer.Screen name="research" options={{ title: "Research" }} />
      <Drawer.Screen name="achievements" options={{ title: "Achievements" }} />
      <Drawer.Screen
        name="administrative"
        options={{ title: "Administrative" }}
      />

      {/* ===== Hidden/internal routes ===== */}
      <Drawer.Screen
        name="(tabs)"
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="modal"
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="news/[id]"
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="admin/login"
        options={{ drawerItemStyle: { display: "none" } }}
      />
    </Drawer>
  );
}
