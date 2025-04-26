import { useState } from "react";
import { Text, View, Button, Image, ActivityIndicator, ScrollView } from "react-native";

// ✅ Use your real working project key
const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY";
// ✅ Use your real working project key

const AI = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Tap to generate an image.");

  const generateImage = async () => {
    setLoading(true);
    setStatus("Generating Studio Ghibli magic...");

    try {
      const res = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: "Studio Ghibli-style fantasy scene, lush forest, vivid colors, soft sunlight",
          n: 1,
          size: "1024x1024",
          response_format: "url",
        }),
      });

      if (!res.ok) {
        const errJson = await res.json();
        console.error("OpenAI Error:", errJson);
        setStatus(`OpenAI error: ${errJson.error?.message || "Unknown"}`);
        return;
      }

      const data = await res.json();
      const image = data?.data?.[0]?.url;

      if (image) {
        setImageUrl(image);
        setStatus("Image generated!");
      } else {
        setStatus("No image returned.");
      }
    } catch (err) {
      console.error("Network error:", err);
      setStatus("⚠️ Network error — are you online? Try real device.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>Ghibli Image Generator</Text>
      <Text style={{ fontSize: 16, marginBottom: 16, color: "#666" }}>{status}</Text>

      <Button title="Generate Ghibli Image" onPress={generateImage} />

      {loading && <ActivityIndicator size="large" style={{ marginTop: 24 }} />}

      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: 300,
            height: 300,
            borderRadius: 16,
            marginTop: 24,
          }}
          resizeMode="cover"
        />
      )}
    </ScrollView>
  );
};

export default AI;