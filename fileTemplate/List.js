import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Tag } from 'antd'
import { DropOption } from 'components'
import { formatDate } from 'utils'

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
        '@List',
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: text => formatDate(text)
        },
        {
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