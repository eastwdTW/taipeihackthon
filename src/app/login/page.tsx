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
import { login, setToken, setUserName } from "../../../api/api";
import { encryptWithPublicKey } from "../../../utils/util";
import { AxiosError } from "axios";
import Header from "../header";
import Footer from "../footer";

export default function Login() {
  const router = useRouter();
  const [form] = useForm();

  const handleForgetPassword = () => {
    router.push("/forget-password");
  };

  const handleRegister = () => {
    router.push("/regist");
  };

  const handleDriverLogin = () => {
    router.push("/driver/login");
  };

  const handleLogin = () => {
    form.validateFields().then((values) => {
      const { account, password } = values;
      const encryptPassword = encryptWithPublicKey(password);
      run({ account, password: encryptPassword });
    });
  };

  const { run } = useRequest(login, {
    manual: true,
    onSuccess: ({ data }) => {
      setToken(data.token);
      setUserName(data.name);
      router.push("/main-page");
    },
    onError: (error) => {
      const axiosError = error as AxiosError;
      let errorMessage = "";
      if (axiosError.response?.status === 401) {
        const data = axiosError.response?.data as { message: string };
        if (data?.message === "User not found") {
          errorMessage = "帳號錯誤";
        } else {
          errorMessage = "密碼錯誤";
        }
      } else if (axiosError.response?.status === 500) {
        errorMessage = "伺服器發生錯誤";
      }
      message.error(`登入錯誤：${errorMessage}`);
    },
  });

  return (
    <>
      <Header />
      <Flex
        justify={"center"}
        align={"center"}
        style={{ height: "80vh", backgroundColor: "#f0f0f0f0" }}
      >
        <Card
          styles={{
            header: {
              backgroundColor: "#5bb3c4",
              color: "#fff",
            },
          }}
          style={{
            width: "80%",
            border: "2px solid #5bb3c4",
            borderRadius: "10px",
          }}
          title={<span>台北市復康巴士 - 登入</span>}
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
                  <Button
                    onClick={handleRegister}
                    style={{ marginRight: "5px" }}
                  >
                    註冊
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "#5bb3c4",
                      color: "#fff",
                      border: "none",
                    }}
                    onClick={handleLogin}
                  >
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
                  onClick={handleDriverLogin}
                >
                  我是司機，按我登入
                </Button>
              </Flex>
            </Col>
          </Row>
        </Card>
      </Flex>
      <Footer />
    </>
  );
}
