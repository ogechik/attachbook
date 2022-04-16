import { Typography, Row, Col, Tabs, Alert, Button, Divider } from 'antd'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import SupervisorNav from '../../../components/supervisor/navigation'
import SwitchBox from '../../../components/logbook/SwitchBox'
import ReviewNode from '../../../components/supervisor/ReviewNode'
import { capitalize } from '../../../utils/common'
import CommentBox from '../../../components/logbook/CommentBox'
import EditCommentBox from '../../../components/logbook/EditCommentBox'
const { Text } = Typography
const { TabPane } = Tabs

export default function StudentLogbook({ book }) {
  const router = useRouter()
  const [logbook, setLogbook] = useState(book)
  const [week, setWeek] = useState(logbook.report.length - 1)
  const [report, setReport] = useState(logbook.report[week])

  useEffect(() => {
    setReport(logbook.report[week])
  }, [logbook, week])

  const toStudentsList = async () => {
    await router.back()
  }

  return (
    <>
      <SupervisorNav supervisor="lecturer" />
      <Row style={{ marginBottom: '2rem' }}>
        <Col xs={{ span: 22, offset: 1 }} lg={{ span: 16, offset: 4 }}>
          <Button
            type="default"
            icon={
              <span>
                <img src="/back.svg" alt="back" />
              </span>
            }
            onClick={toStudentsList}
          >
            Students List
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 22, offset: 1 }} lg={{ span: 16, offset: 4 }}>
          <Row>
            <Col span={24}>
              <p>
                <Text strong>{`${capitalize(
                  logbook.student.firstName,
                )} ${capitalize(logbook.student.lastName)} |`}</Text>
                <span style={{ marginLeft: '0.25rem' }}>
                  {logbook.registrationNo.toUpperCase()}
                </span>
              </p>
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
                  {report.logs.map((log) => {
                    if (log.log) {
                      return (
                        <Row key={log._id}>
                          <Col xs={{ span: 24 }}>
                            <Text strong>{log.day}</Text>
                          </Col>
                          <Col xs={{ span: 24 }}>
                            <p>{log.log}</p>
                          </Col>
                        </Row>
                      )
                    }
                    return (
                      <Row key={log._id}>
                        <Col xs={{ span: 24 }}>
                          <Text strong>{log.day}</Text>
                        </Col>
                        <Col xs={{ span: 24 }}>
                          <Text type="secondary"> - </Text>
                        </Col>
                      </Row>
                    )
                  })}
                </TabPane>
                <TabPane tab="Weekly Reviews" key="2">
                  {report.review && (
                    <>
                      <Row>
                        <Col span={24}>
                          <Text strong>
                            {capitalize(logbook.student.firstName)}&apos;s
                            review
                          </Text>
                          <p style={{ marginTop: '1rem' }}>
                            {report.review.reviewText}
                          </p>
                        </Col>
                      </Row>
                      <Divider />
                      <Row>
                        <Col span={24}>
                          <ReviewNode
                            report={report}
                            logbookId={logbook._id}
                            setLogbook={setLogbook}
                          />
                        </Col>
                      </Row>
                    </>
                  )}
                  {!report.review && (
                    <Alert
                      message="Week not reviewed yet."
                      type="warning"
                      showIcon
                      closable
                    />
                  )}
                </TabPane>
                <TabPane tab="Lecturer Comments" key="3">
                  {logbook.firstComment && (
                    <EditCommentBox
                      logbook={logbook}
                      logbookId={logbook._id}
                      setLogbook={setLogbook}
                      commentType="first"
                    />
                  )}
                  {!logbook.firstComment && (
                    <CommentBox
                      logbookId={logbook._id}
                      setLogbook={setLogbook}
                      commentType="first"
                    />
                  )}
                  {logbook.finalComment && (
                    <>
                      <Divider />{' '}
                      <EditCommentBox
                        logbook={logbook}
                        logbookId={logbook._id}
                        setLogbook={setLogbook}
                        commentType="final"
                      />
                    </>
                  )}
                  {logbook.firstComment && !logbook.finalComment && (
                    <>
                      <Divider />
                      <CommentBox
                        logbookId={logbook._id}
                        setLogbook={setLogbook}
                        commentType="final"
                      />
                    </>
                  )}
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export async function getServerSideProps(context) {
  const { cookie } = context.req.headers
  const { studentId } = context.params

  const response = await fetch(
    `${process.env.DOMAIN}/api/su/student/logbook/${studentId}`,
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

  const book = await response.json()

  return {
    props: {
      book,
    },
  }
}
