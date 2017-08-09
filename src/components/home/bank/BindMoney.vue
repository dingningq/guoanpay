<template>
  <div class="container">
    <titles tit="鉴权金额"></titles>
    <div class="card-box-list">
      <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="提现账号" prop='AcctId'>
          <span>{{this.ruleForm.AcctId}}</span>
        </el-form-item>
        <el-form-item label="鉴权金额" prop='TranAmount'>
          <el-input style="float:left; margin-right:5px;width:120px;" v-model="ruleForm.TranAmount" v-on:keyup.enter.native="submitForm('ruleForm')">{{this.ruleForm.TranAmount}}</el-input>
          <p> 元</p>
        </el-form-item>


        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">完 成</el-button>
        </el-form-item>
      </el-form>
    </div>
    </div>

</template>
<style lang="less" rel="stylesheet/less" scoped>
  .card-box-list{margin:20px auto;width:250px; }
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
//import axios from 'axios';
import titleInfo from '../../title/Title.vue';
import moment from 'moment';
import util from '../../../common/js/common.js';
import axios from '../../../common/js/axios.js';



    export default{
        components:{
           titles:titleInfo
        },
        data(){
          return{
            ruleForm:{
              AcctId:'6217900100007617015',
              TranAmount:''
            },
            rules:{
              TranAmount:[{ required: true }]
            }
          }
        },
        created(){
          //获取上个页面传入的参数
          this.ruleForm.id = this.$route.query.id;
          //this.ruleForm.AcctId = this.$route.query.AcctId;
        },
        methods:{
          handleDel: function (index, row) {
            this.$confirm('确认删除该记录吗?', '提示', {
            type: 'warning'
				    });
			    },
			    submitForm(formName){
			      var accuserid = sessionStorage.getItem('accUserId');
            this.$refs[formName].validate((valid) => {
              if (!valid) {
                return false;
              }
            });
          //小额鉴权第二步
          axios.get('/api/merchant/checkBindOneMoney', {
            params:{
              accUserId : accuserid,
              id:this.ruleForm.id,
              TranAmount:this.ruleForm.TranAmount
            }
          }) .then((response)=>{
            if(response.data.code != 1){
              if(response.data.msg=="ERR147"){
                this.$message.error('此操作已超过48小时，请重新绑卡');
                this.$router.push('/index/bankList');
              }

            }else{
              this.$message.success('操作成功');
              this.$router.push('/index/bankList');
            }
          }).catch(function (error) {
            console.log(error);
          });
          }
        }
    }
</script>
