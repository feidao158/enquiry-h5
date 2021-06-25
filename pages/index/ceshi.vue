<template>
	<view>
		<u-popup v-model="show" mode="right" length="85%" :mask-close-able='false'>
			<view style="background: #f9f9f9;height: 100%;">
				<view class="popupConter" style="background: #fff;">
					<view @click="cancelTopBtn">取消</view>
					<view style="font-size: 16px;color: rgb(88,88,88);">取消</view>
					<view @click="confirmTopBtn">确定</view>
				</view>
				<view>
					<u-cell-group>
						<u-cell-item style="padding: 10px;" @click="showpopup = true" title="批量下单"></u-cell-item>
					</u-cell-group>
				</view>
				<view class="u-m-t-20">
					<u-cell-group>
						<u-cell-item style="padding: 10px;" @click="beginshowTime = true" title="开始时间">{{beginshowTimeVal}}</u-cell-item>
					</u-cell-group>
					<u-cell-group>
						<u-cell-item style="padding: 10px;" @click="endshowTime = true" title="结束时间">{{endshowTimeVal}}</u-cell-item>
					</u-cell-group>
					<u-picker v-model="beginshowTime" mode="time" @confirm="beginShowTime"></u-picker>
					<u-picker v-model="endshowTime" mode="time" @confirm="endShowTime"></u-picker>
				</view>
				<u-popup v-model="showpopup" mode="right" length="100%" :closeable='false' :mask-close-able='false'>
					<view class="popupConter" style="background: #fff;">
						<view @click="showpopup = false"><u-icon name="arrow-left" size="18px"></u-icon></view>
						<view style="font-size: 16px;color: rgb(88,88,88);">订单状态</view>
						<view></view>
					</view>
					<view class="showpopupList">
						<view @click="showpopupListBtn">全部</view>
					</view>
					
				</u-popup>
			</view>
		</u-popup>
		<view class="wrap">
			<view class="example-body">
				<uni-nav-bar left-icon="arrowleft" right-text="筛选" left-text="" title="全部订单" @clickLeft="back"
					@clickRight="rightlist" />
			</view>
			<!-- :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" -->
			<swiper class="swiper-box">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box" v-if="orderListData">
							<view>
								<view class="centre">
									<image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode=""></image>
									<view class="explain">
										购物车空荡荡的
										<view class="tips">再忙，也要挑点宝贝哦</view>
									</view>
									<view class="btn" @click="goShopping">去逛逛</view>
								</view>
							</view>
						</view>
						<view class="page-box" v-else>
							<view class="order" @click="orderListPage" v-for="(res, index) in orderList[0]" :key="res.id">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.store }}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{res.deal}}</view>
								</view>
								<view class="item">
									<view class="content">
										<view>
											配送方式：
										</view>
										<view>
											付款方式：
										</view>
										<view>
											下单时间：
										</view>
									</view>
								</view>
								<u-line class="u-line"></u-line>
								<view class="total">
									订单金额:
									<text class="total-price">
										￥{{ priceInt(totalPrice(res.goodsList)) }}.
										<text class="decimal">{{ priceDecimal(totalPrice(res.goodsList)) }}</text>
									</text>
								</view>
								<view class="bottom">
									<!-- <view class="more">
										<u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
									</view>
									<view class="logistics btn">查看物流</view>
									<view class="exchange btn">卖了换钱</view> -->
									<view class="" style="margin-left: -10rpx;">运费:</view>
									<view class="evaluate btn" style="margin-right: -10rpx;" @click.stop="payone">再买一次</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				show: false,
				showpopup:false,
				beginshowTime:false,
				endshowTime:false,
				beginshowTimeVal:'',
				endshowTimeVal:'',
				orderListData:false,
				orderList: [
					[],
					[],
					[],
					[]
				],
				dataList: [{
						id: 1,
						store: '夏日流星限定贩卖',
						deal: '交易成功',
						goodsList: [{
								goodsUrl: '//img13.360buyimg.com/n7/jfs/t1/103005/7/17719/314825/5e8c19faEb7eed50d/5b81ae4b2f7f3bb7.jpg',
								title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
								type: '灰色;M',
								deliveryTime: '付款后30天内发货',
								price: '348.58',
								number: 2
							},
							{
								goodsUrl: '//img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg',
								title: '【葡萄藤】现货 小清新学院风制服格裙百褶裙女短款百搭日系甜美风原创jk制服女2020新款',
								type: '45cm;S',
								deliveryTime: '付款后30天内发货',
								price: '135.00',
								number: 1
							}
						]
					},
					{
						id: 2,
						store: '江南皮革厂',
						deal: '交易失败',
						goodsList: [{
							goodsUrl: '//img14.360buyimg.com/n7/jfs/t1/60319/15/6105/406802/5d43f68aE9f00db8c/0affb7ac46c345e2.jpg',
							title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
							type: '粉色;M',
							deliveryTime: '付款后7天内发货',
							price: '128.05',
							number: 1
						}]
					},
					{
						id: 3,
						store: '三星旗舰店',
						deal: '交易失败',
						goodsList: [{
								goodsUrl: '//img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg',
								title: '三星（SAMSUNG）京品家电 UA65RUF70AJXXZ 65英寸4K超高清 HDR 京东微联 智能语音 教育资源液晶电视机',
								type: '4K，广色域',
								deliveryTime: '保质5年',
								price: '1998',
								number: 3
							},
							{
								goodsUrl: '//img14.360buyimg.com/n7/jfs/t6007/205/4099529191/294869/ae4e6d4f/595dcf19Ndce3227d.jpg!q90.jpg',
								title: '美的(Midea)639升 对开门冰箱 19分钟急速净味 一级能效冷藏双开门杀菌智能家用双变频节能 BCD-639WKPZM(E)',
								type: '容量大，速冻',
								deliveryTime: '保质5年',
								price: '2354',
								number: 1
							}
						]
					},
					{
						id: 4,
						store: '三星旗舰店',
						deal: '交易失败',
						goodsList: [{
								goodsUrl: '//img10.360buyimg.com/n7/jfs/t22300/31/1505958241/171936/9e201a89/5b2b12ffNe6dbb594.jpg!q90.jpg',
								title: '法国进口红酒 拉菲（LAFITE）传奇波尔多干红葡萄酒750ml*6整箱装',
								type: '4K，广色域',
								deliveryTime: '珍藏10年好酒',
								price: '1543',
								number: 3
							},
							{
								goodsUrl: '//img10.360buyimg.com/n7/jfs/t1/107598/17/3766/525060/5e143aacE9a94d43c/03573ae60b8bf0ee.jpg',
								title: '蓝妹（BLUE GIRL）酷爽啤酒 清啤 原装进口啤酒 罐装 500ml*9听 整箱装',
								type: '一打',
								deliveryTime: '口感好',
								price: '120',
								number: 1
							}
						]
					},
					{
						id: 5,
						store: '三星旗舰店',
						deal: '交易成功',
						goodsList: [{
							goodsUrl: '//img12.360buyimg.com/n7/jfs/t1/52408/35/3554/78293/5d12e9cfEfd118ba1/ba5995e62cbd747f.jpg!q90.jpg',
							title: '企业微信 中控人脸指纹识别考勤机刷脸机 无线签到异地多店打卡机WX108',
							type: '识别效率高',
							deliveryTime: '使用方便',
							price: '451',
							number: 9
						}]
					}
				],
				list: [{
						name: '待付款'
					},
					{
						name: '待发货'
					},
					{
						name: '待收货'
					},
					{
						name: '待评价',
						count: 12
					}
				],
				current: 0,
				// swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],
			};
		},
		onLoad() {
			this.getOrderList(0);
		},
		computed: {
			// 价格小数
			priceDecimal() {
				return val => {
					if (val !== parseInt(val)) return val.slice(-2);
					else return '00';
				};
			},
			// 价格整数
			priceInt() {
				return val => {
					if (val !== parseInt(val)) return val.split('.')[0];
					else return val;
				};
			}
		},
		methods: {
			beginShowTime(e){
				//时间
				console.log(e)
				this.beginshowTimeVal = e.year+'-'+e.month+'-'+e.day
			},
			endShowTime(e){
				//时间
				console.log(e)
				this.endshowTimeVal = e.year+'-'+e.month+'-'+e.day
			},
			confirmTopBtn(){
				//确认
				this.show = false
				this.beginshowTimeVal = ''
				this.endshowTimeVal = ''
			},
			cancelTopBtn(){
				//取消
				this.show = false
				this.beginshowTimeVal = ''
				this.endshowTimeVal = ''
			},
			goShopping(){
				//去购物
				uni.navigateTo({
					url: 'classifyList'
				});
			},
			orderListPage(){
				//跳转到详情
				uni.navigateTo({
					// url: './classifyList?id='+_this.list[index].key
					url:'./orderList?id=1&name=321'
				});
			},
			payone(){
				//再买一次
				uni.switchTab({
					url: 'shopping'
				});
			},
			back() {
				//返回
				uni.navigateBack({
					delta: 1
				})
			},
			rightlist() {
				//点击筛选按钮
				console.log(321)
				this.show = true
			},
			showpopupListBtn(){
				this.show = false
				this.showpopup = false
				this.beginshowTimeVal = ''
				this.endshowTimeVal = ''
			},
			reachBottom() {
				// 此tab为空数据
				let _this = this
				if (_this.current != 2) {
					_this.loadStatus.splice(_this.current, 1, "loading")
					setTimeout(() => {
						this.getOrderList(this.current);
					}, 1200);
					
				}
			},
			// 页面数据
			getOrderList(idx) {
				let _this = this
				for (let i = 0; i < 5; i++) {
					let index = _this.$u.random(0, _this.dataList.length - 1);
					console.log(index)
					let data = JSON.parse(JSON.stringify(_this.dataList[index]));
					// console.log(data)
					// data.id = _this.$u.guid();	
					_this.orderList[idx].push(data);
					console.log(_this.orderList[idx])
				}
				// _this.$u.get('chain-api/v1/ishop/info/order/query', {
				// 	page:_this.current+1,
				// 	size:'5'
				// }).then(res => {
				// 	console.log(res)
				// 	if (res.code == 200) {
				// 		_this.orderList[idx].push(res.data);
				// 	}else{
				// 		_this.$refs.uToast.show({
				// 			title: res.message
				// 		})
				// 	}
				// })
				_this.loadStatus.splice(this.current, 1, "loadmore")
			},
			// 总价
			totalPrice(item) {
				let price = 0;
				item.map(val => {
					price += parseFloat(val.price);
				});
				return price.toFixed(2);
			},
			// 总件数
			// totalNum(item) {
			// 	let num = 0;
			// 	item.map(val => {
			// 		num += val.number;
			// 	});
			// 	return num;
			// },
			// tab栏切换
			// change(index) {
			// 	this.swiperCurrent = index;
			// 	this.getOrderList(index);
			// },
			// transition({
			// 	detail: {
			// 		dx
			// 	}
			// }) {
			// 	this.$refs.tabs.setDx(dx);
			// },
			// animationfinish({
			// 	detail: {
			// 		current
			// 	}
			// }) {
			// 	this.$refs.tabs.setFinishCurrent(current);
			// 	this.swiperCurrent = current;
			// 	this.current = current;
			// }

		}
	}
</script>

<style lang="scss" scoped>
	// @import '@/common/uni-nvue.scss';
	$nav-height: 30px;

	/* #ifndef APP-NVUE */
	page {
		height: 100%;
		background: #f9f9f9;
	}

	/* #endif */
	.uni-nav-bar-text {
		font-size: $uni-font-size-base;
	}

	.input-uni-icon {
		line-height: $nav-height;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 0;
	}
</style>
<style lang="scss" scoped>
	.order {
		width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;

		.top {
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;

				.store {
					margin: 0 10rpx;
					font-size: 32rpx;
					font-weight: bold;
				}
			}

			.right {
				color: $u-type-warning-dark;
			}
		}

		.item {
			display: flex;
			margin: 20rpx 0 0;

			.left {
				margin-right: 20rpx;

				image {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
			}

			.content {
				line-height: 60rpx;

				.title {
					font-size: 28rpx;
					line-height: 150rpx;
				}

				.type {
					margin: 10rpx 0;
					font-size: 24rpx;
					color: $u-tips-color;
				}

				.delivery-time {
					color: #e5d001;
					font-size: 24rpx;
				}
			}

			.right {
				margin-left: 10rpx;
				padding-top: 20rpx;
				text-align: right;

				.decimal {
					font-size: 24rpx;
					margin-top: 4rpx;
				}

				.number {
					color: $u-tips-color;
					font-size: 24rpx;
				}
			}
		}

		.total {
			margin-top: 20rpx;
			// text-align: right;
			font-size: 24rpx;

			.total-price {
				font-size: 32rpx;
				color: #f4a52f;
			}
		}

		.bottom {
			display: flex;
			// margin-top: 40rpx;
			padding: 0 10rpx;
			justify-content: space-between;
			align-items: center;

			.btn {
				line-height: 52rpx;
				width: 160rpx;
				border-radius: 26rpx;
				border: 2rpx solid $u-border-color;
				font-size: 26rpx;
				text-align: center;
				color: $u-type-info-dark;
			}

			.evaluate {
				color: $u-type-warning-dark;
				border-color: $u-type-warning-dark;
			}
		}
	}

	.centre {
		text-align: center;
		padding: 200rpx 0;
		font-size: 32rpx;

		image {
			width: 164rpx;
			height: 164rpx;
			border-radius: 50%;
			margin-bottom: 20rpx;
		}

		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}

		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
		}
	}

	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}
	.popupConter{
		padding: 0 20rpx;
		color: rgb(192,192,192);
		height: 90rpx;
		font-size: 14px;
		border-bottom: 1px solid #ccc;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-content: center;
		justify-content: space-between;
	}
	.uni-scroll-view-content{
		    background: #f9f9f9;
	}
	u-popup{
		    background: #f9f9f9;
	}
	.showpopupList view{
		height: 80rpx;
		border-bottom: 1px solid #ddd;
		color: #5e5e5e;
		line-height: 80rpx;
		padding-left: 20rpx;
	}
</style>
