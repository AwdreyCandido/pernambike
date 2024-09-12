import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors, texts } from "../../utils/custom-styles";

const TimeBox: React.FC<{ time: { hours: string; minutes: string } }> = ({
  time,
}) => {
  return (
    <View style={styles.timeBox}>
      <View style={styles.time}>
        <Text style={{ fontFamily: "sora regular", fontSize: 50 }}>
          {time.hours}
        </Text>
      </View>
      <Text style={[texts.dmTitle.regular, { fontSize: 60 }]}>:</Text>
      <View style={styles.time}>
        <Text style={{ fontFamily: "sora regular", fontSize: 50 }}>
          {time.minutes}
        </Text>
      </View>
    </View>
  );
};

export default TimeBox;

const styles = StyleSheet.create({
  timeBox: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
  },
  time: {
    width: 120,
    height: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary[6],
    borderWidth: 1,
    borderColor: colors.primary[4],
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});
