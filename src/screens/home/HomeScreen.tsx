import {
  Alert,
  Button,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TextInputChangeEventData,
  View,
} from "react-native";

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../lib/supabase";
import BikeView from "../../components/bike-view/BikeView";
import { FlatList } from "react-native-gesture-handler";
// import { bikes } from "../../data/bikes";
import { colors, texts } from "../../utils/custom-styles";
import Input from "../../components/inputs/Input";
import { Ionicons } from "@expo/vector-icons";
import { getAllBikes } from "../../services/bikes";
import { BikesContext } from "../../store/BikesContext";
import Loading from "../../components/layout/Loading";
import PersonalizationModal from "../../components/personalization-modal/PersonalizationModal";

const HomeScreen = ({ navigation }: any) => {
  const { logout, token } = useContext(AuthContext);
  const {
    setAllBikesHandler,
    bikesList,
    filteredBikesList,
    inputFilterHandler,
  } = useContext(BikesContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllBikesHandler();
  }, []);

  async function getAllBikesHandler() {
    setIsLoading(true);
    const { data, error } = await getAllBikes();
    if (error) {
      setIsLoading(false);
      return Alert.alert(
        "Erro ao buscar bikes",
        "Por favor, verifique sua conexão com a internet."
      );
    }
    if (Array.isArray(data) && data.length > 0) {
      setIsLoading(false);
      return setAllBikesHandler(data);
    }
    setIsLoading(false);
  }

  function bikeDetailsHandler(id: any) {
    navigation.navigate("bike-details", { bikeId: id });
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {isLoading && <Loading />}
      <View style={{ marginBottom: 20, paddingHorizontal: 20 }}>
        <View>
          <Input
            inputConfig={{
              placeholder: "Pesquise por modelo, localização...",
              onChangeText(value) {
                inputFilterHandler(value);
              },
            }}
          />
        </View>
        <Text style={[texts.dmTitle2.bold, { marginTop: 40 }]}>
          Todas as Bikes
        </Text>
      </View>
      <FlatList
        // ListHeaderComponent={() => {
        //   return (
        //     <View>
        //       <View style={{ marginBottom: 10 }}>
        //         <Input
        //           inputConfig={{
        //             placeholder: "Pesquise por modelo, localização...",
        //             onChangeText(value) {
        //               inputFilterHandler(value);
        //             },
        //           }}
        //         />
        //       </View>
        //       <Text style={[texts.dmTitle2.bold, { marginTop: 20 }]}>
        //         Bikes para passeio
        //       </Text>
        //     </View>
        //   );
        // }}
        ListFooterComponent={() => {
          return token ? (
            <View style={{ marginBottom: 90 }}>
              <PersonalizationModal />
            </View>
          ) : (
            <View style={{ height: 70 }}></View>
          );
        }}
        data={filteredBikesList}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        style={{ paddingHorizontal: 20 }}
        contentContainerStyle={{ gap: 20 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <BikeView
              title={item.title}
              price={item.price}
              ratingsQtd={item.reviewsQuantity}
              ratingsAvg={item.ratingsAvg}
              imageUrl={item.photoUrl}
              onPress={bikeDetailsHandler.bind(this, item.id)}
            />
          );
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: 20,
    marginVertical: 30,
  },
});

const bikesList = [
  {
    brand: "Trek Marlin 7",
    createdAt: "2024-03-15T14:30:00+00:00",
    description: "Uma mountain bike versátil",
    id: 2,
    isRented: false,
    ownerId: "59a3659-d2c6-4685-af38-20955da062a3",
    photoUrl: "https://example.com/bike-2.png",
    price: 30,
    ratingsAvg: 4.7,
    rentedSince: null,
    reviewsQuantity: 18,
    rim: 29,
    timesRented: 3,
    title: "Trek Marlin 7 Aro 29",
  },

  {
    brand: "Specialized Rockhopper",
    createdAt: "2024-02-10T08:20:00+00:00",
    description: "Ideal para trilhas difíceis",
    id: 3,
    isRented: true,
    ownerId: "72d3659-e3c6-4685-af38-20955da062a4",
    photoUrl: "https://example.com/bike-3.png",
    price: 35,
    ratingsAvg: 4.8,
    rentedSince: "2024-04-01T10:00:00+00:00",
    reviewsQuantity: 25,
    rim: 27.5,
    timesRented: 5,
    title: "Specialized Rockhopper Aro 27.5",
  },

  {
    brand: "Scott Aspect 950",
    createdAt: "2024-01-25T11:45:00+00:00",
    description: "Perfeita para iniciantes",
    id: 4,
    isRented: false,
    ownerId: "85e3659-f4c6-4685-af38-20955da062a5",
    photoUrl: "https://example.com/bike-4.png",
    price: 28,
    ratingsAvg: 4.3,
    rentedSince: null,
    reviewsQuantity: 10,
    rim: 29,
    timesRented: 1,
    title: "Scott Aspect 950 Aro 29",
  },

  {
    brand: "GT Aggressor Pro",
    createdAt: "2024-05-10T13:00:00+00:00",
    description: "Bike agressiva para terrenos difíceis",
    id: 5,
    isRented: true,
    ownerId: "96f3659-g5c6-4685-af38-20955da062a6",
    photoUrl: "https://example.com/bike-5.png",
    price: 32,
    ratingsAvg: 4.6,
    rentedSince: "2024-07-01T08:00:00+00:00",
    reviewsQuantity: 20,
    rim: 27.5,
    timesRented: 4,
    title: "GT Aggressor Pro Aro 27.5",
  },
  {
    brand: "Cannondale Trail 8",
    createdAt: "2024-06-05T09:15:00+00:00",
    description: "Excelente para trilhas moderadas",
    id: 6,
    isRented: false,
    ownerId: "107g3659-h6c6-4685-af38-20955da062a7",
    photoUrl: "https://example.com/bike-6.png",
    price: 29,
    ratingsAvg: 4.4,
    rentedSince: null,
    reviewsQuantity: 15,
    rim: 29,
    timesRented: 2,
    title: "Cannondale Trail 8 Aro 29",
  },
];
