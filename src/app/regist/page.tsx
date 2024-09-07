'use client';
import {Button, Card, Col, Flex, Form, Input, Row} from 'antd';
import {EyeInvisibleOutlined, EyeTwoTone, UserOutlined} from '@ant-design/icons';
import React, {useState} from 'react';

export default function Login() {
    const [form] = Form.useForm();
    const [passwordVisible, setPasswordVisible] = useState(false);
    return (
        <Flex justify={'center'} align={"center"} style={{height: '100vh', backgroundColor: '#f0f0f0f0'}}>
            <Card
                styles={{
                    header: {
                        backgroundColor: '#000',
                        color: '#fff',

                    }
                }}
                style={{width: '80%', border: '2px solid #000', borderRadius: '10px'}}
                title={<span>台北市復康巴士 - 註冊</span>}>
                <Row>
                    <Col span={24}>
                        <Form form={form}>
                            <Form.Item name="account">
                                <Input prefix={<UserOutlined/>} placeholder={"請輸入註冊帳號"}/>
                            </Form.Item>
                            <Form.Item name="password">
                                <Input.Password
                                    placeholder="請輸入註冊密碼"
                                    iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                                />
                            </Form.Item>
                            <Form.Item
                                name="checkPassword"
                                rules={[{
                                    validator: (rule, value) => {
                                        if (value !== form.getFieldValue('password')) {
                                            return Promise.reject('密碼不一致');
                                        } else {
                                            return Promise.resolve();
                                        }
                                    }
                                }]}>
                                <Input.Password
                                    placeholder="再次輸入註冊密碼"
                                    iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                                />
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={24}>
                        <Flex justify={"space-between"} align={'center'}>
                            <div>
                                <Button type={"link"} style={{padding: 0}}>忘記密碼</Button>
                            </div>
                            <div>
                                <Button style={{marginRight: '5px'}}>註冊</Button>
                                <Button type="primary">登入</Button>
                            </div>
                        </Flex>
                    </Col>
                </Row>
            </Card>
        </Flex>
    )
}