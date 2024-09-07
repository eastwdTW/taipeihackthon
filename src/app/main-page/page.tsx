"use client";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Layout, Image, Button, Row, Col, Flex } from "antd";

const { Footer } = Layout;

export default function MainPage() {
  return (
    <Layout>
      <Row
        style={{
          padding: "10px 10px",
          backgroundColor: "#fff",
          width: "100%",
          color: "#000",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Col span={4}>
          <Flex
            justify="center"
            align="center"
            style={{ width: "100%", height: "100%" }}
          >
            <UnorderedListOutlined
              style={{ color: "#5bb3c4", fontSize: "1.5rem" }}
            />
          </Flex>
        </Col>
        <Col span={16}>
          <Flex
            justify="center"
            align="center"
            style={{ width: "100%", height: "100%" }}
          >
            <span style={{ fontWeight: "bolder", fontSize: "1.5rem" }}>
              台北市復康巴士
            </span>
          </Flex>
        </Col>
        <Col span={4}>
          <Flex
            justify="center"
            align="center"
            style={{ width: "100%", height: "100%" }}
          >
            <Button
              style={{
                backgroundColor: "#5bb3c4",
                border: 0,
                color: "#fff",
                fontWeight: "bolder",
              }}
            >
              登入
            </Button>
          </Flex>
        </Col>
      </Row>
      <div style={{ padding: "0 48px" }}>
        <Image
          src="/logo.svg"
          width="100px"
          preview={false}
          style={{ marginTop: "10px" }}
        />
      </div>
      <Footer
        style={{
          textAlign: "center",
          width: "100%",
          position: "absolute",
          bottom: 0,
        }}
      >
        <p style={{ margin: 0, fontSize: "0.8rem", fontWeight: "bolder" }}>
          presented by 聽說名字要七個字
        </p>
        <Image
          src="/logo.svg"
          width="100px"
          preview={false}
          style={{ marginTop: "10px" }}
        />
      </Footer>
    </Layout>
  );
}
