import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, texts } from "../../utils/custom-styles";

const BikeView = ({
  title,
  price,
  ratingsAvg,
  ratingsQtd,
  imageUrl,
  onPress,
}: any) => {
  return (
    <View style={{ borderRadius: 15, overflow: "hidden" }}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        onPress={onPress}
        style={styles.container}
      >
        <View style={styles.iconContainer}>
          <Ionicons name="heart" size={30} color={colors.lightgray} />
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
            <Text style={{}}>{ratingsAvg}</Text>
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
