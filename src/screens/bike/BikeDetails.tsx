import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, texts } from "../../utils/custom-styles";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import BikeOwner from "../../components/bike-owner/BikeOwner";
import ExpandingCard from "../../components/cards/ExpandingCard";
import { Ionicons } from "@expo/vector-icons";
import OutlineButton from "../../components/buttons/OulineButton";
import { getBike } from "../../services/bikes";
import { IBike } from "../../domain/Bike";

const BikeDetails = ({ navigation, route }: any) => {
  const bikeId = route.params.bikeId;
  const [bike, setBike] = useState<IBike>();

  useEffect(() => {
    getAllBikesHandler(bikeId);
  }, []);

  async function getAllBikesHandler(id: string) {
    const { data, error } = await getBike(id);

    if (error || !data) {
      goBackHandler();
      return Alert.alert(
        "Erro ao buscar detalhes da bike",
        "Por favor, verifique sua conexão com a internet."
      );
    }

    setBike(data);
  }

  function goBackHandler() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={goBackHandler}>
        <Ionicons name="chevron-back-outline" size={28} color="white" />
      </Pressable>
      <View>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={{
            uri: bike?.photoUrl,
          }}
        />
      </View>
      <View style={styles.detailsContainer}>
        <ScrollView style={styles.details} showsVerticalScrollIndicator={false}>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Text style={[texts.dmTitle2.bold, { width: "80%" }]}>
                {bike?.title}
              </Text>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Ionicons name="star" size={28} color={colors.alert} />
                <Text style={[texts.dmTitle2.medium]}>{bike?.ratingsAvg}</Text>
              </View>
            </View>
            <Text style={styles.subtext}>{bike?.users.location}</Text>
          </View>
          <BikeOwner
            name={bike?.users.name}
            photoUrl={bike?.users.photoUrl}
            price={bike?.price}
            reviewsQuantity={bike?.reviewsQuantity}
          />
          <View style={{ gap: 20, paddingVertical: 20 }}>
            <PrimaryButton title="Quero alugar esta bike" onPress={() => {}} />
            <OutlineButton
              title="Ver disponibilidade"
              onPress={() => {}}
              icon={
                <Ionicons
                  name="calendar-outline"
                  size={25}
                  color={colors.primary[1]}
                />
              }
            />
          </View>
          <View style={{ paddingTop: 40, paddingBottom: 50, gap: 20 }}>
            <ExpandingCard title="Detalhes da bicicleta">
              <>
                <View>
                  <Text style={styles.text}>Descrição</Text>
                  <Text style={styles.subtext}>{bike?.description}</Text>
                </View>
                <View>
                  <Text style={styles.text}>Marca</Text>
                  <Text style={styles.subtext}>{bike?.brand}</Text>
                </View>
                <View>
                  <Text style={styles.text}>Aro</Text>
                  <Text style={styles.subtext}>{bike?.rim}</Text>
                </View>
                <Text style={styles.text}>
                  Alugada {bike?.timesRented} vezes{" "}
                </Text>
              </>
            </ExpandingCard>
            <ExpandingCard title="Avaliações do locador(a)">
              <View></View>
            </ExpandingCard>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default BikeDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    height: 335,
    width: "100%",
  },
  detailsContainer: {
    height: "72%",
    width: "100%",
    overflow: "hidden",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    bottom: 0,
    position: "absolute",
    borderWidth: 2,
    borderColor: colors.primary[3],
  },
  details: {
    backgroundColor: "white",
    paddingHorizontal: 25,
    paddingTop: 30,
  },
  subtext: { fontSize: 16, color: colors.dark[4], marginTop: 4 },

  reviewsContainer: {
    height: 300,
    backgroundColor: colors.dark[6],
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  text: {
    fontSize: 16,
    fontFamily: "sora bold",
  },
  backButton: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary[1],
    top: 60,
    left: 15,
    position: "absolute",
    zIndex: 1,
    borderRadius: 10,
  },
});
