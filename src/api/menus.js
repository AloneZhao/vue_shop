import service from '@/utils/request'
/**
 * 左侧菜单数据列表
 */
export function getMenuList () {
  return service.request({
    url: 'menus',
    method: 'get'
  })
}
