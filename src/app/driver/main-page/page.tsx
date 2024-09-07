"use client";
import {
  Layout,
  Button,
  Row,
  Col,
  Flex,
  Modal,
  Popconfirm,
  message,
} from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useRequest, useToggle } from "ahooks";
import { DriverCurrentOrder } from "../../../../interface/driver";
import Footer from "@/app/footer";
import DriverHeader from "../header";
import { driverArriveDestination, getDriverTicket } from "../../../../api/api";

interface DetailModalProps {
  open: boolean;
  onClose: () => void;
  detail: DriverCurrentOrder;
}

const DetailModal = ({ open, onClose, detail }: DetailModalProps) => {
  const { run } = useRequest(driverArriveDestination, {
    manual: true,
    onSuccess: () => {
      message.success("已成功完成訂單");
      onClose();
    },
    onError: () => {
      message.error("操作訂單失敗");
    },
  });

  const handleConfirm = () => {
    run(detail.id, detail.driverId);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={[
        <Button onClick={onClose}>關閉</Button>,
        <Popconfirm
          title="最後確認"
          description="確認已抵達目的地?"
          onConfirm={handleConfirm}
          okText="確定"
          cancelText="返回"
        >
          <Button type="primary">已抵達目的地</Button>
        </Popconfirm>,
      ]}
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
      <Flex className="history-ticket-region" justify="end" align="center">
        <Button
          type="link"
          target="_blank"
          className="content"
          style={{ margin: 0, fontSize: "1rem", padding: 0 }}
          href={`https://www.google.com/maps/dir/?api=1&origin=${detail.from}&destination=${detail.to}`}
        >
          點我快速導航
        </Button>
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
    </Modal>
  );
};

export default function DriverMainPage() {
  const [token, setToken] = useState<string>("");
  const [currentOrder, setCurrentOrder] = useState<DriverCurrentOrder[]>([]);
  const [selectOrder, setSelectOrder] = useState<DriverCurrentOrder>(
    {} as DriverCurrentOrder
  );
  const [toggleDetail, { toggle: toggleDetailModal }] = useToggle();

  const { run } = useRequest(getDriverTicket, {
    manual: true,
    onSuccess: ({ data }) => {
      setCurrentOrder(data);
    },
  });

  useEffect(() => {
    if (currentOrder.length > 0) {
      const items =
        document.querySelectorAll<HTMLElement>(".history-animation");
      items.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
      });
    }
  }, [currentOrder]);

  useEffect(() => {
    const token = window.localStorage.getItem("_token") as string;
    if (token) {
      setToken(token);
      run(token);
    }
  }, []);

  return (
    <>
      <DetailModal
        open={toggleDetail}
        onClose={() => {
          toggleDetailModal();
          run(token);
        }}
        detail={selectOrder}
      />
      <DriverHeader />
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
            訂單
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
            {currentOrder.map((order) => {
              return (
                <div
                  className="history-animation"
                  key={order.id}
                  onClick={() => {
                    setSelectOrder(order);
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
                        {dayjs(order.startDate).format("YYYY-MM-DD")}
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
                        {`從 ${order.from} 出發`}
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
