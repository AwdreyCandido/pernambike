import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useContext } from "react";
import { colors, texts } from "../../utils/custom-styles";
import { SafeAreaView } from "react-native-safe-area-context";
import OutlineButton from "../../components/buttons/OulineButton";
import { styled } from "nativewind";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import Paginator from "../../components/paginator/Paginator";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../store/AuthContext";
import { PersonalizationContext } from "../../store/Personalization";
import { color } from "react-native-elements/dist/helpers";

interface RentObjectiveProps {
  name: string;
}
const options = [
  "Trabalho",
  "Lazer",
  "Deslocamento",
  "Passeio com Crianças",
  "Passeio Adaptado",
];

const RentObjective = ({ name }: RentObjectiveProps) => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const { rentObjective, updateRentObjectiveHandler } = useContext(
    PersonalizationContext
  );

  function nextPage() {
    navigation.navigate("rent-price");
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
            Olá,{" "}
            <Text className="text-primary-2">{user.name.split(" ").at(0)}</Text>
            ,
          </Text>
          <Text style={[texts.soraTitle.bold, { fontSize: 40 }]}>
            seja bem-vindo(a)!
          </Text>
        </View>
        <Text style={[texts.dmText.regular]} className="my-6">
          Você deseja alugar a bicicleta com qual objetivo?
        </Text>
        <View className="h-max mt-4">
          {options.map((title) => (
            <View key={title} style={{ marginBottom: 20 }}>
              <Pressable onPress={() => updateRentObjectiveHandler(title)}>
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: colors.primary[1],
                    backgroundColor:
                      rentObjective === title ? colors.primary[1] : "#FFFFFF", // Change background if selected
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
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
                          rentObjective === title ? "#FFFFFF" : colors.text,
                      },
                    ]}
                  >
                    {title}
                  </Text>
                </View>
              </Pressable>
            </View>
          ))}
          {/* <OutlineButton
            title="Trabalho"
            onPress={() => {
              updateRentObjectiveHandler("Trabalho");
            }}
          />
          <View style={{ marginTop: 20 }}></View>
          <OutlineButton
            title="Lazer"
            onPress={() => {
              updateRentObjectiveHandler("Lazer");
            }}
          />
          <View style={{ marginTop: 20 }}></View>
          <OutlineButton
            title="Deslocamento"
            onPress={() => {
              updateRentObjectiveHandler("Deslocamento");
            }}
          />
          <View style={{ marginTop: 20 }}></View>
          <OutlineButton
            title="Passeio com Crianças"
            onPress={() => {
              updateRentObjectiveHandler("Passeio com Crianças");
            }}
          />
          <View style={{ marginTop: 20 }}></View>
          <OutlineButton
            title="Passeio Adaptado"
            onPress={() => {
              updateRentObjectiveHandler("Passeio Adaptado");
            }}
          />
          <View style={{ marginTop: 20 }}></View> */}
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

  button: {
    width: "100%",
    backgroundColor: colors.primary[1],
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    justifyContent: "center",
    elevation: 2,
    overflow: "hidden",
  },
  title: {
    fontFamily: "sora semibold",
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
});
