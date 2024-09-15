import {
  Alert,
  Button,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TextInputChangeEventData,
  TouchableOpacity,
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
import FilterModal from "../../components/filter-modal/FilterModal";
import { PersonalizationContext } from "../../store/Personalization";

const HomeScreen = ({ navigation }: any) => {
  const { logout, token } = useContext(AuthContext);
  const {
    setAllBikesHandler,
    bikesList,
    filteredBikesList,
    inputFilterHandler,
  } = useContext(BikesContext);
  const { rentObjective } = useContext(PersonalizationContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

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
      {isFilterModalOpen && (
        <FilterModal
          visible={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
        />
      )}
      <View style={{ marginBottom: 20, paddingHorizontal: 20 }}>
        <View
          style={{
            marginTop: 30,
            gap: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <View className="flex-1">
            <Input
              inputConfig={{
                placeholder: "modelo, localização, preço...",
                onChangeText(value) {
                  inputFilterHandler(value);
                },
              }}
            />
          </View>
          <TouchableOpacity onPress={() => setIsFilterModalOpen(true)}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                borderColor: colors.dark[4],
                borderWidth: 1.5,
                borderRadius: 14,
                height: 51,
                width: 51,
              }}
            >
              <Ionicons name="filter" size={35} color={colors.dark[4]} />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={[texts.dmTitle2.bold, { marginTop: 40 }]}>
          Todas as Bikes
        </Text>
      </View>
      <FlatList
        ListFooterComponent={() => {
          return token && !rentObjective ? (
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
