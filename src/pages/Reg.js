import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import { post } from '../util/request'
import { register } from '../util/api'
import { login } from '../router'

export default props => {
    const [loading, setLoading] = useState(0)
    let history = useHistory()
    const SubmitHandler = async values => {
        setLoading(1)
        post(register, values).then(data => {
            setLoading(0)
            if (data) {
                history.push(login.path)
            }
        })
    }

    return (
        <div style={{ height: '100%', display: 'flex', flexFlow: 'column', justifyContent: 'center' }}>
            <div style={{
                width: 350,
                margin: '0 auto',
                boxShadow: '0 0 5px #ddd',
                borderRadius: 3,
                padding: 30,
            }}>
                <Form layout="vertical" onFinish={SubmitHandler}>
                    <Form.Item name="email" label="E-mail" hasFeedback
                        rules={[
                            { required: true, message: 'Please input your E-mail!' },
                            { type: 'email', message: 'The input is not valid E-mail!' }]}>
                        <Input prefix={<MailOutlined />} />
                    </Form.Item>
                    <Form.Item name="password" label="Password" hasFeedback
                        rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password prefix={<LockOutlined />} />
                    </Form.Item>
                    <Form.Item name="repassword" label="Confirm Password" dependencies={['password']} hasFeedback
                        rules={[
                            { required: true, message: 'Please input your password!' },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('The two passwords do not match!');
                                },
                            }),
                        ]}>
                        <Input.Password prefix={<LockOutlined />} />
                    </Form.Item>
                    <Form.Item name="nickname" label="Nickname" hasFeedback
                        rules={[{ required: true, message: 'Please input your nickname!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button loading={loading} block type="primary" htmlType="submit">Register</Button>
                        <Link to={login.path} style={{ marginTop: 10, display: 'block', textAlign: 'center' }}>Login</Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}