import { Button, Col, Form, Input, message, Row, Typography } from 'antd'

import { useState } from 'react'
import { useRouter } from 'next/router'
const { Text } = Typography

export default function EditCommentBox({
  logbook,
  logbookId,
  setLogbook,
  commentType,
}) {
  const router = useRouter()
  const [editMode, setEditMode] = useState(false)
  const [posting, setPosting] = useState(false)
  const [form] = Form.useForm()

  const onFinish = (value) => postComment(value)

  const postComment = async (value) => {
    let commentDetails
    if (commentType === 'first') {
      commentDetails = {
        logbookId,
        firstComment: value.comment,
      }
    } else {
      commentDetails = {
        logbookId,
        finalComment: value.comment,
      }
    }

    setPosting(true)

    const response = await fetch(`/api/l/comment/${commentType}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(commentDetails),
    })

    const data = await response.json()
    if (response.status === 200 && !data.error) {
      message.success('Comments updated')
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
      {!editMode && (
        <Row>
          <Col span={24}>
            {commentType === 'first' ? (
              <>
                <Text strong>First visit comments</Text>
                <p>
                  {logbook.firstComment.comment}{' '}
                  <Button
                    type="text"
                    onClick={() => setEditMode((mode) => !mode)}
                    icon={<img src="/edit.svg" alt="edit" />}
                  />
                </p>
              </>
            ) : (
              <>
                <Text strong>Final comments</Text>
                <p>
                  {logbook.finalComment.comment}{' '}
                  <Button
                    type="text"
                    onClick={() => setEditMode((mode) => !mode)}
                    icon={<img src="/edit.svg" alt="edit" />}
                  />
                </p>
              </>
            )}
          </Col>
        </Row>
      )}
      {editMode && (
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            comment:
              commentType === 'first'
                ? logbook.firstComment.comment
                : logbook.finalComment.comment,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label={
              commentType === 'first'
                ? 'First visit comments'
                : 'Final comments'
            }
            name="comment"
            rules={[
              {
                required: true,
                message: 'Please type your comment!',
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
    </>
  )
}
