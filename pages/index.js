import { Row, Col, Space, Button, Input, Typography } from 'antd';
const { Title } = Typography;

export default function Home() {
  return (
    <div>
      <Row>
        <Col span={20} offset={2}>
          <Space direction="vertical">
            <Title level={3}>h3. Ant Design</Title>
            <Input placeholder="Some text" />
            <Button type="primary">Primary Button</Button>
          </Space>
        </Col>
      </Row>
    </div>
  )
}
