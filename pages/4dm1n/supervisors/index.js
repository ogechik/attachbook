import { Divider, Typography, Row, Col, List } from 'antd'
import AdminLayout from '../../../components/admin/AdminLayout'
const { Title, Text } = Typography

export default function Companies({ supervisors }) {
  return (
    <AdminLayout title="Admin|Supervisors">
      <Row>
        <Col span={24}>
          <Title level={3}>Supervisors(Company)</Title>
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
                <Text strong>{supervisors.length} supervisor(s)</Text>
              </div>
            }
            bordered
            dataSource={supervisors}
            renderItem={(supervisor) => (
              <List.Item>
                <Row style={{ width: '100%' }}>
                  <Col span={6}>
                    {`${supervisor.firstName} ${supervisor.lastName}`}
                  </Col>
                  <Col span={6}>{supervisor.email}</Col>
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

  const response = await fetch(`${process.env.DOMAIN}/api/a/supervisors`, {
    headers: { cookie },
  })

  if (response.status === 401) {
    return {
      redirect: {
        permanent: false,
        destination: '/4dm1n',
      },
    }
  }

  if (response.status === 200) {
    const supervisors = await response.json()
    return {
      props: {
        supervisors,
      },
    }
  }

  return {
    props: {
      supervisors: [],
    },
  }
}
