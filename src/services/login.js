import request from '@/utils/request';
export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function getImageCaptcha() {
  return request(`api/ceviri-kizlar/code/v1/code`);
}

export async function login(params) {
  return request('api/ceviri-kizlar/user/v1/user/login', {
    method: 'POST',
    data: params,
  });
}
