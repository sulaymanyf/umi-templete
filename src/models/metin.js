import { getMetinList, getMetinTree, getMetin, getWord, saveCeviri } from '@/services/metin';
import { notification } from 'antd';

const MetinModel = {
  namespace: 'metin',
  state: {
    metins: {},
    metin: {},
    options: [],
    form: {},
    cervir: {},
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/articlemange/article') {
          dispatch({
            type: 'fetch',
          });
        }
      });
    },
  },
  reducers: {
    // 上面的方法返回后放在reducers
    setMetinList(state, action) {
      console.log(action);
      return { ...state, metins: action.payload.data };
    },
    setMetinTree(state, action) {
      console.log(action);
      return { ...state, options: action.payload.data };
    },

    setMetin(state, action) {
      console.log(action);
      return { ...state, metin: action.payload };
    },
    setWord(state, action) {
      console.log(action);
      return { ...state, form: action.payload.data };
    },
    setCevir(state, action) {
      console.log(action);
      return { ...state, cervir: action.payload };
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
    *getTree({ type, payload, callback }, { put, call, select }) {
      const response = yield call(getMetinTree);
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
    },
    *getWord({ type, payload }, { put, call, select }) {
      const response = yield call(getMetin, payload);
      console.log(response);
      yield put({
        type: 'setMetin',
        payload: response,
      });
    },
    *getMetin({ type, payload }, { put, call, select }) {
      const response = yield call(getMetin, payload);
      console.log(response);
      yield put({
        type: 'setWord',
        payload: response,
      });
      if (response.code == 20000) {
        return response.data;
      } else {
        notification.error({
          message: 'Notification Title',
          description: response.message,
        });
      }
    },
    *getOneMetin({ type, payload }, { put, call, select }) {
      const response = yield call(getOneMetin, payload);
      console.log(response);
      yield put({
        type: 'setWord',
        payload: response,
      });
    },
    *saveCeviri({ type, payload }, { put, call, select }) {
      const response = yield call(saveCeviri, payload);
      console.log('响应');
      console.log(response);
      console.log(response.code);
      if (response.code == 20000) {
        notification.success({
          message: 'Notification Title',
          description: response.message,
        });
      } else {
        notification.error({
          message: 'Notification Title',
          description: response.message,
        });
      }
      yield put({
        type: 'setCevir',
        payload: response,
      });
    },
  },
};
export default MetinModel;
