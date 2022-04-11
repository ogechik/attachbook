import Image from 'next/image'
import {
  Row,
  Col,
  Button,
  Input,
  Typography,
  Form,
  Select,
  message,
} from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout from '../../components/Layout'
const { Title } = Typography
const { Option } = Select

export default function Register() {
  const router = useRouter()
  const [form] = Form.useForm()
  const [registering, setRegistering] = useState(false)
  const onFinish = (values) => signup(values)

  const signup = async (userDetails) => {
    setRegistering(true)
    const response = await fetch('/api/auth/register', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(userDetails),
    })

    if (response.status === 201) {
      setRegistering(false)
      message.success('Registered Successfully!')
      await router.push('/')
    } else if (response.status === 200) {
      setRegistering(false)
      message.warning('Already registered, proceed to login.')
    } else {
      const data = await response.json()
      setRegistering(false)
      message.warning(data.error)
    }
  }

  return (
    <Layout title="Attachbook|Register">
      <section style={{ paddingTop: '2rem' }}>
        <Row justify="center" align="middle">
          <Image
            src="/logo-sm.svg"
            alt="attachbook logo"
            height={64}
            width={64}
          />
        </Row>
        <Row justify="center" align="middle">
          <Title level={3} style={{ paddingTop: '1rem' }}>
            Sign Up
          </Title>
        </Row>
        <Row>
          <Col xs={{ span: 20, offset: 2 }} lg={{ span: 12, offset: 6 }}>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Row gutter={16}>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your First Name!',
                      },
                    ]}
                  >
                    <Input type="text" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Last Name!',
                      },
                    ]}
                  >
                    <Input type="text" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
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
                </Col>
              </Row>
              <Row>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                  <Form.Item
                    name="role"
                    label="Role?"
                    rules={[{ required: true, message: 'Please select Role!' }]}
                  >
                    <Select placeholder="select your role">
                      <Option value="1">Lecturer</Option>
                      <Option value="2">Supervisor(Company)</Option>
                      <Option value="4">Student</Option>
                      <Option value="3">Company</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Password!',
                      },
                      {
                        min: 8,
                        message: 'Password must be minimum 8 characters.',
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                  <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: 'Please confirm your password!',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve()
                          }
                          return Promise.reject(
                            new Error(
                              'The two passwords that you entered do not match!',
                            ),
                          )
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: '100%' }}
                  loading={registering}
                >
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </section>
    </Layout>
  )
}
