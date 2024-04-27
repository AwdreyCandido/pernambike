import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { colors, texts } from "../../utils/custom-styles";

const BikeOwner: React.FC<{
  price: number;
  reviewsQuantity: number;
  name: string;
  photoUrl: string;
}> = ({ price, reviewsQuantity, name, photoUrl }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={{ uri: photoUrl }} style={styles.image} />
        <View>
          <Text style={[texts.dmText.medium]}>{name}</Text>
          <Text style={styles.subtext}>{reviewsQuantity} avaliações</Text>
        </View>
      </View>
      <View>
        <Text style={styles.price}>
          R$ <Text style={texts.dmText.bold}>{price}</Text>
          <Text style={{ fontSize: 14, color: colors.dark[3] }}>/dia</Text>
        </Text>
      </View>
    </View>
  );
};

export default BikeOwner;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  subtext: { fontSize: 14, color: colors.dark[4], marginTop: 5 },
  image: {
    height: 60,
    width: 60,
    borderRadius: 50,
    backgroundColor: "blue",
  },
  price: {
    fontSize: 16,
    fontFamily: "sora medium",
    paddingHorizontal: 10,
  },
});
