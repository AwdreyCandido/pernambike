import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useCallback, useEffect, useState } from "react";
import { appFonts } from "./src/utils/fonts";
import AppRoutes from "./src/routes";
import AuthContextProvider from "./src/store/AuthContext";
import BikesContextProvider from "./src/store/BikesContext";
import { StripeProvider } from "@stripe/stripe-react-native";
import PersonalizationContextProvider from "./src/store/Personalization";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  useFonts(appFonts);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(appFonts);
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
      <StatusBar translucent style="dark" />
      <StripeProvider publishableKey="pk_test_51PjEEdRr139V5pLehJoVuZdXmCIE4EvCsnkFOgIBlaaV02efykVaQvhNEZD9FyYA8Fv7eDMDKh0xTbJILqd7KK2y00LmIDts0C">
        <AuthContextProvider>
          <PersonalizationContextProvider>
            <BikesContextProvider>
              <AppRoutes />
            </BikesContextProvider>
          </PersonalizationContextProvider>
        </AuthContextProvider>
      </StripeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
});
