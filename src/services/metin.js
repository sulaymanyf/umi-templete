import request from '@/utils/request';

export async function getMetinList(params) {
  return request('/api/ceviri-kizlar/metin/v1/metin', {
    method: 'GET',
    data: params,
  });
}

export async function getMetinTree() {
  return request('/api/ceviri-kizlar/metin/v1/metin/Tree', {
    method: 'GET',
  });
}

export async function getMetin(id) {
  return request('/api/ceviri-kizlar/metin/v1/metin/' + id, {
    method: 'GET',
  });
}
export async function getWord(id) {
  return request('/api/ceviri-kizlar/metin/v1/metin/' + id, {
    method: 'GET',
  });
}

export async function saveCeviri(params) {
  return request('/api/ceviri-kizlar/ceviri/v1/ceviri', {
    method: 'PUT',
    data: params,
  });
}
