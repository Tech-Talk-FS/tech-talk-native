import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useState, useRef, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Camera, Aperture, Image as ImageIcon, X } from "react-native-feather";

export default function List() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState("off");
  const [camPermission, requestCamPermission] = useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] =
    MediaLibrary.usePermissions();
  const [recentImage, setRecentImage] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      await requestCamPermission();
      await requestMediaLibraryPermission();
    })();
  }, []);

  if (!camPermission || !mediaLibraryPermission) {
    // Permissions are still loading
    return <View className="flex-1 bg-black" />;
  }

  if (!camPermission.granted || !mediaLibraryPermission.granted) {
    // Permissions not granted yet
    return (
      <View className="flex-1 bg-black justify-center items-center px-6">
        <Text className="text-white text-xl font-medium text-center mb-6">
          Camera and photo library access needed
        </Text>
        <TouchableOpacity
          className="bg-white py-3 px-6 rounded-full"
          onPress={async () => {
            await requestCamPermission();
            await requestMediaLibraryPermission();
          }}
        >
          <Text className="text-black font-medium text-base">
            Grant Permissions
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  function toggleFlash() {
    setFlash((current) => (current === "off" ? "on" : "off"));
  }

  async function takePicture() {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
        });
        await MediaLibrary.saveToLibraryAsync(photo.uri);
        setRecentImage(photo.uri);
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  }

  return (
    <View className="flex-1 bg-black">
      <CameraView
        className="flex-1"
        facing={facing}
        ref={cameraRef}
        flashMode={flash}
      >
        {/* Status bar area */}
        <View className="h-12" />

        {/* Top controls */}
        <View className="flex-row justify-between items-center px-6 py-4">
          <TouchableOpacity
            className="w-10 h-10 rounded-full bg-black/30 items-center justify-center"
            onPress={toggleFlash}
          >
            <Text
              className={`text-lg ${
                flash === "on" ? "text-yellow-400" : "text-white"
              }`}
            >
              ⚡
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-10 h-10 rounded-full bg-black/30 items-center justify-center"
            onPress={() => {}}
          >
            <X width={20} height={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Camera UI - Takes most of the space */}
        <View className="flex-1" />

        {/* Bottom controls */}
        <View className="pb-12 pt-6 bg-black/20">
          <View className="flex-row items-center justify-between px-6">
            {/* Gallery thumbnail placeholder */}
            <TouchableOpacity className="w-12 h-12 rounded-lg bg-gray-800 items-center justify-center">
              <ImageIcon width={20} height={20} color="white" />
            </TouchableOpacity>

            {/* Shutter button */}
            <TouchableOpacity
              className="w-20 h-20 rounded-full bg-white border-4 border-gray-700"
              onPress={takePicture}
            >
              <View className="flex-1 rounded-full m-1 border-2 border-gray-200" />
            </TouchableOpacity>

            {/* Camera flip */}
            <TouchableOpacity
              className="w-12 h-12 rounded-full bg-gray-800 items-center justify-center"
              onPress={toggleCameraFacing}
            >
              <Aperture width={24} height={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}
