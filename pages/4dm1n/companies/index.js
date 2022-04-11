import { Divider, Typography, Row, Col, List } from 'antd'
import AdminLayout from '../../../components/admin/AdminLayout'
const { Title, Text } = Typography

export default function Companies({ companies }) {
  return (
    <AdminLayout title="Admin|Companies">
      <Row>
        <Col span={24}>
          <Title level={3}>Companies</Title>
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
                <Text strong>{companies.length} companies</Text>
              </div>
            }
            bordered
            dataSource={companies}
            renderItem={(company) => (
              <List.Item>
                <Row style={{ width: '100%' }}>
                  <Col span={6}>
                    {`${company.firstName} ${company.lastName}`}
                  </Col>
                  <Col span={6}>{company.email}</Col>
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

  const response = await fetch(`${process.env.DOMAIN}/api/a/companies`, {
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
    const companies = await response.json()
    return {
      props: {
        companies,
      },
    }
  }

  return {
    props: {
      companies: [],
    },
  }
}
