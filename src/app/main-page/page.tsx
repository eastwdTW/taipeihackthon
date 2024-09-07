"use client";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Layout, Image, Button, Row, Col, Flex } from "antd";
import { useState } from "react";
import dayjs from "dayjs";

const { Footer } = Layout;

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
}

export default function MainPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 1,
      title: "測試測試測試測試測試測試測試測試測試測試",
      content: "測試測試測試測試測試測試測試測試測試測試",
      date: dayjs().format("YYYY/MM/DD"),
    },
    {
      id: 2,
      title: "測試測試測試測試測試測試測試測試測試測試",
      content: "測試測試測試測試測試測試測試測試測試測試",
      date: dayjs().format("YYYY/MM/DD"),
    },
    {
      id: 3,
      title: "測試測試測試測試測試測試測試測試測試測試",
      content: "測試測試測試測試測試測試測試測試測試測試",
      date: dayjs().format("YYYY/MM/DD"),
    },
    {
      id: 4,
      title: "測試測試測試測試測試測試測試測試測試測試",
      content: "測試測試測試測試測試測試測試測試測試測試",
      date: dayjs().format("YYYY/MM/DD"),
    },
    {
      id: 5,
      title: "測試測試測試測試測試測試測試測試測試測試",
      content: "測試測試測試測試測試測試測試測試測試測試",
      date: dayjs().format("YYYY/MM/DD"),
    },
    {
      id: 6,
      title: "測試測試測試測試測試測試測試測試測試測試",
      content: "測試測試測試測試測試測試測試測試測試測試",
      date: dayjs().format("YYYY/MM/DD"),
    },
    {
      id: 7,
      title: "測試測試測試測試測試測試測試測試測試測試",
      content: "測試測試測試測試測試測試測試測試測試測試",
      date: dayjs().format("YYYY/MM/DD"),
    },
    {
      id: 8,
      title: "測試測試測試測試測試測試測試測試測試測試",
      content: "測試測試測試測試測試測試測試測試測試測試",
      date: dayjs().format("YYYY/MM/DD"),
    },
    {
      id: 9,
      title: "測試測試測試測試測試測試測試測試測試測試",
      content: "測試測試測試測試測試測試測試測試測試測試",
      date: dayjs().format("YYYY/MM/DD"),
    },
  ]);

  return (
    <Layout>
      <Row
        style={{
          padding: "10px 10px",
          backgroundColor: "#fff",
          width: "100%",
          color: "#000",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          zIndex: 999,
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
      <div
        style={{
          backgroundColor: "#fff",
          height: "calc(100vh - 56px - 109px)",
          paddingTop: "20px",
        }}
      >
        <p
          style={{
            color: "#2eb6c7",
            paddingLeft: "20px",
            fontWeight: "bolder",
            fontSize: "2rem",
          }}
        >
          最新消息
        </p>
        <hr
          style={{
            border: "1px solid #2eb6c7",
            marginLeft: "20px",
            width: "50px",
          }}
        />
        <div
          style={{
            marginTop: "30px",
            marginBottom: "80px",
            height: "calc(100vh - 56px - 109px - 400px)",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          {announcements.map((announcement) => {
            return (
              <div key={announcement.id}>
                <Row
                  gutter={16}
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                >
                  <Col span={10}>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "1.2rem",
                        padding: "0px 20px",
                      }}
                    >
                      {announcement.date}
                    </span>
                  </Col>
                  <Col span={14}>
                    <span
                      style={{
                        width: "100%",
                        color: "#000",
                        fontSize: "1.2rem",
                        padding: "0px 20px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        display: "block",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {announcement.title}
                    </span>
                  </Col>
                </Row>
                <hr />
              </div>
            );
          })}
        </div>
        <Flex justify="center" wrap="wrap">
          <Button
            style={{
              width: "80%",
              fontWeight: "bolder",
              fontSize: "1.2rem",
              padding: "20px",
              marginBottom: "30px",
              backgroundColor: "#5bb3c4",
              color: "#fff",
            }}
          >
            立即預約
          </Button>
          <Button
            style={{
              width: "80%",
              fontWeight: "bolder",
              fontSize: "1.2rem",
              padding: "20px",
              border: "1px solid",
            }}
          >
            聯絡我們
          </Button>
        </Flex>
      </div>
      <Footer
        style={{
          boxShadow: "0 -4px 8px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
          width: "100%",
          position: "absolute",
          bottom: 0,
          backgroundColor: "#fff",
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
