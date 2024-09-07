import {Card, Col, Flex, Row} from 'antd';
import {useForm} from 'antd/lib/form/Form';

export default function Login() {
    const [form] = useForm();

    return (
        <Flex justify={'center'} align={"center"} style={{height: '100vh'}}>
            <Card style={{width: '80%'}} title={<span>台北市復康巴士</span>}>
                <Row>
                    <Col span={24}>
                        <Form form={form}>
                            <Form.Item name={"account"}>
                                <Input placeholder={"帳號"}/>
                            </Form.Item>
                            <Form.Item name={"password"}>
                                <Input placeholder={"密碼"}/>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </Flex>
    )
}