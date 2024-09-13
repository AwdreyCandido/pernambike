import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { texts } from "../../utils/custom-styles";
import { SafeAreaView } from "react-native-safe-area-context";
import OutlineButton from "../../components/buttons/OulineButton";
import { styled } from "nativewind";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import Paginator from "../../components/paginator/Paginator";
import { useNavigation } from "@react-navigation/native";

interface RentObjectiveProps {
  name: string;
}

const RentObjective = ({ name }: RentObjectiveProps) => {
  const navigation = useNavigation();

  function nextPage() {
    navigation.navigate("initial-page");
  }

  function goBack() {
    navigation.navigate("initial-page");
  }

  return (
    <View className="flex-1">
      <Paginator currIndex={0} onNextSlide={nextPage} />
      <SafeAreaView className="flex-1  p-[15]">
        <View className="mt-10">
          <Text style={[texts.soraTitle.bold, { fontSize: 40 }]}>
            Olá, <Text className="text-primary-2">{name}</Text>,
          </Text>
          <Text style={[texts.soraTitle.bold, { fontSize: 40 }]}>
            seja bem-vindo(a)!
          </Text>
        </View>
        <Text style={[texts.dmText.regular]} className="my-6">
          Você deseja alugar a bicicleta com qual objetivo?
        </Text>
        <View className="h-max mt-4">
          <OutlineButton title="Trabalho" onPress={() => {}} />
          <View style={{ marginTop: 20 }}></View>
          <OutlineButton title="Lazer" onPress={() => {}} />
          <View style={{ marginTop: 20 }}></View>
          <OutlineButton title="Deslocamento" onPress={() => {}} />
          <View style={{ marginTop: 20 }}></View>
          <OutlineButton title="Passeio com Crianças" onPress={() => {}} />
          <View style={{ marginTop: 20 }}></View>
          <OutlineButton title="Passeio Adaptado" onPress={() => {}} />
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
      </SafeAreaView>
    </View>
  );
};

export default RentObjective;

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
