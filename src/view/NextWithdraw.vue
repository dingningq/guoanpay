<template>
  <div class="container">
    <titles tit="确认支付密码"></titles>

    <div class="telEdit">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class=" demo-ruleForm" label-width="120px">

        <el-form-item label="银行卡信息:" prop="info">
          <span>{{bankName}}  尾号:{{lastCardNo}}</span>
        </el-form-item>

        <el-form-item label="提现金额:" prop="sum">
          <span>{{money}} 元</span>
        </el-form-item>

        <el-form-item label="支付密码"  prop="passwords">
          <el-col :span="18">
            <el-input v-model="ruleForm.passwords" type="password"
              placeholder="支付密码">
            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item >
          <el-col :span="24">
            <!--<el-button type="primary"  @click="submitForm('ruleForm')" >确认提现</el-button>-->
            <time-btn ref="timebtn" :text1="txt1" :text2="txt2" class="btn btn-default" v-on:run="submitForm('ruleForm')" ></time-btn>

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

</style>
<script>
  import titleInfo from '../components/title/Title.vue';
  //import axios from 'axios';
  import util from '../common/js/common.js'
  import moment from 'moment';
  import timeBtn from '../components/TimeBtn.vue'
  import axios from '../common/js/axios.js'

export default {
    components:{
           titles:titleInfo,
            timeBtn:timeBtn
        },
    data() {

      return {
        money:sessionStorage.getItem("recharge"),
        bankName:sessionStorage.getItem("bankName"),
        lastCardNo:sessionStorage.getItem("lastCardNo"),
        txt1:"处理中。。。",
        txt2:"确认提现",
        ruleForm: {
          passwords:""
//          telephone: '',
//          verify: ''
        },
        rules:{
          passwords:[
            { required: true, message: '支付密码不能为空'}
          ]
//          passwords:[
//            { required: true, message: '支付密码不能为空'}
//          ]
        }

      };
    },
    methods: {
      submitForm(formName) {

        var accuseid = sessionStorage.getItem('accUserId');
        var bankId = sessionStorage.getItem('bankId');
        var recharge = sessionStorage.getItem('recharge');

        this.$refs[formName].validate((valid) => {
        if (this.ruleForm.passwords!='') {
          this.$refs.timebtn.setDisabled(true); //设置按钮不可用
          this.$refs.timebtn.start(); //启动倒计时

            axios.get('/api/userNew/member/withdraw', {
              params: {
                accUserId:accuseid,
                outAcctId:bankId,
                tranAmount:recharge*100,
                payPassword:util.passwordByRsa(this.ruleForm.passwords)

              }
            }).then((response)=>{
              // this.options=response.data.data.quickbindBankList;
              console.log(response);
              if(response.data.code==1){
                sessionStorage.removeItem('recharge');
                sessionStorage.removeItem('bankName');
                sessionStorage.removeItem('lastCardNo');
                sessionStorage.removeItem('bankId');
                this.$message.success("提现成功");
                this.$router.push({ path:'/index/home', query: { mobile:accuseid} });
              }else{
                this.$message.error("提现失败");
                this.ruleForm.passwords="";
                this.$refs.timebtn.stop(); //启动倒计时
              }

            }).catch(function (error) {
              console.log(error);
            });


          console.log(this.ruleForm.passwords)
          } else {
            this.$message.error("请输入支付密码");
            return false;
          }
        });
      },
      onVerify() {
        console.log('Verify!')
      }
    },
    mounted() {
          const s = document.createElement('script');
          s.type = 'text/javascript';
          s.src = 'http://passport.cnblogs.com/scripts/jsencrypt.min.js';
          document.body.appendChild(s);
        }
  }
</script>
