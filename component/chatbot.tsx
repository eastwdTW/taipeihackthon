"use client";
import { SmileOutlined } from "@ant-design/icons";
import { useRequest, useToggle } from "ahooks";
import { Button, Card, Flex, FloatButton, Modal, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { sendFAQ } from "../api/api";

interface ChatModalProps {
  open: boolean;
  onClose: () => void;
}

enum ChatQuestion {
  "服務項目" = "請問新北市復康巴士的服務項目、範圍、時間及費用為何？",
  "訂車方式" = "請問新北市復康巴士的訂車方式為何？",
  "訂車資格" = "請問新北市復康巴士訂車的資格為何？",
}

const ChatModal = ({ open, onClose }: ChatModalProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<JSX.Element>(
    <div className={`message received`}>
      <div className="text">
        您好，我是復康巴士小幫手，可以點擊下方按鈕問問題！
      </div>
      <div className="timestamp received">{dayjs().format("HH:mm")}</div>
    </div>
  );

  const addMessage = (text: string, isSent: boolean) => {
    const newMessage = (
      <div className={`message ${isSent ? "sent" : "received"}`}>
        <div className="text">{text}</div>
        <div className={`timestamp ${isSent ? "" : "received"}`}>
          {dayjs().format("HH:mm")}
        </div>
      </div>
    );

    setMessage((prev) => (
      <>
        {prev}
        {newMessage}
      </>
    ));
  };

  const sendMessage = (message: ChatQuestion) => {
    addMessage(message, true);
    run(message);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { run } = useRequest(sendFAQ, {
    manual: true,
    onSuccess: ({ data }) => {
      setTimeout(() => {
        addMessage(data.answer, false);
      }, 1000);
    },
  });

  useEffect(() => {
    scrollToBottom();
  }, [message]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title="常見問題"
      footer={[<Button onClick={onClose}>關閉</Button>]}
    >
      <Card
        ref={messagesEndRef}
        style={{ padding: "10px 0px", height: "500px", overflowY: "scroll" }}
      >
        {message}
      </Card>
      <Flex
        justify="space-between"
        align="center"
        style={{ marginTop: "30px" }}
      >
        <Button
          type="primary"
          onClick={() => {
            sendMessage(ChatQuestion["服務項目"]);
          }}
        >
          服務項目
        </Button>
        <Button
          type="primary"
          onClick={() => {
            sendMessage(ChatQuestion["訂車方式"]);
          }}
        >
          訂車方式
        </Button>
        <Button
          type="primary"
          onClick={() => {
            sendMessage(ChatQuestion["訂車資格"]);
          }}
        >
          訂車資格
        </Button>
      </Flex>
    </Modal>
  );
};

export default function ChatBot() {
  const [defaultOpen, setDefaultOpen] = useState(false);
  const [toggleChat, { toggle: toggleChatModal }] = useToggle();

  const handleChatClick = () => {
    toggleChatModal();
  };

  const handleChatClose = () => {
    toggleChatModal();
  };

  useEffect(() => {
    setTimeout(() => {
      setDefaultOpen(true);

      setTimeout(() => {
        setDefaultOpen(false);
      }, 3000);
    }, 1000);
  }, []);

  return (
    <>
      <ChatModal open={toggleChat} onClose={handleChatClose} />
      <Tooltip
        title="相關問題都可以詢問我！"
        placement="left"
        open={defaultOpen}
      >
        <FloatButton
          type="primary"
          icon={<SmileOutlined style={{ color: "#fff" }} />}
          shape="circle"
          style={{ insetInlineEnd: 24 }}
          badge={{ dot: true }}
          onClick={handleChatClick}
        />
      </Tooltip>
    </>
  );
}
