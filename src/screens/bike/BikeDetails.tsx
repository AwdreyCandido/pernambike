import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Pressable,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { colors, texts } from "../../utils/custom-styles";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import BikeOwner from "../../components/bike-owner/BikeOwner";
import ExpandingCard from "../../components/cards/ExpandingCard";
import { Ionicons } from "@expo/vector-icons";
import { getBike, getReviewsByBikeId } from "../../services/bikes";
import { IBike } from "../../domain/Bike";
import { BikesContext } from "../../store/BikesContext";
import OutlineButton from "../../components/buttons/OulineButton";
import Loading from "../../components/layout/Loading";
import { AuthContext } from "../../store/AuthContext";

interface IReview {
  bike_id: number;
  content: string;
  created_at: string;
  id: number;
  reviewer_id: string;
  stars: number;
  users: any;
}

const reviews = [
  {
    bike_id: 3,
    content: "Faz o L",
    created_at: "2024-09-15T18:15:08+00:00",
    id: 3,
    reviewer_id: "108b3659-d3c6-4685-af38-20955da062a2",
    stars: 5,
    users: { name: "Johnny Furacão" },
  },
];

const BikeDetails = ({ navigation, route }: any) => {
  const bikeId = route.params.bikeId;
  const { bikesList, rentedBike } = useContext(BikesContext);
  const { token } = useContext(AuthContext);
  const [bike, setBike] = useState<IBike | null>(null);
  const [bikeReviews, setBikeReviews] = useState<IReview[]>(reviews);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllBikesHandler(bikeId);
    getBikeReviewsHandler(bikeId);
  }, [bikeId]);

  async function getAllBikesHandler(id: number) {
    setIsLoading(true);
    try {
      const { data, error } = await getBike(id);
      if (error || !data) {
        goBackHandler();
        setIsLoading(false);
        return Alert.alert(
          "Erro ao buscar detalhes da bike",
          "Por favor, verifique sua conexão com a internet."
        );
      }
      setBike(data);
    } catch (error) {
      setIsLoading(false);
      goBackHandler();
      Alert.alert(
        "Erro ao buscar detalhes da bike",
        "Por favor, verifique sua conexão com a internet."
      );
      console.error(error);
    }
    setIsLoading(false);
  }

  async function getBikeReviewsHandler(id: number) {
    try {
      const { data, error } = await getReviewsByBikeId(id);

      if (error) {
        throw new Error("Erro ao buscar reviews");
      }

      if (data) {
        setBikeReviews(data);
      } else {
        setBikeReviews([]);
      }
    } catch (error) {
      goBackHandler();
      Alert.alert(
        "Erro ao buscar detalhes da bike",
        "Por favor, verifique sua conexão com a internet."
      );
      console.error(error);
    }
  }

  function goBackHandler() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
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
              <Text style={[texts.dmTitle2.bold, { width: "70%" }]}>
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
            name={bike?.users.name!}
            photoUrl={bike?.users.photoUrl!}
            price={Number(bike?.price)!}
            reviewsQuantity={bike?.reviewsQuantity!}
          />
          <View style={{ gap: 20, paddingVertical: 20 }}>
            {!token && (
              <Text
                style={[
                  texts.dmText.medium,
                  { textAlign: "center", color: colors.text },
                ]}
              >
                Você precisa estar logado
              </Text>
            )}
            <PrimaryButton
              disabled={!token || bike?.isRented}
              title={
                bike?.isRented ? "Bike já alugada" : "Quero alugar esta bike"
              }
              onPress={() => {
                if (rentedBike != null) {
                  Alert.alert("Você já tem um aluguel vigente");
                  return;
                }
                navigation.navigate("bike-availability", { bikeId });
              }}
            />
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
              <View >
                {bikeReviews.length > 0 ? (
                  bikeReviews.map((review) => (
                    <View className="bg-white px-4 py-2 mb-2 rounded-md" key={review.id}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 4,
                        }}
                      >
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Ionicons
                            key={index}
                            name="star"
                            size={16}
                            color={
                              index < review.stars
                                ? colors.alert
                                : colors.dark[4]
                            }
                          />
                        ))}
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={[
                            texts.dmText.medium,
                            { color: colors.text, fontSize: 16 },
                          ]}
                        >
                          {review.users.name}
                        </Text>
                        <Text style={[styles.subtext, { fontSize: 14 }]}>
                          {new Date(review.created_at).toLocaleDateString()}
                        </Text>
                      </View>
                      <Text
                        style={[
                          texts.soraText.regular,
                          { color: colors.dark[4], fontSize: 16, marginTop:4 },
                        ]}
                      >
                        {review.content}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.subtext}>
                    Nenhuma avaliação encontrada.
                  </Text>
                )}
              </View>
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
