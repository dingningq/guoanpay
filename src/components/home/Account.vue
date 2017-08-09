<template>
  <div class="container">
    <titles tit="账户设置"></titles>

    <table class="account-list">
      <tbody>
        <tr>
          <th>手机号</th>
          <td>{{tel}} </td>
          <td class="last">
            <!--<router-link  to="/account/telEdit" target="_blank" class="blue-link"  >修改</router-link>-->
          </td>
        </tr>
        <tr>
          <th>支付密码</th>
          <td>钱包支付时需要输入的密码</td>
          <td class="last">
            <router-link  to="/account/passEdit" class="blue-link"  >修改密码</router-link> |
            <router-link  to="/account/passForget" class="blue-link"  >忘记密码</router-link>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>

.account-list{
  width:100%;
  tr{
    height: 80px;
    line-height: 80px;
    border-bottom: 1px solid #ededed;
  }
  & td,& th{
    font-size:12px;
    color: #999;
    padding-left: 20px;
    position: relative;
  }
  & th{
    font-size:14px;
    color: #000;
  }
  & td.last {
    text-align: right;
    padding-right: 18px;
    a{
      color:#0ae;
    }
  }
}



</style>
<script>
import titleInfo from '../title/Title.vue'
 export default{
        components:{
           titles:titleInfo
        },
        data(){
          return{
            tel:sessionStorage.getItem('user')
          }
        }

    }
</script>
