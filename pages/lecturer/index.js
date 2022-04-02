import { Typography, Alert, List, Row, Button, Col } from 'antd'
import { useRouter } from 'next/router'
import SupervisorNav from '../../components/supervisor/navigation'
import { capitalize, getMonthsDays } from '../../utils/common'

const { Title } = Typography

function TitleLink({ item }) {
  return (
    <a href={`/lecturer/student/${item.student._id}`}>
      {`${capitalize(item.student.firstName)} ${capitalize(
        item.student.lastName,
      )}`}
    </a>
  )
}

export default function SupervisorHome({ students }) {
  const router = useRouter()

  const studentLogbook = async (id) => {
    await router.push(`/lecturer/student/${id}`)
  }

  return (
    <>
      <SupervisorNav />
      <Row>
        <Col lg={{ offset: 6 }} xs={{ offset: 1 }}>
          <Title level={3}>Students</Title>
        </Col>
      </Row>
      <Row justify="center">
        {students === null && (
          <Alert
            message="Error"
            description="Something went wrong while getting students under your supervision."
            type="error"
            showIcon
          />
        )}
      </Row>
      <Row>
        {students && students.length === 0 && (
          <Col xs={{ span: 22, offset: 1 }} lg={{ offset: 6, span: 9 }}>
            <Alert
              message="No students"
              description="You currently don't have any students under your supervision"
              type="warning"
              showIcon
            />
          </Col>
        )}
      </Row>
      <Row>
        <Col xs={{ span: 22, offset: 1 }} lg={{ span: 9, offset: 6 }}>
          {students && (
            <List
              itemLayout="horizontal"
              dataSource={students}
              renderItem={(item) => (
                <List.Item key={item._id}>
                  <List.Item.Meta
                    title={<TitleLink item={item} />}
                    description={getMonthsDays(item.startDate)}
                  />
                  <Button
                    type="default"
                    icon={<img src="/logbook.svg" alt="logbook" />}
                    onClick={() => studentLogbook(item.student._id)}
                  >
                    view
                  </Button>
                </List.Item>
              )}
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

  const response = await fetch(`${process.env.DOMAIN}/api/su/students/0`, {
    headers: { cookie },
  })

  if (response.status === 200) {
    const students = await response.json()
    return {
      props: {
        students,
      },
    }
  }

  return {
    props: {
      students: null,
    },
  }
}
