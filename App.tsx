import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useCallback, useEffect, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { appFonts } from "./src/utils/fonts";
import OnBoarding from "./src/components/on-boarding/OnBoarding";
import AppRoutes from "./src/routes";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  useFonts(appFonts);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Entypo.font);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {/* <OnBoarding /> */}
      <AppRoutes />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
