import service from '@/utils/request'

/**
 * @createUser zsq 2021-2-20
 * @param {Object} data 请求参数
 */
export function getUserInfo (data) {
  return service.request({
    url: 'users',
    method: 'get',
    params: data
  })
}

export function changeUserState (uid, type) {
  return service.request({
    url: `users/${uid}/state/${type}`,
    method: 'put'
  })
}
