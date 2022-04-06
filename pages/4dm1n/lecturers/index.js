import { Divider, Typography, Row, Col, List } from 'antd'
import AdminLayout from '../../../components/admin/AdminLayout'
const { Title, Text } = Typography

export default function Companies({ lecturers }) {
  return (
    <AdminLayout title="Admin|Home">
      <Row>
        <Col span={24}>
          <Title level={3}>Lecturers</Title>
        </Col>
      </Row>
      <Divider />

      <Row>
        <Col span={24}>
          <List
            header={
              <div>
                <Row style={{ width: '100%' }}>
                  <Col span={6}>
                    <Text strong>Name</Text>
                  </Col>
                  <Col span={6}>
                    <Text strong>Email</Text>
                  </Col>
                </Row>
              </div>
            }
            footer={
              <div>
                <Text strong>{lecturers.length} lecturer(s)</Text>
              </div>
            }
            bordered
            dataSource={lecturers}
            renderItem={(lecturer) => (
              <List.Item>
                <Row style={{ width: '100%' }}>
                  <Col span={6}>
                    {`${lecturer.firstName} ${lecturer.lastName}`}
                  </Col>
                  <Col span={6}>{lecturer.email}</Col>
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

  const response = await fetch(`${process.env.DOMAIN}/api/a/lecturers`, {
    headers: { cookie },
  })
  if (response.status === 200) {
    const lecturers = await response.json()
    return {
      props: {
        lecturers,
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
      lecturers: [],
    },
  }
}
