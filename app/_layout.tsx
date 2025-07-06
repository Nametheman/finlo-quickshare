import { Stack, usePathname } from "expo-router";
import { StatusBar } from "react-native";
import Toast from "react-native-toast-message";
import "./global.css";

export default function AuthLayout() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <>
      <StatusBar hidden={false} />
      <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
      <Toast position="top" visibilityTime={3000} autoHide />
    </>
  );
}
