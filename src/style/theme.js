import { PrimaryColor, SecondaryColor } from "./../style/colors";
import { Platform, StyleSheet } from "react-native";
import { extendTheme, useTheme } from "native-base";

export const dustrinTheme = extendTheme({
  components: {
    Button: {
      variants: {
        baseStyle: {
          rounded: "md",
        },
        dustrin_basic: {
          backgroundColor: PrimaryColor,
          borderWidth: "1px",
          borderRadius: "5px",
        },
        defaultProps: {
          colorScheme: "red",
        },
      },
    },

    Box: {
      variants: {
        whitebox: {
          marginBottom: "30px",
          px: "5%",
          py: "6",
          _light: {
            bg: "#FDFDFD",
          },
          _dark: {
            bg: "coolGray.800",
          },
          borderColor: "coolGray.300",
          borderWidth: "0.5px",
          borderTopRightRadius: "lg",
          borderTopLeftRadius: "lg",
          borderBottomRightRadius: "lg",
          borderBottomLeftRadius: "lg",
        },
        creditcard: {
          marginRight: "3%",
          bg: "#fff",
          borderColor: "coolGray.200",
          borderWidth: "1px",
          height: "150px",
          width: "250px",
          borderRadius: "md",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "15px",
        },
      },
    },
    HStack: {
      variants: {
        header: {
          marginBottom: "15px",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "5%",

          _light: {
            bg: "#FDFDFD",
          },
          _dark: {
            bg: "coolGray.800",
          },
          space: "3",
        },
      },
    },
    colors: {
      // Add new color
      primary: {
        1: "#FDFDFD",
        2: "#012340",
        50: "#E3F2F9",
        100: "#C5E4F3",
        200: "#A2D4EC",
        300: "#7AC1E4",
        400: "#47A9DA",
        500: "#0088CC",
        600: "#007AB8",
        700: "#006BA1",
        800: "#005885",
        900: "#003F5E",
      },
      backgroundColor: "black",
      // Redefinig only one shade, rest of the color will remain same.
      amber: {
        400: "#d97706",
      },
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: "light",
    },
  },
});

export const defaultFormTheme = {
  border: {
    borderColor: PrimaryColor,
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: "solid",
  },
  background: {
    backgroundColor: "white",
  },
  text: {
    fontSize: 16,
    fontFamily: "Arial",
    fontWeight: "400",
  },
  placeholder: {
    color: PrimaryColor,
  },
  opacity: {
    opacity: 1,
  },
  selected: {
    color: "blue",
  },
  unselected: {
    color: "#FAFAFA",
  },
};

export const theme = {
  input: {
    regular: StyleSheet.create({
      ...defaultFormTheme,
    }),
    focused: StyleSheet.create({
      ...defaultFormTheme,
      border: {
        ...defaultFormTheme.border,
        borderColor: SecondaryColor,
      },
    }),
    error: {
      ...defaultFormTheme,
      border: {
        ...defaultFormTheme.border,
        borderColor: "red",
      },
      text: {
        ...defaultFormTheme.text,
        color: "red",
      },
    },
    // disabled: {...},
    // readonly: {...},
    //
  },
};
