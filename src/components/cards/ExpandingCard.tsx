import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  LayoutAnimation,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { colors, texts } from "../../utils/custom-styles";
import { Ionicons } from "@expo/vector-icons";

const ExpandingCard: React.FC<{ children: JSX.Element; title: string }> = ({
  children,
  title,
}) => {
  const [toggleCard, setToggleCard] = useState(false);
  let opacity = useRef(new Animated.Value(0)).current;

  function toggleCardHandler() {
    setToggleCard(!toggleCard);

    LayoutAnimation.configureNext({
      duration: 400,
      update: { type: "spring", springDamping: 0.9 },
    });
  }

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      delay: 100,
      useNativeDriver: true,
    }).start();
  }, [toggleCard, toggleCardHandler]);

  return (
    <View>
      <Pressable onPress={toggleCardHandler}>
        <View
          style={[
            styles.container,
            toggleCard ? { height: "auto" } : { height: "auto" },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={[texts.dmTitle2.regular]}>{title}</Text>
            <Ionicons name="chevron-down" size={28} color={colors.text} />
          </View>
          {toggleCard && (
            <Animated.View style={[{ opacity }, styles.info]}>
              {children}
            </Animated.View>
          )}
        </View>
      </Pressable>
    </View>
  );
};

export default ExpandingCard;

const styles = StyleSheet.create({
  container: {
    height: 300,
    // paddingHorizontal: 15,
    // paddingVertical: 10,
    // borderRadius: 8,
    // backgroundColor: colors.lightgray,
    // borderWidth: 1,
    // borderColor: colors.primary[4],
  },
  info: {
    gap: 10,
    borderRadius: 8,
    backgroundColor: colors.lightgray,
    borderWidth: 1,
    borderColor: colors.primary[4],
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 15
  }
});
