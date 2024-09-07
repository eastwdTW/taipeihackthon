"use client";
import { Layout, Button, Row, Col, Flex, Modal } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Header from "../header";
import { useToggle } from "ahooks";
import Footer from "@/app/footer";

interface HistoryTicket {
  id: number;
  startDate: string;
  endDate: string;
  from: string;
  to: string;
  price: number;
  customer: {
    name: string;
    phone: string;
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
          乘客姓名
        </p>
        <p className="content" style={{ margin: 0 }}>
          {detail.customer?.name}
        </p>
      </Flex>
      <Flex
        className="history-ticket-region"
        justify="space-between"
        align="center"
      >
        <p className="title" style={{ margin: 0 }}>
          乘客手機
        </p>
        <p className="content" style={{ margin: 0 }}>
          {detail.customer?.phone}
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
          {dayjs(detail.endDate).format("YYYY/MM/DD HH:mm")}
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
  const [historyTicket, setHistoryTicket] = useState<HistoryTicket[]>([
    {
      id: 1,
      startDate: "2024-09-01",
      endDate: "2024-09-01",
      from: "New York, NY",
      to: "Boston, MA",
      price: 150.5,
      customer: {
        name: "John Doe",
        phone: "555-1234",
      },
    },
    {
      id: 2,
      startDate: "2024-09-02",
      endDate: "2024-09-02",
      from: "Los Angeles, CA",
      to: "San Francisco, CA",
      price: 200.75,
      customer: {
        name: "Jane Smith",
        phone: "555-5678",
      },
    },
    {
      id: 3,
      startDate: "2024-09-03",
      endDate: "2024-09-03",
      from: "Chicago, IL",
      to: "Detroit, MI",
      price: 120.0,
      customer: {
        name: "Mike Johnson",
        phone: "555-8765",
      },
    },
    {
      id: 4,
      startDate: "2024-09-04",
      endDate: "2024-09-04",
      from: "Houston, TX",
      to: "Dallas, TX",
      price: 180.25,
      customer: {
        name: "Sara Davis",
        phone: "555-4321",
      },
    },
    {
      id: 5,
      startDate: "2024-09-05",
      endDate: "2024-09-05",
      from: "Miami, FL",
      to: "Orlando, FL",
      price: 140.5,
      customer: {
        name: "Chris Lee",
        phone: "555-9876",
      },
    },
  ]);

  const [selectTicket, setSelectTicket] = useState<HistoryTicket>(
    {} as HistoryTicket
  );
  const [toggleDetail, { toggle: toggleDetailModal }] = useToggle();

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(".history-animation");
    items.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`;
    });
  }, []);

  return (
    <>
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
            {historyTicket.map((ticket) => {
              return (
                <div
                  className="history-animation"
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
            })}
          </div>
        </div>
      </Layout>
      <Footer />
    </>
  );
}
