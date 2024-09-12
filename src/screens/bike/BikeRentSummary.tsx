import { StyleSheet, Text, View, Image, Alert } from "react-native";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { IBike } from "../../domain/Bike";
import { BikesContext, RentedBike } from "../../store/BikesContext";
import { colors, texts } from "../../utils/custom-styles";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { addRentedBike } from "../../services/bikes";
import { useStripe } from "@stripe/stripe-react-native";
import OutlineButton from "../../components/buttons/OulineButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../../components/layout/Loading";

const BikeRentSummary = ({ navigation, route }: any) => {
  const { bikeId } = route.params;
  const {
    bikesList,
    startDate,
    endDate,
    startTime,
    endTime,
    setRentedBikeHandler,
  } = useContext(BikesContext);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const bike = bikesList.find((item: IBike) => item.id == bikeId);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const start = formatDate(startDate!);
  const end = formatDate(endDate!);

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`http://192.168.246.122:3000/payment-sheet`, {
      // 10.34.128.206
      method: "POST",
      body: JSON.stringify({ amount: bike?.price }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();
    return { paymentIntent, ephemeralKey, customer };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams();
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Pernambike",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: bike?.users.name,
        email: bike?.users.email,
        phone: bike?.users.phone,
      },
    });
    if (!error) {
      setLoadingPayment(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    const userId = await AsyncStorage.getItem("userId");
    const bikeRent = {
      bikeId: bike?.id,
      brand: bike?.brand,
      title: bike?.title,
      photoUrl: bike?.photoUrl,
      ownerId: bike?.ownerId,
      renterId: userId,
      startRent: startDate,
      endRent: endDate,
      rentValue: bike?.price,
      renterLocation: bike?.users.location,
    };

    if (error) {
      Alert.alert(
        "Erro ao alugar a bicicleta",
        "Fluxo de pagamento do aluguel cancelado."
      );
    } else {
      setIsLoading(true);
      await rentBikeHandler(bikeRent);
    }
  };

  const rentBikeHandler = async (bike: RentedBike) => {
    const { data, error } = await addRentedBike(bike);
    console.log("rent", data);
    if (error) {
      Alert.alert("Erro ao registrar aluguel");
      setIsLoading(false);
      console.log(error);
    } else {
      Alert.alert("Bicicleta alugada com sucesso:");
      setRentedBikeHandler(bike);
      setIsLoading(false);
      navigation.navigate("bicycles", { bikeId });
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      <BikeDetails
        bike={bike}
        start={start}
        end={end}
        startTime={startTime}
        endTime={endTime}
      />
      <View style={styles.buttonContainer}>
        <View style={{ flex: 1 }}>
          <OutlineButton
            onPress={() => {
              navigation.goBack();
            }}
            title="Voltar"
          />
        </View>
        <View style={{ flex: 1 }}>
          <PrimaryButton
            disabled={!loadingPayment}
            onPress={openPaymentSheet}
            title="Confirmar"
          />
        </View>
      </View>
    </View>
  );
};

const BikeDetails = ({ bike, start, end, startTime, endTime }: any) => (
  <View style={styles.detailsContainer}>
    <Image
      resizeMode="stretch"
      style={styles.image}
      source={{ uri: bike?.photoUrl }}
    />
    <View style={styles.details}>
      <Text style={[texts.soraTitle2.bold, { width: "80%" }]}>
        {bike?.title}
      </Text>
      <View style={styles.info}>
        <Text style={[styles.subtext, { flexWrap: "wrap" }]}>
          {bike?.users.location}
        </Text>
        <Text>
          R$ <Text style={texts.dmText.bold}>{bike?.price}</Text>
          <Text style={{ fontSize: 14, color: colors.dark[3] }}>/dia</Text>
        </Text>
      </View>
      <View style={styles.dateContainer}>
        <DateRow label="De:" date={start} time={startTime} />
        <DateRow label="Até:" date={end} time={endTime} />
      </View>
      <View style={styles.separator} />
      <View style={styles.price}>
        <Text style={[texts.dmTitle2.bold]}>Total:</Text>
        <Text style={[texts.dmTitle.bold]}>R${bike?.price.toFixed(2)}</Text>
      </View>
    </View>
  </View>
);

const DateRow = ({ label, date, time }: any) => (
  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    <Text style={[texts.soraText.regular, { fontSize: 15, flex: 1 }]}>
      {label}
    </Text>
    <Text
      style={[
        texts.soraText.medium,
        { fontSize: 15, flex: 4, flexWrap: "wrap", textAlign: "right" },
      ]}
    >
      {date}, às {time.hours}:{time.minutes}
    </Text>
  </View>
);

const formatDate = (date: string): string => {
  const now = new Date(date);
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");
  return `${day}/${month}/${year}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  detailsContainer: {
    width: "100%",
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "#e9e9e9",
  },
  image: {
    height: 260,
    width: "100%",
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
    transform: [{ translateY: -30 }],
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  price: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  info: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: 5,
    gap: 10,
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
  },
  separator: {
    width: "100%",
    borderColor: "#3ccc",
    borderTopWidth: 1,
    marginVertical: 30,
    borderStyle: "dashed",
  },
});

export default BikeRentSummary;
