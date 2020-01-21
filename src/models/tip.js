import { query, Delete, getList, add } from '@/services/tip';

const TipModel = {
  namespace: 'tip',
  state: {
    tipList: [],
  },
  effects: {
    *getList({ type, payload }, { put, call, select }) {
      const data = yield call(getList);
      yield put({
        type: 'setList',
        payload: data,
      });
    },
    *getPage({ type, payload }, { put, call, select }) {
      const response = yield call(query, payload);
      console.log('getPage', response);
      yield put({
        type: 'setPage',
        payload: response,
      });
    },
    *add({ type, payload }, { put, call, select }) {
      const response = yield call(add, payload);
      if (response.flag == true) {
        yield put({
          type: 'setList',
          payload: response,
        });
      }
    },
    *Delete({ type, payload }, { put, call, select }) {
      const response = yield call(Delete, payload);
      if (response.flag == true) {
        yield put({
          type: 'setList',
          payload: response,
        });
      }
    },
  },
  reducers: {
    setPage(state, action) {
      console.log('setPage', action.payload.data);
      return { ...state, tagPage: action.payload.data };
    },
    setList(state, action) {
      console.log('tipList', action.payload.data);
      return { ...state, tipList: action.payload.data };
    },
  },
  // subscriptions: {
  //   setup({ history }) {
  //     // Subscribe history(url) change, trigger `load` action if pathname is `/`
  //     history.listen(({ pathname, search }) => {
  //       if (typeof window.ga !== 'undefined') {
  //         window.ga('send', 'pageview', pathname + search);
  //       }
  //     });
  //   },
  // },
};
export default TipModel;
