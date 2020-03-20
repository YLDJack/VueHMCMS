<template>
    <div>
        <!-- 这是顶部滑动条区域 -->
        <div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a :class="['mui-control-item', item.id==0 ? 'mui-active':' ']" 
						href="#item1mobile" data-wid="tab-top-subpage-1.html" 
						v-for="item in cates" :key="item.id" @tap="getPhotoListByCateId(item.id)">
							{{item.title}}
						</a>
					</div>
				</div>

			</div>
			<!-- 图片列表区域 -->
			<div>
				<ul class="photo-list">
                   <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
                    <img v-lazy="item.img_url">
					<div class="info">
						<div class="info-title">{{item.title}}</div>
						<div class="info-body">{{item.zhaiyao}}</div>
					</div>
                     </router-link>
                 </ul>
			</div>
	
	
	
	</div>
</template>

<script>
//1.导入mui的js文件
import mui from '../../lib/mui/js/mui.min.js'


export default {
    data() {
        return {
			cates: [] //分类列表数组
			,list:[]  //图片数组
		}
	},
	mounted(){     //当组件中的DOM结构被渲染后并放到页面中后，会执行这个钩子函数
	//如果要操作元素了，最好在mounted里面，因为这里的DOM元素是最新的
		//2.初始化滑动控件
    mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
       })
	},
	created(){
		this.getAllCategory();
		//默认进入页面，就主动请求，所有图片列表的数据
		this.getPhotoListByCateId(0);
	},
    methods:{
		getAllCategory(){
			//获取所有的图片分类
			this.$http.get('api/getimgcategory').then(result=>{
				if(result.body.status === 0 ){
					result.body.message.unshift({ title: "全部" ,id: 0})
					this.cates = result.body.message;
				}else{

				}
			})
		},
		getPhotoListByCateId(cateId){
			//根据分类id，获取图片列表
			this.$http.get('api/getimages/'+cateId).then(result=>{
				if(result.body.status === 0 ){
					this.list = result.body.message;
				}else{

				}
			})
		}
    }
}
</script>

<style lang="scss" scoped>
*{
    touch-action: pan-y;
}


.photo-list{
	 list-style: none;
	margin: 0;
	padding: 10px;
	padding-bottom: 0;
  li{
	  margin-bottom: 10px;
	  background-color: #ccc;
	  text-align: center;
	  box-shadow: 0 0 9px #999 ;
	  position: relative;
	img{
		  width: 100%;
		  vertical-align: middle;
	  }
	 image[lazy=loading] {
       width: 40px;
       height: 300px;
       margin: auto;
    }
	.info{
		color: white;
		text-align: left;
		position: absolute;
		bottom: 0;
		background-color: rgba(0,0,0,0.4);
		max-height: 84px;
		.info-title{
			font-size: 14px;
		}
		.info-body{
			font-size: 13px;
		}
	}
  }
}

</style>