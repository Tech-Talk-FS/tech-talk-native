import { View, StyleSheet } from "react-native";
import MapView from 'react-native-maps';

const Lists = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <MapView style={styles.map}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
export default Lists;
