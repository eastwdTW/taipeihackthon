"use client";
import { Button, Card, Col, Flex, Form, Input, message, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import { useRouter } from "next/navigation";
import { useRequest } from "ahooks";
import { driverForgetPassword } from "../../../../api/api";
import Header from "../header";
import Footer from "@/app/footer";
export default function DriverForgetPassword() {
  const router = useRouter();
  const [form] = useForm();

  const handleLogin = () => {
    router.push("/driver/login");
  };

  const handleForgetPassword = () => {
    form.validateFields().then((values) => {
      run(values);
    });
  };

  const { run } = useRequest(driverForgetPassword, {
    manual: true,
    onSuccess: () => {
      message.success("已寄送重設密碼至您的信箱");
      router.push("/driver/login");
    },
    onError: () => {
      message.error("寄送重設密碼信件失敗");
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
              backgroundColor: "#000",
              color: "#fff",
            },
          }}
          style={{
            width: "80%",
            border: "2px solid #000",
            borderRadius: "10px",
          }}
          title={<span>台北市復康巴士 - 司機忘記密碼</span>}
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
                  <Button type="primary" onClick={handleForgetPassword}>
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
