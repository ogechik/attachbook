import {
  Typography,
  Row,
  Col,
  Tabs,
  Collapse,
  Divider,
  Alert,
  Button,
} from 'antd'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import StudentNav from '../../components/student/navigation'
import LogBox from '../../components/logbook/Logbox'
import ReviewBox from '../../components/logbook/ReviewBox'
import SwitchBox from '../../components/logbook/SwitchBox'
const { Text } = Typography
const { TabPane } = Tabs
const { Panel } = Collapse

export default function StudentHome({ book }) {
  const router = useRouter()
  const [logbook, setLogbook] = useState(book)
  const [week, setWeek] = useState(logbook?.report.length - 1)
  const [report, setReport] = useState(logbook?.report[week])

  useEffect(() => {
    setReport(logbook?.report[week])
  }, [logbook, week])

  const doneIcon = (log) => {
    if (log.log) {
      return (
        <span>
          <img src="/check.svg" alt="done" />
        </span>
      )
    }

    return null
  }

  return (
    <>
      <StudentNav />
      {logbook ? (
        <Row>
          <Col xs={{ span: 22, offset: 1 }} lg={{ span: 16, offset: 4 }}>
            <Row>
              <Col span={24}>
                <Text strong>
                  {`${logbook.student.firstName} ${logbook.student.lastName}`}
                </Text>
              </Col>
              <Col span={24}>
                <Text>{logbook.registrationNo.toUpperCase()}</Text>
              </Col>
              <Col span={24} style={{ marginTop: '1.25rem' }}>
                <SwitchBox
                  week={week}
                  setWeek={setWeek}
                  logbook={logbook}
                  setLogbook={setLogbook}
                />
              </Col>
              <Col span={24}>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="Logs" key="1">
                    <Collapse defaultActiveKey={['1']}>
                      {report.logs.map((log) => (
                        <Panel
                          header={log.day}
                          key={log._id}
                          extra={doneIcon(log)}
                        >
                          <LogBox
                            log={log}
                            logbookId={logbook._id}
                            reportId={report._id}
                            setLogbook={setLogbook}
                          />
                        </Panel>
                      ))}
                    </Collapse>
                  </TabPane>
                  <TabPane tab="Weekly Reviews" key="2">
                    <ReviewBox
                      logbookId={logbook._id}
                      reportId={report._id}
                      setLogbook={setLogbook}
                      review={report?.review?.reviewText}
                    />
                    <Divider />
                    {report.supervisorReview && (
                      <>
                        <Text strong>Supervisor's Review</Text>
                        <p>{report?.supervisorReview?.reviewText}</p>
                      </>
                    )}
                  </TabPane>
                  <TabPane tab="Lecturer Comments" key="3">
                    <Row>
                      <Col>
                        <Text strong>First visit comments</Text>
                        <p>
                          {logbook.firstComment ? (
                            logbook.firstComment.comment
                          ) : (
                            <Text type="secondary">-</Text>
                          )}
                        </p>
                      </Col>
                    </Row>
                    <Divider />
                    <Row>
                      <Col>
                        <Text strong>Final comments</Text>
                        <p>
                          {logbook.finalComment ? (
                            logbook.finalComment.comment
                          ) : (
                            <Text type="secondary">-</Text>
                          )}
                        </p>
                      </Col>
                    </Row>
                  </TabPane>
                </Tabs>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col xs={{ span: 22, offset: 1 }} lg={{ span: 16, offset: 4 }}>
            <Alert
              message="Setup your attachment session."
              showIcon
              description="You need to setup your attachment session before accessing your logbook."
              type="warning"
            />
            <Divider />
            <Button
              size="large"
              onClick={() => router.push('/student')}
              type="primary"
            >
              Setup Session
            </Button>
          </Col>
        </Row>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const { cookie } = context.req.headers

  const response = await fetch(`${process.env.DOMAIN}/api/s/logbook`, {
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
  if (response.status === 404) {
    return {
      props: {
        book: null,
      },
    }
  }

  const book = await response.json()

  return {
    props: {
      book,
      cookie,
    },
  }
}
