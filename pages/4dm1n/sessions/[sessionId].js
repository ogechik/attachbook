import { Divider, Typography, Row, Col, Button, List, Tabs } from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'
import AdminLayout from '../../../components/admin/AdminLayout'
import GoBack from '../../../components/admin/GoBack'
import RemoveLecturerBtn from '../../../components/admin/RemoveLecturerBtn'
import AddLecturer from '../../../components/admin/AddLecturer'
const { Title, Text, Paragraph } = Typography
const { TabPane } = Tabs

export default function Session({ data }) {
  const router = useRouter()

  const [session, setSession] = useState(data.attachmentPeriod)
  const [attachments, setAttachments] = useState(data.attachments)
  const [addLecturer, setAddLecturer] = useState(false)

  return (
    <AdminLayout title="Admin|Home">
      <Row>
        <Col span={24}>
          <Title level={3}>Attachment Session ({session.cohort})</Title>
        </Col>
      </Row>
      <Divider />
      <Row justify="space-between" align="middle">
        <GoBack />
        <span>
          <Text strong>Join Code</Text>
          <Paragraph copyable>{session.code}</Paragraph>
        </span>
      </Row>
      <Divider />
      <Tabs defaultActiveKey="1">
        <TabPane tab="Students" key="1">
          <Row>
            <Col span={24}>
              <List
                header={
                  <Row style={{ width: '100%' }}>
                    <Col span={8}>
                      <Text strong>Student</Text>
                    </Col>
                    <Col span={8}>
                      <Text strong>Lecturer</Text>
                    </Col>
                    <Col span={8}>
                      <Text strong>Attachment Status</Text>
                    </Col>
                  </Row>
                }
                footer={
                  <div>
                    <Text strong>{attachments.length} active attachments</Text>
                  </div>
                }
                bordered
                dataSource={attachments}
                renderItem={(attachment) => (
                  <List.Item>
                    <Row justify="space-between" style={{ width: '100%' }}>
                      <Col span={8}>
                        {`${attachment.student.firstName} ${attachment.student.lastName}`}
                      </Col>
                      <Col span={8}>
                        {attachment.lecturer.firstName}{' '}
                        {attachment.lecturer.lastName}
                      </Col>
                      <Col span={8}>
                        {attachment.isComplete ? 'complete' : 'ongoing'}
                      </Col>
                    </Row>
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Lecturers" key="2">
          <Row justify="end">
            <Button
              type="primary"
              style={{ marginBottom: '1rem' }}
              onClick={() => setAddLecturer(() => !addLecturer)}
            >
              {addLecturer ? 'Back To Lecturer List' : 'Add Lecturer'}
            </Button>
          </Row>
          {!addLecturer && (
            <Row>
              <Col span={24}>
                <List
                  header={
                    <div>
                      <Row style={{ width: '100%' }}>
                        <Col span={8}>
                          <Text strong>Name</Text>
                        </Col>
                        <Col span={8}>
                          <Text strong>Email</Text>
                        </Col>
                        <Col span={8}>
                          <Text strong>Action</Text>
                        </Col>
                      </Row>
                    </div>
                  }
                  footer={
                    <div>
                      <Text strong>{session.lecturers.length} lecturers</Text>
                    </div>
                  }
                  bordered
                  dataSource={session.lecturers}
                  renderItem={(lecturer) => (
                    <List.Item>
                      <Row style={{ width: '100%' }}>
                        <Col span={8}>
                          {`${lecturer.firstName} ${lecturer.lastName}`}
                        </Col>
                        <Col span={8}>{lecturer.email}</Col>
                        <Col span={8}>
                          <RemoveLecturerBtn
                            sessionId={session._id}
                            lecturerId={lecturer._id}
                            setSession={setSession}
                          />
                        </Col>
                      </Row>
                    </List.Item>
                  )}
                />
              </Col>
            </Row>
          )}
          {addLecturer && (
            <Row justify="center">
              <Col span={8}>
                <AddLecturer
                  sessionId={session._id}
                  setSession={setSession}
                  setAddLecturer={setAddLecturer}
                />
              </Col>
            </Row>
          )}
          <Divider />
        </TabPane>
      </Tabs>
    </AdminLayout>
  )
}

export async function getServerSideProps(context) {
  const { sessionId } = context.params
  const { cookie } = context.req.headers

  if (!cookie) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }

  const response = await fetch(
    `${process.env.DOMAIN}/api/a/attachment/session/${sessionId}`,
    {
      headers: { cookie },
    },
  )
  if (response.status === 200) {
    const data = await response.json()
    return {
      props: {
        data,
      },
    }
  }
  if (response.status === 401) {
    return {
      redirect: {
        permanent: false,
        destination: '/4dm1n',
      },
    }
  }

  return {
    props: {
      data: null,
    },
  }
}
