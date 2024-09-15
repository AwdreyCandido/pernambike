import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import OutlineButton from "../../components/buttons/OulineButton";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import Loading from "../../components/layout/Loading";
import { profileButtons } from "../../data/profile-buttons";
import { Ionicons } from "@expo/vector-icons";
import { logoutUser } from "../../services/auth";
import { AuthContext } from "../../store/AuthContext";
import { colors, texts } from "../../utils/custom-styles";
import { SafeAreaView } from "react-native-safe-area-context";
import UpdateProfileForm from "../../components/forms/UpdateProfileForm";

const UpdateProfile = ({ navigation, route }: any) => {
  const { user, logout, token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  async function logoutHandler() {
    setIsLoading(true);
    const error = await logoutUser();
    if (!error) {
      setIsLoading(false);
      navigation.navigate("login");
      return logout();
    }

    Alert.alert("Erro ao fazer logout, Tente novamente mais tarde.");
    setIsLoading(false);

    return;
  }

  function navigationHandler(id: number) {
    switch (id) {
      case 1: {
        navigation.navigate("update-profile");
        break;
      }
      case 3: {
        navigation.navigate("bicycles");
        break;
      }
      case 6: {
        navigation.navigate("rent-objective");
        break;
      }
    }
  }

  const profileImageSource = user?.photoUrl
    ? { uri: user.photoUrl }
    : require("./../../../assets/imgs/profile.png");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {isLoading && <Loading />}
        <Text style={[texts.soraTitle.bold, styles.title]}>Minhas Informações</Text>
        <UpdateProfileForm />
        {/* <View style={styles.buttonContainer}>
          <OutlineButton title="Precisa de ajuda?" onPress={() => {}} />
          <PrimaryButton
            title="Sair"
            type="del"
            icon={
              <Ionicons
                name="exit-outline"
                size={30}
                color={colors.lightgray}
              />
            }
            onPress={logoutHandler}
          />
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    marginBottom: 25,
    color: colors.primary[1],
  },
});
