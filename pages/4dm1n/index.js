import Image from 'next/image'
import { Row, Col, Button, Input, Typography, Form, message } from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout from '../../components/Layout'
const { Title } = Typography

export default function AdminLogin() {
  const router = useRouter()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const onFinish = (values) => adminLogin(values)

  const adminLogin = async (credentials) => {
    setLoading(true)
    const response = await fetch('/api/a/auth/login', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(credentials),
    })

    if (response.status === 200) {
      const data = await response.json()
      setLoading(false)
      await router.push('/4dm1n/dash')
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
    <Layout title="Attachbook|AdminLogin">
      <section style={{ paddingTop: '4rem' }}>
        <Row justify="center" align="middle">
          <Image
            src="/logo-sm.svg"
            alt="attachbook logo"
            height={64}
            width={64}
          />
        </Row>
        <Row justify="center" align="middle">
          <Title level={2} style={{ paddingTop: '1rem' }}>
            Administrator
          </Title>
        </Row>
        <Row>
          <Col xs={{ span: 20, offset: 2 }} lg={{ span: 6, offset: 9 }}>
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
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: '100%' }}
                  loading={loading}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </section>
    </Layout>
  )
}
