import { Typography, Row, Col, Alert, Button } from 'antd'
import { useRouter } from 'next/router'
import AttachmentCardE from '../../components/company/AttachmentCardE'
import SupervisorNav from '../../components/supervisor/navigation'

const { Title } = Typography

export default function CompanyHome({ opportunities }) {
  const router = useRouter()
  const toPostOpportunity = async () =>
    router.push('/company/opportunities/post')
  return (
    <>
      <SupervisorNav />
      <Row justify="space-between">
        <Col lg={{ offset: 4, span: 15 }} xs={{ offset: 1 }}>
          <Title level={3}>Attachment Postings</Title>
        </Col>
        <Col lg={{ offset: 17, span: 4 }} xs={{ offset: 13 }}>
          <Button
            type="primary"
            onClick={toPostOpportunity}
            style={{ marginBottom: '1rem' }}
          >
            Post Opportunity
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 22, offset: 1 }} lg={{ offset: 4, span: 16 }}>
          {opportunities.length > 0 &&
            opportunities.map((opportunity) => (
              <AttachmentCardE
                key={opportunity._id}
                opportunity={opportunity}
              />
            ))}
          {opportunities.length === 0 && (
            <Alert
              message="Not Yet."
              description="You have not posted any attachment opportunities yet.
              Use 'Post Opportunity' button to post an attachment opportunity."
              type="warning"
              showIcon
            />
          )}
        </Col>
      </Row>
    </>
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
    `${process.env.DOMAIN}/api/c/attachment/posted`,
    {
      headers: { cookie },
    },
  )

  if (response.status === 200) {
    const opportunities = await response.json()
    return {
      props: {
        opportunities,
      },
    }
  }
  return {
    props: {
      opportunities: [],
    },
  }
}
