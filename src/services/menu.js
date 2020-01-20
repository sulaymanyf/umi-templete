import request from '@/utils/request';
export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}
export async function getMainMenu() {
  return request('api/ceviri-kizlar/menu/v1/menu/mainmenu', {
    method: 'GET',
  });
}
export async function getList() {
  return request('api/cevir-kizar/menu/v1/menuList', {
    method: 'GET',
  });
}
export async function getTree() {
  return request('api/cevir-kizar/menu/v1/menu', {
    method: 'GET',
  });
}
export async function saveAndUpDate(params) {
  return request('api/cevir-kizar/menu/v1/menu', {
    method: 'PUT',
    data: params,
  });
}

export async function deleteById(id) {
  return request(`api/cevir-kizar/menu/v1/menu/${id}`, {
    method: 'DELETE',
  });
}
