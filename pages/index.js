import Image from 'next/image'
import Link from 'next/link'
import {
  Row,
  Col,
  Button,
  Input,
  Typography,
  Form,
  message,
  Divider,
} from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout from '../components/Layout'
const { Title } = Typography

export default function Home() {
  const router = useRouter()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const onFinish = (values) => login(values)

  const login = async (credentials) => {
    setLoading(true)
    const response = await fetch('/api/auth/login', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(credentials),
    })

    if (response.status === 200) {
      const data = await response.json()
      const { role } = data
      setLoading(false)
      switch (role) {
        case 1:
          await router.push('/lecturer')
          break
        case 2:
          await router.push('/supervisor')
          break
        case 3:
          await router.push('/company')
          break
        case 4:
          await router.push('/student')
          break
        default:
          await router.push('/')
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
    <Layout title="Attachbook|Login">
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
            Attachbook
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
              <Link href="/forgot" style={{ marginTop: '2rem' }}>
                Forgot Password?
              </Link>
              <Divider />
              Or{' '}
              <Link href="/auth/register" style={{ marginBottom: '2rem' }}>
                register now!
              </Link>
            </Form>
          </Col>
        </Row>
      </section>
    </Layout>
  )
}
