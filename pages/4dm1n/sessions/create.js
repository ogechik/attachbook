import {
  Divider,
  Typography,
  Row,
  Col,
  Button,
  Form,
  Select,
  DatePicker,
  message,
} from 'antd'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AdminLayout from '../../../components/admin/AdminLayout'
import GoBack from '../../../components/admin/GoBack'
const { Title } = Typography
const { Option } = Select

export default function CreateSession() {
  const router = useRouter()
  const [lecturers, setLecturers] = useState([])
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    const fetchLecturers = async () => {
      const response = await fetch('/api/a/lecturers')
      if (response.status === 200) {
        const data = await response.json()
        setLecturers(data)
      }
    }
    fetchLecturers()
  }, [])

  const onFinish = (values) => createSession(values)

  const createSession = async (values) => {
    setCreating(true)
    const response = await fetch('/api/a/attachment/session/new', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(values),
    })
    if (response.status === 201) {
      setCreating(false)
      await router.push('/4dm1n/dash')
      message.success('New session created.')
    } else {
      setCreating(false)
      message.warning('could not create session')
    }
  }
  return (
    <AdminLayout title="Admin|Home">
      <Row>
        <Col span={24}>
          <Title level={3}>Attachment Sessions</Title>
        </Col>
      </Row>
      <Divider />
      <Row justify="space-between" align="middle">
        <GoBack />
      </Row>
      <Divider />
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 16 }}>
          <Title level={5} style={{ marginBottom: '1.5rem' }}>
            Create New Session
          </Title>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="lecturers"
              label="Lecturers"
              rules={[
                {
                  required: true,
                  message: 'Please select lecturers!',
                },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select lecturers"
                defaultValue={[]}
                // onChange={handleChange}
              >
                {lecturers.map((lecturer) => (
                  <Option key={lecturer._id}>
                    {`${lecturer.firstName} ${lecturer.lastName}`}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Row gutter={24}>
              <Col>
                <Form.Item
                  name="startDate"
                  label="Start date"
                  rules={[
                    {
                      required: true,
                      message: 'Please select a start date!',
                    },
                  ]}
                >
                  <DatePicker />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  name="endDate"
                  label="End date"
                  rules={[
                    {
                      required: true,
                      message: 'Please select an end date!',
                    },
                  ]}
                >
                  <DatePicker />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%', marginTop: '1.75rem' }}
                loading={creating}
              >
                Create Session
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </AdminLayout>
  )
}
