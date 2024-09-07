import { Layout, Image } from "antd";

const { Footer: AntdFooter } = Layout;

const Footer = () => {
  return (
    <AntdFooter
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
    </AntdFooter>
  );
};

export default Footer;
