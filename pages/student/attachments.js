import { Typography, Row, Col, Divider } from 'antd'
import StudentNav from '../../components/student/navigation'
import AttachmentCard from '../../components/company/AttachmentCard'
import Layout from '../../components/Layout'
const { Title } = Typography

export default function Opportunities({ opportunities }) {
  return (
    <Layout title="Attachment Opportunities">
      <StudentNav />
      <Row justify="center">
        <Title level={3}>Attachment Opportunities</Title>
      </Row>
      <Divider />
      <Row justify="center">
        <Col xs={{ span: 22 }} lg={{ span: 16 }}>
          {opportunities &&
            opportunities.map((opportunity) => (
              <AttachmentCard key={opportunity._id} opportunity={opportunity} />
            ))}
        </Col>
      </Row>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { cookie } = context.req.headers

  const response = await fetch(
    `${process.env.DOMAIN}/api/s/attachment/opportunities`,
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

  if (response.status === 200) {
    const opportunities = await response.json()
    return {
      props: { opportunities },
    }
  }
  return {
    props: { opportunities: null },
  }
}
