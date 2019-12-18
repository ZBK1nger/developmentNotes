##### 1字符串分割为数组
~~~
let string = "我是测试字符串"
let array = [...new Set(string)]
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