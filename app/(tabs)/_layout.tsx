import { Tabs } from "expo-router";

export default function TodosLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ title: "Home", headerShown: false }}
      />
    </Tabs>
  );
}
