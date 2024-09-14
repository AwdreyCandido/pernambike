import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import { texts } from "../../utils/custom-styles";
import { useNavigation } from "@react-navigation/native";

const PersonalizationModal = () => {
  const navigation = useNavigation();

  function goToPersonalizationForm() {
    navigation.navigate("rent-objective");
  }

  return (
    <View className="p-6 bg-white border-[1px] border-primary-2 rounded-[30px]">
      <Text style={[texts.soraTitle2.medium]}>
        Nenhuma bicicleta se encaixa na sua realidade?
      </Text>
      <View style={{ marginTop: 20 }}></View>
      <Text style={[texts.dmText.regular]}>
        Personalize sua experiência respondendo perguntas rápidas para ver
        bicicletas que melhor atendem às suas necessidades.
      </Text>
      <View style={{ marginTop: 20 }}></View>
      <PrimaryButton
        title="Responder Questionário"
        onPress={goToPersonalizationForm}
      />
    </View>
  );
};

export default PersonalizationModal;

const styles = StyleSheet.create({});
