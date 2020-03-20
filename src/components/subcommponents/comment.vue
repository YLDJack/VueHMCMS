<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要评论的内容(最多评论120字)" maxlength="120" v-model="msg">

        </textarea>

        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
     <div class="cmt-list">
        <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
            <div class="cmt-title">
                第{{i+1}}楼 &nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dateFormat}}
            </div>
            <div class="cmt-body">
                {{item.content == 'undefined'?'此用户很懒，啥都没说': item.content}}
            </div>
        </div>
     </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
import  {Toast} from 'mint-ui'
export default {
    data(){
        return {
            pageIndex : 1, //默认展示第一页数据
            comments : [],
            msg: ''
        }
    },
    methods: {
        getComments(){
            this.$http.get("api/getcomments/"+this.id + "?pageindex="+this.pageIndex).then(result => {
                if(result.body.status === 0 ){
                    //this.comments = result.body.message;
                    //每当获取新评论数据的时候，不要把老数据覆盖，而是拼接
                    this.comments = this.comments.concat(result.body.message)
                    Toast('数据加载成功！')
                }else{
                    Toast('数据加载失败'+result.body.statusText)
                }
            });
        },
        getMore(){
            this.pageIndex++;
            this.getComments()
        },
        postComment(){
            //校验内容是否为空
            if(this.msg.trim().length === 0 ){
                Toast('您还未输入任何内容！')
            }
            //发表评论
            //参数1：请求URL地址
            //参数2：提交服务器的数据对象{content：this.msg}
            //参数3：定义提交的时候，表单中数据的格式  {emulateJSON:true}
            this.$http.post('api/postcomment/'+this.id, 
            {content :this.msg.trim()
            }).then(function(result){
                if(result.body.status === 0){
                    //1.拼接输入一个评论对象
                    var cmt = {user_name:'匿名用户', 
                    add_time: Date.now(),
                    content:this.msg.trim()
                    };
                    this.comments.unshift(cmt);
                    this.msg = "";
                }else{
                    Toast('发表失败！')
                }
            });
        }
    },
    created(){
        this.getComments();
    },
    props:  ["id"]
};
</script>

<style lang="scss" scoped>
.cmt-container{
    h3{
        font-size: 18px;
    }
    textarea{
        font-style: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-list{
        margin: 5px 0;
        .cmt-item{
            font-size: 13px;

            .cmt-title{
                background-color: #ccc;
               line-height: 30px;
            }
            .cmt-body{
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
}
</style>