import request from '@/utils/request';

export async function getWordList(keyword) {
  return request('/api/ceviri-kizlar/sozluk/v1/sozluk/en/list/' + keyword, {
    method: 'GET',
  });
}

export async function getWord(keyword) {
  return request('/api/ceviri-kizlar/sozluk/v1/sozluk/en/' + keyword, {
    method: 'GET',
  });
}

export async function getMetin(id) {
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
