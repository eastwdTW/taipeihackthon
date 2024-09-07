"use client";
import {
  Layout,
  Button,
  Row,
  Col,
  Flex,
  Modal,
  Form,
  Input,
  message,
} from "antd";
import { useState } from "react";
import { getAnnouncement, tryGetToken } from "../../../api/api";
import { useRouter } from "next/navigation";
import Footer from "../footer";
import Header from "../header";
import { useRequest, useToggle } from "ahooks";
import { useForm } from "antd/lib/form/Form";
import ChatBot from "../../../component/chatbot";

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
}

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

const ContactModal = ({ open, onClose }: ContactModalProps) => {
  const [form] = useForm();

  const handleOnClose = () => {
    form.resetFields();
    onClose();
  };

  const send = () => {
    form.validateFields().then((values) => {
      message.success("傳送成功，我們將盡快聯繫您！");
      handleOnClose();
    });
  };

  return (
    <Modal
      open={open}
      onCancel={handleOnClose}
      title="聯絡我們"
      footer={[
        <Button onClick={handleOnClose}>關閉</Button>,
        <Button type="primary" onClick={send}>
          送出
        </Button>,
      ]}
    >
      <Form form={form} style={{ marginTop: "30px" }}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "請填寫信箱" },
            { type: "email", message: "信箱格式錯誤" },
          ]}
        >
          <Input placeholder="請輸入信箱" />
        </Form.Item>
        <Form.Item
          name="content"
          rules={[{ required: true, message: "請填寫事項" }]}
        >
          <Input.TextArea rows={6} placeholder="請輸入事項" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default function MainPage() {
  const router = useRouter();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [toggleContact, { toggle: toggleContactModal }] = useToggle();

  const handleReserveClick = () => {
    const isLogin = tryGetToken();

    if (isLogin) {
      router.push("/reserve");
    } else {
      router.push("/login");
    }
  };

  const handleContactClick = () => {
    toggleContactModal();
  };

  useRequest(getAnnouncement, {
    onSuccess: ({ data }) => {
      setAnnouncements(data);
    },
  });

  return (
    <>
      <ChatBot />
      <ContactModal
        open={toggleContact}
        onClose={() => {
          toggleContactModal();
        }}
      />
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
              onClick={handleContactClick}
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
