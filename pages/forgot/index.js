import Image from 'next/image'
import { Row, Col, Button, Input, Typography, Form, message, Alert } from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout from '../../components/Layout'
const { Title } = Typography

export default function Forgot({ text }) {
  const router = useRouter()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const onFinish = (values) => reset(values)

  const reset = async (credentials) => {
    setLoading(true)
    const response = await fetch('/api/auth/forgot', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(credentials),
    })

    if (response.status === 200) {
      const data = await response.json()
      if (!data.error) {
        message.success(data.msg)
        setLoading(false)
        setShowSuccess(true)
      } else if (data.error) {
        setLoading(false)
        message.warning(data.error)
        setShowSuccess(false)
      }
    } else if (response.status === 404) {
      const error = await response.json()
      message.warning(error.error)
      setLoading(false)
    } else {
      const error = await response.json()
      message.warning(error.error)
      setLoading(false)
    }
  }

  return (
    <Layout title="Attachbook|Reset Password">
      <section style={{ paddingTop: '4rem' }}>
        <Row justify="center" align="middle">
          <Image
            src="/logo-sm.svg"
            alt="attachbook logo"
            height={64}
            width={64}
          />
        </Row>
        <p>{text && text}</p>
        <Row justify="center" align="middle">
          <Title level={2} style={{ paddingTop: '1rem' }}>
            Reset Your Password
          </Title>
        </Row>
        {showSuccess && (
          <Row>
            <Col xs={{ span: 20, offset: 2 }} lg={{ span: 6, offset: 9 }}>
              <Alert
                message="Email Sent"
                description="Please check your email for the next steps in resetting you password"
                type="success"
                showIcon
              />
            </Col>
          </Row>
        )}
        {!showSuccess && (
          <Row>
            <Col xs={{ span: 20, offset: 2 }} lg={{ span: 6, offset: 9 }}>
              <p style={{ marginTop: '1rem', marginBottom: '2rem' }}>
                Please enter the email you used to setup your account.
              </p>
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Email!',
                    },
                  ]}
                >
                  <Input type="email" />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: '100%' }}
                    loading={loading}
                  >
                    Reset
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        )}
      </section>
    </Layout>
  )
}
