import { StyleSheet, Text, View, Image, Alert, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { colors, texts } from "../../utils/custom-styles";
import { FlatList } from "react-native-gesture-handler";
import { profileButtons } from "../../data/profile-buttons";
import { Ionicons } from "@expo/vector-icons";
import { logoutUser } from "../../services/auth";
import { AuthContext } from "../../store/AuthContext";
import OutlineButton from "../../components/buttons/OulineButton";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import Loading from "../../components/layout/Loading";

const Profile = ({ navigation, route }: any) => {
  const { user, logout, token, fetchUpdatedUser } = useContext(AuthContext);
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
    <View style={styles.container}>
      {isLoading && <Loading />}
      {/* PROFILE CARD */}
      <View style={[styles.card, token ? { height: 250 } : { height: 200 }]}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={profileImageSource} />
          {token ? (
            <View style={{ alignItems: "center" }}>
              <Text style={[texts.soraText.bold]}>{user?.name}</Text>
              <Text style={[texts.dmText.regular]}>{user?.email}</Text>
            </View>
          ) : (
            <></>
          )}
        </View>
        {token ? (
          <>
            <View style={styles.divider}></View>
            <View style={styles.infoContainer}>
              <View
                style={{
                  flex: 1,
                  borderBottomWidth: 0.3,
                  borderBottomColor: colors.dark[3],
                }}
              >
                <Text style={[texts.soraTitle2.bold]}>{user?.rents || 0}</Text>
                <Text>Alugueis</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  borderBottomWidth: 0.3,
                  borderBottomColor: colors.dark[3],
                }}
              >
                <Text style={[texts.soraTitle2.bold]}>
                  {user?.reviewsQuantity || 0}
                </Text>
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
          </>
        ) : (
          <></>
        )}
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
              <>
                {token ? (
                  <Pressable
                    style={({ pressed }) => [
                      styles.button,
                      pressed && { opacity: 0.65 },
                    ]}
                    onPress={() => {
                      navigationHandler(item.id);
                    }}
                  >
                    <Ionicons
                      name={item.iconName}
                      size={30}
                      color={colors.lightgray}
                    />
                    <Text style={styles.buttonText}>{item.title}</Text>
                  </Pressable>
                ) : (
                  <View style={[styles.button, styles.disabled]}>
                    <Ionicons
                      name={item.iconName}
                      size={30}
                      color={colors.lightgray}
                    />
                    <Text style={styles.buttonText}>{item.title}</Text>
                  </View>
                )}
              </>
            );
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        {token ? (
          <>
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
          </>
        ) : (
          <>
            <Text style={[{ textAlign: "center", color: colors.dark[1] }]}>
              VOCÊ NÃO ESTÁ LOGADO
            </Text>
            <PrimaryButton
              title="Fazer Login"
              onPress={() => navigation.navigate("login")}
            />
          </>
        )}
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
    borderRadius: 30,
    overflow: "hidden",
  },
  image: {
    width: 130,
    height: 130,
    borderWidth: 2,
    borderColor: colors.primary[3],
    borderRadius: 100,
  },
  imageContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  infoContainer: {
    // flex: 1,
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
  disabled: {
    backgroundColor: colors.dark[5],
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
