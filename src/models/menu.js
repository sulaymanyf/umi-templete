import { getMainMenu, getList, getTree, saveAndUpDate, deleteById } from '@/services/menu';
import { getMetin } from '@/services/metin';
import { notification } from 'antd';

const MenuModel = {
  namespace: 'menu',
  state: {
    collapsed: false,
    notices: [],
    menuList: [],
    menuTree: [],
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
    *getList({ type, payload }, { put, call, select }) {
      const response = yield call(getList);
      console.log('getList', response);
      yield put({
        type: 'setMenuList',
        payload: response,
      });
    },
    *getTree({ type, payload }, { put, call, select }) {
      const response = yield call(getTree);
      console.log('getList', response);
      yield put({
        type: 'setMenuTree',
        payload: response,
      });
    },
    *deleteById({ type, payload }, { put, call, select }) {
      const response = yield call(deleteById, payload);
      console.log('getList', response);
      if (response.flag == true) {
        yield put({
          type: 'setMenuTree2',
          payload: response,
        });
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
    },
    *saveAndUpDate({ type, payload }, { put, call, select }) {
      const response = yield call(saveAndUpDate, payload);
      console.log('saveAndUpDate', response);
      if (response.flag == true) {
        yield put({
          type: 'setMenuTree2',
          payload: response,
        });
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
    },
  },
  reducers: {
    changeLayoutCollapsed(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return { ...state, collapsed: payload };
    },

    saveMainMenu(state, { payload }) {
      return {
        collapsed: false,
        ...state,
        notices: payload,
      };
    },
    setMenuList(state, action) {
      console.log('setMenuList', action.payload.data);
      return { ...state, menuList: action.payload.data };
    },
    setMenuTree(state, action) {
      console.log('setMenuList', action.payload.data);
      return { ...state, menuTree: action.payload.data };
    },
    setMenuTree2(state, action) {
      console.log('setMenuList', action.payload.data);
      return { menuTree: action.payload.data };
    },
    saveClearedNotices(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return {
        collapsed: false,
        ...state,
        notices: state.notices.filter(item => item.type !== payload),
      };
    },
  },
  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
export default MenuModel;
