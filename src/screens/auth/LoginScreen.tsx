import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../../components/buttons/PrimaryButton";

const LoginScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>Awdrey</Text>
        <View style={{ paddingHorizontal: 20 }}>
          <PrimaryButton title="Primary Button" onPress={() => {}} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
