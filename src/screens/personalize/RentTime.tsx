import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { texts } from "../../utils/custom-styles";
import { SafeAreaView } from "react-native-safe-area-context";
import OutlineButton from "../../components/buttons/OulineButton";
import { styled } from "nativewind";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useNavigation } from "@react-navigation/native";

interface RentTimeProps {
  name: string;
}

const RentTime: React.FC<RentTimeProps> = ({ name }) => {
  const navigation = useNavigation();

  function nextPage() {
    navigation.navigate("initial-page");
  }

  function goBack() {
    navigation.navigate("initial-page");
  }
  return (
    <SafeAreaView className="flex-1">
              <Paginator currIndex={2} onNextSlide={nextPage} />
      <View className="flex-1 ">
        <View className="mt-10">
          <Text style={[texts.soraTitle.bold, { fontSize: 40 }]}>
            Olá, <Text className="text-primary-2">{name}</Text>,
          </Text>
          <Text style={[texts.soraTitle.bold, { fontSize: 40 }]}>
            seja bem-vindo(a)!
          </Text>
        </View>
        <Text style={[texts.dmText.regular]} className="my-6">
          Por quanto tempo você pretende alugar a bicicleta?
        </Text>
        <View className="h-max mt-4">
          <OutlineButton title="Até 3 horas" onPress={() => {}} />
          <View style={{ marginTop: 20 }}></View>
          <OutlineButton title="Entre 3 e 6 horas" onPress={() => {}} />
          <View style={{ marginTop: 20 }}></View>
          <OutlineButton title="Entre 6 e 12 horas" onPress={() => {}} />
          <View style={{ marginTop: 20 }}></View>
          <OutlineButton title="Uma diária" onPress={() => {}} />
          <View style={{ marginTop: 20 }}></View>
          <OutlineButton title="Fim de semana" onPress={() => {}} />
          <View style={{ marginTop: 20 }}></View>
        </View>
        <View className="flex-1 justify-end">
          <View style={styles.buttonContainer}>
            <View style={{ flex: 1 }}>
              <OutlineButton onPress={goBack} title="Voltar" />
            </View>
            <View style={{ flex: 1 }}>
              <PrimaryButton onPress={nextPage} title="Próximo" />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RentTime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "white",
    paddingHorizontal: 15,
  },

  buttonContainer: {
    flex: 1,
    minWidth: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 20,
    gap: 20,
  },
});
