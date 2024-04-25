import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
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

const HomeScreen = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  const [bikes, setBikes] = useState();

  useEffect(() => {
    getAllBikesHandler();
  }, []);

  async function getAllBikesHandler() {
    const { data, error } = await getAllBikes();

    if (error) {
      return Alert.alert(
        "Erro ao buscar bikes",
        "Por favor, verifique sua conexão com a internet."
      );
    }

    setBikes(data);
  }

  function bikeDetailsHandler(id: any) {
    navigation.navigate("bike-details", { bikeId: id });
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        ListHeaderComponent={() => {
          return (
            <View>
              <View style={{ marginBottom: 10 }}>
                <Input
                  inputConfig={{
                    placeholder: "Pesquise por modelo, localização...",
                  }}
                />
              </View>
              <Text style={[texts.dmTitle2.bold, { marginTop: 20 }]}>
                Bikes para passeio
              </Text>
            </View>
          );
        }}
        ListFooterComponent={() => {
          return <View style={{ height: 70 }}></View>;
        }}
        data={bikes}
        keyExtractor={(item) => item.id}
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
