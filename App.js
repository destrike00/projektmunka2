import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Button } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { View, Flex, Stack, HStack, Box, Text } from "native-base";
import { NativeBaseProvider } from "native-base";
import { dustrinTheme } from "./src/style/theme";
import Map from "./src/components/maps";
import API from "./backend/api";
import SignUp from "./src/components/register";
import SignIn from "./src/components/login";
import Profile from "./src/components/profile";
import Paho from "paho-mqtt";
import mqtt from "mqtt";
import Connection from "./src/mqtt/Connection";
import HookMqtt from "./src/mqtt";
import { ParkingSlotBlock } from "./src/components/parkingslotblock";
import { AllParkingLots } from "./src/components/allparkinglots";
export const ParkingLotItem = (props) => {
  return (
    <Box
      h="35px"
      w="15px"
      bg={props.occupied === 0 ? "green.500" : "red.500"}
      p="3"
      margin="5px"
      alignItems="center"
      justifyContent={"center"}
    >
      <Text color="white" fontWeight="bold">
        {props.parking_slot_number}
      </Text>
    </Box>
  );
};

function HomeScreen(props) {
  const regdata = {
    username: "test",
    email: "test@gmail.com",
    password: "testtest",
  };
  const logdata = {
    email: "test@gmail.com",
    password: "testtest",
  };

  return (
    <>
      <Box
        w="95%"
        h="20%"
        marginTop="10px"
        variant="whitebox"
        alignSelf="center"
        style={{ backgroundColor: "black" }}
      >
        <Text fontSize="24" fontWeight={"bold"} color="white">
          Szabad parkolóhely nyilvántartó rendszer
        </Text>
      </Box>
      <Stack
        w="95%"
        h="100%"
        alignSelf="center"
        justifyContent="space-between"
        flexDirection={{ base: "column", lg: "row" }}
      >
        <Box w={{ base: "100%", lg: "50%" }} h="83%" variant="whitebox" p="1">
          <Map />
        </Box>

        <Flex
          h="100%"
          w={{ base: "100%", lg: "45%" }}
          flexDirection="column"
          alignItems={{ base: "center" }}
        >
          <ParkingSlotBlock parkinglot="P2" payload={props.payload} />
          <Box w="100%" h="40%" variant="whitebox" flexDirection="column">
            <Text fontSize="24" fontWeight={"bold"}>
              Parkolóházra vonatkozó információk
            </Text>
            <Text fontSize="16">
              Parkolóház használatának feltételei, rendszám regisztráció,
              információ
            </Text>
            <Flex w="100%" flexWrap="wrap" flexDirection="row">
              <Button
                w="50%"
                p="3 "
                onPress={() => props.navigation.navigate("AllParkingLots")}
              >
                <Text>Összes parkolóház foglaltságának megtekintése</Text>
              </Button>
              <Button
                w="50%"
                p="3"
                onPress={() => props.navigation.navigate("Profil")}
              >
                <Text>Személyes adatok kezelése</Text>
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Stack>
    </>
  );
}
export default function App() {
  const Drawer = createDrawerNavigator();

  const DrawerNavigation = (props) => {
    return (
      <NativeBaseProvider theme={dustrinTheme}>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Kezdőlap"
            screenOptions={({ navigation }) => ({
              headerShown: true,
              headerTintColor: "#FDFDFD",
              headerTitle: () => (
                <Flex flexDirection="row" w="80%">
                  <HStack w="100px">{/**Logo */}</HStack>
                  <Stack
                    marginLeft="50px"
                    flexWrap="wrap"
                    justifyContent="center"
                    alignItems="center"
                    w="100%"
                  ></Stack>
                </Flex>
              ),

              headerRight: () => (
                <Flex flexDirection="row">
                  <HStack alignItems="center" px="2">
                    onPress={() => navigation.navigate("Rendszerkonfigurátor")}
                  </HStack>
                  <HStack space="4" alignItems="center" px="2">
                    {" "}
                    {/* Ebbe a stackbe mennek a header ikonok */}
                    onPress={() => navigation.navigate("Kosár")}
                  </HStack>
                  <HStack alignItems="center"></HStack>
                </Flex>
              ),
              headerStyle: {
                backgroundColor: "black",
                borderBottomColor: "black",
              },
            })}
          >
            <Drawer.Screen name="Kezdőlap" component={HomeScreen} />
            <Drawer.Screen name="Regisztráció" component={SignUp} />
            <Drawer.Screen name="Bejelentkezés" component={SignIn} />
            <Drawer.Screen
              name="Profil"
              navigation={navigation}
              component={Profile}
            />
            <Drawer.Screen
              name="AllParkingLots"
              navigation={navigation}
              component={AllParkingLots}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    );
  };

  return (
    <>
      <DrawerNavigation />
    </>
  );
}
