//入口文件
import Vue from 'vue'
//导入app组件
import app from './App.vue'

//1.1导入路由的包
import VueRouter from 'vue-router'
//1.2 安装路由
Vue.use(VueRouter)
//1.3导入自己的router.js的模块
import router from './router.js'

//的导入格式化时间的插件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattren = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattren)
})


//2.1导入vue-resource
import VueResource from 'vue-resource'
//2.2安装vue-resource
Vue.use(VueResource)
//设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
//全局设置post时候表单数据格式组织形式
Vue.http.options.emulateJSON = true

//注册Vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//进入网站时，先从本地存储中，把购物车中的数据读出来，放到store中
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
    state: {  //this.$store.state
        car: car   //将购物车中的商品的数据，用一个数组存起来{id:商品id，count：数量，price：单价，selected：是否购买}
    },
    mutations: {   //this.$store.commit('方法名称','按需传递唯一的参数')
        addToCar(state, goodsinfo) {

            var flag = false

            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true
                }
            })
            if (!flag) {
                state.car.push(goodsinfo)
            }

            //当更新car之后，把car数组，存储到本地的localStorage中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsInfo(state,goodsinfo) {
            //修改购物车中商品的数量值
            //分析：
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count)
                    return true;
                }
            })
            //当修改完商品的数量，把最新的数据保存到本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removeFormCar(state,id) {
            //根据ID，从store中的购物车中删除对应的内容
            state.car.some((item,i) => {
                if (item.id == id) {
                    state.car.splice(i, 1)
                    return true
                }
            })
            //当删除完毕商品的数量后，把最新的数据保存到本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsSelected(state,info) {
            state.car.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected
                    return true;
                }
            })
            //当修改完商品的选中状态，把最新的数据保存到本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        }
        
    },
    getters: {  //this.$store.getters.
        //相当于计算属性
        getAllCount(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.count
            })
            return c
        },
        getGoodsCount(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.count
            })
            return o
        },
        getGoodsSelected(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state) {
            var o = {
                count: 0, //勾选的数量
                amount :0
            }
            state.car.forEach(item => {
                if (item.selected) {
                    o.count += item.count
                    o.amount += item.price * item.count
                }
            })
            return o
        }
    }
})


//导入MUI的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//按需导入Mint-UI中的组件
// import { Header, Swipe, SwipeItem,Button,Lazyload } from 'mint-ui'

// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);

import MintUI from 'mint-ui'
Vue.use(MintUI);
import 'mint-ui/lib/style.css'

//安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)


var vm = new Vue({
    el: "#app",
    render: c => c(app),
    router,  //1.4将router挂载到vm实例上
    store  //挂在store状态管理对象
})