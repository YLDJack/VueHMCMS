<template>
    <div class="newsinfo-container">
        <!-- 标题 -->
        <h3 class="title">{{newsInfo.title}}</h3>
        <!-- 子标题 -->
        <P class="subtitle">
            <span>发表时间:{{newsInfo.add_time | dateFormat}}</span>
            <span>点击：{{newsInfo.click}}</span>
        </P>

        <hr>
        <!-- 内容 -->
        <div class="content" v-html="newsInfo.content"></div>
        <!-- 评论 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
//导入评论子组件
import comment from '../subcommponents/comment.vue'

export default{
  
    data(){
        return {
            id : this.$route.params.id,
            newsInfo: {} //新闻对象
        };
    },
    methods: {
        getNewsInfo(){
            this.$http.get('api/getnew/'+this.id).then(result =>{
                if(result.body.status === 0 ){
                    this.newsInfo = result.body.message[0];
                    Toast('数据加载成功！')
                }else{
                    Toast('数据加载失败'+result.body.statusText)
                }
            })
        }
    },
      created(){
        this.getNewsInfo();
    },
    components:{  
        //用来注册子组件的节点
        'comment-box': comment

    }
}
</script>

<style lang="scss">
.newsinfo-container{
    padding: 0 4px;
    .title{
        font-size: 16px;
        text-align: center;
        margin: 15px 0;
        color: red;
    }
    .subtitle{
        font-size: 13px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
    .content{
        img{
            width: 100%;
        }
    }
}
</style>