"use client";
import { Button, Card, Col, Flex, Form, Input, message, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import { useRouter } from "next/navigation";
import { useRequest } from "ahooks";
import { forgetPassword } from "../../../api/api";
import { AxiosError } from "axios";
import Footer from "../footer";
import Header from "../header";

export default function ForgetPassword() {
  const router = useRouter();
  const [form] = useForm();

  const handleLogin = () => {
    router.push("/login");
  };

  const handleForgetPassword = () => {
    form.validateFields().then((values) => {
      run({ account: values.account, email: values.email });
    });
  };

  const { run } = useRequest(forgetPassword, {
    manual: true,
    onSuccess: () => {
      message.success("已寄送重設密碼至您的信箱");
      router.push("/login");
    },
    onError: (error) => {
      const axiosError = error as AxiosError;
      let errorMessage = "";
      if (axiosError.response?.status === 404) {
        errorMessage = "帳號或信箱錯誤";
      } else {
        errorMessage = "伺服器發生錯誤";
      }
      message.error(`寄送重設密碼信件失敗：${errorMessage}`);
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
          title={<span>台北市復康巴士 - 忘記密碼</span>}
        >
          <Row>
            <Col span={24}>
              <Form form={form}>
                <Form.Item
                  name="account"
                  rules={[
                    {
                      required: true,
                      message: "請輸入註冊帳號",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder={"請輸入註冊帳號"}
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "請輸入註冊信箱",
                    },
                    { type: "email", message: "信箱格式錯誤" },
                  ]}
                >
                  <Input
                    type="mail"
                    prefix={<MailOutlined />}
                    placeholder={"請輸入註冊信箱"}
                  />
                </Form.Item>
              </Form>
            </Col>
            <Col span={24}>
              <Flex justify={"end"} align={"center"}>
                <div>
                  <Button onClick={handleLogin} style={{ marginRight: "5px" }}>
                    返回登入
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "#5bb3c4",
                      color: "#fff",
                      border: "none",
                    }}
                    onClick={handleForgetPassword}
                  >
                    送出
                  </Button>
                </div>
              </Flex>
            </Col>
          </Row>
        </Card>
      </Flex>
      <Footer />
    </>
  );
}
