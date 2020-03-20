<template>
    <div>
        <mt-swipe :auto="4000">
         <!--  在组件中，使用v-for循环的话，一定要使用key-->
         <!-- 将来谁使用此轮播图组件，谁为我们传递 lunbotuList-->
         <!-- 此时，lunbotuList应该是父组件向子组件传值来设置 -->
      <mt-swipe-item v-for="(item,i) in lunbotuList" :key="i">
          <img :src="item.img" alt="" :class="{'full' : isfull}">
      </mt-swipe-item>
     </mt-swipe>
    </div>
</template>

<script>
export default {
    props: ["lunbotuList","isfull"]
}
</script>

<style lang="scss" scoped>
    .mint-swipe {
      height: 200px;

  .mint-swipe-item{
     text-align: center;
      img{
          height: 100%;
      }
  }
  .full{
      width: 100%;
  }
  .hidden{
      display:none;
  }
  }
</style>