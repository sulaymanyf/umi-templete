import { getWordList, getWord } from '@/services/cevir';
import { notification } from 'antd';

const MetinModel = {
  namespace: 'ceviri',
  state: {
    wordLis: [],
  },
  // subscriptions: {
  //   setup({dispatch, history}) {
  //     return history.listen(({pathname, query}) => {
  //       if (pathname === '/articlemange/article') {
  //         dispatch({
  //           type: 'fetch',
  //         });
  //       }
  //     });
  //   },
  // },
  reducers: {
    // 上面的方法返回后放在reducers
    setWordList(state, action) {
      console.log(action);
      return { ...state, metins: action.payload.data };
    },
  },
  effects: {
    *fetch({ type, payload }, { put, call, select }) {
      const response = yield call(getMetinList, {});
      console.log(response);
      yield put({
        type: 'setMetinList',
        payload: response,
      });
    },
    *getWordList({ type, payload, callback }, { put, call, select }) {
      const response = yield call(getWordList, payload);
      console.log(response);
      if (response.flag === true) {
        console.log(response);
        console.log(typeof callback === 'function');
        if (callback && typeof callback === 'function') {
          console.log(response);
          callback(response); // 返回结果
        }
      } else {
        notification.error({
          message: response.message,
        });
      }
      // yield put({
      //   type: 'setWordList',
      //   payload: response,
      // });
    },
    *getWord({ type, payload, callback }, { put, call, select }) {
      const response = yield call(getWord, payload);
      console.log(response);
      if (response.flag === true) {
        console.log(response);
        console.log(typeof callback === 'function');
        if (callback && typeof callback === 'function') {
          console.log(response);
          callback(response); // 返回结果
        }
      } else {
        notification.error({
          message: response.message,
        });
      }
      // yield put({
      //   type: 'setMetin',
      //   payload: response,
      // });
    },
  },
};
export default MetinModel;
