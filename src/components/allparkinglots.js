import React, { useState, useCallback, useEffect } from "react";
import mqtt from "mqtt";
import { Button } from "react-native";

import { View, Flex, Stack, HStack, Box, Text } from "native-base";

import API from "../../backend/api";

import { ParkingSlotBlock } from "./parkingslotblock";

export const AllParkingLots = (props) => {
  return (
    <Flex
      flexWrap="wrap"
      flexDirection={{ base: "col", md: "row" }}
      alignItems={{ base: "center" }}
      justifyContent={{ base: "center" }}
    >
      <Flex w={{ base: "100%", md: "50%" }} p="5">
        <ParkingSlotBlock parkinglot="P1" />
      </Flex>
      <Flex w={{ base: "100%", md: "50%" }} p="5">
        <ParkingSlotBlock parkinglot="P2" payload={props.payload}/>
      </Flex>
      <Flex w={{ base: "100%", md: "50%" }} p="5">
        <ParkingSlotBlock parkinglot="P3" />
      </Flex>
      <Flex w={{ base: "100%", md: "50%" }} p="5">
        <ParkingSlotBlock parkinglot="P4" />
      </Flex>
    </Flex>
  );
};
