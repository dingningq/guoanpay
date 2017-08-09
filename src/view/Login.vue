<template>
  <div class="login-container p-r">

    <div class="login-body">

      <div class="body-login">
      <div class="login-nav">登录国安企业钱包账户</div>
        <div class="login-modern">


          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="el-form--label-top demo-ruleForm">
            <el-form-item label="E店企业" prop="elist">
              <el-col :span="24">
                <el-select v-model="ruleForm.elist" filterable placeholder="请选择E店企业" style="width:100%;" @change="elistChange">
                  <el-option v-for="item in emallArray" :label="item.emallName" :value="item.emallId">
                    <span style="float: left">
                       <b> {{ item.emallName }}</b>
                    </span>

                  </el-option>

                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="E店企业类型" prop="etype">
              <el-col :span="24">
                <el-select v-model="ruleForm.etype" placeholder="请选择E店企业类型" style="width:100%;" :disabled=this.flag>
                  <el-option label="个体工商户" value="0"></el-option>
                  <el-option label="企业工商户" value="1"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="手机号" prop="telephone"  ref="telephone">
              <el-col :span="24">
               <!-- -->
                <el-input v-model="ruleForm.telephone"  placeholder="请输入手机号" :disabled=this.flag ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="验证码"  prop="verify">
              <el-col :span="17">
                <el-input
                  placeholder="请输入验证码"
                  v-model="ruleForm.verify" v-on:keyup.enter.native="submitForm('ruleForm')">
                </el-input>
              </el-col>

              <el-col :span="6">
                <timer-btn ref="timerbtn" class="btn btn-default" v-on:run="sendCode('ruleForm')" ></timer-btn>

              </el-col>
            </el-form-item>
            <el-form-item >
              <el-col :span="24">
                <el-button type="primary"  @click="submitForm('ruleForm')" style="width:100%" >登录</el-button>
              </el-col>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>


  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>

  .login-body{
    position: relative;
    width:100%;
    margin:0 auto;
    padding:250px 0;

    .body-login{
      width:350px;
      margin:0 auto;
      height:auto;
      position: relative;
    .login-nav{
      font-size:24px;
      border-bottom:2px solid #cdcdcd;
      padding:10px 0;
      margin-bottom:20px;
    }

    }
  }

</style>
<script>
//import '../common/js/jsencrypt.js'
  //import axios from 'axios';
  //import Base64 from 'base64-js'
  //var base64 = require('base64-js')
  var Base64 = require('base64-js');
  import timerBtn from '../components/TimerBtn.vue'
  import util from '../common/js/common.js'
  import axios from '../common/js/axios.js';

  export default {
     components:{
           timerBtn:timerBtn
        },

    data() {


      return {
        flag:true,
        emallArray:[],
        emallId:'',
        isNunberId:'',
        datas:[],
        ruleForm: {
          telephone: '',
          verify: '',
          etype:'',
          elist:''
        },
        rules:{
          /*etype:[
            {required:true}
          ]
          telephone:[
             {required: true, validator: checkTel, trigger: 'blur' }
          ],*/
          //verify: [
          //  { required: true, message: '请输入验证码', trigger: 'blur' }
         // ]
        }
      };
    },
    beforeCreate(){
     let merId=this.$route.query.merId;
     let reflag=this.$route.query.reflag;
     //let mobile=this.$route.query.mobile;
     let userSourceType=3;
     let path=this.$route.query.path;
            console.log(path);
            let arrBase=Base64.toByteArray(path);
            let pathSession=util.byteToString(arrBase);
            sessionStorage.setItem('path',pathSession);
            sessionStorage.setItem('reflag',reflag);
     //let base = new Base64();
     //let result2 = base.decode(path);
     //console.log(result2)
    /* axios({
              url:'/api/check/param',
              method: 'get',
              params:{
                mobile: mobile,
                id:id
              }
            }).then((res)=>{

              this.ruleForm.telephone = res.data.data.loginMobile;
              //console.log(typeof this.ruleForm.telephone);
              this.flag=true;
              sessionStorage.setItem('mobile',mobile);
              sessionStorage.setItem('id',id);
              sessionStorage.setItem('userSourceType',userSourceType)
              sessionStorage.setItem('loginMobile',res.data.data.loginMobile)
              sessionStorage.setItem("loginId",res.data.data.loginId);
              if(res.data.code==0){
                 this.$router.push('/error');
              }
            })*/

        console.log(merId);
         axios({
          url:'/api/emall/list',
          method:'get',
          params:{
            merId:merId,
            userSourceType:userSourceType,
            //mobile:mobile
          }
         }).then((res)=>{
            if(res.code==0){
                 this.$message.error(res.data.msg);
                 this.$router.push('/error');
            }
            console.log(res);
            sessionStorage.setItem('merId',merId)
            sessionStorage.setItem('userSourceType',userSourceType)
            this.emallArray=this.datas=res.data.data.emallArray;
         })
    },
    created(){

    },
    methods: {
       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.ruleForm.verify == '' || this.ruleForm.verify == 'null' ||this.ruleForm.verify == 'undefined'){
              console.log(this.ruleForm.verify);
              this.$message.error('请输入验证码');
              return;
            }
            if(this.ruleForm.etype == '' || this.ruleForm.etype == 'null' ||this.ruleForm.etype == 'undefined'){
              console.log(this.ruleForm.etype);
              this.$message.error('请选择企业类型');
              return;
            }
            axios({
              url:'/api/login',
              method: 'get',
              params:{
                mobile: this.ruleForm.telephone,
                userSourceId:util.passwordByRsa(this.emallId),
                userSourceType:sessionStorage.getItem('userSourceType'),
                code:this.ruleForm.verify,
                bankAccountType:this.ruleForm.etype,
                idNumber:util.passwordByRsa(this.isNunberId),
              },
              headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "imei":"mkhojklkhkdaghjjfdnphfphiaiohkef"
              }
            }).then((response)=> {
                console.log(response.data);


                if(response.data.code==1){
                 sessionStorage.setItem('loginId',response.data.data.loginId)
                  sessionStorage.setItem('sessionId',response.data.data.sessionId);
                   sessionStorage.setItem('accUserId',response.data.data.accUserId);
                  sessionStorage.setItem('accBankAccountType',response.data.data.accBankAccountType);
                   this.$router.push({ path:'/index/home', query: { mobile:this.ruleForm.telephone} });
                }else{
                  this.$message.error(response.data.msg);
                }
              })
              .catch((error)=> {
                console.log(error);
              });
          } else {
            return false;
          }
        });
      },
      sendCode(formName){
        let tel=this.ruleForm.telephone;
         this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$refs.timerbtn.setDisabled(true); //设置按钮不可用
            this.$refs.timerbtn.start(); //启动倒计时
            axios({
              url:'/api/get/sms/code',
              method: 'get',
              params:{
                mobile: this.ruleForm.telephone,
                accUserId:this.$route.query.eId,
                type:"9"
              },
              headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "imei":"mkhojklkhkdaghjjfdnphfphiaiohkef"
              }
            }).then(function (response) {

                console.log(response.data);
                sessionStorage.setItem('user', tel);
                if(response.data.code == '1'){
                  this.$message.success("短信验证码发送成功");
                }else{
                  this.$message.error(response.data.msg);
                }
              }.bind(this))
              .catch(function (error) {
                console.log(error);
                 this.$refs.timerbtn.stop(); //停止倒计时
              }.bind(this));

          } else {
            return false;
          }
        });
    },
    elistChange(e){
    this.emallId=e
      var arr=this.datas.filter(item=>{
        return item.emallId===e;
      });
      this.ruleForm.telephone=arr[0].emallMobile;
      this.ruleForm.etype=arr[0].emallType.toString();
      this.isNunberId=arr[0].emallIdNumber;
      //this.ruleForm.telephone=e
    }
    },
    mounted() {
          const s = document.createElement('script');
          s.type = 'text/javascript';
          s.src = 'http://passport.cnblogs.com/scripts/jsencrypt.min.js';
          document.body.appendChild(s);

         /* const b = document.createElement('script');
          b.type = 'text/javascript';
          b.src = 'https://cdn.bootcss.com/Base64/1.0.1/base64.min.js';
          document.body.appendChild(b);*/
        }

  }
</script>
