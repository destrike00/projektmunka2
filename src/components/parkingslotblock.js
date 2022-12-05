import React, { useState, useCallback, useEffect } from "react";
import mqtt from "mqtt";
import { Button } from "react-native";

import { View, Flex, Stack, HStack, Box, Text } from "native-base";

import API from "../../backend/api";

import { ParkingLotItem } from "../../App";

export const ParkingSlotBlock = (props) => {
  const [count, setCount] = useState("");
  const [client, setClient] = useState(null);
  const [isSubed, setIsSub] = useState(false);
  const [payload, setPayload] = useState({});
  const [connectStatus, setConnectStatus] = useState("Connect");
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    API.get_parking_slots().then((response) => setData(response?.data));
    API.get_free_slot_count().then((response) => setCount(response?.data));
  }, [payload]);

  const mqttConnect = (host, mqttOption) => {
    setConnectStatus("Connecting");
    setClient(mqtt.connect(host, mqttOption));
  };
  const record = {
    host: "broker.emqx.io",
    clientId: "mqttx_07c5f8fc",
    port: 8083,
  };
  const connectInit = (values) => {
    //const { host, clientId, port, username, password } = values;
    const url = `ws://broker.emqx.io:8083/mqtt`;
    const options = {
      keepalive: 30,
      protocolId: "MQTT",
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      will: {
        topic: "WillMsg",
        payload: "Connection Closed abnormally..!",
        qos: 0,
        retain: false,
      },
      rejectUnauthorized: false,
    };
    options.clientId = "mqttx_07c5f8fc";
    options.username = "parking_socket";
    options.password = "1a2s3d4f";
    mqttConnect(url, options);
  };

  useEffect(() => {
    connectInit();
  }, []);

  useEffect(() => {
    console.log(client);
    if (client) {
      client.on("connect", () => {
        setConnectStatus("Connected");
      });
      client.on("error", (err) => {
        console.error("Connection error: ", err);
        client.end();
      });
      client.on("reconnect", () => {
        setConnectStatus("Reconnecting");
      });
      client.on("message", (topic, message) => {
        const payload = { topic, message: message.toString() };
        setPayload(payload);
      });
    }
    mqttSub();
  }, [client]);

  const mqttDisconnect = () => {
    if (client) {
      client.end(() => {
        setConnectStatus("Connect");
      });
    }
  };

  const mqttPublish = (context) => {
    if (client) {
      const { topic, qos, payload } = context;
      client.publish(topic, payload, { qos }, (error) => {
        if (error) {
          console.log("Publish error: ", error);
        }
      });
    }
  };

  const mqttSub = (subscription) => {
    if (client) {
      // const { topic, qos } = subscription;
      console.log("client", client);
      client.subscribe("parkingslots/update", 0, (error) => {
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        }
        setIsSub(true);
      });
    }
  };

  const mqttUnSub = (subscription) => {
    if (client) {
      const { topic } = subscription;
      client.unsubscribe(topic, (error) => {
        if (error) {
          console.log("Unsubscribe error", error);
          return;
        }
        setIsSub(false);
      });
    }
  };
  return (
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
          {props.parkinglot} parkolóház
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
        {data.map((item) => {
          if (item.parking_slot_location === props.parkinglot) {
            return (
              <ParkingLotItem
                occupied={item.parking_slot_status}
                parking_slot_number={item.parking_slot_number}
              />
            );
          }
        })}
      </Stack>
    </Box>
  );
};
