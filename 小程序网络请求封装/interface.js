/**
 * 此文件管理项目所有接口
 */
import { get, post, put, del, API_ROOT } from './api.js';

/**
 * 服务器根域名
 * @type {string}
 */

/** 正式 */
// export const API_ROOT = 'https://gzzshoutest.cindata.cn';

/** 测试 */
// export const API_ROOT = 'https://yjtest.cindata.cn';

/** 本地 */
//export const API_ROOT = 'http://10.200.18.240:8080';

//客户
// export const API_ROOT = 'http://yjcustom.cindata.cn';


/**
 * 获取图片
 */
//export const getPhoto = (id) => get(`${API_ROOT}/photos/${id}`);



// export const test = () => post()

/**
 * 登录注册
 */

/**获取openId*/
function miniprogramLogin(params) {
  const url = API_ROOT + '/gxdyj/guest/miniprogram/login';
  return get(url, params);
}

module.exports = {
  miniprogramLogin: miniprogramLogin,
}