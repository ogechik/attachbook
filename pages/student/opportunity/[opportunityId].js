import { Typography, Row, Col, Divider } from 'antd'
import StudentNav from '../../../components/student/navigation'
import Layout from '../../../components/Layout'
import GoBack from '../../../components/admin/GoBack'
const { Title, Text } = Typography

export default function Opportunities({ opportunity }) {
  return (
    <Layout title={opportunity.position}>
      <StudentNav />
      <Row justify="start">
        <Col
          lg={{ offset: 6, span: 18 }}
          xs={{ offset: 1, span: 22 }}
          style={{ marginBottom: '1rem' }}
        >
          <GoBack />
        </Col>
        <Col xs={{ span: 22, offset: 1 }} lg={{ span: 12, offset: 6 }}>
          <Title level={3}>{opportunity.position}</Title>
        </Col>
      </Row>
      <Divider />
      <Row justify="start">
        <Col xs={{ span: 22, offset: 1 }} lg={{ span: 12, offset: 6 }}>
          <Text strong>Company</Text>
          <p style={{ marginTop: '1rem' }}>
            {`${opportunity.postedBy.firstName} ${opportunity.postedBy.lastName}`}
          </p>
          <Divider />
          <Text strong>Responsibilities</Text>
          <p style={{ marginTop: '1rem' }}>{opportunity.responsibilities}</p>
          <Divider />
          <Text strong>Apply Instructions</Text>
          <p style={{ marginTop: '1rem' }}>{opportunity.applyInstructions}</p>
        </Col>
      </Row>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { cookie } = context.req.headers
  const { opportunityId } = context.params

  const response = await fetch(
    `${process.env.DOMAIN}/api/s/attachment/opportunity/${opportunityId}`,
    {
      headers: { cookie },
    },
  )

  if (response.status === 401) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }

  const opportunity = await response.json()

  return {
    props: {
      opportunity,
    },
  }
}
