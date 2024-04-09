import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";

export default function App() {
  useFonts({
    "sora regular": require("./assets/fonts/Sora-Regular.ttf"),
    "sora medium": require("./assets/fonts/Sora-Medium.ttf"),
    "sora semibold": require("./assets/fonts/Sora-SemiBold.ttf"),
    "sora bold": require("./assets/fonts/Sora-Bold.ttf"),
    "dmsans regular": require("./assets/fonts/DMSans-Regular.ttf"),
    "dmsans medium": require("./assets/fonts/DMSans-Medium.ttf"),
    "dmsans semibold": require("./assets/fonts/DMSans-SemiBold.ttf"),
    "dmsans bold": require("./assets/fonts/DMSans-Bold.ttf"),
  });

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: "sora bold", fontSize: 20 }}>Pernambike</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
