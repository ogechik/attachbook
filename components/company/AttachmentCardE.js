import { Button, Row, Col } from 'antd'
import { useRouter } from 'next/router'
import styles from './card.module.css'
import { formatDate } from '../../utils/common'

export default function AttachmentCardE({ opportunity }) {
  const router = useRouter()

  const toOpportunity = async (id) => {
    await router.push(`/company/opportunities/${id}`)
  }
  return (
    <Row className={styles.card}>
      <Col xs={{ span: 24 }} lg={{ span: 7 }} className={styles.leftSection}>
        <div className={styles.content}>
          <p className={styles.title}>{opportunity.position.toUpperCase()}</p>
          <p className={styles.company}>
            {`${opportunity.postedBy.firstName} ${opportunity.postedBy.lastName}`.toUpperCase()}
          </p>
        </div>
      </Col>
      <Col xs={{ span: 24 }} lg={{ span: 11 }} className={styles.midSection}>
        <p className={styles.midContent}>{opportunity.responsibilities}</p>
      </Col>
      <Col xs={{ span: 24 }} lg={{ span: 6 }} className={styles.rightSection}>
        <div className={styles.content}>
          <p className={styles.posted}>POSTED ON</p>
          <p>{formatDate(opportunity.datePosted)}</p>
          <Button type="primary" onClick={() => toOpportunity(opportunity._id)}>
            edit
          </Button>
        </div>
      </Col>
    </Row>
  )
}
