import React, { useEffect, useState } from "react";

import {
  Button,
  HStack,
  VStack,
  Text,
  Link,
  Checkbox,
  Divider,
  Image,
  useColorModeValue,
  IconButton,
  Icon,
  Pressable,
  Center,
  Hidden,
  StatusBar,
  Stack,
  Box,
} from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { Linking } from "react-native";

import FloatingLabelInput from "../components/FloatingLabelInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import API from "../../backend/api";

export function SignInForm({ props }) {
  // add next router here
  const [text, setText] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [isLoggedin, setisLoggedin] = useState(false);

  const authParams = {
    email: text,
    password: pass,
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        API.login(authParams)
          .then(() => {
            props.navigation.navigate("Dustrin");
          })
          .catch((err) => {
            console.error("Error", err);
            alert("Hibás felhasználónév vagy jelszó!");
          });
      }
    };
    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [authParams]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      style={{
        flex: 2,
      }}
    >
      <VStack
        flex="1"
        px="6"
        py="9"
        _light={{
          bg: "#FDFDFD",
        }}
        _dark={{
          bg: "coolGray.800",
        }}
        space="3"
        justifyContent="space-between"
        borderTopRightRadius={{
          base: "2xl",
          md: "sm",
        }}
        borderBottomRightRadius={{
          base: "0",
          md: "sm",
        }}
        borderTopLeftRadius={{
          base: "2xl",
          md: "0",
        }}
      >
        <VStack space="7">
          <Hidden till="md">
            <Text fontSize="lg" fontWeight="normal">
              Jelentkezz be a folytatáshoz!
            </Text>
          </Hidden>
          <VStack>
            <VStack space="3">
              <VStack
                space={{
                  base: "7",
                  md: "4",
                }}
              >
                <FloatingLabelInput
                  isRequired
                  label="Email"
                  labelColor="#9ca3af"
                  labelBGColor={useColorModeValue("#fff", "#1f2937")}
                  borderRadius="4"
                  defaultValue={text}
                  onChangeText={(txt) => setText(txt)}
                  _text={{
                    fontSize: "sm",
                    fontWeight: "medium",
                  }}
                  _dark={{
                    borderColor: "coolGray.700",
                  }}
                  _light={{
                    borderColor: "coolGray.300",
                  }}
                />
                <FloatingLabelInput
                  isRequired
                  type={showPass ? "" : "password"}
                  label="Jelszó"
                  borderRadius="4"
                  labelColor="#9ca3af"
                  labelBGColor={useColorModeValue("#fff", "#1f2937")}
                  defaultValue={pass}
                  onChangeText={(txt) => setPass(txt)}
                  InputRightElement={
                    <IconButton
                      variant="unstyled"
                      icon={
                        <Icon
                          size="4"
                          color="coolGray.400"
                          as={Entypo}
                          name={showPass ? "eye-with-line" : "eye"}
                        />
                      }
                      onPress={() => {
                        setShowPass(!showPass);
                      }}
                    />
                  }
                  _text={{
                    fontSize: "sm",
                    fontWeight: "medium",
                  }}
                  _dark={{
                    borderColor: "coolGray.700",
                  }}
                  _light={{
                    borderColor: "coolGray.300",
                  }}
                />
              </VStack>
              <Link
                ml="auto"
                _text={{
                  fontSize: "xs",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
                _light={{
                  _text: {
                    color: "black",
                  },
                }}
                _dark={{
                  _text: {
                    color: "black",
                  },
                }}
                onPress={() =>
                  Linking.openURL("http://localhost:8000/password-reset").catch(
                    (err) => console.error("Error", err)
                  )
                }
              >
                Elfelejtett jelszó
              </Link>
              <Checkbox
                alignItems="flex-start"
                mt="5"
                value="demo"
                colorScheme={"primary"}
                accessibilityLabel="Emlékezz rám"
              >
                <Text
                  pl="3"
                  fontWeight="normal"
                  _light={{
                    color: "coolGray.800",
                  }}
                  _dark={{
                    color: "coolGray.400",
                  }}
                >
                  Emlékezz rám, és maradjak bejelentkezve
                </Text>
              </Checkbox>

              <Button
                mt="5"
                size="md"
                borderRadius="4"
                _text={{
                  fontWeight: "medium",
                }}
                _light={{
                  bg: "black",
                }}
                _dark={{
                  bg: "black",
                }}
                onPress={() => {
                  API.login(authParams)
                    .then(() => {
                      data.setIsLoggedIn(true);
                      props.navigation.navigate("Kezdőlap");
                    })
                    .catch((err) => {
                      console.error("Error", err);
                      alert("Hibás felhasználónév vagy jelszó!");
                    });
                }}
              >
                BEJELENTKEZÉS
              </Button>
              {/* Closing Link Tag */}
              <HStack
                mt="5"
                space="2"
                mb={{
                  base: 6,
                  md: 7,
                }}
                alignItems="center"
                justifyContent="center"
              ></HStack>
            </VStack>
            <Center>
              <HStack space="4"></HStack>
            </Center>
          </VStack>
        </VStack>
        <HStack
          mb="4"
          space="1"
          safeAreaBottom
          alignItems="center"
          justifyContent="center"
          mt={{
            base: "auto",
            md: "8",
          }}
        >
          <Text
            _light={{
              color: "coolGray.800",
            }}
            _dark={{
              color: "coolGray.400",
            }}
          >
            Nincs felhasználód?
          </Text>
          {/* Opening Link Tag navigateTo:"SignUp" */}
          <Link
            _text={{
              fontWeight: "bold",
              textDecoration: "none",
            }}
            _light={{
              _text: {
                color: "black",
              },
            }}
            _dark={{
              _text: {
                color: "black",
              },
            }}
            onPress={() => {
              props.navigation.navigate("Regisztráció");
            }}
          >
            Regisztrálj itt!
          </Link>
          {/* Closing Link Tag */}
        </HStack>
      </VStack>
    </KeyboardAwareScrollView>
  );
}
export default function SignIn(props) {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Box
        safeAreaTop
        _light={{
          bg: "primary.900",
        }}
        _dark={{
          bg: "coolGray.900",
        }}
      />
      <Center
        my="auto"
        _dark={{
          bg: "coolGray.900",
        }}
        _light={{
          bg: "#coolGray.100",
        }}
        flex="1"
      >
        <Stack
          flexDirection={{
            base: "column",
            md: "row",
          }}
          w="95%"
          h="90%"
          flex={{
            base: "1",
            md: "none",
          }}
        >
          <Hidden from="md">
            <VStack px="4" mt="4" mb="5" space="9">
              <HStack space="2" alignItems="center">
                <IconButton
                  variant="unstyled"
                  pl="0"
                  onPress={() => {}}
                  icon={
                    <Icon
                      size="6"
                      as={AntDesign}
                      name="arrowleft"
                      color="coolGray.50"
                    />
                  }
                />
                <Text color="coolGray.50" fontSize="lg">
                  Sign In
                </Text>
              </HStack>
              <VStack space="2">
                <Text fontSize="3xl" fontWeight="bold" color="coolGray.50">
                  Üdv újra, név!
                </Text>
                <Text
                  fontSize="md"
                  fontWeight="normal"
                  _dark={{
                    color: "coolGray.400",
                  }}
                  _light={{
                    color: "primary.300",
                  }}
                >
                  Jelentkezz be a folytatáshoz!
                </Text>
              </VStack>
            </VStack>
          </Hidden>
          <Hidden till="md">
            <Center
              flex="1"
              bg={"black"}
              borderTopLeftRadius={{
                base: "0",
                md: "sm",
              }}
              borderBottomLeftRadius={{
                base: "0",
                md: "sm",
              }}
            >
              {/*} <Image
                h="24"
                size="80"
                resizeMode={"contain"}
                source={require("../components/security.jpg")}
            />*/}
            </Center>
          </Hidden>
          <SignInForm props={props} />
        </Stack>
      </Center>
    </>
  );
}
