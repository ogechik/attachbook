import {
  Typography,
  Row,
  Col,
  Divider,
  Form,
  Input,
  Button,
  message,
} from 'antd'
import { useState } from 'react'
import { useRouter } from 'next/router'
import StudentNav from '../../../components/student/navigation'
import Layout from '../../../components/Layout'
import GoBack from '../../../components/admin/GoBack'
const { Title } = Typography

export default function PostOpportunity() {
  const router = useRouter()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const onFinish = (values) => postOpportunity(values)

  const postOpportunity = async (details) => {
    setLoading(true)
    const response = await fetch('/api/c/post/attachment', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(details),
    })

    if (response.status === 201) {
      setLoading(false)
      message.success('Attachment Opportunity Posted')
      await router.push('/company')
    } else {
      setLoading(false)
      const data = await response.json()
      message.warning(data.error)
    }
  }

  return (
    <Layout title="post opportunity">
      <StudentNav />
      <Row>
        <Col
          lg={{ offset: 6, span: 18 }}
          xs={{ offset: 1, span: 22 }}
          style={{ marginBottom: '1rem' }}
        >
          <GoBack />
        </Col>
        <Col lg={{ offset: 6 }} xs={{ offset: 1 }}>
          <Title level={3}>Post new attachment</Title>
        </Col>
      </Row>
      <Divider />
      <Row justify="start">
        <Col xs={{ span: 22, offset: 1 }} lg={{ span: 12, offset: 6 }}>
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item
              label="Position"
              name="position"
              rules={[
                {
                  required: true,
                  message: 'Please input attachment opening position!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Responsibilities"
              name="responsibilities"
              rules={[
                {
                  required: true,
                  message: 'Please input expected responsibilities!',
                },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              label="Apply instructions"
              name="applyInstructions"
              rules={[
                {
                  required: true,
                  message: 'Please input applying instructions!',
                },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
                loading={loading}
              >
                Post
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Layout>
  )
}
