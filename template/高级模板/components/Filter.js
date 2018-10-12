/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'
import { Form, Button, Row, Col, DatePicker, Input, Select } from 'antd'

const Option = Select.Option
const { Search } = Input
const { RangePicker } = DatePicker

const ColProps = {
    xs: 24,
    sm: 12,
    style: {
        marginBottom: 16,
    },
}

const TwoColProps = {
    ...ColProps,
    xl: 96,
}

const Filter = ({
    onFilterChange,
    filter,
    form: {
        getFieldDecorator,
        getFieldsValue,
        setFieldsValue,
    },
}) => {
    const handleFields = (fields) => {
        const { createTime } = fields
        if (createTime.length) {
            fields.startTime = createTime[0].format('YYYY-MM-DD HH:mm:ss')
            fields.endTime = createTime[1].format('YYYY-MM-DD HH:mm:ss')
        }
        delete fields.createTime
        return fields
    }

    const handleSubmit = () => {
        let fields = getFieldsValue()
        fields = handleFields(fields)
        onFilterChange(fields)
    }

    const handleReset = () => {
        const fields = getFieldsValue()
        for (let item in fields) {
            if ({}.hasOwnProperty.call(fields, item)) {
                if (fields[item] instanceof Array) {
                    fields[item] = []
                } else {
                    fields[item] = undefined
                }
            }
        }
        setFieldsValue(fields)
        handleSubmit()
    }

    const handleChange = (key, values) => {
        let fields = getFieldsValue()
        fields[key] = values
        fields = handleFields(fields)
        onFilterChange(fields)
    }
    const { name, type } = filter

    let initialCreateTime = []
    if (filter.startTime) {
        initialCreateTime[0] = moment(filter.startTime)
    }
    if (filter.endTime) {
        initialCreateTime[1] = moment(filter.endTime)
    }


    return (
        <Row gutter={24}>
            <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
                {getFieldDecorator('status', { initialValue: type })(
                    <Select placeholder="状态" style={{ width: '100%' }}>
                        <Option value={0}>未读</Option>
                        <Option value={1}>已读</Option>
                    </Select>
                )}
            </Col>
            <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
                {getFieldDecorator('platform', { initialValue: type })(
                    <Select placeholder="平台" style={{ width: '100%' }}>
                        <Option value="app">app</Option>
                        <Option value="agent">agent</Option>
                        <Option value="marketing">marketing</Option>
                    </Select>
                )}
            </Col>
            <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }} id="createTimeRangePicker">
                <FilterItem label="创建时间">
                    {getFieldDecorator('createTime', { initialValue: initialCreateTime })(<RangePicker
                        style={{ width: '100%' }}
                        onChange={handleChange.bind(null, 'createTime')}
                        getCalendarContainer={() => {
                            return document.getElementById('createTimeRangePicker')
                        }}
                    />)}
                </FilterItem>
            </Col>

            <Col {...TwoColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <div>
                        <Button type="primary" className="margin-right" onClick={handleSubmit}>搜索</Button>
                        <Button onClick={handleReset}>重置</Button>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

Filter.propTypes = {
    isMotion: PropTypes.bool,
    form: PropTypes.object,
    filter: PropTypes.object,
    onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
