import request from '@/utils/request';

export async function getCeviri(id) {
  return request('/api/ceviri-kizlar/file/v1/file-ceviri/' + id, {
    method: 'GET',
  });
}

export async function getMetinTree() {
  return request('/api/ceviri-kizlar/file/v1/metinType', {
    method: 'GET',
  });
}

export async function getMetin(id) {
  return request('/api/ceviri-kizlar/file/v1/metin/' + id, {
    method: 'GET',
  });
}
export async function getWord(id) {
  return request('/api/ceviri-kizlar/v1/metin/' + id, {
    method: 'GET',
  });
}

export async function saveCeviri(params) {
  return request('/api/ceviri-kizlar/v1/ceviri', {
    method: 'PUT',
    data: params,
  });
}
