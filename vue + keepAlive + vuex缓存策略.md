
### 第一种方式
* 1.在路由文件设置要缓存的页面meat中keepAlive : true
* 2 在App.vue或者父路由设置缓存

~~~

<keep-alive>
        <router-view v-if="$route.meta.keepAlive">
           <!-- 这里是会被缓存的视图组件，比如 Home！ -->
        </router-view>
    </keep-alive> <
router - view v -
    if = "!$route.meta.keepAlive" >
    <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
    <
    /router-view>
    
~~~


* 3 再要缓存的文件中判断什么时候缓存该页面，什么时候不缓存该页面


~~~
beforeRouteLeave(to, from, next) {
        if (to.name === 'previewcontract') {
            this.changeKeepAlive('search', 'lessee-contract', true)
        } else {
            this.changeKeepAlive('search', 'lessee-contract', false)
        }
        console.log(to)
        console.log(from)
        next()
    },

    changeKeepAlive(parentName, name, keepAlive) {
        // @ts-ignore
        this.$router.options.routes.map(item => {
            if (item.name === parentName) {
                item.children.map(child => {
                    if (child.name === name) {
                        child.meta.keepAlive = keepAlive
                    }
                })
            }
        })
    },
~~~

### 第二种方式
* 1 父路由设置 App.vue 或者要缓存页面的父路由

~~~
<keep-alive :include="keepAlive">
     <router-view></router-view>
</keep-alive>

computed: {
        keepAlive() {
            console.log(this.$map.getters.keepAlive)
            return this.$map.getters.keepAlive;
        }
    },
~~~
   * 2 判断什么时候该页面缓存，什么时候清除缓存
   
~~~

    beforeRouteLeave(to, from, next) {
        console.log(to)
        if (to.name === 'Map') { // 这是路由path
            this.$map.commit('ADD_CACHE_COMPONENT', { name: 'rent' }); //这是此页面的name属性名字
        } else {
            this.$map.commit('REMOVE_CACHE_COMPONENT', { name: 'rent' });
        }
        next();
    },
~~~

~~~
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let store = new Vuex.Store({
    // 1. state
    state: {
        keepAlive: []
    },

    // // 2. getters
    getters: {
        // 参数列表state指的是state数据
        keepAlive: state => state.keepAlive
    },
    // 3. actions
    // 通常跟api接口打交道
    //   actions: {
    //     // 设置城市信息
    //     // 参数列表：{commit, state}
    //     // state指的是state数据
    //     // commit调用mutations的方法 
    //     // name就是调用此方法时要传的参数
    //     setCityName({
    //       commit,
    //       state
    //     }, name) {
    //       // 跟后台打交道
    //       // 调用mutaions里面的方法
    //       commit("setCity", name);
    //     }
    //   },
    // 4. mutations
    mutations: {
        // state指的是state的数据
        // name传递过来的数据
        ADD_CACHE_COMPONENT(state, component = {}) {
            if (!state.keepAlive.includes(component.name)) {
                state.keepAlive = [...state.keepAlive, component.name];
            }
        },

        REMOVE_CACHE_COMPONENT(state, component = {}) {
            if (state.keepAlive.indexOf(component.name)) {
                state.keepAlive.splice(
                    state.keepAlive.indexOf(component.name),
                    1,
                );
            }
        }
    }
});

export default store;
~~~
