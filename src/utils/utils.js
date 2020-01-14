import { parse } from 'querystring';
import pathRegexp from 'path-to-regexp';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = path => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);
/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */
//export const getRouteAuthority = (path, routeData) => {
//   let authorities;
//   routeData.forEach(route => {
//     // match prefix
//     if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) { . <---- 这里判断条件有问题 如果authority设置在/, 这个测试不能通过。 我把它改成`${route.path}(.*)` 后， 根目录可以工作了。可能还有些情况需要考虑。
//       if (route.authority) {
//         authorities = route.authority;
//       } // exact match
//
//       if (route.path === path) {
//         authorities = route.authority || authorities;
//       } // get children authority recursively
//
//       if (route.routes) {
//         authorities = getRouteAuthority(path, route.routes) || authorities;
//       }
//     }
//   });
//   return authorities;
// };
export const getAuthorityFromRouter = (router = [], pathname) => {
  // const authority = router.find(({ path }) => path && pathRegexp(path).exec(pathname)); //官方
  let authority;
  (function getAuthority(route) {
    route.forEach(item => {
      const { path, routes } = item;
      if (path === pathname) authority = item;
      else if (path && routes && routes.length) {
        return getAuthority(routes);
      }
    });
  })(router);

  if (authority) return authority;
  return undefined;
};
export const getRouteAuthority = (path, routeData) => {
  let authorities;
  routeData.forEach(route => {
    // match prefix
    if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority;
      } // exact match

      if (route.path === path) {
        authorities = route.authority || authorities;
      } // get children authority recursively

      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

// 将一个父子结构的树扁平化为一个数组。
export function getPlainNode(nodeList) {
  const arr = [];
  nodeList.forEach(item => {
    arr.push(item);
    if (item.children) {
      arr.push(...getPlainNode(item.children));
    }
  });
  return arr;
}

// 查找一个父子结构树中子节点的所有父节点
export function getParentKey(key, tree) {
  let parentKey;
  for (let i = 0; i < tree.length; i += 1) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
}

// 获取对象的所有值
export const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

export const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};
//interface Router{
//   path:string,
//   routes?:Router[],
// }
//
// /**
//  * props.route.routes
//  * @param router [{}]
//  * @param pathname string
//  */
// export const getAuthorityFromRouter = <T extends { path: string }>(
//   router: T[] = [],
//   pathname: string,
// ): T | undefined => {
//   const authority = getAuthorityRecursion(router,pathname);
//   if (authority) return authority;
//   return undefined;
// };
//
//
//
// function getAuthorityRecursion(router:Router[],pathname:string):any{
//   for(let route of router){
//       const { path, routes } = route;
//
//       if(path && pathRegexp(path).exec(pathname)){
//         return route;
//       } else {
//         if(!routes){
//           continue;
//         }
//         const authority = getAuthorityRecursion(routes,pathname);
//         if(authority)return authority;
//       }
//   }
//
// }

//export const getAuthorityFromRouter = <T extends { path: string; routes?: Route[] }>(
//   router: T[] = [],
//   pathname: string,
// ): T | undefined => {
//   let authority: T | undefined;
//   forEach(router, item => {
//     const { path, routes } = item;
//     if (path && pathRegexp(path).exec(pathname)) {
//       authority = item;
//       return false;
//     }
//     if (routes && !authority) {
//       authority = getAuthorityFromRouter(routes, pathname) as T;
//       if (authority) {
//         return false;
//       }
//     }
//     return authority;
//   });
//   return authority;
// };
