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

export default function StudentHome({ attachment }) {
  const router = useRouter()
  const [attachmentSession, setAttachmentSession] = useState(null)
  const [gettingSession, setGettingSession] = useState(false)
  const [settingUpAttachment, setSettingUpAttachment] = useState(false)
  const onFinishCode = (value) => getAttachmentSession(value)
  const onFinishSetup = (values) => setupAttachment(values)

  const getAttachmentSession = async (value) => {
    setGettingSession(true)
    const response = await fetch(`/api/s/attachment/session/${value.code}`)
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

    setSettingUpAttachment(true)

    const response = await fetch('/api/s/attachment/session/setup', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(attachmentDetails),
    })

    if (response.status === 201) {
      setSettingUpAttachment(false)
      message.success('Attachment setup successful')
      await router.push('/student/logbook')
    } else {
      const data = await response.json()
      setSettingUpAttachment(false)
      message.info(data.error)
    }
  }

  return (
    <>
      <StudentNav />
      {attachment && (
        <section>
          <Row justify="center">
            <Title level={4}>Attachment Session Details</Title>
          </Row>
          <Divider />
          <Row justify="start">
            <Col xs={{ span: 22, offset: 1 }} lg={{ span: 6, offset: 9 }}>
              <Text strong>Cohort : </Text>
              <span>{attachment?.attachmentPeriod?.cohort}</span>
              <br />
              <br />
              <Text strong>Student : </Text>
              <span>
                {`${attachment?.student?.firstName} ${attachment?.student?.lastName}`}
              </span>
              <br />
              <br />
              <Text strong>Lecturer : </Text>
              <span>
                {`${attachment?.lecturer?.firstName} ${attachment?.lecturer?.lastName}`}
              </span>
              <br />
              <br />
              <Text strong>Supervisor : </Text>
              <span>
                {`${attachment?.supervisor?.firstName} ${attachment?.supervisor?.lastName}`}
              </span>
              <br />
              <br />
            </Col>
          </Row>
        </section>
      )}

      <section>
        {!attachment && (
          <>
            <Row justify="center">
              <Title level={4}>Attachment Session Setup</Title>
            </Row>
            <Divider />
          </>
        )}

        {!attachmentSession && !attachment && (
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

  const response = await fetch(`${process.env.DOMAIN}/api/s/attachment`, {
    headers: { cookie },
  })

  if (response.status === 401) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }

  if (response.status === 200) {
    const attachment = await response.json()
    return {
      props: { attachment },
    }
  }

  return {
    props: { attachment: null },
  }
}
