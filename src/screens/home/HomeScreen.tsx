import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import React, { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../lib/supabase";
import BikeView from "../../components/bike-view/BikeView";
import { FlatList } from "react-native-gesture-handler";
import { bikes } from "../../data/bikes";
import { colors, texts } from "../../utils/custom-styles";
import Input from "../../components/inputs/Input";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation();

  async function logoutHandler() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return Alert.alert("Erro ao fazer logout, Tente novamente mais tarde.");
    }
    logout();
  }

  return (
    <View style={{ backgroundColor: "white" }}>
      <FlatList
        ListHeaderComponent={() => {
          return (
            <View>
              <View style={{marginBottom: 10}}>
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
              ratingsQtd={item.ratingsQtd}
              ratingsAvg={item.ratingsAvg}
              imageUrl={item.imageUrl}
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
