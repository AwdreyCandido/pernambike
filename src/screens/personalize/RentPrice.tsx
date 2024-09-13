import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { texts } from "../../utils/custom-styles";
import { SafeAreaView } from "react-native-safe-area-context";
import OutlineButton from "../../components/buttons/OulineButton";
import { styled } from "nativewind";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import Paginator from "../../components/paginator/Paginator";

interface RentPriceProps {
  name: string;
}

const RentPrice: React.FC<RentPriceProps> = ({ name }) => {
  const navigation = useNavigation();

  function nextPage() {
    navigation.navigate("initial-page");
  }

  function goBack() {
    navigation.navigate("initial-page");
  }

  return (
    <SafeAreaView className="flex-1">
              <Paginator currIndex={1} onNextSlide={nextPage} />
      <View className="flex-1 item">
        <View className="mt-10">
          <Text style={[texts.soraTitle.bold, { fontSize: 40 }]}>
            Olá, <Text className="text-primary-2">{name}</Text>,
          </Text>
          <Text style={[texts.soraTitle.bold, { fontSize: 40 }]}>
            seja bem-vindo(a)!
          </Text>
        </View>
        <Text style={[texts.dmText.regular]} className="my-6">
          Qual o valor que deseja pagar no aluguel da bicicleta?
        </Text>
        <View className="h-max mt-4">
          <OutlineButton title="Até R$ 15" onPress={() => {}} />
          <View style={{ marginTop: 20 }}></View>
          <OutlineButton title="Entre R$ 16 e 25" onPress={() => {}} />
          <View style={{ marginTop: 20 }}></View>
          <OutlineButton title="Entre R$ 26 e 35" onPress={() => {}} />
          <View style={{ marginTop: 20 }}></View>
          <OutlineButton title="Acima de R$ 35" onPress={() => {}} />
          <View style={{ marginTop: 20 }}></View>
          <OutlineButton title="Qualquer preço" onPress={() => {}} />
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

export default RentPrice;

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
