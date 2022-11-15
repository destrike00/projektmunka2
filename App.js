import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Flex, Stack, HStack } from "native-base";
import { NativeBaseProvider } from "native-base";
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        onPress={() => navigation.navigate("Notifications")}
        title="Go to notifications"
      />
    </View>
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
    <NativeBaseProvider>
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
