"use client";
import {
  Image,
  Layout,
  Button,
  Form,
  Input,
  DatePicker,
  Select,
  message,
  Modal,
  Flex,
  Popconfirm,
} from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import { getAllCar, reserveCar } from "../../../api/api";
import { useForm } from "antd/lib/form/Form";
import { CarOutlined, FlagOutlined, PushpinOutlined } from "@ant-design/icons";
import { AvailableCarDto, CarType } from "../../../interface/reserve";
import { useRequest, useToggle } from "ahooks";
import Footer from "../footer";
import Header from "../header";
import { useRouter } from "next/navigation";
import ChatBot from "../../../component/chatbot";

interface ResultModalProps {
  open: boolean;
  onClose: () => void;
  availableCar: AvailableCarDto[];
  clientSelectCar: ClientSelectCar;
}

interface ClientSelectCar {
  startDate: string;
  from: string;
  to: string;
}

const ResultModal = ({
  open,
  onClose,
  availableCar,
  clientSelectCar,
}: ResultModalProps) => {
  const router = useRouter();
  const [selectCar, setSelectCar] = useState<number>(-1);

  const handleCloseModal = () => {
    setSelectCar(-1);
    onClose();
  };

  const handleSelectCar = (index: number) => {
    setSelectCar(index);
  };

  const handleConfirm = () => {
    run({
      startDate: dayjs(clientSelectCar.startDate).format("YYYY/MM/DD HH:mm:ss"),
      from: clientSelectCar.from,
      to: clientSelectCar.to,
      customerid: window.localStorage.getItem("_token") as string,
      carType: availableCar[selectCar].carType,
    });
  };

  const { run } = useRequest(reserveCar, {
    manual: true,
    onSuccess: () => {
      message.success("預約成功");
      handleCloseModal();
      router.push("/history");
    },
    onError: () => {
      message.error("預約失敗");
    },
  });

  return (
    <Modal
      open={open}
      onCancel={handleCloseModal}
      title="搜尋結果"
      footer={[
        <Button
          key="cancel"
          onClick={handleCloseModal}
          style={{ marginRight: "10px" }}
        >
          返回
        </Button>,
        <Popconfirm
          title="最後確認"
          description="確定要選擇這台車嗎？"
          onConfirm={handleConfirm}
          okText="確定"
          cancelText="返回"
        >
          <Button key="submit" type="primary" disabled={selectCar === -1}>
            確定
          </Button>
          ,
        </Popconfirm>,
      ]}
    >
      <div
        style={{
          height: "60vh",
          overflowY: "scroll",
        }}
      >
        {availableCar.map((car, index) => (
          <div
            onClick={() => {
              handleSelectCar(index);
            }}
          >
            {index > 0 && <hr />}
            <div
              className={`car-display ${
                index === selectCar && selectCar !== -1 ? "box" : ""
              }`}
            >
              <Flex justify="space-between" align="center">
                <Image src="/car.png" preview={false} width="100px" />
                <div style={{ fontWeight: "bolder", marginLeft: "10px" }}>
                  {car.carType}
                </div>
              </Flex>
              <div style={{ fontWeight: "bolder" }}>{car.price}元</div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default function MainPage() {
  const [form] = useForm();
  const [availableCar, setAvailableCar] = useState<AvailableCarDto[]>([]);
  const [toggleResult, { toggle: toggleResultModal }] = useToggle();

  const disabledDate = (current: dayjs.Dayjs) => {
    return current && current < dayjs().startOf("day");
  };

  const handleSearch = () => {
    form.validateFields().then((values) => {
      run(values);
    });
  };

  const { run } = useRequest(getAllCar, {
    manual: true,
    onSuccess: ({ data }) => {
      setAvailableCar(data);
      toggleResultModal();
    },
    onError: () => {
      message.error("查詢失敗");
    },
  });

  return (
    <>
      <ChatBot />
      <Header />
      <Layout>
        <ResultModal
          open={toggleResult}
          onClose={() => {
            toggleResultModal();
          }}
          availableCar={availableCar}
          clientSelectCar={form.getFieldsValue() as ClientSelectCar}
        />
        <div
          style={{
            backgroundColor: "#fff",
            height: "calc(100vh - 56px - 109px)",
            paddingTop: "40px",
          }}
        >
          <p
            className="reserve-animation"
            style={{
              color: "#000",
              fontWeight: "bolder",
              fontSize: "2rem",
              paddingLeft: "20px",
            }}
          >
            無障礙行，復康同行
          </p>
          <p
            className="reserve-animation"
            style={{
              color: "#000",
              fontWeight: "bolder",
              fontSize: "1rem",
              paddingLeft: "20px",
            }}
          >
            預約搭乘，安心出發
          </p>
          <Form
            form={form}
            style={{
              marginTop: "20px",
            }}
            initialValues={{
              startDate: dayjs().add(10, "m"),
            }}
          >
            <Form.Item
              className="fadeIn-animation"
              name="from"
              rules={[
                {
                  required: true,
                  message: "請輸入出發地",
                },
              ]}
              style={{
                width: "90%",
                marginLeft: "20px",
              }}
            >
              <Input
                style={{
                  padding: "10px",
                }}
                prefix={<PushpinOutlined />}
                placeholder={"請輸入出發地"}
                className="custom-placeholder"
              />
            </Form.Item>
            <Form.Item
              className="fadeIn-animation"
              name="to"
              rules={[
                {
                  required: true,
                  message: "請輸入目的地",
                },
              ]}
              style={{
                width: "90%",
                marginLeft: "20px",
              }}
            >
              <Input
                style={{
                  padding: "10px",
                }}
                prefix={<FlagOutlined />}
                placeholder={"請輸入目的地"}
                className="custom-placeholder"
              />
            </Form.Item>
            <Form.Item
              className="fadeIn-animation"
              name="carType"
              rules={[
                {
                  required: true,
                  message: "請選擇車種",
                },
              ]}
              style={{
                width: "90%",
                marginLeft: "20px",
              }}
            >
              <Select
                style={{
                  height: "45px",
                  lineHeight: "45px",
                }}
                suffixIcon={<CarOutlined />}
                placeholder={"請選擇車種"}
                className="custom-placeholder"
                options={Object.keys(CarType).map((type) => {
                  return {
                    value: type,
                    label: type,
                  };
                })}
              />
            </Form.Item>
            <Form.Item
              className="fadeIn-animation"
              name="startDate"
              rules={[
                {
                  required: true,
                  message: "請輸入出發時間",
                },
              ]}
              style={{
                width: "90%",
                marginLeft: "20px",
              }}
            >
              <DatePicker
                style={{
                  padding: "10px",
                  width: "100%",
                }}
                placeholder={"請輸入出發時間"}
                className="custom-placeholder"
                showTime={{ format: "HH:mm" }}
                format={"YYYY-MM-DD HH:mm"}
                disabledDate={disabledDate}
              />
            </Form.Item>
          </Form>
          <Button
            className="fadeIn-animation"
            style={{
              backgroundColor: "#5bb3c4",
              color: "#fff",
              marginLeft: "20px",
              fontWeight: "bolder",
              fontSize: "1rem",
            }}
            onClick={handleSearch}
          >
            查詢
          </Button>
        </div>
      </Layout>
      <Footer />
    </>
  );
}
