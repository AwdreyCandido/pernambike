import { StyleSheet, Text, View, Animated, Pressable } from "react-native";
import React from "react";
import { slides } from "../../utils/slides";
import { useNavigation } from "@react-navigation/native";

const Paginator: React.FC<{
  currIndex: number;
  preferencesPage?: boolean;
  onNextSlide: () => void;
}> = ({ currIndex, preferencesPage, onNextSlide }) => {
  const navigation = useNavigation();

  function switchOnBoardingHandler() {
    navigation.navigate("login");
  }

  return (
    <View style={styles.paginator}>
      <View style={[{ gap: 15, flexDirection: "row" }]}>
        {slides.map((_, i) => {
          return (
            <Animated.View
              key={i.toString()}
              style={[
                styles.dot,
                i === currIndex && { backgroundColor: "#5464FF" },
              ]}
            ></Animated.View>
          );
        })}
      </View>
      <Pressable onPress={switchOnBoardingHandler}>
        <Text style={{ fontFamily: "dmsans semibold", fontSize: 16 }}>
          Pular
        </Text>
      </Pressable>
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  paginator: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    position: "absolute",
    zIndex: 2,
    top: 35,
  },
  dot: {
    width: 18,
    height: 18,
    backgroundColor: "#DDE0FF",
    borderRadius: 50,
  },
});
