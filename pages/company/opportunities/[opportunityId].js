import {
  Typography,
  Row,
  Col,
  Divider,
  Form,
  Input,
  Button,
  message,
  Modal,
} from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'
import StudentNav from '../../../components/student/navigation'
import Layout from '../../../components/Layout'
import GoBack from '../../../components/admin/GoBack'
const { Title } = Typography

export default function Opportunities({ opportunity }) {
  const router = useRouter()
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [editting, setEditting] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const onFinish = (values) => update(values)

  const update = async (details) => {
    setEditting(true)
    const response = await fetch(`/api/c/attachment/edit/${opportunity._id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(details),
    })

    if (response.status === 200) {
      const data = await response.json()
      if (data.error) {
        setEditting(false)
        message.warning(data.error)
      } else {
        setEditting(false)
        message.success('Opportunity updated')
      }
    } else {
      setEditting(false)
      message.warning('Something went wrong')
    }
  }

  const archive = async () => {
    setDeleting(true)
    const response = await fetch('/api/c/attachment/delete', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({ attachmentOpportunityId: opportunity._id }),
    })

    if (response.status === 204) {
      setDeleting(false)
      setVisible(false)
      message.success('Opportunity removed')
      await router.push('/company')
    } else {
      setDeleting(false)
      setVisible(false)
      message.warning('something went wrong while removing opportunity')
    }
  }
  const showModal = () => {
    setVisible(true)
  }
  const handleCancel = () => {
    setVisible(false)
  }
  return (
    <Layout title={opportunity.position}>
      <StudentNav />
      <Row>
        <Col
          lg={{ offset: 6, span: 12 }}
          xs={{ offset: 1, span: 22 }}
          style={{ marginBottom: '1rem' }}
        >
          <Row justify="space-between">
            <GoBack />
            <Button type="primary" onClick={() => showModal()}>
              remove
            </Button>
            <Modal
              visible={visible}
              title="Remove opportunity."
              onOk={archive}
              onCancel={handleCancel}
              footer={[
                <Button key="back" onClick={handleCancel}>
                  Cancel
                </Button>,
                <Button type="primary" onClick={archive} loading={deleting}>
                  Yes, Remove opportunity
                </Button>,
              ]}
            >
              <p>Are you sure you want to remove this opportunity?</p>
            </Modal>
          </Row>
        </Col>
        <Col lg={{ offset: 6 }} xs={{ offset: 1 }}>
          <Title level={3}>Edit attachment</Title>
        </Col>
      </Row>
      <Row justify="start">
        <Col xs={{ span: 22, offset: 1 }} lg={{ span: 12, offset: 6 }}>
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            initialValues={{
              position: opportunity.position,
              responsibilities: opportunity.responsibilities,
              applyInstructions: opportunity.applyInstructions,
            }}
          >
            <Form.Item
              label="Position"
              name="position"
              rules={[
                {
                  required: true,
                  message: 'Please input attachment opening position!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Responsibilities"
              name="responsibilities"
              rules={[
                {
                  required: true,
                  message: 'Please input expected responsibilities!',
                },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              label="Apply instructions"
              name="applyInstructions"
              rules={[
                {
                  required: true,
                  message: 'Please input applying instructions!',
                },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
                loading={editting}
              >
                Update
              </Button>
            </Form.Item>
          </Form>
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
