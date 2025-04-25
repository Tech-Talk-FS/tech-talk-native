import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

const TodoList = () => {
  const { id } = useLocalSearchParams();
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-5xl text-primary">This is the list for {id}</Text>
    </View>
  );
};
export default TodoList;
