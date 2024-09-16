import { StyleSheet, Text, View, Image, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, texts } from "../../utils/custom-styles";
import React, { useContext, useEffect, useState } from "react";
import {
  addBikeToFavorites,
  removeBikeFromFavorites,
  toggleBikeFavorite,
} from "../../services/bikes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../../lib/supabase";
import { AuthContext } from "../../store/AuthContext";

const BikeView = ({
  title,
  price,
  ratingsAvg,
  ratingsQtd,
  imageUrl,
  onPress,
  id,
}: any) => {
  const { token } = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState(false);

  const checkIfFavorite = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");

      if (!userId) {
        console.error("User ID not found");
        return;
      }

      const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .eq("userId", userId)
        .eq("bikeId", id);

      if (error) {
        console.error("Error fetching favorite status:", error);
      } else {
        setIsFavorite(data.length > 0);
      }
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  };

  const favoriteBike = async () => {
    const userId = await AsyncStorage.getItem("userId");
    const result = await toggleBikeFavorite(userId!, id);

    if (result.success) {
      if (result.action === "added") {
        setIsFavorite(true);
        Alert.alert("Bike adicionada aos favoritos");
      } else {
        setIsFavorite(false);
        Alert.alert("Bike removida dos favoritos");
      }
    }
  };

  async function checkFavoritesHandler() {
    const userId = await AsyncStorage.getItem("userId");
    if (token && userId) {
      checkIfFavorite();
    }
  }

  useEffect(() => {
    checkFavoritesHandler();
  }, []);

  return (
    <View style={{ borderRadius: 15, overflow: "hidden" }}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        onPress={onPress}
        style={styles.container}
      >
        <View style={styles.iconContainer}>
          <Ionicons
            onPress={token ? favoriteBike : () => {}}
            name="heart"
            size={30}
            color={isFavorite ? colors.pink : colors.lightgray} // Muda a cor do ícone
          />
        </View>
        <View>
          <Image
            style={styles.image}
            source={{
              uri: imageUrl,
            }}
          />
        </View>
        <View style={styles.summary}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>
            R${" "}
            <Text style={{ fontFamily: "sora bold" }}>{price?.toFixed(2)}</Text>
            <Text style={{ fontSize: 12, color: colors.dark[3] }}>/dia</Text>
          </Text>
          <View style={styles.rating}>
            <Ionicons name="star" size={20} color={colors.alert} />
            <Text>{ratingsAvg}</Text>
            <Text style={{ fontSize: 12, color: colors.dark[3] }}>
              ({ratingsQtd} avaliações)
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default BikeView;

const styles = StyleSheet.create({
  container: {
    width: 190,
    borderWidth: 1,
    borderColor: colors.success,
    borderRadius: 15,
    overflow: "hidden",
    paddingBottom: 8,
    backgroundColor: colors.lightgray,
    elevation: 2,
  },
  summary: {
    flex: 1,
    marginVertical: 8,
    gap: 8,
  },
  image: {
    width: "100%",
    height: 130,
    backgroundColor: colors.dark[3],
    borderRadius: 10,
  },
  title: {
    height: 40,
    fontSize: 16,
    fontFamily: "sora medium",
    paddingHorizontal: 10,
  },
  price: {
    fontSize: 16,
    fontFamily: "sora medium",
    paddingHorizontal: 10,
  },
  rating: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 5,
    paddingHorizontal: 10,
  },
  iconContainer: {
    position: "absolute",
    top: 8,
    right: 6,
    zIndex: 1,
  },
  favoriteIcon: {},
  isFavorite: {},
});
