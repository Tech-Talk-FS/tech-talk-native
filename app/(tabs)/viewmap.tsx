import { View, StyleSheet } from "react-native";
import MapView from 'react-native-maps';


const ViewMap = () => {
  // const [status, requestPermission] = useLocationPermissions();

  const INIT_REGION = {
    latitude: 28.37,
    longitude: -81.57,
    latitudeDelta: 0.008,
    longitudeDelta: 0.008
  }
  const markets = [
    {
      id: 1,
      title: "Location",
      description: 'Neils Air Forebase',
      coordinate: { latitude: 28.343, longitude: -23.342}
    }
  ]
  return (
    <View className="flex-1 justify-center items-center">
      <MapView style={styles.map} initialRegion={INIT_REGION}/>

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
export default ViewMap;
