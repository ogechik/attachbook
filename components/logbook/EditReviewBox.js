import { Button, Col, Form, Input, message, Row } from 'antd'

import { useState } from 'react'
import { useRouter } from 'next/router'

export default function EditReviewBox({
  review,
  logbookId,
  reportId,
  setLogbook,
}) {
  const router = useRouter()
  const [editMode, setEditMode] = useState(false)
  const [posting, setPosting] = useState(false)
  const [form] = Form.useForm()

  const onFinish = (value) => postReview(value)

  const postReview = async (value) => {
    const reviewDetails = {
      logbookId,
      reportId,
      reviewText: value.review,
    }
    setPosting(true)

    const response = await fetch('/api/s/logbook/week/review', {
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
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            review,
          }}
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
      )}
      {!editMode && (
        <Row>
          <Col span={24}>
            <p>
              {review}
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
