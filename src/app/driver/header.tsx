import { UnorderedListOutlined } from "@ant-design/icons";
import { useRequest, useToggle } from "ahooks";
import { Badge, Button, Col, Flex, message, Modal, Row } from "antd";
import { useRouter } from "next/navigation";
import {
  getDriverTicket,
  removeToken,
  tryGetName,
  tryGetToken,
} from "../../../api/api";
import { useEffect, useState } from "react";

interface MenuModalProps {
  open: boolean;
  onClose: () => void;
  orderCount: number;
}

const MenuModal = ({ open, onClose, orderCount }: MenuModalProps) => {
  const router = useRouter();

  const handleMainPageClick = () => {
    router.push("/driver/main-page");
    onClose();
  };

  const handleHistoryClick = () => {
    router.push("/driver/history");
    onClose();
  };

  const handleLogoutClick = () => {
    removeToken();
    message.success("登出成功");
    router.push("/driver/login");
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={<span style={{ fontSize: "1.2rem" }}>選單</span>}
      footer={[<></>]}
    >
      <div className="menu-item">
        <Badge count={orderCount}>
          <p
            style={{ fontSize: "1.2rem", fontWeight: "bolder" }}
            onClick={handleMainPageClick}
          >
            訂單
          </p>
        </Badge>
      </div>
      <p className="menu-item" onClick={handleHistoryClick}>
        歷史訂單
      </p>
      <p className="menu-item" onClick={handleLogoutClick}>
        登出
      </p>
    </Modal>
  );
};

const DriverHeader = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [orderCount, setOrderCount] = useState<number>(0);
  const [toggleMenu, { toggle: toggleMenuModal }] = useToggle();

  const handleOpenMenu = () => {
    toggleMenuModal();
  };

  const handleLogin = () => {
    router.push("/driver/login");
  };

  const { run } = useRequest(getDriverTicket, {
    manual: true,
    onSuccess: ({ data }) => {
      setOrderCount(data.length);
    },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    setIsLogin(tryGetToken());
    const token = window.localStorage.getItem("_token") as string;
    if (token) {
      timer = setInterval(() => {
        run(token);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <>
      <MenuModal
        open={toggleMenu}
        onClose={() => {
          toggleMenuModal();
        }}
        orderCount={orderCount}
      />
      <Row
        style={{
          padding: "10px 10px",
          backgroundColor: "#fff",
          width: "100%",
          color: "#000",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          position: "sticky",
        }}
      >
        <Col span={4}>
          <Flex
            justify="center"
            align="center"
            style={{ width: "100%", height: "100%" }}
            onClick={handleOpenMenu}
          >
            <Badge count={orderCount}>
              <UnorderedListOutlined
                style={{ color: "#5bb3c4", fontSize: "1.5rem" }}
              />
            </Badge>
          </Flex>
        </Col>
        <Col span={16}>
          <Flex
            justify="center"
            align="center"
            style={{ width: "100%", height: "100%" }}
          >
            <span style={{ fontWeight: "bolder", fontSize: "1.5rem" }}>
              台北市復康巴士 - 司機
            </span>
          </Flex>
        </Col>
        <Col span={4}>
          <Flex
            justify="center"
            align="center"
            style={{ width: "100%", height: "100%" }}
          >
            {isLogin ? (
              <span>Hi！{tryGetName()}</span>
            ) : (
              <Button
                style={{
                  backgroundColor: "#5bb3c4",
                  border: 0,
                  color: "#fff",
                  fontWeight: "bolder",
                }}
                onClick={handleLogin}
              >
                登入
              </Button>
            )}
          </Flex>
        </Col>
      </Row>
    </>
  );
};

export default DriverHeader;
