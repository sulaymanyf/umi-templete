import { getMetinList, getMetinTree, getMetin } from '@/services/metin';

const MetinModel = {
  namespace: 'metin',
  state: {
    metins: {},
    metin: {},
    metinTree: [],
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
      return { ...state, metins: action.payload };
    },
    setMetinTree(state, action) {
      console.log(action);
      return { ...state, metinTree: action.payload };
    },

    setMetin(state, action) {
      console.log(action);
      return { ...state, metin: action.payload };
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
    *getTree({ type, payload }, { put, call, select }) {
      const response = yield call(getMetinTree);
      console.log(response);
      yield put({
        type: 'setMetinTree',
        payload: response,
      });
    },
    *getMetin({ type, payload }, { put, call, select }) {
      const response = yield call(getMetin, payload);
      console.log(response);
      yield put({
        type: 'setMetin',
        payload: response,
      });
    },
  },
};
export default MetinModel;
