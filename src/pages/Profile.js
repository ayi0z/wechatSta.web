import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Checkbox, InputNumber } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import { get, put, post } from '../util/request'
import { auth, pwd, smtp } from '../util/api'
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


const Smtp = props => {
    const [loading, setLoading] = useState(1)
    const [form] = Form.useForm()

    const sycnProfile = () => {
        get(smtp).then(data => {
            setLoading(0)
            if (data) {
                form.setFieldsValue(data)
            }
        })
    }

    useEffect(sycnProfile, [])

    const SubmitHandler = values => {
        setLoading(1)
        values.secure = values.secure ? 1 : 0
        values.del_on = values.del_on ? 1 : 0
        post(smtp, values).then(data => {
            setLoading(0)
            if (data) {
                form.setFieldsValue(data)
            }
        })
    }
    return (
        <Form form={form} layout="vertical" onFinish={SubmitHandler}
            initialValues={{
                port: 465,
                secure: 1,
                del_on: 0,
            }}
        >
            < Form.Item label="id" name="id" noStyle >
                <Input style={{ display: 'none' }} />
            </Form.Item>
            <Form.Item name="host" label="SMTP Host" hasFeedback
                rules={[{ required: true, message: 'Please input smtp host!' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="SMTP Port" style={{ marginBottom: 0 }}>
                <Form.Item name="port" hasFeedback
                    style={{ display: 'inline-block', width: 'calc(50% - 5px)', marginRight: 8 }}
                    rules={[{ required: true, message: 'Please input smpt port!' }]}>
                    <InputNumber prefix={<LockOutlined />} min={0} max={65535} />
                </Form.Item>
                <Form.Item name="secure"
                    style={{ display: 'inline-block', width: 'calc(50% - 5px)' }}
                    valuePropName="checked">
                    <Checkbox>SSL</Checkbox>
                </Form.Item>
            </Form.Item>
            <Form.Item name="authpass" label="Password" hasFeedback
                rules={[{ required: true, message: 'Please input new password!' }]}>
                <Input prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item name="reauthpass" label="Confirm Password" dependencies={['authpass']} hasFeedback
                rules={[
                    { required: true, message: 'Please confirm password!' },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('authpass') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('The two passwords do not match!');
                        },
                    }),
                ]}>
                <Input prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item name="del_on" valuePropName="checked">
                <Checkbox>Unsubscribe and stop receiving mail.</Checkbox>
            </Form.Item>
            <Form.Item noStyle>
                <Button loading={loading} block type="primary" htmlType="submit">SAVE</Button>
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
                padding: 30
            }}>
                <Password />
            </div>
            <div style={{
                margin: '10px auto',
                boxShadow: '0 0 5px #ddd',
                borderRadius: 3,
                padding: 30,
            }}>
                <Profile />
            </div>
            <div style={{
                margin: '10px auto',
                boxShadow: '0 0 5px #ddd',
                borderRadius: 3,
                padding: 30,
            }}>
                <Smtp />
            </div>
        </div>
    )
}