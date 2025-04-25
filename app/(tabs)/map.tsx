import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Platform, Text } from 'react-native';

export default function Map() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [isWeb, setIsWeb] = useState(Platform.OS === 'web');

  useEffect(() => {
    if (isWeb) {
        import('leaflet').then((L) => {
          import('leaflet/dist/leaflet.css');

          // Override default icon paths
          L.default.Icon.Default.mergeOptions({
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
          });

        if (mapRef.current) {
          const map = L.default.map(mapRef.current).setView([37.78825, -122.4324], 13);

          L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(map);

          return () => {
            map.remove();
          };
        }

        L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        return () => {
          map.remove();
        };
      });
    }
  }, [isWeb]);

  return (
    <View style={styles.container}>
      {isWeb ? (
        <View ref={mapRef} style={styles.map} />
      ) : (
        <Text>Map is only available on web</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
