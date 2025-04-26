import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapDisplay = () => {
  const INITIAL_REGION = {
    latitude: 28.37,
    longitude: -81.57,
    latitudeDelta: 0.008,
    longitudeDelta: 0.008,
  };

  const markers = [
    {
      id: "1",
      title: "Base One",
      description: "Ground troops",
      coordinate: { latitude: 28.3706, longitude: -81.5708 },
    },
    {
      id: "2",
      title: "Base Two",
      description: "Air troops",
      coordinate: { latitude: 28.3734, longitude: -81.5713 },
    },
  ];

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={INITIAL_REGION}>
        {markers.map((marker) => {
          return <Marker key={marker.id} coordinate={marker.coordinate} />;
        })}
      </MapView>
    </View>
  );
};
export default MapDisplay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
