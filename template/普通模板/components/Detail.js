import React from 'react'
import { Modal, Row, Col, Tag } from 'antd'
import styles from './Detail.less'
import { ImageModal } from 'components'
import PropTypes from 'prop-types'


const Detail = ({
    item = {},
    ...modalProps
}) => {

    return (
        <Modal {...modalProps}>
            <div className={styles.detail}>
                <Row gutter={{ xs: 8, sm: 16, md: 24 }} span={24}>
                    <Col xs={24} sm={4} md={6} lg={8} xl={10}>
                        <div className={styles.itemName}>名片名称:</div>
                        <div className={styles.itemValue}>{item.cardName}</div>
                    </Col>
                    <Col xs={24} sm={4} md={6} lg={8} xl={10}>
                        <div className={styles.itemName}>姓名:</div>
                        <div className={styles.itemValue}>{item.name}</div>
                    </Col>
                    <Col xs={24} sm={4} md={6} lg={8} xl={10}>
                        <div className={styles.itemName}>英文名:</div>
                        <div className={styles.itemValue}>{item.englishName}</div>
                    </Col>
                    <Col xs={24} sm={4} md={6} lg={8} xl={10}>
                        <div className={styles.itemName}>属性:</div>
                        <div className={styles.itemValue}>{item.property}</div>
                    </Col>
                    <Col xs={24} sm={4} md={6} lg={8} xl={10}>
                        <div className={styles.itemName}>行业:</div>
                        <div className={styles.itemValue}>{item.industry}</div>
                    </Col>
                    <Col xs={24} sm={4} md={6} lg={8} xl={10}>
                        <div className={styles.itemName}>手机号:</div>
                        <div className={styles.itemValue}>{item.mobile}</div>
                    </Col>
                    <Col xs={24} sm={4} md={6} lg={8} xl={10}>
                        <div className={styles.itemName}>头衔:</div>
                        <div className={styles.itemValue}>{item.title}</div>
                    </Col>
                    <Col xs={24} sm={4} md={6} lg={8} xl={10}>
                        <div className={styles.itemName}>邮箱:</div>
                        <div className={styles.itemValue}>{item.email}</div>
                    </Col>
                    <Col xs={24} sm={4} md={6} lg={8} xl={10}>
                        <div className={styles.itemName}>联系电话:</div>
                        <div className={styles.itemValue}>{item.phone}</div>
                    </Col>
                    <Col xs={24} sm={4} md={6} lg={8} xl={10}>
                        <div className={styles.itemName}>公司名称:</div>
                        <div className={styles.itemValue}>{item.companyName}</div>
                    </Col>
                    <Col xs={24} sm={4} md={6} lg={8} xl={10}>
                        <div className={styles.itemName}>公司地址:</div>
                        <div className={styles.itemValue}>{item.companyAddress}</div>
                    </Col>
                    <Col xs={24} sm={4} md={6} lg={8} xl={10}>
                        <div className={styles.itemName}>简介:</div>
                        <div className={styles.itemValue}>{item.summary}</div>
                    </Col>
                    <Col xs={24} sm={4} md={6} lg={8} xl={10}>
                        <div className={styles.itemName}>收藏次数:</div>
                        <div className={styles.itemValue}>
                            {item.favoriteCount}
                        </div>
                    </Col>
                </Row>
            </div>
        </Modal>
    )
}

Detail.prototype = {
    item: PropTypes.object,
}

export default Detail