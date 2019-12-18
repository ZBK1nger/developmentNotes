import { get, post, put, del, API_ROOT } from './api.js';

// 获取所有行政区
export const getAllDistricts = () => get(API_ROOT + '/gxdyj/personal/gxdApi/getDistrictList', {
  cityId: '2301'
})

// 地图选址  通过可视区经纬度获取片区小区
export const mapmark = (level, areaX, areaY) => get(API_ROOT + '/gxdyj/personal/gxdApi/getAreaList', {
  cityCode: 2301,
  level: level,//1 片区 2小区
  areaX: areaX,//小的经纬度
  areaY: areaY,//大的经纬度
});
// 地图选址  获取小区片区边界
export const markbound = (level, areaId, areaName) => get(API_ROOT + '/gxdyj/personal/gxdApi/getBound', {
  cityCode: 2301,
  level: level,//1 片区 2小区
  areaId: areaId,//点id
  areaName: areaName,//点name
});