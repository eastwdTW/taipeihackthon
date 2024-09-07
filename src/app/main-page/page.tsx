"use client";
import { Layout, Button, Row, Col, Flex } from "antd";
import { useState } from "react";
import { getAnnouncement, tryGetToken } from "../../../api/api";
import { useRouter } from "next/navigation";
import Footer from "../footer";
import Header from "../header";
import { useRequest } from "ahooks";

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
}

export default function MainPage() {
  const router = useRouter();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const handleReserveClick = () => {
    const isLogin = tryGetToken();

    if (isLogin) {
      router.push("/reserve");
    } else {
      router.push("/login");
    }
  };

  useRequest(getAnnouncement, {
    onSuccess: ({ data }) => {
      setAnnouncements(data);
    },
  });

  return (
    <>
      <Header />
      <Layout>
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
              onClick={handleReserveClick}
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
      </Layout>
      <Footer />
    </>
  );
}
