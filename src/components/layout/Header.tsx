import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext } from "react";
import { colors, texts } from "../../utils/custom-styles";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../store/AuthContext";
import { useNavigation } from "@react-navigation/native";

const CustomHeader = () => {
  const { user } = useContext(AuthContext);

  const navigation = useNavigation();
  function goToProfilePage() {
    navigation.navigate("profile");
  }
  
  const profileImageSource = user?.photoUrl ? { uri: user.photoUrl } : require("./../../../assets/imgs/profile.png");

  return (
    <View style={styles.container}>
      <Image source={require("./../../../assets/imgs/sub-title-logo-2.png")} />
      <TouchableWithoutFeedback onPress={goToProfilePage}>
        <Image source={profileImageSource} style={styles.image} />
      </TouchableWithoutFeedback>
      {/* <Ionicons name="person-circle-outline" size={45} color={colors.dark[5]} /> */}
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white",
    borderBottomWidth: 0.2,
    borderBottomColor: colors.dark[5],
  },
  image: {
    width: 45,
    height: 45,
    // backgroundColor: "green",
    borderWidth: 1.5,
    borderColor: colors.primary[3],
    borderRadius: 100,
  },
});
