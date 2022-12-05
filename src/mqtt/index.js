import React, { createContext, useEffect, useState } from "react";
import Connection from "./Connection";
import Publisher from "./Publisher";
import Subscriber from "./Subscriber";
import Receiver from "./Receiver";
import mqtt from "mqtt";
import API from "../../backend/api";
import { View, Flex, Stack, HStack, Box, Text } from "native-base";
import { NativeBaseProvider } from "native-base";
import { ParkingLotItem } from "../../App";
export const QosOption = createContext([]);
const qosOption = [
  {
    label: "0",
    value: 0,
  },
  {
    label: "1",
    value: 1,
  },
  {
    label: "2",
    value: 2,
  },
];

const HookMqtt = () => {
  const [client, setClient] = useState(null);
  const [isSubed, setIsSub] = useState(false);
  const [payload, setPayload] = useState({});
  const [connectStatus, setConnectStatus] = useState("Connect");
  const [count, setCount] = useState("");
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    API.test().then((response) => setData(response?.data));
    API.get_free_slot_count().then((response) => setCount(response?.data));
  }, [payload]);

  const mqttConnect = (host, mqttOption) => {
    setConnectStatus("Connecting");
    setClient(mqtt.connect(host, mqttOption));
  };

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
    <>
      <NativeBaseProvider>
        <Connection
          connect={mqttConnect}
          disconnect={mqttDisconnect}
          connectBtn={connectStatus}
        />
        <QosOption.Provider value={qosOption}>
          {/*<Subscriber sub={mqttSub} unSub={mqttUnSub} showUnsub={isSubed} />*/}
          {/* <Publisher publish={mqttPublish} />*/}
        </QosOption.Provider>

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
        {/*<Receiver payload={payload} />*/}
      </NativeBaseProvider>
    </>
  );
};

export default HookMqtt;
