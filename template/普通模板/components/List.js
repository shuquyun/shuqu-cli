import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Tag } from 'antd'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import { formatDate } from 'utils'
import { ImageModal } from 'components'

const { confirm } = Modal

const List = ({
    onDeleteItem, onEditItem, onReviewImages,
    location,
    ...tableProps
}) => {

    const handleMenuClick = (record, e) => {
        if (e.key === '1') {
            onEditItem(record)
        } else if (e.key === '2') {
            confirm({
                title: '确定删除该项嘛?',
                onOk() {
                    onDeleteItem(record.id)
                }
            })
        }
    }



    const columns = [
        {
            title: '用户名',
            dataIndex: 'userName',
            key: 'userName',
        }, {
            title: 'Url地址',
            dataIndex: 'url',
            key: 'url',
            render: (text) => <a href={text}>{text}</a>
        }, {
            title: '序号',
            dataIndex: 'sort',
            key: 'sort',
            render: (text, record) => text
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (text) => {
                if (text == 0) {
                    return < Tag color="volcano">失效</Tag>
                }
                if (text == 1) {
                    return <Tag color="green">有效</Tag>
                }
            }
        }, {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: text => formatDate(text)
        }, {
            title: '操作',
            key: 'operation',
            width: 100,
            render: (text, record) => {
                return <DropOption
                    onMenuClick={e => handleMenuClick(record, e)}
                    menuOptions={[
                        { key: '1', name: '编辑' },
                        { key: '2', name: '删除' },
                    ]}
                ></DropOption>
            }
        }
    ]

    return (
        <Table
            {...tableProps}
            bordered
            scroll={{ x: 1250 }}
            columns={columns}
            simple
            rowKey={record => record.id}
        >
        </Table>
    )
}

List.prototype = {
    onDeleteItem: PropTypes.func,
    onEditItem: PropTypes.func,
    location: PropTypes.object
}


export default List