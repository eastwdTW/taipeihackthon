"use client";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Row, Col, Flex, Button, Layout, Image } from "antd";
import { useEffect, useState } from "react";

const { Footer: AntdFooter } = Layout;

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const Header = () => {
  return (
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
  );
};

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [headerAndFooter, setHeaderAndFooter] = useState(false);

  useEffect(() => {
    const urlParams = window.location.pathname;
    const noHeaderAndFooterPath = ["/login", "/regist", "/forget-password"];

    if (!noHeaderAndFooterPath.includes(urlParams)) {
      setHeaderAndFooter(true);
    }
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {headerAndFooter && <Header />}
        {children}
        {headerAndFooter && <Footer />}
      </body>
    </html>
  );
}
