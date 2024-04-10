import { StyleSheet, Text, View, Animated } from "react-native";
import React from "react";
import { slides } from "../../utils/slides";

const Paginator: React.FC<{
  currIndex: number;
  onNextSlide: () => void;
}> = ({ currIndex, onNextSlide }) => {
  return (
    <View style={styles.paginator}>
      <View
        style={[
          currIndex.toString() === "1"
            ? { flexDirection: "column", top: 25, left: 10 }
            : { flexDirection: "row" },
          { gap: 15 },
        ]}
      >
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
      <Text style={{fontFamily: 'dmsans semibold', fontSize: 16,}}>Pular</Text>
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
    paddingHorizontal: 20,
    position: "absolute",
    zIndex: 2,
  },
  dot: {
    width: 18,
    height: 18,
    backgroundColor: "#DDE0FF",
    borderRadius: 50,
  },
});
