import request from '@/utils/request';
export async function query(current) {
  return request(`/api/ceviri-kizlar/tag/v1/tag/${current.size}/${current.current}`);
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
// export async function add(params) {
//   return request(`/api/ceviri-kizlar/tag/v1/tag`, {
//     method: 'POST',
//     params:params
//   });
// }
export async function add(params) {
  return request('/api/ceviri-kizlar/tag/v1/tag', {
    method: 'POST',
    data: params,
  });
}
export async function Delete(id) {
  return request(`/api/ceviri-kizlar/tag/v1/tag/${id}`, {
    method: 'DELETE',
  });
}
