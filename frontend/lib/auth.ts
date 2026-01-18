// import * as SecureStore from "expo-secure-store";

// const TOKEN_KEY = "admin_token";

// export async function saveToken(token: string) {
//   await SecureStore.setItemAsync(TOKEN_KEY, token);
// }

// export async function getToken() {
//   return await SecureStore.getItemAsync(TOKEN_KEY);
// }

// export async function removeToken() {
//   await SecureStore.deleteItemAsync(TOKEN_KEY);
// }

import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "admin_token";

export const saveToken = async (token: string) => {
  await AsyncStorage.setItem("admin_token", token);
};

export const getToken = async () => {
  return await AsyncStorage.getItem("admin_token");
};

export const removeToken = async () => {
  await AsyncStorage.removeItem("admin_token");
};
