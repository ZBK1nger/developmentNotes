/**
 * 此文件管理项目所有接口
 */
import {
    get,
    post,
    put,
    patch
  } from './api.js';

  
  export const server = {
    exam: function(paramObj){
        return post('/api.php?ac=v2_djList',paramObj);
    }
}

// 获取所有行政区
export const getAllDistricts = (minArea,maxArea,minPrice,maxPrice,roomNum) =>get('/Map/getDistrictList',{
  cityId:5301,
  minArea : minArea,
  maxArea : maxArea,
  minPrice : minPrice,
  maxPrice : maxPrice,
  roomNum : roomNum,
  mapType : 'bd'
})

// 地图选址  通过可视区经纬度获取片区小区
export const mapmark =(level,areaX,areaY,minArea,maxArea,minPrice,maxPrice,roomNum) => get('/Map/getAreaList',{
  cityId:5301,
  level:level,//1 片区 2小区
  areaX:areaX,//小的经纬度
  areaY:areaY,//大的经纬度
  minArea : minArea,
  maxArea : maxArea,
  minPrice : minPrice,
  maxPrice : maxPrice,
  roomNum : roomNum,
  mapType : 'bd'
});
// 地图选址  获取小区片区边界
export const markbound =(level,areaId,areaName) => get('/Map/getBound',{
  cityId:5301,
  level:level,//1 片区 2小区
  areaId:areaId,//点id
  areaName:areaName,//点name
  mapType : 'bd'
});


