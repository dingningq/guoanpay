<template>
  <div class="container" style="padding:0 20px;">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="国安钱包如何绑定银行卡/解绑银行卡" name="1">
        <div>（一）绑定银行卡点击“我的钱包”---银行卡---添加银行卡---输入支付密码---设置银行卡信息：包括选择银行、输入银行卡号；设置个人信息：包括姓名、身份证号；填写银行预留信息：包括银行预留手机号、获取验证码---点击提交，即完成国安钱包绑卡环节。</div>
        <div>注意：<br/>
          <span style="text-indent: 4em; display: block;">1、所绑定的银行卡需为银行列表中支持的储蓄卡、借记卡；  <br /></span>
          <span style="text-indent: 4em; display: block;">2、所绑定银行卡需具有网银功能。    <br /></span></div>
        <div>（二）解绑银行卡：点击我的钱包---点击银行卡---向左滑动银行卡图标---点击“解绑”---输入支付密码---确认解绑，即完成解绑。</div>
      </el-collapse-item>
      <el-collapse-item title="国安钱包账户如何充值" name="2">
        <div>点击“我”--我的钱包---账户余额右侧箭头----充值--输入银行卡号---下一步---开通快捷支付：输入卡号、取款密码、手机号、验证码---确认开通，即成功开通银联在线支付，点击左上角，返回钱包余额页面。</div>
        <div>点击充值---输入充值金额-获取验证码--确认充值。此时钱包账户余额实时增加。</div>
      </el-collapse-item>
      <el-collapse-item title="国安钱包账户余额如何进行提现" name="3">
        <div>点击“我”--我的钱包---账户余额右侧箭头--提现--输入提现金额或者全部提现--点击 提现--输入支付密码--提交，即完成提现操作，此时钱包账户余额实时减少。</div>
        <div>注意：<br/>
          <span style="text-indent: 4em; display: block;">1、提现无手续费；    <br /></span>
          <span style="text-indent: 4em; display: block;">2、提现到账时间为当日；     <br /></span>
          <span style="text-indent: 4em; display: block;">3、使用银行卡为钱包账户充值成功的一个工作日后方可进行提现操作。    <br /></span></div>
      </el-collapse-item>
      <el-collapse-item title="修改/忘记支付密码的操作" name="4">
        <div>点击我的钱包右上角设置按钮：</div>
        <div>修改支付密码：输入原支付密码--设置新支付密码（仅限六位数字、不含空格）---提交，即修改成功。</div>
        <div>忘记支付密码：获取验证码---提交--输入身份证号--设置新支付密码（仅限六位数字、不含空格）--提交，即完成支付密码找回及设置环节。</div>
      </el-collapse-item>
      <el-collapse-item title="如何查询充值/提现记录" name="5">
        <div>点击我的钱包--点击账户余额右侧箭头--右上角“交易记录”，即可查询充值\提现记录。</div>
      </el-collapse-item>
      <el-collapse-item title="如何使用国安钱包进行购物消费" name="6">
        <div>登录国安社区app，选择商品加入购物车--填写收货人信息---选择在线支付--提交订单--选择国安钱包余额支付。
          注意：如商品无货或者因其他原因需要退款，退款金额将在1个工作日内返还到您的钱包账户内。</div>
      </el-collapse-item>
    </el-collapse>


  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>

</style>
<script>
 export default {
    data() {
      return {
        activeName: '1'
      };
    }
  }
</script>
