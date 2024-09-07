"use client";
import { Button, Card, Col, Flex, Form, Input, message, Row } from "antd";
import {
  AuditOutlined,
  CarOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  MailOutlined,
  PhoneOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import { useRouter } from "next/navigation";
import { useRequest } from "ahooks";
import { encryptWithPublicKey } from "../../../../utils/util";
import { driverRegist } from "../../../../api/api";

export default function DriverRegist() {
  const [form] = Form.useForm();
  const router = useRouter();

  const handleRedirectLogin = () => {
    router.push("/driver/login");
  };

  const handleRegister = () => {
    form.validateFields().then((values) => {
      const { file, password, ...otherFields } = values;

      const formData = new FormData();

      Object.keys(otherFields).map((fieldName) => {
        formData.append(fieldName, values[fieldName]);
      });

      formData.append("password", encryptWithPublicKey(password));

      run(formData);
    });
  };

  const { run } = useRequest(driverRegist, {
    manual: true,
    onSuccess: () => {
      message.success("註冊成功");
      router.push("/login");
    },
    onError: () => {
      message.error("註冊失敗");
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
        title={<span>台北市復康巴士 - 司機註冊</span>}
      >
        <Row>
          <Col span={24}>
            <Form form={form}>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "請輸入名字",
                  },
                ]}
              >
                <Input
                  prefix={<SolutionOutlined />}
                  placeholder={"請輸入名字"}
                />
              </Form.Item>
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
                name="password"
                rules={[
                  {
                    required: true,
                    message: "請輸入註冊密碼",
                  },
                ]}
              >
                <Input.Password
                  placeholder="請輸入註冊密碼"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
              <Form.Item
                name="checkPassword"
                rules={[
                  {
                    required: true,
                    message: "請輸入確認密碼",
                  },
                  {
                    validator: (_, value) => {
                      if (value !== form.getFieldValue("password")) {
                        return Promise.reject("密碼不一致");
                      } else {
                        return Promise.resolve();
                      }
                    },
                  },
                ]}
              >
                <Input.Password
                  placeholder="再次輸入註冊密碼"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "請輸入信箱",
                  },
                  { type: "email", message: "信箱格式錯誤" },
                ]}
              >
                <Input
                  type="mail"
                  prefix={<MailOutlined />}
                  placeholder={"請輸入信箱"}
                />
              </Form.Item>
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "請輸入手機",
                  },
                  {
                    validator: (_, value) => {
                      const zoneCode = value.substring(0, 2);
                      if (zoneCode !== "09" || value.length !== 10) {
                        return Promise.reject("手機格式錯誤");
                      }
                      return Promise.resolve("");
                    },
                  },
                ]}
              >
                <Input prefix={<PhoneOutlined />} placeholder={"請輸入手機"} />
              </Form.Item>
              <Form.Item
                name="plateNumber"
                rules={[
                  {
                    required: true,
                    message: "請輸入車牌號碼",
                  },
                  {
                    validator: (_, value) => {
                      const regex = /^[臨試使外軍]?[A-Z0-9]+-?[A-Z0-9]+$/;

                      if (value.length < 5 || !regex.test(value)) {
                        return Promise.reject("車牌號碼格式錯誤");
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input
                  prefix={<CarOutlined />}
                  placeholder={"請輸入車牌號碼"}
                  onChange={(v) => {
                    let value = v.target.value;

                    if (
                      value.length === 4 &&
                      value.indexOf("-") === -1 &&
                      /^[a-zA-Z]{3}$/.test(value.slice(0, 3))
                    ) {
                      value = `${value.slice(0, 3)}-${value[3]}`;
                    }

                    const allUpperCase = value.toUpperCase();

                    form.setFieldsValue({
                      plateNumber: allUpperCase,
                    });

                    form.validateFields(["plateNumber"]);
                  }}
                />
              </Form.Item>
              <Form.Item
                name="driverIdentificationCode"
                rules={[
                  {
                    required: true,
                    message: "請輸入司機證號",
                  },
                ]}
              >
                <Input
                  prefix={<AuditOutlined />}
                  placeholder={"請輸入司機證號"}
                />
              </Form.Item>
            </Form>
          </Col>
          <Col span={24}>
            <Flex justify={"end"} align={"center"}>
              <div>
                <Button
                  style={{ marginRight: "5px" }}
                  onClick={handleRedirectLogin}
                >
                  返回登入
                </Button>
                <Button type="primary" onClick={handleRegister}>
                  註冊
                </Button>
              </div>
            </Flex>
          </Col>
        </Row>
      </Card>
    </Flex>
  );
}
