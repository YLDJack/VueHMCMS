<template>
    <div id="goodsinfo-container">
        <!-- 购物车小球 -->
        <transition 
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        <!-- 商品轮播图区域 -->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
					</div>
				</div>
			</div>
        <!-- 商品购买区域 -->
        <div class="mui-card">
				<div class="mui-card-header"  >{{goodsinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
                            市场价：<del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;
                            销售价：<span class="now_price">￥{{goodsinfo.sell_price}}</span>
                        </p>
                        <p>购买数量：<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
                        <p>
                            <mt-button type="primary" size="small">立即购买</mt-button>
                            <mt-button type="danger" size="small" @click="addToShopCar()">加入购物车</mt-button>
                        </p>

					</div>
				</div>
			</div>
        <!-- 商品参数区域 -->
        <div class="mui-card">
				<div class="mui-card-header" >商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner"  >
						<p>商品货号：{{goodsinfo.goods_no}}</p>
                        <p>库存情况：{{goodsinfo.stock_quantity}}件</p>
                        <p>上架时间：{{ goodsinfo.add_time | dateFormat}}</p>
					</div>
				</div>
                <div class="mui-card-footer">
                     <mt-button type="primary" size="large" plain @click="geDesc(id)">图文介绍</mt-button>
                    
                    <mt-button type="danger" size="large" plain @click="geComment(id)">商品评论</mt-button>
                </div>
			</div>
    </div>
</template>

<script>
//导入轮播图子组件
import swiper from '../subcommponents/swiper.vue'
// 导入 数字选择框 组件
import numbox from '../subcommponents/goodsinfo_numbox.vue';

export default {
    data(){
        return {
            id:this.$route.params.id,  //从路由中获取到的路由id
            lunbotu:[],  //轮播图信息
            goodsinfo:{ },
            ballFlag:false,  //控制小球隐藏和显示标识符
            selectedCount : 1  //用户购买的商品数量
        }
    },
    created(){
        this.getLunbotu();
        this.getGoodsInfo();
    },
    methods:{
        getLunbotu(){
            //获取缩略图
            this.$http.get('api/getthumimages/'+this.id).then(result=>{
				if(result.body.status === 0 ){
                    //循环轮播图数组的每一项，为item添加img属性，因为轮播图组件中，只认识item.img，不认识item.src
					result.body.message.forEach(item => {
                        item.img = item.src
                    });
                    //把完整的数据保存到list中
                    this.lunbotu = result.body.message;
				}else{

				}
			})
        },
        getGoodsInfo(){
            //获取商品的信息
            this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
				if(result.body.status === 0 ){
                    this.goodsinfo = result.body.message[0];
				}else{

				}
			})
        },
        getSelectedCount(count) {
          // 当子组件把 选中的数量传递给父组件的时候，把选中的值保存到 data 上
         this.selectedCount = count;
        console.log("父组件拿到的数量值为： " + this.selectedCount);
    },
    geDesc(id){
        //點擊編程式導航跳轉到圖文介紹頁面
        this.$router.push({ name:"goodsdesc" , params: { id }});
    },
    geComment(id){
        //點擊跳轉到評論頁面
        this.$router.push({ name:"goodscomment" , params: { id }});
    },
    addToShopCar(){
        //添加到购物车
        this.ballFlag = !this.ballFlag
        //拼接处一个，要保存到store中数组
        var goodsinfo = {  
        id:this.id, 
        count: this.selectedCount, 
        price:this.goodsinfo.sell_price, 
        selected:true };

        //调用store中的mutations
        this.$store.commit('addToCar',goodsinfo);
    },
    beforeEnter(el){
        el.style.transform = "translate(0,0)";
    },
    enter(el,done){
        el.offsetWidth;

        //小球动画优化思路：应该根据不同状况计算坐标值
        //获取小球在页面中的位置
        const ballPosition = this.$refs.ball.getBoundingClientRect();
        //获取徽标在页面中的位置
        const badgePosition = document.getElementById("badge").getBoundingClientRect();

        const xDist = badgePosition.left - ballPosition.left;
        const yDist = badgePosition.top - ballPosition.top;

        el.style.transform = `translate(${xDist}px,  ${yDist}px)`;
        el.style.transition = 'all 0.5s cubic-bezier(.4,-0.3,1,.68)';
        done()
    },
    afterEnter(el){
        this.ballFlag=!this.ballFlag
    }
    },
    components:{
        swiper,
        numbox
    }
}
</script>

<style lang="scss" scoped>
.goodsinfo-container {
    background-color: #eee;
    overflow: hidden;
    
    
}
    .now_price{
        color : red;
        font-size: 16px;
        font-weight: bold;
}
 .mui-card-footer{
        display: block;
        button{
            margin: 15px 0;
        }
    }

    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        top: 390px;
        left: 146px;
        z-index: 99;
    }
</style>