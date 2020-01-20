import { query, getOne, getTree, getRoleList } from '@/services/permission';
import { notification } from 'antd';

const PermissionModel = {
  namespace: 'permission',
  state: {
    perm: {},
    options: [],
    roleList: [],
    permissionTree: [],
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
    setList(state, action) {
      return { ...state, perm: action.payload };
    },
    setOne(state, action) {
      return { ...state, options: action.payload };
    },
    setTree(state, action) {
      return { ...state, permissionTree: action.payload.data };
    },
    setRoleList(state, action) {
      return { ...state, roleList: action.payload.data };
    },
    setRoles(state, action) {
      return { ...state, roles: action.payload.data };
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
    *getListss({ type, payload, callback }, { put, call, select }) {
      const response = yield call(query);
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
    *getList({ type, payload }, { put, call, select }) {
      const response = yield call(query, payload);
      console.log(response);
      yield put({
        type: 'setList',
        payload: response,
      });
    },
    *getTree({ type, payload }, { put, call, select }) {
      const response = yield call(getTree, payload);
      yield put({
        type: 'setTree',
        payload: response,
      });
      // if (response.flag === true) {
      //   console.log(response)
      //   console.log(typeof callback === 'function')
      //   if (callback && typeof callback === 'function') {
      //     console.log(response)
      //     callback(response); // 返回结果
      //   }
      // } else {
      //   notification.error({
      //     message: response.message,
      //   });
      // }
    },
    *getMetin({ type, payload }, { put, call, select }) {
      const response = yield call(getMetin, payload);
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
    *getOne({ type, payload }, { put, call, select }) {
      console.log('payload', payload);
      const response = yield call(getOne, payload);
      yield put({
        type: 'setOne',
        payload: response,
      });
    },
    *getRoleList({ type, payload }, { put, call, select }) {
      const response = yield call(getRoleList, payload);
      yield put({
        type: 'setRoleList',
        payload: response,
      });
    },
    *getRoles({ type, payload, callback }, { put, call, select }) {
      const response = yield call(getRoleList, payload);
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
  },
};
export default PermissionModel;
