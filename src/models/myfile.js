import { getCeviri } from '@/services/myfile';

const MetinModel = {
  namespace: 'myFile',
  state: {
    ceviri: ' ',
  },
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     return history.listen(({ pathname, query }) => {
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
    setMetinList(state, action) {
      console.log(action);
      return { ...state, metins: action.payload };
    },
    setCeviri(state, action) {
      console.log(action);
      return { ...state, ceviri: action.payload.message };
    },

    setMetin(state, action) {
      console.log(action);
      return { ...state, metin: action.payload };
    },
    setWord(state, action) {
      console.log(action);
      return { ...state, word: action.payload };
    },
    setCevir(state, action) {
      console.log(action);
      return { ...state, ceviri: action.payload.message };
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
    *getCeviri({ type, payload }, { put, call, select }) {
      const response = yield call(getCeviri, payload);
      console.log(response);
      yield put({
        type: 'setCeviri',
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
    },

    *saveCeviri({ type, payload }, { put, call, select }) {
      const response = yield call(saveCeviri, payload);
      console.log(response);
      yield put({
        type: 'setCevir',
        payload: response,
      });
    },
  },
};
export default MetinModel;
