import { UnorderedListOutlined } from "@ant-design/icons";
import { useToggle } from "ahooks";
import { Button, Col, Flex, message, Modal, Row } from "antd";
import { useRouter } from "next/navigation";
import { removeToken, tryGetName, tryGetToken } from "../../api/api";
import { useEffect, useState } from "react";

interface MenuModalProps {
  open: boolean;
  onClose: () => void;
}

const MenuModal = ({ open, onClose }: MenuModalProps) => {
  const router = useRouter();

  const handleMainPageClick = () => {
    router.push("/main-page");
    onClose();
  };

  const handleReserveClick = () => {
    router.push("/reserve");
    onClose();
  };

  const handleHistoryClick = () => {
    router.push("/history");
    onClose();
  };

  const handleLogoutClick = () => {
    removeToken();
    message.success("登出成功");
    router.push("/login");
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={<span style={{ fontSize: "1.2rem" }}>選單</span>}
      footer={[<></>]}
    >
      <p className="menu-item" onClick={handleMainPageClick}>
        首頁
      </p>
      <p className="menu-item" onClick={handleReserveClick}>
        預約復康巴士
      </p>
      <p className="menu-item" onClick={handleHistoryClick}>
        歷史訂單
      </p>
      <p className="menu-item" onClick={handleLogoutClick}>
        登出
      </p>
    </Modal>
  );
};

const Header = () => {
  const router = useRouter();
  const [toggleMenu, { toggle: toggleMenuModal }] = useToggle();
  const [isLogin, setIsLogin] = useState(false);

  const handleOpenMenu = () => {
    toggleMenuModal();
  };

  const handleRedirectLogin = () => {
    router.push("/login");
  };

  useEffect(() => {
    setIsLogin(tryGetToken());
  }, []);

  return (
    <>
      <MenuModal
        open={toggleMenu}
        onClose={() => {
          toggleMenuModal();
        }}
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
                onClick={handleRedirectLogin}
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

export default Header;
