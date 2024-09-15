import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { colors, texts } from "../../utils/custom-styles";
import PrimaryButton from "../buttons/PrimaryButton";
import { PersonalizationContext } from "../../store/Personalization";
import { BikesContext } from "../../store/BikesContext";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FilterModal = ({ visible, onClose }: any) => {
  const {
    rentObjective,
    rentPrice,
    rentTime,
    updateRentObjectiveHandler,
    updateRentPriceHandler,
    updateRentTimeHandler,
  } = useContext(PersonalizationContext);
  const { bikesList, setFiltersListHandler, filtersList } =
    useContext(BikesContext);

  useEffect(() => {
    async function getPreferences() {
      const objective = await AsyncStorage.getItem("rent-objetive");
      const price = await AsyncStorage.getItem("rent-price");
      const time = await AsyncStorage.getItem("rent-time");

      objective && updateRentObjectiveHandler(objective);
      price && updateRentPriceHandler(JSON.parse(price));
      time && updateRentTimeHandler(time);
    }
    getPreferences();
  }, []);

  const hasPreferences = rentObjective.length > 0 && rentTime.length > 0;

  const brands = bikesList.map((bike) => bike.brand);
  const allCategories = bikesList.map((bike) => bike.category);
  const categoriesSet = new Set(allCategories);
  const categories = [...categoriesSet];
  const prices = bikesList.map((bike) => bike.price);

  const [selectedTags, setSelectedTags] = useState<string[]>(filtersList);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((item) => item !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const isTagSelected = (tag: string) => selectedTags.includes(tag);

  const selectFiltersHandler = () => {
    setFiltersListHandler(selectedTags);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.modalContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={[texts.dmTitle2.regular]}>Filtros</Text>
              <Ionicons
                onPress={() => {
                  onClose();
                  setSelectedTags([]);
                  setFiltersListHandler([]);
                }}
                name="close"
                size={35}
                color={colors.dark[4]}
              />
            </View>
            <View style={{ marginTop: 20 }}></View>
            <View>
              {hasPreferences && (
                <>
                  <Text style={[texts.soraText.regular]}>Preferências:</Text>
                  <View style={styles.tagContainer}>
                    <TouchableOpacity style={[styles.tag, styles.selectedTag]}>
                      <Text style={[texts.soraText.regular, { fontSize: 16 }]}>
                        {rentObjective}
                      </Text>
                    </TouchableOpacity>
                    {rentPrice.length > 0 && (
                      <TouchableOpacity
                        style={[styles.tag, styles.selectedTag]}
                      >
                        <Text
                          style={[texts.soraText.regular, { fontSize: 16 }]}
                        >
                          Preço entre R${rentPrice[0]}{" "}
                          {rentPrice[1] && `e R$${rentPrice[1]}`}
                        </Text>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity style={[styles.tag, styles.selectedTag]}>
                      <Text style={[texts.soraText.regular, { fontSize: 16 }]}>
                        {rentTime}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
              <Text style={[texts.soraText.regular]}>Disponibilidade:</Text>
              <View style={styles.tagContainer}>
                <TouchableOpacity
                  style={[
                    styles.tag,
                    isTagSelected("Mostrar Todas") && styles.selectedTag,
                  ]}
                  onPress={() => toggleTag("Mostrar Todas")}
                >
                  <Text style={[texts.soraText.regular, { fontSize: 16 }]}>
                    Mostrar Todas
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.tag,
                    isTagSelected("Apenas disponíveis") && styles.selectedTag,
                  ]}
                  onPress={() => toggleTag("Apenas disponíveis")}
                >
                  <Text style={[texts.soraText.regular, { fontSize: 16 }]}>
                    Apenas disponíveis
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={[texts.soraText.regular]}>Marcas:</Text>
              <View style={styles.tagContainer}>
                {brands.map((item) => {
                  return (
                    <TouchableOpacity
                      key={item}
                      style={[
                        styles.tag,
                        isTagSelected(item) && styles.selectedTag,
                      ]}
                      onPress={() => toggleTag(item)}
                    >
                      <Text style={[texts.soraText.regular, { fontSize: 16 }]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <Text style={[texts.soraText.regular]}>Categorias:</Text>
              <View style={styles.tagContainer}>
                {categories.map((item) => {
                  return (
                    <TouchableOpacity
                      key={item}
                      style={[
                        styles.tag,
                        isTagSelected(item) && styles.selectedTag,
                      ]}
                      onPress={() => toggleTag(item)}
                    >
                      <Text style={[texts.soraText.regular, { fontSize: 16 }]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <Text style={[texts.soraText.regular]}>Preços:</Text>
              <View style={styles.tagContainer}>
                {prices.map((item) => {
                  return (
                    <TouchableOpacity
                      key={item}
                      style={[
                        styles.tag,
                        isTagSelected(`R$${item}`) && styles.selectedTag,
                      ]}
                      onPress={() => toggleTag(`R$${item}`)}
                    >
                      <Text style={[texts.soraText.regular, { fontSize: 16 }]}>
                        R${item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            <View style={{ marginTop: 40 }}></View>
            <PrimaryButton
              onPress={() => {
                console.log(selectedTags);
                selectFiltersHandler();
                onClose();
              }}
              title="Mostrar Resultados"
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    height: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.primary[3],
    elevation: 5,
  },
  tag: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: colors.primary[3],
    paddingVertical: 2.5,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignSelf: "flex-start",
  },
  selectedTag: {
    backgroundColor: colors.primary[5],
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

const filters = [
  "Mostrar Todas",
  "Cannondale Quick CX 3",
  "Specialized Rockhopper",
  "electronics",
  "home",
  "R$28",
];

const bikeslist = [
  {
    brand: "Cannondale Quick CX 3",
    category: "electronics",
    createdAt: "2024-04-24T08:45:00+00:00",
    description: "Bike confortável para passeios",
    id: 4,
    isRented: false,
    ownerId: "c1391b31-0ebd-448f-8269-d64a16bfb764",
    photoUrl:
      "https://nltkjxejzpfkopvniyzh.supabase.co/storage/v1/object/sign/bikes/bike-6.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiaWtlcy9iaWtlLTYucG5nIiwiaWF0IjoxNzIyNzMxMzY2LCJleHAiOjE3NTQyNjczNjZ9.ony1eRExTwrfdXrCmnoUwX5UgYlB3jlyasarfclhbmo&t=2024-08-04T00%3A29%3A26.985Z",
    price: 32,
    ratingsAvg: 4.9,
    rentedSince: null,
    reviewsQuantity: 20,
    rim: 28,
    tags: "passeio,férias",
    timesRented: 4,
    title: "Trek FX 3 Disc",
    users: {
      createdAt: "2024-08-03T23:40:07.062076",
      email: "pcbarbosa@gmail.com",
      id: "c1391b31-0ebd-448f-8269-d64a16bfb764",
      location: "Rua da Aurora, Piedade, Jaboatão dos Guararapes - PE",
      name: "Pedro Costa Barbosa",
      phone: "81984550748",
      photoUrl: "https://randomuser.me/api/portraits/men/3.jpg",
      rents: 0,
      reviewsQuantity: 0,
    },
  },
  {
    brand: "Specialized Rockhopper",
    category: "fitness",
    createdAt: "2024-04-21T15:30:00+00:00",
    description: "Bike robusta e confortável",
    id: 1,
    isRented: false,
    ownerId: "108b3659-d3c6-4685-af38-20955da062a2",
    photoUrl:
      "https://nltkjxejzpfkopvniyzh.supabase.co/storage/v1/object/sign/bikes/bike-2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiaWtlcy9iaWtlLTIucG5nIiwiaWF0IjoxNzEzNDY2MzkyLCJleHAiOjE3NDUwMDIzOTJ9.Q_HhU1n1hcakE0kQQ87XnOfgjETXJSlqIaJ5Ngoxo3g&t=2024-04-18T18%3A53%3A12.928Zhttps://nltkjxejzpfkopvniyzh.supabase.co/storage/v1/object/sign/bikes/bike-5.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiaWtlcy9iaWtlLTUucG5nIiwiaWF0IjoxNzIyNzMwMDAxLCJleHAiOjE3NTQyNjYwMDF9.13bSZDM6ACmAROgHeSx1Gry5BUy_OtvRU5vVKWO99Mk&t=2024-08-04T00%3A06%3A41.684Z",
    price: 30,
    ratingsAvg: 4.7,
    rentedSince: null,
    reviewsQuantity: 10,
    rim: 29,
    tags: "passeio,trilha",
    timesRented: 3,
    title: "Trek Marlin 5 Aro 29",
    users: {
      createdAt: "2024-04-24T23:26:28.316",
      email: "johnnyfuracao@email.com",
      id: "108b3659-d3c6-4685-af38-20955da062a2",
      location: "Rua dos Navegantes, Maria Farinha, Paulista - PE",
      name: "Johnny Furacão",
      phone: "81955557777",
      photoUrl: "https://randomuser.me/api/portraits/men/54.jpg",
      rents: 0,
      reviewsQuantity: 0,
    },
  },
  {
    brand: "Merida Big Nine",
    category: "fitness",
    createdAt: "2024-04-23T09:00:00+00:00",
    description: "Bike leve e ágil",
    id: 3,
    isRented: false,
    ownerId: "c1391b31-0ebd-448f-8269-d64a16bfb764",
    photoUrl:
      "https://nltkjxejzpfkopvniyzh.supabase.co/storage/v1/object/sign/bikes/bike-3.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiaWtlcy9iaWtlLTMucG5nIiwiaWF0IjoxNzIyNzMxMjkxLCJleHAiOjE3NTQyNjcyOTF9.pNAeEgf_VBCIo8OaUrFbMGr2YfsawvN5_AYLUw-E7Vs&t=2024-08-04T00%3A28%3A11.172Z",
    price: 35,
    ratingsAvg: 4.6,
    rentedSince: null,
    reviewsQuantity: 8,
    rim: 29,
    tags: "passeio,trilha",
    timesRented: 1,
    title: "Cannondale Scalpel-Si Carbon 3",
    users: {
      createdAt: "2024-08-03T23:40:07.062076",
      email: "pcbarbosa@gmail.com",
      id: "c1391b31-0ebd-448f-8269-d64a16bfb764",
      location: "Rua da Aurora, Piedade, Jaboatão dos Guararapes - PE",
      name: "Pedro Costa Barbosa",
      phone: "81984550748",
      photoUrl: "https://randomuser.me/api/portraits/men/3.jpg",
      rents: 0,
      reviewsQuantity: 0,
    },
  },
];
