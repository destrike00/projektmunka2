import * as React from "react";
import { Button } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { View, Flex, Stack, HStack, Box, Text } from "native-base";
import { NativeBaseProvider } from "native-base";
import { dustrinTheme } from "./src/style/theme";
import Map from "./src/components/maps";

const ParkingLotItem = () => {
  return <Box h="35px" w="15px" bg="green.500" p="3" margin="5px" />;
};
function HomeScreen({ navigation }) {
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
            <Flex h="10%" w="100%" alignItems="center" justifyContent="center">
              <Text fontWeight={"bold"} fontSize="16">
                P2 parkolóház
              </Text>
            </Flex>
            <Stack flexWrap="wrap" flexDirection={"row"}>
              {Array(105)
                .fill(1)
                .map((el, i) => {
                  return <ParkingLotItem />;
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

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
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
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
