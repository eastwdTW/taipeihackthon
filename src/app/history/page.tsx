"use client";
import { Layout, Button, Row, Col, Flex, Modal, Empty } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Footer from "../footer";
import Header from "../header";
import { CarType } from "../../../interface/reserve";
import { useRequest, useToggle } from "ahooks";
import { getCustomerHistory } from "../../../api/api";
import ChatBot from "../../../component/chatbot";

interface HistoryTicket {
  id: number;
  startDate: string;
  endDate: string;
  from: string;
  to: string;
  carType: CarType;
  price: number;
  driver: {
    name: string;
    plateNumber: string;
  };
}

interface DetailModalProps {
  open: boolean;
  onClose: () => void;
  detail: HistoryTicket;
}

const DetailModal = ({ open, onClose, detail }: DetailModalProps) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={[<Button onClick={onClose}>關閉</Button>]}
      title="詳細內容"
    >
      <Flex
        className="history-ticket-region"
        justify="space-between"
        align="center"
      >
        <p className="title" style={{ margin: 0 }}>
          司機
        </p>
        <p className="content" style={{ margin: 0 }}>
          {detail.driver?.name}
        </p>
      </Flex>
      <Flex
        className="history-ticket-region"
        justify="space-between"
        align="center"
      >
        <p className="title" style={{ margin: 0 }}>
          車牌號碼
        </p>
        <p className="content" style={{ margin: 0 }}>
          {detail.driver?.plateNumber}
        </p>
      </Flex>
      <Flex
        className="history-ticket-region"
        justify="space-between"
        align="center"
      >
        <p className="title" style={{ margin: 0 }}>
          出發地點
        </p>
        <p className="content" style={{ margin: 0 }}>
          {detail.from}
        </p>
      </Flex>
      <Flex
        className="history-ticket-region"
        justify="space-between"
        align="center"
      >
        <p className="title" style={{ margin: 0 }}>
          抵達地點
        </p>
        <p className="content" style={{ margin: 0 }}>
          {detail.to}
        </p>
      </Flex>
      <Flex
        className="history-ticket-region"
        justify="space-between"
        align="center"
      >
        <p className="title" style={{ margin: 0 }}>
          出發時間
        </p>
        <p className="content" style={{ margin: 0 }}>
          {dayjs(detail.startDate).format("YYYY/MM/DD HH:mm")}
        </p>
      </Flex>
      <Flex
        className="history-ticket-region"
        justify="space-between"
        align="center"
      >
        <p className="title" style={{ margin: 0 }}>
          抵達時間
        </p>
        <p className="content" style={{ margin: 0 }}>
          {detail.endDate ? (
            dayjs(detail.endDate).format("YYYY/MM/DD HH:mm")
          ) : (
            <span style={{ color: "red" }}>尚未抵達</span>
          )}
        </p>
      </Flex>
      <hr style={{ margin: "10px 0px" }} />
      <Flex
        className="history-ticket-region"
        justify="space-between"
        align="center"
      >
        <p className="title" style={{ margin: 0 }}>
          總金額
        </p>
        <p className="content" style={{ margin: 0, color: "red" }}>
          {detail.price} 元
        </p>
      </Flex>
    </Modal>
  );
};

export default function History() {
  const [historyTicket, setHistoryTicket] = useState<HistoryTicket[]>([]);

  const [selectTicket, setSelectTicket] = useState<HistoryTicket>(
    {} as HistoryTicket
  );
  const [toggleDetail, { toggle: toggleDetailModal }] = useToggle();

  const { run } = useRequest(getCustomerHistory, {
    manual: true,
    onSuccess: ({ data }) => {
      setHistoryTicket(data);
    },
  });

  useEffect(() => {
    if (historyTicket.length > 0) {
      const items = document.querySelectorAll<HTMLElement>(".fadeIn-animation");
      items.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
      });
    }
  }, [historyTicket]);

  useEffect(() => {
    const token = window.localStorage.getItem("_token") as string;
    if (token) run(token);
  }, []);

  return (
    <>
      <ChatBot />
      <DetailModal
        open={toggleDetail}
        onClose={() => {
          toggleDetailModal();
        }}
        detail={selectTicket}
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
            歷史訂單
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
              height: "calc(100vh - 56px - 109px - 200px)",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            {historyTicket.length === 0 ? (
              <Empty description={"無資料"} />
            ) : (
              historyTicket.map((ticket) => {
                return (
                  <div
                    className="fadeIn-animation"
                    key={ticket.id}
                    onClick={() => {
                      setSelectTicket(ticket);
                      toggleDetailModal();
                    }}
                  >
                    <Row
                      gutter={16}
                      style={{ marginTop: "10px", marginBottom: "10px" }}
                    >
                      <Col span={10}>
                        <span
                          style={{
                            color: "#000",
                            fontSize: "1rem",
                            padding: "0px 20px",
                          }}
                        >
                          {dayjs(ticket.startDate).format("YYYY-MM-DD")}
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
                            textAlign: "right",
                          }}
                        >
                          {`從 ${ticket.from} 出發`}
                        </span>
                      </Col>
                    </Row>
                    <hr />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </Layout>
      <Footer />
    </>
  );
}
