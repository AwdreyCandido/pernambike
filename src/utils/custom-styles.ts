import { RFValue } from "react-native-responsive-fontsize";

export const colors = {
  primary: {
    "1": "#5464FF",
    "2": "#7683FF",
    "3": "#8793FF",
    "4": "#BBC1FF",
    "5": "#DDE0FF",
    "6": "#EEF0FF",
  },
  dark: {
    "1": "#30323D",
    "2": "#595B64",
    "3": "#6E7077",
    "4": "#98999E",
    "5": "#C1C2C5",
    "6": "#e0e1e2",
  },
  success: "#5FD53B",
  alert: "#FFE048",
  error: { 1: "#FF2E00", 2: "#ffc0b3" },
  text: "#3D3D3D",
  pink: "#ec4899",
  lightgray: "#EFF3F7",
};

export const texts = {
  dmTitle: {
    regular: { fontSize: RFValue(32), fontFamily: "dmsans regular" },
    medium: { fontSize: RFValue(32), fontFamily: "dmsans medium" },
    bold: { fontSize: RFValue(32), fontFamily: "dmsans bold" },
  },
  dmTitle2: {
    regular: { fontSize: RFValue(24), fontFamily: "dmsans regular" },
    medium: { fontSize: RFValue(24), fontFamily: "dmsans medium" },
    bold: { fontSize: RFValue(24), fontFamily: "dmsans bold" },
  },
  dmText: {
    regular: { fontSize: RFValue(16), fontFamily: "dmsans regular" },
    medium: { fontSize: RFValue(16), fontFamily: "dmsans medium" },
    bold: { fontSize: RFValue(16), fontFamily: "dmsans bold" },
  },
  soraTitle: {
    regular: { fontSize: RFValue(32), fontFamily: "sora regular" },
    medium: { fontSize: RFValue(32), fontFamily: "sora medium" },
    bold: { fontSize: RFValue(32), fontFamily: "sora bold" },
  },
  soraTitle2: {
    regular: { fontSize: RFValue(20), fontFamily: "sora regular" },
    medium: { fontSize: RFValue(20), fontFamily: "sora medium" },
    bold: { fontSize: RFValue(20), fontFamily: "sora bold" },
  },
  soraText: {
    regular: { fontSize: RFValue(16), fontFamily: "sora regular" },
    medium: { fontSize: RFValue(16), fontFamily: "sora medium" },
    bold: { fontSize: RFValue(16), fontFamily: "sora bold" },
  },
};