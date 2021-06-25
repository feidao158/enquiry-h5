<template>
	<view>
		<view class="example-body">
			<uni-nav-bar left-icon="arrowleft" right-text="" left-text="" title="资讯中心" @clickLeft="back"
				@clickRight="rightlist" />
		</view>
		<view class="u-m-t-5">
			<u-cell-group v-for="(item,index) in list" :key="index">
				<u-cell-item icon="" :title="item.title" @click="informationLise"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				list:[
					{
						title:'订单管理'
					},
					{
						title:'订单管理1'
					},
					{
						title:'订单管理2'
					}
				]
			}
		},
		methods:{
			back() {
				//返回
				uni.navigateBack({
					delta: 1
				})
			},
			rightlist() {
				//点击菜单按钮
				console.log(321)
				this.show = true
			},
			informationLise(){
				console.log(23)
				uni.navigateTo({
					url:'./informationList'
				})
			}
		}
	}
</script>

<style>
	.example-body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 0;
	}
	.u-cell{
		padding: 8px 16px;
	}
</style>
