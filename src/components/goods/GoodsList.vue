<template>
  <div class="goods-list">
    <!-- 使用标签进行跳转 -->
   <!-- <router-link class="goods-item" v-for="item in goodsList" :key="item.id" :to="'/home/goodsinfo/'+ item.id" tag="div">
      <img :src="item.img_url" alt="">
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </router-link> -->
    <!-- 使用编程式路由进行跳转 -->
    <div class="goods-item" v-for="item in goodsList" :key="item.id" :to="'/home/goodsinfo/'+ item.id" tag="div">
      <img :src="item.img_url" alt="" @click="goDetail(item.id)">
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>

    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  
  
  
  </div>
</template>

<script>
export default {
  data(){
    //data是往自己组件内部，挂在一些私有数据的
    return {
      goodsList:[], //商品列表
      pageIndex : 1  //分页的页数
    }
  },
  created(){
    this.getGoodsList();
  },
  methods:{
    getGoodsList(){
			//获取所有商品
			this.$http.get('api/getgoods?pageindex='+this.pageIndex).then(result=>{
				if(result.body.status === 0 ){
					this.goodsList = this.goodsList.concat(result.body.message);
				}else{

				}
      })
    },
    getMore(){
      this.pageIndex++;
      this.getGoodsList();
    },
    goDetail(id){
      this.$router.push("/home/goodsinfo/"+id);
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;
}
.goods-item{
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img{
        width: 100%;
    }
    .title{
        font-size: 14px;
    }
    p{
        margin: 0;
        padding: 5px;
    }
    .price{
        .now{
            color: red;
            font-weight: bold;
            font-size: 16px;
        }
        .old{
            text-decoration: line-through;
            font-size: 12px;
            margin-left: 10px;
        }
    }
     .sell{
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }
}
</style>