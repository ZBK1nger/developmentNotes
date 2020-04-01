##### 1字符串分割为数组，数组按标示分割为字符串
~~~
let string = "我是测试字符串"
let array = [...new Set(string)]
~~~

~~~
let string = "1,2,3,4"
let array = string.split(',')
~~~

~~~
let array = [1,2,3]
let string = array.join('|')
~~~

##### 2 map方法返回一个新数组
~~~
let array = ['我','很','好']
const array1 =  array.map(item=> {
        return {
          id : "",
          name : item
        }
      })
~~~

##### 3将observer类型对象转为正常键值对对象
~~~
Object.assign({},要转换的对象)
~~~

##### 4 vue移动端px转rem

* 1 安装插件cssrem

Cssrem:root Font Size :  (UI图尺寸) / 将屏幕分割的份数 = 根fontSize
fontSize = 750 / 100 = 7.5

* 2 index.html设置

~~~
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
    <script>
      (function() {
        var html = document.documentElement
        var hWidth = html.getBoundingClientRect().width
        html.style.fontSize = hWidth / 100 + 'px'
      })()
    </script>
~~~

* 3 计算原理

若 控件尺寸为100px，则转换为13.33rem

750屏幕宽度 13.33rem 100px

640屏幕宽度 13.33rem 85px

480屏幕宽度 13.33rem 64px


##### 5 flex换行布局

一个display：flex的容器，横向的标题和内容，标题不换行，内容换行，则标题设置white-space : nowrap; 内容设置 word-break:break-all;


##### 6 mac chrome关闭跨域模式

open -n /Applications/Google\ Chrome.app/ --args --disable-web-security --user-data-dir=/Users/zhangbo/MyChromeDevUserData/

##### 7应用场景：循环出来的列表，需要根据点击项，动态改变列表中对应id的数据

~~~

// 动态传递id
<block wx:for="{{list}}" wx:key="{{index}}">
  <view catch:tap="onChangeName" data-index="{{index}}"></view>
</block>

Page({
  data: {
    list:[{
      id: 0,
      name: 'wang'
    },{
      id: 1,
      name: 'li'
    }]
  },
  onChangeName: function(event){
    // 拿到id
   let index = event.target.dataset.index
   let key = `list[${index}].name`, val = 'zhang'
   // 设置值
   this.setData({
    [key]: val
   })
  }
})
~~~

##### git识别文件夹大小写

移动到项目文件夹下 输入以下命令

~~~
git config core.ignorecase false

~~~