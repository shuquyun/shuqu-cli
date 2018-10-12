import modelExtend from 'dva-model-extend'
import { query, create, remove, update, } from './service'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import queryString from 'query-string'

export default modelExtend(pageModel, {
    namespace: 'manlou',

    state: {
        currentItem: {},
        modalVisible: false,
        modalType: 'create'
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname === '/manlou') {
                    const payload = location.query || { page: 1, pageSize: 10 }
                    dispatch({
                        type: 'query',
                        payload
                    })
                }
            })
        }
    },

    effects: {
        *query({ payload = {} }, { call, put }) {
            if (!payload.pageNo) {
                payload = { ...payload, ...queryString.parse(location.search) }
            }
            const data = yield call(query, payload)
            if (data.success) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data.result.data,
                        pagination: {
                            current: Number(payload.pageNo) || 1,
                            pageSize: Number(payload.pageSize) || 10,
                            total: data.result.total
                        }
                    }
                })
            } else {
                throw data
            }
        },
        *create({ payload }, { call, put }) {
            const data = yield call(create, payload)
            if (data.success) {
                message.success('添加成功', 1)
                yield put({ type: 'hideModal' })
                yield put({ type: 'query' })
            } else {
                throw data
            }
        },
        *remove({ payload }, { call, put }) {
            const data = yield call(remove, { id: payload })
            if (data.success) {
                message.success('删除成功', 1)
                yield put({ type: 'query' })
            } else {
                throw data
            }
        },
        *update({ payload }, { call, put, select }) {
            const data = yield call(update, payload)
            if (data.success) {
                message.success('更新成功', 1)
                yield put({ type: 'hideModal' })
                yield put({ type: 'query' })
            } else {
                throw data
            }
        },
    },

    reducers: {
        showModal(state, { payload }) {
            return { ...state, ...payload, modalVisible: true }
        },
        hideModal(state, { payload }) {
            return { ...state, modalVisible: false }
        }
    }
})