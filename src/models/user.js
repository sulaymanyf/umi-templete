import { queryCurrent, query as queryUsers ,queryMenu } from '@/services/user';
import {NotificationApi as notification} from "antd/lib/notification";
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    menuData:[]
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *fetchMenu({ type, payload,callback }, { put, call, select }){
      const response = yield call(queryMenu);
      console.log("fetchMenu",response)

      if (response.flag == true) {
        console.log(response.flag == true)
        if (callback && typeof callback === 'function') {
          callback(response); // 返回结果
        }
      } else {
        notification.error({
          message: response.msg,
        });
      }
      // yield put({
      //   type: 'saveCurrentMenu',
      //   payload: response,
      // });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
    saveCurrentMenu(state, action) {
      return { ...state, menuData: action.payload.data || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
