import React, { useEffect, useState } from 'react'
import { Form, Input, Button } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import { get, put } from '../util/request'
import { auth, pwd } from '../util/api'
import { nicknameSave } from '../util/auth-storage'

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
            if (data) {
                nicknameSave(values['nickname'])
            }
        })
    }

    return (
        <Form form={form} layout="vertical" onFinish={SubmitHandler}>
            <Form.Item name="email" label="E-mail" hasFeedback
                rules={[
                    { required: true, message: 'Please input your E-mail!' },
                    { type: 'email', message: 'The input is not valid E-mail!' }]}>
                <Input prefix={<MailOutlined />} />
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

const Password = props => {
    const [loading, setLoading] = useState(0)
    const SubmitHandler = async values => {
        setLoading(1)
        put(pwd, values).then(data => { setLoading(0) })
    }
    return (
        <Form layout="vertical" onFinish={SubmitHandler}>
            <Form.Item name="oldpassword" label="Old Password" hasFeedback
                rules={[{ required: true, message: 'Please input old password!' }]}>
                <Input.Password prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item name="newpassword" label="New Password" hasFeedback
                rules={[{ required: true, message: 'Please input new password!' }]}>
                <Input.Password prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item name="repassword" label="Confirm New Password" dependencies={['newpassword']} hasFeedback
                rules={[
                    { required: true, message: 'Please confirm new password!' },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('newpassword') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('The two passwords do not match!');
                        },
                    }),
                ]}>
                <Input.Password prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item noStyle>
                <Button loading={loading} block type="primary" htmlType="submit">UPDATE</Button>
            </Form.Item>
        </Form>
    )
}

export default props => {
    return (
        <div className="Wrap">
            <div style={{
                width: 350,
                margin: '10px auto',
                boxShadow: '0 0 5px #ddd',
                borderRadius: 3,
                padding: 30
            }}>
                <Password />
            </div>
            <div style={{
                width: 350,
                margin: '0px auto',
                boxShadow: '0 0 5px #ddd',
                borderRadius: 3,
                padding: 30,
                marginBottom: 30
            }}>
                <Profile />
            </div>
        </div>
    )
}