<template>
  <div class="container">
    <titles tit="余额提现"></titles>
    <div class="telEdit">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class=" demo-ruleForm" label-width="100px">

        <el-form-item label="银行卡类型" prop="bankType">
          <el-select v-model="ruleForm.bankType" filterable placeholder="请选择银行卡类型">
        <el-option v-for="item in cities" :key="item.bindBankId" :label="item.bankName+item.lastCardNo" :value="item.bindBankId" class="option">
          <span style="float: left">
             <img :src=item.sbankCode|imgUrl width="16" height="16"/>
           <!-- <img :src="item.img" width="16" height="16">-->
           <b class="user"> {{ item.bankName }}</b></span>
          <span  class="num" >尾号:{{ item.lastCardNo }}</span>
        </el-option>
          </el-select>
        </el-form-item>



        <el-form-item label="提现金额" prop="recharge" >
          <el-col :span="24">
            <el-input v-model.number="ruleForm.recharge" placeholder="请输入提现金额"  v-on:keyup.enter.native="submitForm('ruleForm')"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item >
          <el-col :span="24">
            <el-button type="primary"  @click="submitForm('ruleForm')" >下一步</el-button>

          </el-col>

        </el-form-item>
      </el-form>
    </div>

  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>

  .telEdit{
    width:520px;
    padding:10px 80px;
    box-sizing: border-box;
    margin:20px auto;
  }
  .option{
    & img{position: absolute; left:10px; top:12px;}
    & .user{
      position: absolute; left:30px; top:10px;
      font-weight: normal;
    }
    & .num{
      position: absolute; right:30px; top:10px;
     float: right; color: #8492a6; font-size: 13px
    }
  }
</style>
<script>
import titleInfo from '../components/title/Title.vue';
import accounting from '../common/js/accounting.js';
//import axios from 'axios';
import axios from '../common/js/axios.js';


import moment from 'moment';
export default {
    components:{
           titles:titleInfo
        },
    data() {

      return {
        cities:[],
//      cities: [{
//                img:require('../common/image/BANK_CMBC.png'),
//                value: '1234',
//                label: '工商银行'
//              }, {
//               img:require('../common/image/BANK_CMBC.png'),
//                value: '2345',
//                label: '农业银行'
//              }, {
//               img:require('../common/image/BANK_CMBC.png'),
//                value: '2222',
//                label: '招商银行'
//              }],
          value6: '',
        ruleForm: {
          recharge: "",
          verify: '',
          bankType:'',

        },
        rules:{
          recharge:[
            { required: true, message: '充值金额不能为空'},
            { type: 'number', message: '充值金额必须为数字值'}
          ],
          bankType:[
            { required: true, message: '银行卡类型不能为空'}
          ]
//          verify:[
//            { required: true, message: '验证码不能为空'}
//          ]
        }
      };
    },

  created(){
    var accuseid = sessionStorage.getItem('accUserId');
    axios.get('/api/user/account/center', {
      params: {
        accUserId: accuseid
      }
    }) .then((response)=>{
      this.userId=response.data.data.accUserId;
      axios.get('/api/userNew/bank/bind/list', {
        params: {
          accUserId:this.userId
        }
      }).then((response)=>{
        //console.log(response.data.data.bindBankList);
        if(response.data.code==1){
          this.cities=response.data.data.bindBankList;
        }

      }).catch(function (error) {
        console.log(error);
      });
    }).catch(function (error) {
      console.log(error);
    });
  },
    filters: {
      imgUrl: function(value) {
        if (!value) return '';
        value=require("../common/image/"+value+".png");
        return value;
      }

    },

    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (this.ruleForm.recharge!='') {
        var bankId = this.ruleForm.bankType;
        var recharge = accounting.formatNumber(this.ruleForm.recharge,2,",");
//        var recharge = this.ruleForm.recharge.toFixed(2);
        axios.get('/api/userNew/select/bind/card', {
          params: {
            bindBankId:bankId
          }
        }).then((response)=>{
          console.log(response);
          if(response.data.code==1){
            console.log(bankId)
            console.log(recharge)
            console.log('submit!')
            sessionStorage.setItem("bankId",bankId);
            sessionStorage.setItem("recharge",recharge);
            sessionStorage.setItem("bankName",response.data.data.bankName);
            sessionStorage.setItem("lastCardNo",response.data.data.lastCardNo);
            this.$router.push('/nextWithdraw');
          }else {
              this.$message.error("获取绑定银行卡信息失败");
          }
          //this.cities=response.data.data.bindBankList;
        })
         } else {
          this.$message.error("请输入提现金额");
          return false;
          }
          });
      },
      onVerify() {
        console.log('Verify!')
      }
    }
  }
</script>
