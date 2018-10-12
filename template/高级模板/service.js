import { request, config } from 'utils'

const { api } = config
const { manlou } = api

export async function query(params) {
    return request({
        url: manlou,
        method: 'get',
        data: params
    })
}

export async function create(params) {
    return request({
        url: manlou,
        method: 'post',
        data: params
    })
}

export async function remove(params) {
    return request({
        url: `${manlou}/${params.id}`,
        method: 'delete',
    })
}


export async function update(params) {
    return request({
        url: manlou,
        method: 'put',
        data: params
    })
}
