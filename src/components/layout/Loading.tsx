import { StyleSheet, Text, View, Modal, ActivityIndicator } from "react-native";
import React from "react";
import { colors } from "../../utils/custom-styles";

const Loading = () => {
  return (
    <Modal
      statusBarTranslucent={true}
      transparent={true}
      visible={true}
      animationType="fade"
    >
      <View
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.container}></View>
        <ActivityIndicator
          style={styles.outerSpinner}
          size={100}
          color={colors.primary[1]}
        />
        <ActivityIndicator
          style={styles.innerSpinner}
          size={50}
          color={colors.dark[2]}

        />
      </View>
    </Modal>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightgray,
    opacity: 0.6,
    shadowColor: "#ccc",
  },
  outerSpinner: { position: "absolute", transform: [{rotate: '45deg'}] },
  innerSpinner: { position: "absolute", transform: [{rotate: '-90deg'}] },
});
