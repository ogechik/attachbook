import {
  Button,
  Form,
  Input,
  message,
  Row,
  Col,
} from 'antd'

import { useState } from 'react'
import { useRouter } from 'next/router'
import EditReviewNode from './EditReviewNode'

export default function ReviewNode({ logbookId, report, setLogbook }) {
  const router = useRouter()
  const [posting, setPosting] = useState(false)
  const [form] = Form.useForm()

  const onFinish = (value) => postReview(value)

  const postReview = async (value) => {
    const reviewDetails = {
      logbookId,
      reportId: report._id,
      reviewText: value.review,
    }
    setPosting(true)

    const response = await fetch('/api/su/review/week', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(reviewDetails),
    })

    const data = await response.json()
    if (response.status === 200 && !data.error) {
      message.success('Review posted')
      setPosting(false)
      setLogbook(data)
      await router.replace(router.asPath)
    } else {
      message.info(data.error)
      setPosting(false)
    }
  }

  return (
    <>
      {!report.supervisorReview && (
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Review text"
                name="review"
                rules={[
                  {
                    required: true,
                    message: 'Please type your review!',
                  },
                ]}
              >
                <Input.TextArea rows={6} />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: '30%' }}
                  loading={posting}
                >
                  Review
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      )}
      {report.supervisorReview && (
        <EditReviewNode
          logbookId={logbookId}
          report={report}
          setLogbook={setLogbook}
        />
      )}
    </>
  )
}
