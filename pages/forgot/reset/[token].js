import { Button, Col, Form, Input, Row, Typography, message } from 'antd'
import Image from 'next/image'
import jwt from 'jsonwebtoken'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../../components/Layout'
const { Title } = Typography

export default function ChangePassword({ userId }) {
  const router = useRouter()
  const [resetting, setResetting] = useState(false)
  const onFinish = (value) => changePassword(value)

  const changePassword = async (data) => {
    const changeDetails = {
      userId,
      password: data.password,
    }
    setResetting(true)
    const response = await fetch('/api/auth/reset', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(changeDetails),
    })

    if (response.status === 200) {
      setResetting(false)
      message.success('Password reset successful')
      await router.push('/')
    } else {
      setResetting(false)
      message.warning('Password reset failed')
    }
  }

  return (
    <Layout title="Attachbook|Change Password">
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
            Change Your Password
          </Title>
        </Row>
        <Row>
          <Col xs={{ span: 20, offset: 2 }} lg={{ span: 6, offset: 9 }}>
            <p style={{ marginTop: '1rem', marginBottom: '2rem' }}>
              Please enter a new password.
            </p>
            <Form layout="vertical" onFinish={onFinish}>
              <Row>
                <Col span={24}>
                  <Form.Item
                    label="New password"
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
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="confirm"
                    label="Confirm new password"
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
                  loading={resetting}
                >
                  Reset
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </section>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { token } = context.params
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    return { props: { userId: decodedToken.user._id } }
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/forgot',
      },
      props: {},
    }
  }
}
