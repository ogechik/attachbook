import { Button, Form, Input, message, Row, Col, Typography } from 'antd'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
const { Text } = Typography

export default function EditReviewNode({ logbookId, report, setLogbook }) {
  const router = useRouter()
  const [editMode, setEditMode] = useState(false)
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
      message.success('Review updated')
      setPosting(false)
      setEditMode((mode) => !mode)
      setLogbook(data)
      await router.replace(router.asPath)
    } else {
      message.info(data.error)
      setPosting(false)
    }
  }

  return (
    <>
      {editMode && (
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <Form
              form={form}
              layout="vertical"
              initialValues={{ review: report.supervisorReview.reviewText }}
              onFinish={onFinish}
            >
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
                  Update
                </Button>
                <Button
                  style={{ marginLeft: '1rem' }}
                  onClick={() => setEditMode((mode) => !mode)}
                >
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      )}
      {!editMode && (
        <Row>
          <Col span={24}>
            <Text strong>Supervisor&apos;s review</Text>
            <p style={{ marginTop: '1rem' }}>
              {report.supervisorReview.reviewText}
              <Button
                type="text"
                onClick={() => setEditMode((mode) => !mode)}
                icon={<img src="/edit.svg" alt="edit" />}
              />
            </p>
          </Col>
        </Row>
      )}
    </>
  )
}
