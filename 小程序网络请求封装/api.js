var app = getApp()
const util = require('../utils/util.js')
const user = require('../utils/user.js')
/**
 * 发起get请求
 * @param url 请求路径 必填
 * @param data 请求参数 get请求的参数会自动拼到地址后面
 * @param headers 请求头 选填
 * @returns {Promise}
 */
export const get = (url, data, headers) => request('GET', url, data, headers);

/**
 * 发起post请求
 * @param url 请求路径 必填
 * @param data 请求参数
 * @param headers 请求头 选填
 * @returns {Promise}
 */
export const post = (url, data, headers) => request('POST', url, data, headers);
/**
 * 发起put请求
 * @param url 请求路径 必填
 * @param data 请求参数
 * @param headers 请求头 选填
 * @returns {Promise}
 */
export const put = (url, data, headers) => request('PUT', url, data, headers);
/**
 * 发起delete请求
 * @param url 请求路径 必填
 * @param data 请求参数 delete请求的参数会自动拼到地址后面
 * @param headers 请求头 选填
 * @returns {Promise}
 */
export const del = (url, data, headers) => request('DELETE', url, data, headers);

/**
 * 接口请求基类方法
 * @param method 请求方法 必填
 * @param url 请求路径 必填
 * @param data 请求参数
 * @param header 请求头 选填
 * @returns {Promise}
 */
export function request(method, url, data, header ) {
  if(util.judgeObj(header)) {
    header = {
      'content-type': 'application/json'
    }
  }
  console.group('==============>新请求<==============');
  console.info(method, url);
  //添加参数
  data["t"] = new Date().getTime()
  if (user.isLogin()) {
    //data["userId"] = user.isLogin().userId
    header["X-Access-Token"] = user.isLogin().token ? user.isLogin().token : ""
  }

  if (data) console.info('参数：', data);
  return new Promise((resolve, reject) => {
    const response = {};
    wx.request({
      url,
      method,
      data,
      header,
      success: (res) => response.success = res.data,
      fail: (error) => response.fail = error,
      complete() {
        if (response.success.success) {
          console.info('请求成功：', response.success);
          resolve(response.success)
        } else {
          wx.hideLoading()
          console.info('请求失败：', response.fail);
          reject(response.fail)
        }
        console.groupEnd();
      },
    });
  });
}


/**
 * 服务器根域名
 * @type {string}
 */

/** 正式 */
// export const API_ROOT = 'https://gzzshoutest.cindata.cn';

/** 测试 */
//export const API_ROOT = 'http://10.200.11.173:8080';

/** 本地 */
//export const API_ROOT = 'http://10.200.18.240:8080';

//客户
export const API_ROOT = 'https://yjcustom.cindata.cn';