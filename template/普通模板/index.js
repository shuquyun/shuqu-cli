import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Page } from 'components'
import Filter from './components/Filter'
import List from './components/List'
import Modal from './components/Modal'
import Detail from './components/Detail'


const ManLou = ({
    manlou, loading, location, dispatch
}) => {

    const { query, pathname } = location
    const {
        list, pagination, currentItem, modalVisible, modalType, detailVisible
    } = manlou

    const { pageSize } = pagination

    // FilterProps
    const filterProps = {
        filter: {
            ...query,
        },
        onFilterChange(value) {
            dispatch(routerRedux.push({
                pathname: location.pathname,
                query: {
                    ...value,
                    pageNo: 1,
                    pageSize,
                },
            }))
        },
        onAdd() {
            dispatch({
                type: 'manlou/showModal',
                payload: {
                    modalType: 'create',
                },
            })
        },
    }


    // listProps
    const listProps = {
        dataSource: list,
        loading: loading.effects['manlou/query'],
        location,
        pagination,
        onChange(page) {
            dispatch(routerRedux.push({
                pathname,
                query: {
                    ...query,
                    pageNo: page.current,
                    pageSize: page.pageSize,
                },
            }))

        },
        onDeleteItem(id) {
            dispatch({
                type: 'manlou/remove',
                payload: id
            })
        },
        onEditItem(item) {
            dispatch({
                type: 'manlou/showModal',
                payload: {
                    modalType: 'update',
                    currentItem: item
                }
            })
        },
        onShowDetail(item) {
            dispatch({
                type: 'manlou/showDetailModal',
                payload: {
                    currentItem: item
                }
            })
        }
    }

    const modalProps = {
        item: modalType === 'create' ? {} : currentItem,
        visible: modalVisible,
        width: 1000,
        maskClosable: false,
        confirmLoading: loading.effects[`task/${modalType}`],
        title: modalType === 'create' ? '创建任务' : '编辑任务',
        wrapClassName: 'vertical-center-modal',
        modalType,
        onOk(data) {
            dispatch({
                type: `manlou/${modalType}`,
                payload: data
            })
        },
        onCancel() {
            dispatch({
                type: 'manlou/hideModal'
            })
        }
    }

    const detailProps = {
        item: currentItem,
        visible: detailVisible,
        title: '详情',
        width: 1000,
        footer: null,
        maskClosable: false,
        wrapClassName: 'vertical-center-modal',
        onCancel() {
            dispatch({
                type: 'manlou/hideDetailModal'
            })
        }
    }

    return (
        <Page inner>
            <Filter {...filterProps} />
            <List {...listProps} />
            {detailVisible && <Detail {...detailProps}></Detail>}
            {modalVisible && <Modal {...modalProps}></Modal>}
        </Page>
    )
}

ManLou.propTypes = {
    manlou: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object,
}

export default connect(({
    manlou, loading
}) => ({
    manlou, loading
}))(ManLou);