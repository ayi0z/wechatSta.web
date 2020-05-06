import React, { useEffect, useState } from 'react'
import { Form, Input, Button } from 'antd'
import { MailOutlined } from '@ant-design/icons'
import { get, put } from '../util/request'
import { auth } from '../util/api'

const Profile = props => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(1)

    const sycnProfile = () => {
        get(auth).then(data => {
            setLoading(0)
            if (data) {
                form.setFieldsValue(data)
            }
        })
    }

    useEffect(sycnProfile, [])

    const SubmitHandler = values => {
        setLoading(1)
        put(auth, values).then(data => {
            setLoading(0)
        })
    }

    return (
        <Form form={form} layout="vertical" onFinish={SubmitHandler}>
            <Form.Item name="email" label="E-mail" hasFeedback>
                <Input prefix={<MailOutlined />} readOnly />
            </Form.Item>
            <Form.Item name="nickname" label="Nickname" hasFeedback
                rules={[{ required: true, message: 'Please input your nickname!' }]}>
                <Input />
            </Form.Item>
            <Form.Item noStyle>
                <Button loading={loading} block type="primary" htmlType="submit">UPDATE</Button>
            </Form.Item>
        </Form>
    )
}

export default props => {
    return (
        <div className="Wrap" style={{ flexFlow: 'wrap', alignItems: 'flex-start' }}>
            <div style={{
                margin: '10px auto',
                boxShadow: '0 0 5px #ddd',
                borderRadius: 3,
                padding: 30,
            }}>
                <Profile />
            </div>
        </div>
    )
}