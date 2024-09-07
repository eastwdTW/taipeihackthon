"use client";
import { Button, Card, Col, Flex, Form, Input, message, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import { useRouter } from "next/navigation";
import { useRequest } from "ahooks";
import { encryptWithPublicKey } from "../../../../utils/util";
import { driverLogin, setToken, setUserName } from "../../../../api/api";

export default function DriverLogin() {
  const router = useRouter();
  const [form] = useForm();

  const handleForgetPassword = () => {
    router.push("/driver/forget-password");
  };

  const handleRegister = () => {
    router.push("/driver/regist");
  };

  const handleCustomerLogin = () => {
    router.push("/login");
  };

  const handleLogin = () => {
    form.validateFields().then((values) => {
      const { account, password } = values;
      const encryptPassword = encryptWithPublicKey(password);
      run({ account, password: encryptPassword });
    });
  };

  const { run } = useRequest(driverLogin, {
    manual: true,
    onSuccess: ({ data }) => {
      setToken(data.token);
      setUserName(data.name);
      router.push("/driver/main-page");
    },
    onError: () => {
      message.error("登入失敗");
    },
  });

  return (
    <Flex
      justify={"center"}
      align={"center"}
      style={{ height: "100vh", backgroundColor: "#f0f0f0f0" }}
    >
      <Card
        styles={{
          header: {
            backgroundColor: "#000",
            color: "#fff",
          },
        }}
        style={{
          width: "80%",
          border: "2px solid #000",
          borderRadius: "10px",
        }}
        title={<span>台北市復康巴士 - 司機登入</span>}
      >
        <Row>
          <Col span={24}>
            <Form form={form}>
              <Form.Item
                name="account"
                rules={[
                  {
                    required: true,
                    message: "請輸入帳號",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder={"請輸入帳號"} />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "請輸入密碼",
                  },
                ]}
              >
                <Input.Password
                  placeholder="請輸入密碼"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
            </Form>
          </Col>
          <Col span={24}>
            <Flex justify={"space-between"} align={"center"}>
              <div>
                <Button
                  type={"link"}
                  style={{ padding: 0 }}
                  onClick={handleForgetPassword}
                >
                  忘記密碼
                </Button>
              </div>
              <div>
                <Button onClick={handleRegister} style={{ marginRight: "5px" }}>
                  註冊
                </Button>
                <Button type="primary" onClick={handleLogin}>
                  登入
                </Button>
              </div>
            </Flex>
          </Col>
          <Col span={24}>
            <Flex justify={"end"} align={"center"}>
              <Button
                type={"link"}
                style={{ padding: 0 }}
                onClick={handleCustomerLogin}
              >
                我是乘客，按我登入
              </Button>
            </Flex>
          </Col>
        </Row>
      </Card>
    </Flex>
  );
}
