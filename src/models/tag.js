import { query, add, Delete } from '@/services/tag';

const TagModel = {
  namespace: 'tag',
  state: {
    tagPage: [],
  },
  effects: {
    *fetchMainMenu(_, { call, put, select }) {
      const data = yield call(getMainMenu);
      yield put({
        type: 'saveMainMenu',
        payload: data,
      });
      const unreadCount = yield select(
        state => state.global.notices.filter(item => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: data.length,
          unreadCount,
        },
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
          type: 'setPage',
          payload: response,
        });
      }
    },
    *Delete({ type, payload }, { put, call, select }) {
      const response = yield call(Delete, payload);
      if (response.flag == true) {
        yield put({
          type: 'setPage',
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
export default TagModel;
