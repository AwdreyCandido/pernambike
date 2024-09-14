import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useContext } from "react";
import { texts, colors } from "../../utils/custom-styles";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import Paginator from "../../components/paginator/Paginator";
import { AuthContext } from "../../store/AuthContext";
import { PersonalizationContext } from "../../store/Personalization";
import OutlineButton from "../../components/buttons/OulineButton";

interface RentTimeProps {
  name: string;
}

const options = [
  "Até 3 horas",
  "Entre 3 e 6 horas",
  "Entre 6 e 12 horas",
  "Uma diária",
  "Fim de semana",
];

const RentTime: React.FC<RentTimeProps> = ({ name }) => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const { rentTime, updateRentTimeHandler } = useContext(
    PersonalizationContext
  );

  function nextPage() {
    navigation.navigate("initial-page");
  }

  function goBack() {
    navigation.navigate("rent-price");
  }

  return (
    <SafeAreaView className="flex-1">
      <Paginator currIndex={2} onNextSlide={nextPage} />
      <View className="flex-1 p-[15]">
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
          Por quanto tempo você pretende alugar a bicicleta?
        </Text>
        <View className="h-max mt-4">
          {options.map((title) => (
            <View key={title} style={{ marginBottom: 20 }}>
              <Pressable onPress={() => updateRentTimeHandler(title)}>
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: colors.primary[1],
                    backgroundColor:
                      rentTime === title ? colors.primary[1] : "#FFFFFF",
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
                        color: rentTime === title ? "#FFFFFF" : colors.text,
                      },
                    ]}
                  >
                    {title}
                  </Text>
                </View>
              </Pressable>
            </View>
          ))}
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
  outlineButton: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: colors.primary[1],
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    justifyContent: "center",
    elevation: 2,
  },
  outlineButtonText: {
    color: colors.primary[1],
    fontSize: 20,
    fontFamily: "sora semibold",
    textAlign: "center",
  },
  title: {
    fontFamily: "sora semibold",
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
});
