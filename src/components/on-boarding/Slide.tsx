import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";

import React from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import { slides } from "../../utils/slides";
import { colors, texts } from "../../utils/custom-styles";
import { RFValue } from "react-native-responsive-fontsize";

const Slide: React.FC<{
  item: any;
  currIndex: number;
  onNextSlide: () => void;
}> = ({ item, currIndex, onNextSlide }) => {
  const { width, height } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <View style={[item.id === "2" ? styles.blobReverse : styles.blob]}></View>

      <View style={{ flex: 0.7, width: "100%" }}>
        <View style={styles.titleContainer}>
          <Text style={[texts.dmTitle.bold, { textAlign: "center" }]}>
            {item.title}
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={item.image}
            style={[
              item.id === "1" ? styles.logo : styles.image,
              { width, resizeMode: "contain" },
            ]}
          />
        </View>
      </View>
      <View
        style={{
          justifyContent: "space-between",
          flex: 0.3,
          width: "100%",
          paddingHorizontal: RFValue(20),
          paddingVertical: RFValue(25),
        }}
      >
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton title={item.button} onPress={onNextSlide} />
        </View>
      </View>
    </View>
  );
};

export default Slide;

const styles = StyleSheet.create({
  titleContainer: {
    width: "100%",
    justifyContent: "flex-end",
    marginTop: 80,
  },
  imageContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
  },
  descriptionContainer: {
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    flex: 0.65,
    alignSelf: "center",
    zIndex: 1,
  },
  image: {
    flex: 1,
    transform: [{ scale: 1.1 }],
    alignSelf: "center",
    zIndex: 1,
  },

  description: {
    fontSize: RFValue(20),
    fontFamily: "dmsans regular",
    zIndex: 1,
    // paddingHorizontal: 22,
    textAlignVertical: "center",
    // textAlign: 'center'
  },
  blob: {
    height: 520,
    width: 300,
    borderTopRightRadius: 200,
    borderTopLeftRadius: 200,
    backgroundColor: colors.primary[5],
    position: "absolute",
    bottom: 0,
  },
  blobReverse: {
    height: 520,
    width: 300,
    borderBottomRightRadius: 200,
    borderBottomLeftRadius: 200,
    backgroundColor: "#EEF0FF",
    position: "absolute",
    top: 0,
  },
});
