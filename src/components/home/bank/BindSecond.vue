<template>
  <div class="container">
    <titles tit="我的提现账户"></titles>
    <div class="card-box-list">
      <div class="card-box p-r">
        <div class="card-box-name">
            <span class="bank-logo">
              <img src="../../../common/image/102100099996.png" width="16" height="16">
            </span>
          <span class="bank-name">中国民生银行</span>
          <span class="bank-num">尾号9521</span>
          <span v-if="states" class="bank-state">状态: <b>已绑定</b></span>
          <span  v-else class="bank-state">状态: <b> <router-link  to="/bank/bindMoney">小额鉴权未完成</router-link></b></span>
          <span class="bank-del" @click="handleDel()">解绑</span>
        </div>
      </div>
      <div class="card-box p-r">
        <div class="card-box-name">
            <span class="bank-logo">
              <img src="../../../common/image/102100099996.png" width="16" height="16">
            </span>
          <span class="bank-name">中国民生银行</span>
          <span class="bank-num">尾号9521</span>
          <span v-if="states" class="bank-state">状态: <b>已绑定</b></span>
          <span  v-else class="bank-state">状态: <b> <router-link  to="/bank/bindMoney">小额鉴权未完成</router-link></b></span>
          <span class="bank-del" @click="handleDel()">解绑</span>
        </div>
      </div>




    </div>

  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .card-box-list{margin-top:20px; padding:0 50px; }
  .card-box{
    width:260px;
    font-size: 14px;
    float: left;
    height:100px;
    margin: 0 20px 20px 0;
    background: #EFF0F1;
    border: 1px solid #DDDDDD;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);


    .bank-logo {
      position: absolute;
      top: 18px;
      left: 10px;
    }
    .bank-name{
      position: absolute;
      top: 18px;
      left: 33px;
      overflow: hidden;
      width: 84px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .bank-num{
      position: absolute;
      top: 18px;
      right:10px;
    }
    .bank-state{
      position: absolute;
      bottom: 10px;
      left:10px;
    }
    .bank-del{
      position: absolute;
      bottom: 10px;
      right:10px;
      color: #ff0000;
      cursor: pointer;
    }
  }


</style>
<script>
import titleInfo from '../../title/Title.vue'
    export default{
        components:{
           titles:titleInfo
        },
        data(){
          return{
            states:0
          }
        },
        methods:{
            handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				})
			}
        }
    }
</script>
