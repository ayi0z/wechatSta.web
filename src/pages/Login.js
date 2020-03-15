import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import { post } from '../util/request'
import { login } from '../util/api'
import { authSave, authClear } from '../util/auth-storage'
import { root, reg } from '../router'

export default props => {
    authClear()
    let history = useHistory()
    const SubmitHandler = async values => {
        await post(login, values)
            .then(res => {
                const { code, data } = res
                if (code === 200) {
                    authSave(data.token, data.nickname)
                    history.push(root.path)
                }
            })
    }

    return (
        <div style={{ height: '100%', display: 'flex', flexFlow: 'column', justifyContent: 'center' }}>
            <div style={{
                width: 300,
                margin: '0 auto',
                boxShadow: '0 0 5px #ddd',
                borderRadius: 3,
                padding: 30,
            }}>
                <Form layout="vertical" onFinish={SubmitHandler}>
                    <Form.Item name="email" label="E-mail" hasFeedback
                        rules={[{ required: true, message: 'Please input your e-mail!' }]}>
                        <Input prefix={<MailOutlined />} />
                    </Form.Item>
                    <Form.Item name="password" label="Password" hasFeedback
                        rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password prefix={<LockOutlined />} />
                    </Form.Item>
                    <Form.Item>
                        <Button block type="primary" htmlType="submit">Login</Button>
                        <Link to={reg.path} style={{ marginTop: 10, display: 'block', textAlign: 'center' }}>Register</Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}