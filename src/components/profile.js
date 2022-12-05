import React, { useEffect, useState } from "react";

import {
  Flex,
  Box,
  Text,
  HStack,
  Divider,
  Button,
  Stack,
  Hidden,
  Icon,
} from "native-base";

const BlockHeader = (props) => {
  return (
    <HStack
      w="100% "
      h="5%"
      justifyContent={"center"}
      marginBottom="5"
      alignItems="center"
    >
      <Text fontWeight="bold" fontSize="xl">
        {props.title}
      </Text>
      {props.buttonTitle && (
        <Button variant="baseStyle" onPress={props.onPress}>
          <Text>{props.buttonTitle}</Text>
        </Button>
      )}
    </HStack>
  );
};

const Profile = (props) => {
  const [primaryChecked, setPrimaryChecked] = useState(true);
  const [secondaryChecked, setSecondaryChecked] = useState(false);
  const [useraddresses, setUserAddresses] = useState([]);

  return (
    <>
      <Hidden till="lg">
        <HStack variant="header" alignItems="center" justifyContent="center">
          <Text fontSize="xl" fontWeight={"bold"}>
            Személyes adatok
          </Text>
        </HStack>
      </Hidden>
      <Flex w="100%" justifyContent="center" alignItems="center">
        <Box variant="whitebox" w="70%">
          <BlockHeader title="Felhasználó adatai" />

          <HStack py="3">
            {/*<Button
            onPress={() =>
              API.useraddress_test({
                first_name: "Áron",
                last_name: "Kisszölgyémi",
                line1: "MODIFY_TEST2",
                country: "http://localhost:8000/api/countries/HU/",
              })
            }
          />*/}
            <Text fontWeight="bold">Név:</Text>
            <Text px="2.5px">lastname</Text>
            <Text px="2.5px">firstname</Text>
          </HStack>
          <HStack py="3">
            <Text fontWeight="bold">Felhasználónév:</Text>
            <Text px="2.5px">username</Text>
          </HStack>
        </Box>
        <Box variant="whitebox" w="70%">
          <BlockHeader title="Szállítási címek" />

          <Stack
            flexWrap="wrap"
            justifyContent="center"
            flexDirection={{ base: "col", lg: "row" }}
          >
            {useraddresses?.map((item, i) => {
              return (
                <Box
                  variant="whitebox"
                  py="3"
                  h="200px"
                  w="45%"
                  marginLeft="2%"
                  key={item.id}
                >
                  <HStack py="3">
                    <Text fontWeight="bold">Név:</Text>
                    <Text px="2.5px">{item.last_name}</Text>
                    <Text px="2.5px">{item.first_name}</Text>
                  </HStack>
                  <HStack py="3">
                    <Text fontWeight="bold">Cím:</Text>
                    <Text px="2.5px">{item.postcode}</Text>
                    <Text px="2.5px">{item.state}</Text>
                    <Text px="2.5px">{item.line1}</Text>
                  </HStack>
                  <HStack py="3">
                    <Text fontWeight="bold">Telefonszám:</Text>
                    <Text px="5px">{item.phone_number}</Text>
                  </HStack>
                </Box>
              );
            })}
          </Stack>
        </Box>
      </Flex>
    </>
  );
};
export default Profile;
