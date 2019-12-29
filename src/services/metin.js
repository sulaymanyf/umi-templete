import request from '@/utils/request';

export async function getMetinList(params) {
  return request('/api/ceviri-kizlar/v1/metin', {
    method: 'GET',
    data: params,
  });
}

export async function getMetinTree() {
  return request('/api/ceviri-kizlar/v1/metinType', {
    method: 'GET',
  });
}

export async function getMetin(id) {
  return request('/api/ceviri-kizlar/v1/metin/' + id, {
    method: 'GET',
  });
}
