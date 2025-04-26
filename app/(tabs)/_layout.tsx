import { Tabs } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';

export default function TodosLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#d19efa'}}>
      <Tabs.Screen
        name="index"
        options={{ title: "Home", headerShown: false,
           tabBarIcon: ({ focused, color, size }) => (
          <AntDesign name={focused ? 'home' : 'home'} size={size} color={color} />
        ),
      }}
      />
      <Tabs.Screen
        name="lists"
        options={{ title: "Lists", headerShown: false,
           tabBarIcon: ({ focused, color, size }) => (
          <FontAwesome name={focused ? 'list-alt' : 'list-alt'} size={size} color={color} />
        ),
      }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile", headerShown: false,
           tabBarIcon: ({ focused, color, size }) => (
          <AntDesign name={focused ? 'user' : 'user'} size={size} color={color} />
        ),
      }}
      />
       <Tabs.Screen
        name="viewmap"
        options={{ title: "Map", headerShown: false,
           tabBarIcon: ({ focused, color, size }) => (
          <Feather name={focused ? 'map' : 'map'} size={size} color={color} />
        ),
      }}
      />
    </Tabs>
  );
}
