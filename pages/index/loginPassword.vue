<template>
	<view class="">
		<view class="example-body">
			<uni-nav-bar left-icon="arrowleft" right-text="" left-text="" title="重置密码" @clickLeft="back"
				@clickRight="" />
		</view>
		<view class="contentTitle">
			<view>要货通系统</view>
			<view style="font-weight: 300;color: #999;font-size: 14px;margin-top: 20rpx;">找回密码</view>
		</view>
		<u-form style="padding: 40rpx;margin-top: 20rpx;" :model="model" :rules="rules" ref="uForm" errorType="toast">
			<u-form-item :label-position="labelPosition" prop="name" :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="phone">
				<u-input :border="border" type="input" v-model="model.name" placeholder="请输入注册时的手机号"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" prop="password" :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="lock-open">
				<u-input :password-icon="true" :border="border" type="password" v-model="model.password" placeholder="请输入密码"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" prop="newPassword" :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="lock-open">
				<u-input :password-icon="true" :border="border" type="password" v-model="model.newPassword" placeholder="请输入确认密码"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" prop="code" :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="checkmark-circle">
				<u-input :border="border" placeholder="验证码" v-model="model.code" type="text"></u-input>
				<u-button slot="right" type="success" size="mini" @click="getCode">{{codeTips}}</u-button>
			</u-form-item>
			<!-- <view class="" style="width: 100%;height: 80rpx;margin-top: 20rpx;">
				<view style="float: right;color: #029789;">忘记密码?</view>
			</view> -->
			<view style="margin-top: 100rpx;">
				<u-button @click="submit" type="primary">重置新密码</u-button>
			</view>
		</u-form>
	</view>
	
</template>

<script>
	export default {
		data(){
			return{
				model:{
					name:'',
					password:'',
					code:'',
					newPassword:''
					
				},
				rules: {
					name: [
						{
							required: true,
							message: '请输入姓名',
							trigger: 'blur' ,
						}
					],
					password:[
						{
							required: true,
							message: '请输入确认密码',
							trigger: ['change','blur'],
						}
					],
					newPassword:[
						{
							required: true,
							message: '请输入新密码',
							trigger: ['change','blur'],
						}
					],
					code:[
						{
							required: true,
							message: '请输入密码',
							trigger: ['change','blur'],
						}
					],
				},
				codeTips: '获取验证码',
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods:{
			back() {
				//返回
				uni.navigateBack({
					delta: 1
				})
			},
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						// if(!this.model.agreement) return this.$u.toast('请勾选协议');
						console.log('验证通过');
					} else {
						console.log('验证失败');
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
		// background: #f9f9f9;
	}
	.contentTitle{
		margin-top: 100rpx;
		width: 100%;
		text-align: center;
		margin-bottom: 10px;
		font-weight: 300;
		font-size: 30px;
		color: #000;
	}
</style>
