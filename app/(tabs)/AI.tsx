import { useState } from "react";
import { ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import { Text, Card, Button, Image } from "@rneui/themed";

const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY_HERE";
const OPENAI_DEPLOYMENT_NAME = "dall-e-3";

const AI = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Tap Generate to create Studio Ghibli magic!");

  const generateImage = async () => {
    setLoading(true);
    setStatus("Generating...");

    try {
      const res = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: OPENAI_DEPLOYMENT_NAME,
          prompt: "Studio Ghibli-style fantasy scene, lush forest, vivid colors, soft sunlight",
          n: 1,
          size: "1024x1024",
          response_format: "url",
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("OpenAI Error:", errorData);
        setStatus(errorData.error?.message || "Unknown error");
        return;
      }

      const data = await res.json();
      const generatedUrl = data?.data?.[0]?.url;

      if (generatedUrl) {
        setImageUrl(generatedUrl);
        setStatus("✨ Magic created!");
      } else {
        setStatus("No image returned.");
      }
    } catch (err) {
      console.error("Network error:", err);
      setStatus("⚠️ Network error — check connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
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
                style={{
                  width: "100%",
                  height: 300,
                  borderRadius: 12,
                  marginBottom: 20,
                }}
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AI;