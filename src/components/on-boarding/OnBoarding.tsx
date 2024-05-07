import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  useWindowDimensions,
} from "react-native";
import { slides } from "../../utils/slides";
import Slide from "./Slide";
import { useRef, useState } from "react";
import Paginator from "../paginator/Paginator";
import { SafeAreaView } from "react-native-safe-area-context";

const OnBoarding = ({ navigation }) => {
  const slidesRef = useRef<FlatList>(null);
  const [currIndex, setCurrIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  function viewableItemsChanged({ viewableItems }) {
    setCurrIndex(viewableItems[0].index);
  }

  function scrollTo() {
    if (currIndex < slides.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currIndex + 1 });
    } else {
      // Navigate to Login Screen
      navigation.navigate("login");
    }
  }

  return (
    <View style={styles.container}>
        <Paginator currIndex={currIndex} onNextSlide={scrollTo} />
        <View style={{ flex: 1 }}>
          <FlatList
            data={slides}
            renderItem={({ item }) => (
              <Slide item={item} currIndex={currIndex} onNextSlide={scrollTo} />
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            scrollEventThrottle={52}
            bounces={false}
            onViewableItemsChanged={viewableItemsChanged}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
            ref={slidesRef}
          />
        </View>
      </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // bottom: 0,
    position: "relative",
    backgroundColor: "white",
  },
});
