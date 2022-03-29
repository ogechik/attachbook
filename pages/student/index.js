import {
  Typography,
  Row,
  Col,
  Button,
  Form,
  Input,
  Divider,
  Select,
  message,
  DatePicker,
} from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'
import StudentNav from '../../components/student/navigation'
const { Title, Text } = Typography
const { Option } = Select

export default function StudentHome({ cookie }) {
  const router = useRouter()
  const [attachmentSession, setAttachmentSession] = useState(null)
  const [gettingSession, setGettingSession] = useState(false)
  const [settingUpAttachment, setSetttingUpAttachment] = useState(false)
  const onFinishCode = (value) => getAttachmentSession(value)
  const onFinishSetup = (values) => setupAttachment(values)

  const getAttachmentSession = async (value) => {
    setGettingSession(true)
    const response = await fetch(`/api/s/attachment/session/${value.code}`, {
      headers: { cookie },
    })
    if (response.status === 200) {
      const data = await response.json()
      setAttachmentSession(data)
      setGettingSession(false)
      message.success('Proceed to setup attachment')
    } else {
      const data = await response.json()
      setGettingSession(false)
      message.info(data.error)
    }
  }

  const setupAttachment = async (values) => {
    const attachmentDetails = {
      ...values,
      attachmentPeriod: attachmentSession._id,
    }

    setSetttingUpAttachment(true)

    const response = await fetch('/api/s/attachment/session/setup', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        cookie,
      },
      method: 'post',
      body: JSON.stringify(attachmentDetails),
    })

    if (response.status === 201) {
      setSetttingUpAttachment(false)
      message.success('Attachment setup successful')
      await router.push('/student/logbook')
    } else {
      const data = await response.json()
      setSetttingUpAttachment(false)
      message.info(data.error)
    }
  }

  return (
    <>
      <StudentNav />

      <section>
        <Row justify="center">
          <Title level={4}>Attachment Session Setup</Title>
        </Row>
        <Divider />
        {!attachmentSession && (
          <Row justify="center">
            <Col xs={{ span: 22 }} lg={{ span: 6 }}>
              <Form onFinish={onFinishCode} layout="vertical">
                <Form.Item
                  label="Attachment session code "
                  name="code"
                  rules={[
                    { required: true, message: 'Please input the code!' },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={gettingSession}
                  >
                    Get Session
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        )}
      </section>

      {attachmentSession && (
        <section>
          <Row justify="center">
            <Text strong>Attachment session : </Text>
            <p>{attachmentSession?.cohort}</p>
          </Row>
          <Row justify="center">
            <Col xs={{ span: 22 }} lg={{ span: 6 }}>
              <Form onFinish={onFinishSetup} layout="vertical">
                <Form.Item
                  label="Registration No."
                  name="registrationNo"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your registration number!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Supervisor(Company)"
                  name="supervisorEmail"
                  rules={[
                    {
                      required: true,
                      message: 'Please input the company supervisor email!',
                    },
                  ]}
                >
                  <Input type="email" placeholder="email" />
                </Form.Item>
                <Form.Item
                  name="lecturer"
                  label="Assigned Lecturer?"
                  rules={[
                    {
                      required: true,
                      message: 'Please select assigned lecturer!',
                    },
                  ]}
                >
                  <Select placeholder="select lecturer">
                    {attachmentSession.lecturers.map((lecturer) => (
                      <Option value={lecturer._id} key={lecturer._id}>
                        {`${lecturer.firstName} ${lecturer.lastName}`}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="startDate" label="Start date">
                  <DatePicker />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={settingUpAttachment}
                  >
                    Setup Attachment
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </section>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const { cookie } = context.req.headers

  return {
    props: { cookie },
  }
}
