import React, { useEffect } from "react";
import { Card, Button, Form, Input, Row, Col } from "antd";
import { useFocusEffect } from "@react-navigation/native";

const Connection = ({ connect, disconnect, connectBtn }) => {
  const [form] = Form.useForm();

  const record = {
    host: "broker.emqx.io",
    clientId: "mqttx_07c5f8fc",
    port: 8083,
  };
  const onFinish = (values) => {
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
    connect(url, options);
  };

  useEffect(() => {
    onFinish();
  }, []);

  const handleConnect = () => {
    form.submit();
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const ConnectionForm = (
    <Form
      layout="vertical"
      name="basic"
      form={form}
      initialValues={record}
      onFinish={onFinish}
    >
      <Row gutter={20}>
        <Col span={8}>
          <Form.Item label="Host" name="host">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Port" name="port">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Client ID" name="clientId">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Username" name="username">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Password" name="password">
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Connection;
