<template>
  <div class="container">
    <titles tit="重置支付密码"></titles>

    <div class="telEdit">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class=" demo-ruleForm" label-width="80px">

        <el-form-item label="手机号" prop="telephone">
          <span>{{this.ruleForm.telephone}}</span>
        </el-form-item>
        <el-form-item label="验证码"  prop="verify">
          <el-col :span="10">
            <el-input
              placeholder="验证码"
              v-model="ruleForm.verify">
            </el-input>
          </el-col>
          <el-col :span="2">
            &nbsp;&nbsp;
          </el-col>
          <el-col :span="6">
            <timer-btn ref="timerbtn" class="btn btn-default" v-on:run="sendCode('ruleForm')" ></timer-btn>
          </el-col>
        </el-form-item>
        <el-form-item >
          <el-col :span="24">
            <el-button type="primary"  @click="onNext('ruleForm')" >下一步</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .title{
    margin-top: 20px ;
    padding-left:20px;
    font-size: 18px;
    height:40px;
    line-height: 40px;
    border-bottom: 1px solid #efefef;
    .el-breadcrumb{
      line-height:40px;
    }
  }
  .telEdit{
    width:520px;
    padding:10px 80px;
    box-sizing: border-box;
    margin:20px auto;
  }

</style>
<script>
//import axios from 'axios';
import titleInfo from '../../title/Title.vue'
import timerBtn from '../../TimerBtn'
import axios from '../../../common/js/axios.js';
export default {
    components:{
           titles:titleInfo,
           timerBtn:timerBtn
        },
    data() {

      return {
        ruleForm: {
          telephone:sessionStorage.getItem('user'),
          verify: ''
        },
        rules:{
          verify: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
    //获取验证码
      sendCode(formName){
            let tel=sessionStorage.getItem('user');
            let accuserId=sessionStorage.getItem('accUserId');
            this.$refs.timerbtn.setDisabled(true); //设置按钮不可用
            this.$refs.timerbtn.start(); //启动倒计时
            axios({
              url:'/api/get/sms/code',
              method: 'get',
              params:{
                mobile: tel,
                accUserId:accuserId,
                type:"3"
              },
              headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "imei":"mkhojklkhkdaghjjfdnphfphiaiohkef"
              }
            }).then(function (response) {
                console.log(response.data);
                if(response.data.code == '1'){
                  this.$message.success('短信验证码发送成功');
                }
              }.bind(this))
              .catch(function (error) {
                console.log(error);
                 this.$refs.timerbtn.stop(); //停止倒计时
              }.bind(this));



    },
    //点击下一步
      onNext(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios({
              url:'/api/user/find/password/first',
              method: 'get',
              params:{
                accUserId: sessionStorage.getItem('accUserId'),
                mobile :sessionStorage.getItem('user'),
                smsCode:this.ruleForm.verify
              }
            }).then((response)=>{
              if(response.data.code == '1'){
               console.log(response.data.data.resultId);
               sessionStorage.setItem('resultId', response.data.data.resultId);
                              this.$router.push('/account/nextPassForget');
                            }else{
                              this.$message.error(response.data.msg);
                            }
            })
          }
        })
      }
    }
  }
</script>
