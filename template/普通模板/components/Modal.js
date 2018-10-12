import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Select, DatePicker } from 'antd'
import moment from 'moment'

const FormItem = Form.Item
const Option = Select.Option;
const { TextArea } = Input

const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 14
    }
}

const modal = ({
    item = {},
    onOk,
    modalType,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        setFieldsValue
    },
    ...modalProps
}) => {
    const handleOk = () => {
        validateFields((error, values) => {
            if (error) {
                return
            }
            onOk(values)
        })
    }

    const changeImg = (url) => {
        item.imageUrl = url
        setFieldsValue({ imageUrl: url })
    }

    const modalOpts = {
        ...modalProps,
        onOk: handleOk,
    }

    return (
        <Modal {...modalOpts}>
            <Form layout="horizontal">
                <FormItem label="Banner链接" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('url', {
                        initialValue: item.url,
                        rules: [
                            {
                                required: true,
                            },
                        ],
                    })(<Input placeholder="请输入Banner链接" />)}
                </FormItem>
                <FormItem label="Banner图片" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('imageUrl', {
                        initialValue: item.imageUrl,
                        rules: [
                            {
                                required: true,
                            },
                        ],
                    })(
                        // <ImageUpload handleSubmit={changeImg} okText="上传商品图片" />
                        <Input placeholder="请输入图片地址(暂时)" />
                    )}
                </FormItem>
                <FormItem label="Banner序号" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('sort', {
                        initialValue: item.sort,
                        rules: [
                            {
                                required: true,
                                message: '请输入图片序号',
                            }
                        ]
                    })(
                        <InputNumber min={0}></InputNumber>
                    )}
                </FormItem>
                <FormItem label="Banner状态" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('status', {
                        initialValue: item.status,
                        rules: [
                            {
                                required: true,
                                message: '请设置Banner状态',
                            }
                        ]
                    })(
                        <Select placeholder="请设置Banner状态">
                            <Option value={1}>有效</Option>
                            <Option value={0}>失效</Option>
                        </Select>
                    )}
                </FormItem>
            </Form>
        </Modal>
    )

}

modal.prototype = {
    form: PropTypes.object.isRequired,
    type: PropTypes.string,
    item: PropTypes.object,
    onOk: PropTypes.func
}


export default Form.create()(modal)