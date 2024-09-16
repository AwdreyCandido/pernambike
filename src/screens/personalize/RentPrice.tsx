import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useContext } from "react";
import { texts, colors } from "../../utils/custom-styles";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import Paginator from "../../components/paginator/Paginator";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../store/AuthContext";
import { PersonalizationContext } from "../../store/Personalization";
import OutlineButton from "../../components/buttons/OulineButton";

const priceOptions = [
  { label: "Até R$ 15", value: [15] },
  { label: "Entre R$ 16 e 25", value: [16, 25] },
  { label: "Entre R$ 26 e 35", value: [26, 35] },
  { label: "Acima de R$ 35", value: [35] },
  { label: "Qualquer preço", value: [] },
];

const RentPrice: React.FC = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const { rentPrice, updateRentPriceHandler } = useContext(
    PersonalizationContext
  );

  function nextPage() {
    navigation.navigate("rent-time");
  }

  function goBack() {
    navigation.navigate("rent-objective");
  }

  return (
    <SafeAreaView className="flex-1">
      <Paginator currIndex={1} onNextSlide={nextPage} />
      <View className="flex-1  p-[15]">
        <View className="mt-10">
          <Text style={[texts.soraTitle.bold, { fontSize: 40 }]}>
            Olá,{" "}
            <Text className="text-primary-2">{user.name.split(" ").at(0)}</Text>
            ,
          </Text>
          <Text style={[texts.soraTitle.bold, { fontSize: 40 }]}>
            seja bem-vindo(a)!
          </Text>
        </View>
        <Text style={[texts.dmText.regular]} className="my-6">
          Qual o valor que deseja pagar no aluguel da bicicleta?
        </Text>
        <View className="h-max mt-4">
          {priceOptions.map(({ label, value }) => (
            <View key={label} style={{ marginBottom: 20 }}>
              <Pressable onPress={() => updateRentPriceHandler(value)}>
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: colors.primary[1],
                    backgroundColor:
                      JSON.stringify(rentPrice) === JSON.stringify(value)
                        ? colors.primary[1]
                        : "#FFFFFF",
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 50,
                    justifyContent: "center",
                    elevation: 2,
                    overflow: "hidden",
                  }}
                >
                  <Text
                    style={[
                      styles.title,
                      {
                        color:
                          JSON.stringify(rentPrice) === JSON.stringify(value)
                            ? "#FFFFFF"
                            : colors.text,
                      },
                    ]}
                  >
                    {label}
                  </Text>
                </View>
              </Pressable>
            </View>
          ))}
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
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
  buttonContainer: {
    flex: 1,
    minWidth: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 20,
    gap: 20,
  },
  title: {
    fontFamily: "sora semibold",
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
});
