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
const ParkingLotItem = (props) => {
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
function HomeScreen({ navigation }) {
  const [count, setCount] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);

  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    API.test().then((response) => setData(response?.data));
    API.get_free_slot_count().then((response) => setCount(response?.data));
  }, []);
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
          <Box w="100%" variant="whitebox">
            <Flex
              h="10%"
              w="100%"
              marginBottom="5px"
              alignItems="center"
              justifyContent="center"
              flexDirection="row"
            >
              <Text fontWeight={"bold"} fontSize="14">
                P2 parkolóház
              </Text>
              <Text
                fontWeight="bold"
                fontSize="14"
                paddingLeft="5"
                position="absolute"
                right="0"
              >
                Szabad helyek: {count}
              </Text>
            </Flex>
            <Stack flexWrap="wrap" flexDirection={"row"}>
              {/*{Array(105)
                .fill(1)
                .map((el, i) => {
                  return <ParkingLotItem />;
                })}*/}
              {data.map((item) => {
                if (item.parking_slot_number > 51) return;
                return (
                  <ParkingLotItem
                    occupied={item.parking_slot_status}
                    parking_slot_number={item.parking_slot_number}
                  />
                );
              })}
            </Stack>
          </Box>
          <Box w="100%" h="40%" variant="whitebox" flexDirection="column">
            <Text fontSize="24" fontWeight={"bold"}>
              Parkolóházra vonatkozó információk
            </Text>
            <Text fontSize="16">
              Parkolóház használatának feltételei, rendszám regisztráció,
              információ
            </Text>
          </Box>
        </Flex>
      </Stack>
    </>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NativeBaseProvider theme={dustrinTheme}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
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
        </Drawer.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
