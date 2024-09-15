import { StyleSheet, Text, View, Image, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import OutlineButton from "../../components/buttons/OulineButton";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { colors, texts } from "../../utils/custom-styles";
import { BikesContext } from "../../store/BikesContext";
import { IBike } from "../../domain/Bike";
import { deleteRentedBike, getRentedBike } from "../../services/bikes";
import { AuthContext } from "../../store/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../../components/layout/Loading";

const RentedBicycles = ({ navigation, route }: any) => {
  const {
    bikesList,
    startDate,
    endDate,
    startTime,
    endTime,
    rentedBike,
    setRentedBikeHandler,
  } = useContext(BikesContext);
  const [isLoading, setIsLoading] = useState(false);

  const start = formatDate(startDate!);
  const end = formatDate(endDate!);
  
  useEffect(() => {
    getRentedBikeHandler();
  }, [route.params?.reload]);

  const getRentedBikeHandler = async () => {
    const userId = await AsyncStorage.getItem("userId");

    if (userId) {
      const { data, error } = await getRentedBike(userId);
      if (!error) {
        setRentedBikeHandler(data);
        return;
      }
    }
  };

  const deleteRentedBikeHandler = async () => {
    const userId = await AsyncStorage.getItem("userId");
    setIsLoading(true);

    const { error } = await deleteRentedBike(userId!, rentedBike?.bikeId!);

    if (error) {
      setIsLoading(false);
      return Alert.alert(
        "Erro ao cancelar aluguel da bike",
        "Por favor, verifique sua conexão com a internet."
      );
    }

    setIsLoading(false);
    Alert.alert(
      "Aluguel cancelado com sucesso",
      "O valor da diária será devolvido ao seu cartão"
    );
    navigation.navigate("bicycles", { reload: true });
  };

  if (!rentedBike) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <View style={{ width: "100%" }}>
          <Text
            style={[
              texts.soraTitle.bold,
              {
                color: colors.text,
                textAlign: "center",
                width: "100%",
                fontSize: 35,
              },
            ]}
          >
            Você ainda não tem nenhum aluguel
          </Text>
          <View style={styles.imageContainer}>
            <Image
              style={{ width: 300, height: 300 }}
              source={require("./../../../assets/imgs/empty.png")}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      <Text style={[texts.dmTitle2.bold, { color: colors.text }]}>
        Aluguel Atual
      </Text>
      <View style={styles.detailsContainer}>
        <View style={{ flexDirection: "row", width: "100%", gap: 10 }}>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={{
              uri: rentedBike.photoUrl,
            }}
          />
          <View style={{ width: "100%", flex: 1 }}>
            <Text style={[texts.soraText.bold, { width: "80%" }]}>
              {rentedBike?.title}
            </Text>
            {/* <Text
              style={[
                texts.soraText.regular,
                { color: colors.dark[4], marginTop: 2 },
              ]}
            >
              Locador: {bike?.users.name}
            </Text> */}
            <Text
              style={[
                texts.soraText.regular,
                { color: colors.dark[4], marginTop: 2 },
              ]}
            >
              Cod: {rentedBike?.bikeId}
            </Text>
          </View>
        </View>
        <View style={styles.details}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          ></View>
          <View style={styles.info}>
            <Text style={styles.subtext}>{rentedBike.renterLocation}</Text>
            <Text>
              R$ <Text style={texts.soraText.bold}>{rentedBike.rentValue}</Text>
              <Text style={{ fontSize: 14, color: colors.dark[3] }}>/dia</Text>
            </Text>
          </View>
          <View style={styles.dateContainer}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={[texts.soraText.regular, { fontSize: 15, flex: 3 }]}>
                Data do Aluguel:
              </Text>
              <Text style={[texts.soraText.medium]}>{start}</Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={[texts.soraText.regular, { fontSize: 15, flex: 3 }]}>
                Data de devolução:
              </Text>
              <Text style={[texts.soraText.medium]}>{end}</Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={[texts.soraText.regular, { fontSize: 15, flex: 3 }]}>
                Valor reservado:
              </Text>
              <Text style={[texts.soraText.medium]}>
                R$ {rentedBike.rentValue.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{ gap: 10, marginTop: 40 }}>
        <PrimaryButton
          type="del"
          title="Cancelar Aluguel"
          onPress={deleteRentedBikeHandler}
        />
      </View>
    </View>
  );
};

export default RentedBicycles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  detailsContainer: {
    width: "100%",
    borderRadius: 15,
    backgroundColor: "#e9e9e9",
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginTop: 20,
  },
  image: {
    height: 80,
    width: 80,
    backgroundColor: "#ccc",
    borderRadius: 10,
  },
  subtext: {
    width: "80%",
    flexWrap: "wrap",
    fontSize: 16,
    color: colors.dark[4],
    marginTop: 4,
  },
  details: {
    width: "100%",
    backgroundColor: "#e9e9e9",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  price: {
    // marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  info: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: 5,
  },
  dateContainer: {
    width: "100%",
    backgroundColor: "white",
    marginTop: 30,
    borderRadius: 10,
    padding: 15,
    gap: 5,
  },
  buttonContainer: {
    flex: 1,
    minWidth: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 20,
    gap: 40,
    overflow: "hidden",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});

function formatDate(date: string): string {
  const now = new Date(date);

  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0"); // Mês de 0 a 11, então adicionamos 1
  const day = String(now.getUTCDate()).padStart(2, "0");

  return `${day}/${month}/${year}`;
}
