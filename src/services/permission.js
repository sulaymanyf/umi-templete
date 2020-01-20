import request from '@/utils/request';

export async function query() {
  return request('/api/ceviri-kizlar/permission/v1/permission/all');
}

export async function getOne(id) {
  return request(`/api/ceviri-kizlar/permission/v1/permission/${id}`, {
    method: 'GET',
  });
}

export async function getTree(id) {
  return request(`/api/ceviri-kizlar/permission/v1/permission/tree`, {
    method: 'GET',
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
export async function getMainMenu() {
  return request('api/ceviri-kizlar/menu/v1/menu/mainmenu', {
    method: 'GET',
  });
}
export async function getRoleList(id) {
  return request(`/api/ceviri-kizlar/role/v1/role/${id}`, {
    method: 'GET',
  });
}
