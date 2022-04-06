import { Divider, Typography, Row, Col, Button, List } from 'antd'
import { useRouter } from 'next/router'
import AdminLayout from '../../components/admin/AdminLayout'
const { Title, Text } = Typography
export default function Dash({ sessions }) {
  const router = useRouter()
  const createPage = async () => {
    await router.push('/4dm1n/sessions/create')
  }
  const toSession = async (id) => {
    await router.push(`/4dm1n/sessions/${id}`)
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
        <Title level={5}></Title>
        <Button type="primary" onClick={createPage}>
          Create New Session
        </Button>
      </Row>
      <Divider />
      <Row>
        <Col span={24}>
          <List
            header={
              <div>
                <Row style={{ width: '100%' }}>
                  <Col span={6}>
                    <Text strong>Cohort</Text>
                  </Col>
                  <Col span={6}>
                    <Text strong>No.of Lecturers</Text>
                  </Col>
                  <Col span={6}>
                    <Text strong>Status</Text>
                  </Col>
                  <Col span={6}>
                    <Text strong>Action</Text>
                  </Col>
                </Row>
              </div>
            }
            footer={
              <div>
                <Text strong>{sessions.length} active sessions</Text>
              </div>
            }
            bordered
            dataSource={sessions}
            renderItem={(session) => (
              <List.Item>
                <Row style={{ width: '100%' }}>
                  <Col span={6}>{session.cohort}</Col>
                  <Col span={6}>{session.lecturers.length} Lecturers</Col>
                  <Col span={6}>
                    {session.isActive ? 'active' : 'deactivated'}
                  </Col>
                  <Col span={6}>
                    {' '}
                    <Button
                      type="default"
                      onClick={() => toSession(session._id)}
                    >
                      view
                    </Button>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </AdminLayout>
  )
}

export async function getServerSideProps(context) {
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
    `${process.env.DOMAIN}/api/a/attachment/session/get/0`,
    {
      headers: { cookie },
    },
  )
  if (response.status === 200) {
    const sessions = await response.json()
    return {
      props: {
        sessions,
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
      sessions: null,
    },
  }
}
