import { Platform } from "react-native";
import { PrimaryColor, SecondaryColor } from "./../style/colors";
import Screen from "react-native-web-ui-components/Screen";

export const fullScreen = {
  width: "100%",
  height: "100%",
};

export const centerContent = {
  justifyContent: "center",
  textAlign: "center",
  width: "100%",
};

export const defaultButtonStyle = {
  width: Platform.OS === "web" ? 150 : "100%",
  backgroundColor: PrimaryColor,
  justifyContent: "center",
  padding: 10,
  borderRadius: 8,
};
export const defaultButtonTextStyle = {
  color: "white",
  fontSize: 20,
  fontWeight: "bold",
  textAlign: "center",
};

export const defaultSecondaryButtonStyle = {
  width: Platform.OS === "web" ? 150 : "70%",
  backgroundColor: SecondaryColor,
  justifyContent: "center",
  padding: 8,
  borderRadius: 5,
};
export const defaultSecondaryButtonTextStyle = {
  color: "white",
  fontSize: 16,
  fontWeight: "bold",
  textAlign: "center",
};

export const defaultTitleTextStyle = {
  color: PrimaryColor,
  fontSize: 20,
  fontWeight: "bold",
  textAlign: "center",
};

export const defaultErrorTitleTextStyle = {
  color: "red",
  fontSize: 20,
  fontWeight: "bold",
  textAlign: "center",
};

export const defaultBoxShadow = {
  shadowColor: "#000",
  backgroundColor: "white",
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.32,
  shadowRadius: 5.46,

  elevation: 9,
  borderRadius: 10,
};

export const baseScreenSize = Platform.select({
  web: () => ({
    maxWidth: Screen.getType() !== "xs" ? "50%" : "80%",
    justifyContent: "center",
    textAlign: "center",
  }),
  native: () => ({
    maxWidth: "100%",
  }),
})();
