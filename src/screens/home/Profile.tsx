import { StyleSheet, Text, View, Image, Alert } from "react-native";
import React, { useContext } from "react";
import { colors, texts } from "../../utils/custom-styles";
import { FlatList } from "react-native-gesture-handler";
import { profileButtons } from "../../data/profile-buttons";
import { Ionicons } from "@expo/vector-icons";
import { logoutUser } from "../../services/auth";
import { AuthContext } from "../../store/AuthContext";
import OutlineButton from "../../components/buttons/OulineButton";
import PrimaryButton from "../../components/buttons/PrimaryButton";

const Profile = () => {
  const { logout, user, authLoading } = useContext(AuthContext);

  async function logoutHandler() {
    authLoading();
    const error = await logoutUser();
    if (!error) {
      authLoading();
      return logout();
    }

    Alert.alert("Erro ao fazer logout, Tente novamente mais tarde.");
    authLoading();

    return;
  }

  return (
    <View style={styles.container}>
      {/* PROFILE CARD */}
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: user?.photoUrl }} />
          <View style={{ alignItems: "center" }}>
            <Text style={[texts.dmTitle2.bold]}>{user?.name}</Text>
            <Text style={[texts.dmText.regular]}>{user?.email}</Text>
          </View>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.infoContainer}>
          <View
            style={{
              flex: 1,
              borderBottomWidth: 0.3,
              borderBottomColor: colors.dark[3],
            }}
          >
            <Text style={[texts.soraTitle2.bold]}>{user?.rents}</Text>
            <Text>Alugueis</Text>
          </View>
          <View
            style={{
              flex: 1,
              borderBottomWidth: 0.3,
              borderBottomColor: colors.dark[3],
            }}
          >
            <Text style={[texts.soraTitle2.bold]}>{user?.reviewsQuantity}</Text>
            <Text>Avaliações</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[texts.soraText.bold]}>Entrou em</Text>
            <Text>
              {user?.createdAt &&
                new Date(user?.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </View>
      {/* PROFILE BUTTONS */}

      <View style={{ marginTop: 30 }}>
        <FlatList
          data={profileButtons}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ gap: 10 }}
          columnWrapperStyle={{ gap: 10 }}
          numColumns={3}
          renderItem={({ item }) => {
            return (
              <View style={styles.button}>
                <Ionicons
                  name={item.iconName}
                  size={30}
                  color={colors.lightgray}
                />
                <Text style={styles.buttonText}>{item.title}</Text>
              </View>
            );
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <OutlineButton title="Precisa de ajuda?" onPress={() => {}} />
        <PrimaryButton
          title="Sair"
          type="del"
          icon={
            <Ionicons name="exit-outline" size={30} color={colors.lightgray} />
          }
          onPress={logoutHandler}
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: colors.lightgray,
    width: "100%",
    height: 250,
    borderRadius: 30,
    overflow: "hidden",
  },
  image: {
    width: 130,
    height: 130,
    // backgroundColor: "green",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 100,
  },
  imageContainer: {
    flex: 2,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  infoContainer: {
    // flex: 1,
    height: 250,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  divider: {
    height: "80%",
    backgroundColor: colors.dark[3],
    width: 0.3,
    alignSelf: "center",
  },
  button: {
    flex: 1,
    height: 120,
    paddingHorizontal: 5,
    backgroundColor: colors.primary[1],
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
    fontFamily: "sora medium",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    gap: 20,
    paddingBottom: 100,
  },
});
