"use client";
import { Button, Card, Col, Flex, Form, Input, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [form] = useForm();

  const handleRegister = () => {
    router.push("/regist");
  };

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
        style={{ width: "80%", border: "2px solid #000", borderRadius: "10px" }}
        title={<span>台北市復康巴士 - 登入</span>}
      >
        <Row>
          <Col span={24}>
            <Form form={form}>
              <Form.Item name="account">
                <Input prefix={<UserOutlined />} placeholder={"請輸入帳號"} />
              </Form.Item>
              <Form.Item name="password">
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
                <Button type={"link"} style={{ padding: 0 }}>
                  忘記密碼
                </Button>
              </div>
              <div>
                <Button onClick={handleRegister} style={{ marginRight: "5px" }}>
                  註冊
                </Button>
                <Button type="primary">登入</Button>
              </div>
            </Flex>
          </Col>
        </Row>
      </Card>
    </Flex>
  );
}
