import request from '@/utils/request';
export async function query(current) {
  return request(`/api/ceviri-kizlar/tag/v1/tag/${current.size}/${current.current}`);
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function add(params) {
  return request(`/api/ceviri-kizlar/metin/v1/metin/type`, {
    method: 'PUT',
    data: params,
  });
}

export async function getList() {
  return request('/api/ceviri-kizlar/metin/v1/metin/tipList', {
    method: 'GET',
  });
}
export async function Delete(id) {
  return request(`/api/ceviri-kizlar/metin/v1/metin/type/${id}`, {
    method: 'DELETE',
  });
}
