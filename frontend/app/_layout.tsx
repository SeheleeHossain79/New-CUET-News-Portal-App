import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Public + Drawer */}
      <Stack.Screen name="(drawer)" />

      {/* Admin routes (hidden from drawer) */}
      <Stack.Screen name="admin/login" />
      <Stack.Screen name="admin/dashboard" />
    </Stack>
  );
}
