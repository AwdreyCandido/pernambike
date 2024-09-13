import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  useWindowDimensions,
} from "react-native";
import { slides } from "../../utils/slides";
import { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Paginator from "../../components/paginator/Paginator";
import RentObjective from "./RentObjective";
import { AuthContext } from "../../store/AuthContext";
import RentPrice from "./RentPrice";
import RentTime from "./RentTime";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import OutlineButton from "../../components/buttons/OulineButton";

const Personalization = ({ navigation }) => {
  const [currIndex, setCurrIndex] = useState(0);
  const { user } = useContext(AuthContext);

  function nextPage() {
    if (currIndex < 2) {
      setCurrIndex(currIndex + 1);
    } else {
      navigation.navigate("initial-page");
    }
  }

  function goBack() {
    if (currIndex > 0) {
      setCurrIndex(currIndex - 1);
    } else {
      navigation.navigate("initial-page");
    }
  }

  return (
    // <View style={styles.container}>

    //   {currIndex === 0 && (
    //     <RentObjective nextPage={nextPage} goBack={goBack} name={"Awdrey"} />
    //   )}
    //   {currIndex === 1 && (
    //     <RentPrice nextPage={nextPage} goBack={goBack} name={"Awdrey"} />
    //   )}
    //   {currIndex === 2 && (
    //     <RentTime nextPage={nextPage} goBack={goBack} name={"Awdrey"} />
    //   )}
    </View>
  );
};

export default Personalization;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "white",
    paddingHorizontal: 15,
  },

  buttonContainer: {
    flex: 1,
    minWidth: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 20,
    gap: 20,
  },
});
