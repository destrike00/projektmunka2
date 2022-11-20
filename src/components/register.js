import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Image,
  HStack,
  VStack,
  Text,
  Link,
  Divider,
  Icon,
  IconButton,
  useColorModeValue,
  Pressable,
  Hidden,
  Center,
  StatusBar,
  Box,
  Stack,
} from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";

import FloatingLabelInput from "../components/FloatingLabelInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import API from "../../backend/api";

function SignUpForm({ props }) {
  // add next router here

  const [text, setText] = useState("");
  const [pass, setPass] = useState("");
  const [user, setUser] = useState("");
  const [confirm_pass, setConfirmPass] = useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [showConfirmPass, setShowConfirmPass] = React.useState(false);
  const authParams = {
    username: user,
    email: text,
    password: pass,
  };
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
        marginTop="10px"
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
              Regisztráció
            </Text>
          </Hidden>
          <VStack>
            <VStack space="8">
              <VStack
                space={{
                  base: "7",
                  md: "4",
                }}
              >
                <FloatingLabelInput
                  isRequired
                  label="Felhasználónév"
                  labelColor="#9ca3af"
                  labelBGColor={useColorModeValue("#fff", "#1f2937")}
                  borderRadius="4"
                  defaultValue={text}
                  onChangeText={(txt) => setUser(txt)}
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

                <FloatingLabelInput
                  isRequired
                  type={showConfirmPass ? "" : "password"}
                  label="Jelszó mégegyszer"
                  borderRadius="4"
                  labelColor="#9ca3af"
                  labelBGColor={useColorModeValue("#fff", "#1f2937")}
                  defaultValue={confirm_pass}
                  onChangeText={(txt) => setConfirmPass(txt)}
                  InputRightElement={
                    <IconButton
                      variant="unstyled"
                      icon={
                        <Icon
                          size="4"
                          color="coolGray.400"
                          as={Entypo}
                          name={showConfirmPass ? "eye-with-line" : "eye"}
                        />
                      }
                      onPress={() => {
                        setShowConfirmPass(!showConfirmPass);
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
                  API.register(authParams)
                    .then(() => {
                      props.navigation.navigate("Kezdőlap");
                    })
                    .catch((err) => {
                      console.error("Error", err);
                      alert("Hibás adatok!");
                    });
                }}
              >
                Regisztráció
              </Button>
              {/* Closing Link Tag */}
              <HStack
                space="2"
                mb={{
                  base: "6",
                  md: "7",
                }}
                alignItems="center"
                justifyContent="center"
              ></HStack>
            </VStack>
            <Center>
              <HStack space="4">
                <Pressable></Pressable>
                <Pressable></Pressable>
              </HStack>
            </Center>
          </VStack>
        </VStack>
        <HStack
          mb="4"
          space="1"
          alignItems="center"
          justifyContent="center"
          mt={{
            base: "auto",
            md: "8",
          }}
        >
          <Text
            fontSize="sm"
            _light={{
              color: "coolGray.800",
            }}
            _dark={{
              color: "coolGray.400",
            }}
          >
            Már van felhasználód?
          </Text>
          {/* Opening Link Tag navigateTo:"SignIn" */}
          <Link
            _text={{
              fontSize: "sm",
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
              props.navigation.navigate("Bejelentkezés");
            }}
          >
            Jelentkezz be!
          </Link>
          {/* Closing Link Tag */}
        </HStack>
      </VStack>
    </KeyboardAwareScrollView>
  );
}

export default function SignUp(props) {
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
          <SignUpForm props={props} />
        </Stack>
      </Center>
    </>
  );
}
