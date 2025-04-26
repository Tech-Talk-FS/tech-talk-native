import { Stack } from "expo-router";
import "./globals.css";
import { StatusBar } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function RootLayout() {
  return (
    <>
      <StatusBar hidden={true} />

      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="todos/[id]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
