import { useState } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { Text, Card, Button, Image } from "@rneui/themed";

const AI = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Tap Generate to create Studio Ghibli magic!");

  const generateImage = async () => {
    setLoading(true);
    setStatus("Generating...");

    try {
      // Fake response or comment this out if you don't have the API connection active
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network wait

      // Example fake image for demo (you can replace this with real fetch later)
      const generatedUrl = "https://i.imgur.com/R2U8a0F.jpeg";

      setImageUrl(generatedUrl);
      setStatus("✨ Magic created!");
    } catch (err) {
      console.error("Network error:", err);
      setStatus("⚠️ Network error — check connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f7fa" }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Card containerStyle={{ width: "100%", borderRadius: 12 }}>
          <Card.Title style={{ fontSize: 26, color: "#5c67f2" }}>
            Studio Ghibli AI
          </Card.Title>
          <Card.Divider />
          <Text style={{ marginBottom: 10, textAlign: "center", color: "#777" }}>
            {status}
          </Text>

          {imageUrl && (
            <Image
              source={{ uri: imageUrl }}
              containerStyle={{
                width: "100%",
                height: 300,
                borderRadius: 12,
                marginBottom: 20,
              }}
              PlaceholderContent={<Text>Loading image...</Text>}
              resizeMode="cover"
            />
          )}

          <Button
            title="Generate Image"
            loading={loading}
            onPress={generateImage}
            buttonStyle={{
              backgroundColor: "#5c67f2",
              borderRadius: 8,
            }}
            titleStyle={{
              fontWeight: "600",
              fontSize: 18,
            }}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AI;