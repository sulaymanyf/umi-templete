import { stringify } from 'querystring';
import router from 'umi/router';
import { fakeAccountLogin, getFakeCaptcha,login ,getImageCaptcha} from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import {notification} from "antd";
import {getWordList} from "@/services/cevir";
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      console.log(response)
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully

      if (response.flag) {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        router.replace(redirect || '/');
      }else {
        notification.error({
          message: 'Notification Title',
          description: response.message
        });
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },
   *getImageCaptcha({ payload ,callback}, { call }) {
     const response =  yield call(getImageCaptcha);
     if (response.flag === true) {
       console.log(response)
       console.log(typeof callback === 'function')
       if (callback && typeof callback === 'function') {
         console.log(response)
         callback(response); // 返回结果
       }
     } else {
       notification.error({
         message: response.message,
       });
     }
      },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== '/user/login' && !redirect) {
        router.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      console.log("changeLoginStatus",payload.data)

      console.log("payload.currentAuthority",payload.currentAuthorityoad)
      setAuthority(payload.data.token);
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
