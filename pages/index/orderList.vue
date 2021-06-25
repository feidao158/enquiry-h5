<template>
	<view>
		<!-- 提示 -->
		<view>
			<u-toast ref="uToast" />
		</view>
		<view class="example-body">
			<uni-nav-bar left-icon="arrowleft" right-icon="trash" title="订单详情" @clickLeft="back"
				@clickRight="rightlist" />
		</view>
		<view class="u-m-t-5">
			<view class="orderListDetail">
				<view>订单编号：<text>DHT-20210618-00016</text></view>
			</view>
			<u-cell-group class="orderListParameter">
				<view>订单金额：<text style="font-size: 16px;color: red;">￥456.00</text></view>
				<view>下单时间：<text>2021/6/18 18:12:38</text></view>
				<view>订单状态：<text style="font-size: 16px;color: rgb(114,202,226);">作废</text></view>
				<view>下单人：<text>刘维凤-冠军牛</text></view>
			</u-cell-group>
			<view class="orderListDetail">
				<view>收货信息</view>
			</view>
			<u-cell-group class="orderListParameter">
				<view>刘维凤<text>13082796677</text></view>
				<view>山东省日照市东港区望海路与丽阳路中段文苑大厦西侧</view>
			</u-cell-group>
			<u-cell-group class="collapseList">
				<u-collapse style="padding:10px;" :item-style="itemStyle" event-type="close" @change="change">
					<u-collapse-item @change="itemChange" title="商品清单">
						<view class="collapseListData">
							<view>椰浆：<text>06001543</text></view>
							<view>下单时间：<text>2021/6/18 18:12:38</text></view>
						</view>
						<view class="collapseListData">
							<view>椰浆：<text>06001543</text></view>
							<view>下单时间：<text>2021/6/18 18:12:38</text></view>
						</view>
						<view class="collapseListData">
							<view>椰浆：<text>06001543</text></view>
							<view>下单时间：<text>2021/6/18 18:12:38</text></view>
						</view>
						
						<view class="evaluate btn">再买一次</view>
					</u-collapse-item>
					<view class="numList">共1种</view>
				</u-collapse>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemList: [{
					head: "赏识在于角度的转换",
					body: "只要我们正确择取一个合适的参照物乃至稍降一格去看待他人，值得赏识的东西便会扑面而来",
					open: true,
					disabled: true
				}],
				itemStyle: {
					// marginTop: '20px'
				}
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option.id); //打印出上个页面传递的参数。
			console.log(option.name); //打印出上个页面传递的参数。
		},
		methods: {
			back() {
				//返回
				uni.navigateBack({
					delta: 1
				})
			},
			rightlist(){
				if (confirm('确定要删除吗？') == true) {
					this.$refs.uToast.show({
						title: '删除成功'
					})
					return true;
				} else {
					return false;
				}
			},
			change(){
				
			},
			itemChange(e){
				console.log(e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
		background: #f9f9f9;
	}

	.orderListDetail {
		color: #151515;
		font-size: 16px;
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 20rpx;
	}

	.orderListParameter view {
		font-size: 14px;
		padding: 15rpx 30rpx;
	}

	.collapse-item {
		/* color: red; */
		padding-bottom: 10px;
	}

	.collapseList {
		margin-top: 20rpx;
		padding: 10rpx 10rpx;
	}
	.numList{
		position: absolute;
		top: 40rpx;
		right: 80rpx;
	}
	.collapseListData{
		height: 100rpx;
		padding-top: 6px;
		border-bottom: 1px solid #e4e4e4;
	}
	.evaluate {
		color: $u-type-warning-dark;
		border-color: $u-type-warning-dark;
	}
	.btn {
		margin-right: 5px;
		float: right;
		margin-top: 10px;
		text-align: center;
		width: 200rpx;
		border-radius: 32rpx;
		line-height: 64rpx;
		color: #ffffff;
		font-size: 26rpx;
		background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
	}
</style>
