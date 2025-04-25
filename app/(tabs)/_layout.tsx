import { Tabs } from "expo-router";
import { Map } from './map';

export default function TodosLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ title: "Home", headerShown: false }}
      />
      <Tabs.Screen
        name="map"
        options={{ title: "Map", headerShown: false }}
      />
    </Tabs>
  );
}
