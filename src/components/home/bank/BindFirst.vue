<template>
    <div class="container">
      <titles tit="银联鉴权"></titles>
      <div style="width:450px; margin:40px auto;">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="真实姓名" prop="name">
            <el-input v-model="ruleForm.name" :disabled=this.falg></el-input>
          </el-form-item>
          <!--<el-form-item label="身份证类型" prop="codeType"  v-show=this.show>
            <el-select v-model="ruleForm.codeType" placeholder="请选择身份证类型">
              <el-option label="身份证" value="1"></el-option>
              <el-option label="户口本" value="2"></el-option>
            </el-select>

          </el-form-item>-->
          <el-form-item label="身份证号" prop="code">
            <el-input v-model="ruleForm.code" :disabled=this.falg></el-input>
          </el-form-item>
          <el-form-item label="银行名称" prop="bankName">
            <el-select v-model="ruleForm.bankName" placeholder="请选择银行名称" :data-index="bankType" :data-name="bankNames" :data-num="sbankCodes">
              <el-option v-for="item in bankLists" :key="item.sbankCode" :label="item.bankName" :value="item.sbankCode+item.bankName" class="option">
          <span style="float: left">
             <img :src=item.sbankCode|imgUrl width="16" height="16"/>&nbsp;&nbsp;
            <!-- <img :src="item.img" width="16" height="16">-->
           <b class="user"> {{ item.bankName }}</b></span>
              </el-option>


            </el-select>
          </el-form-item>
          <el-form-item label="银行卡号" prop="acctId" >
            <el-input v-model="ruleForm.acctId"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobilePhone">
            <el-col :span="24">
              <el-input v-model="ruleForm.mobilePhone" placeholder="请输入手机号"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="验证码"  prop="verify">
            <el-col :span="17">
              <el-input
                placeholder="请输入验证码"
                v-model="ruleForm.verify" >
              </el-input>
            </el-col>

            <el-col :span="6">
              <timer-btn ref="timerbtn" class="btn btn-default" v-on:run="onVerify('ruleForm')" ></timer-btn>

            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>

    </div>
</template>
<style  lang="less" rel="stylesheet/less" scoped>
.option{
    & img{position: absolute; left:10px; top:12px;}
    & .user{
      position: absolute; left:30px; top:9px;
      font-weight: normal;
    }

  }
</style>
<script>
//import axios from 'axios';
import util from '../../../common/js/common.js'
import titleInfo from '../../title/Title.vue'
import timerBtn from '../../TimerBtn.vue'
import axios from '../../../common/js/axios.js'

    export default{
        components:{
           titles:titleInfo,
           timerBtn:timerBtn
        },
        data() {
        //校验姓名
        var checkName=(rule,value,callback)=>{
            var reg=/^([\u4e00-\u9fa5]){2,7}$/;
            if(!value){
              callback(new Error('请输入真实姓名'));
            }else if(!reg.test(value)){
               callback(new Error('只能是中文，长度为2-7位'));
            }else{
              callback();
            }
        };
        //校验身份证号
        var checkCode=(rule,value,callback)=>{
          var reg=/^(\d{2})(\d{4})(\d{4})(\d{2})(\d{2})\d{2}(\d)(\d|X)$/;
          if(!value){
            callback(new Error('请输入身份证号'));
          }else if(!reg.test(value)){
            callback(new Error('身份证号有误'));
          }else{
            callback();
            }

        };
        //校验银行卡号
        var checkAcctId=(rule,value,callback)=>{
          var reg=/^\d{10,30}$/;
          if(!value){
            callback(new Error('请输入银行卡号'));
          }else if(!reg.test(value)){
            callback(new Error('银行卡号为10-30位数字'));
          }else{
            callback();
            }
        }

        //校验手机号
        var checkTel=(rule,value,callback)=>{
          var reg=/^\d{11}$/;
            if(!value){
              callback(new Error('请输入手机号'));
            }else if(!reg.test(value)){
              callback(new Error('请输入11位手机号'));
            }else{
              callback();
             }

        };

      return {
        //是否是会员
        falg:false,
        show:true,
        bankLists:[],

         editLoading: false,

        //bankType:'',
        ruleForm: {
          name: '',
          code: '',
          codeType:'',
          bankName: '',
          acctId: '',
          mobilePhone:'',
          verify:''
        },
        rules: {
          name: [
            { required: true,validator: checkName, trigger: 'blur'}
          ],
           /*codeType: [
            { required: true, message: '请选择身份证类型', trigger: 'change' }
          ],*/
          code: [
            { required: true,validator: checkCode, trigger: 'blur'}
          ],
          bankName: [
            { required: true, message: '请选择银行名称', trigger: 'change' }
          ],
          acctId: [
             { required: true,validator: checkAcctId, trigger: 'blur'}
           ],
          mobilePhone:[
             {  required: true, validator: checkTel, trigger: 'blur' }
          ],

          verify:[
             {  required: true, message: '请输入验证码', trigger: 'blur' }
          ]

        }
      };
    },
    computed: {
      bankType(){
        return (this.ruleForm.bankName==="307584007998")?"1":"2"
      },
      bankNames(){
        return this.ruleForm.bankName.substring(12);
      },
      sbankCodes(){
        return this.ruleForm.bankName.substring(0,12);
      }
    },
    methods: {
      submitForm(formName) {
       if(this.falg==false){
        this.$refs[formName].validate((valid) => {
         this.getsecond();
        })
       }else{
          this.rules.name[0]={};
          this.rules.code[0]={};
          this.$refs[formName].validate((valid) => {
            if(valid){
              this.getsecond();
            }})


       }



      },
      //获取验证码
      onVerify(formName) {
          if(this.falg==false){
          this.rules.verify[0]={};
            this.$refs[formName].validate((valid) => {
                if(valid){
                  this.$refs.timerbtn.setDisabled(true); //设置按钮不可用
                  this.$refs.timerbtn.start();
                  this.getFirst();
                }
              })

          }else{

             this.rules.name[0]={};
              this.rules.code[0]={};
              this.rules.verify[0]={};
              this.$refs[formName].validate((valid) => {
                if(valid){
                  this.$refs.timerbtn.setDisabled(false); //设置按钮不可用
                  this.$refs.timerbtn.start();
                  this.getFirst2();
                }

              })


          }

      },
      //获取超级网银号
      getBankList(){
        axios({
              url:'/api/userNew/bank/bind/available',
              method: 'get',
              params:{
                accUserId: sessionStorage.getItem('accUserId')
              }
            }).then((response)=>{
              //console.log(response.data);
              if(response.data.code==1){
                this.bankLists=response.data.data.availableBinkList;
              }
            })
      },
      //非会员的绑卡获取验证码
      getFirst(){
         axios({
              url:'/api/userNew/bank/bind/first',
              method: 'get',
              params:{
                accUserId: sessionStorage.getItem('accUserId'),
                custName:  this.ruleForm.name,
                idType:1,
                idCode:util.byRsa(this.ruleForm.code),
                acctId:util.byRsa(this.ruleForm.acctId),
                bankType:this.bankType,
                bankName:this.bankNames,
                sbankCode:this.sbankCodes,
                mobilePhone:this.ruleForm.mobilePhone
              }
            }).then((response)=>{
            console.log(this.ruleForm.name);
              if(response.data.code==0){
                this.$message.error(response.data.msg)
              }

            })
      },
      //会员的绑卡验证码
      getFirst2(){
         axios({
              url:'/api/userNew/bank/bind/first',
              method: 'get',
              params:{
                accUserId: sessionStorage.getItem('accUserId'),
                acctId:util.byRsa(this.ruleForm.acctId),
                bankType:this.bankType,
                bankName:this.bankNames,
                sbankCode:this.sbankCodes,
                mobilePhone:this.ruleForm.mobilePhone
              }
            }).then((response)=>{
            console.log(response.data);
              if(response.data.code==0){
                this.$message.error(response.data.msg);
                return
              }

            })
      },
      //第二步
      getsecond(){
        axios({
          url:'/api/userNew/bank/bind/second',
          method: 'get',
          params:{
            accUserId: sessionStorage.getItem('accUserId'),
            acctId:this.ruleForm.acctId,
            messageCode:this.ruleForm.verify
          }
        }).then((response)=>{
          if(response.data.code==1){
            this.$message.success("绑卡成功");
            this.$router.push('/index/bankList');
          }else{
            this.$message.error(response.data.msg);
          }

        })
      },
      //先判断是否为会员
      getUser(){
        axios({
              url:'/api/user/account/center',
              method: 'get',
              params:{
                accUserId: sessionStorage.getItem('accUserId'),
                bankAccountType:sessionStorage.getItem('accBankAccountType')
              }
            }).then((response)=>{
              console.log(response.data);
              if(response.data.code==1){
                if(response.data.data.isAuthentication==true){
                  //是会员的绑卡请求
                  this.ruleForm.name=response.data.data.realityName;
                  this.ruleForm.code=response.data.data.idNumber
                  this.falg=true;
                }
              //console.log(response.data.data)
              }else{

              }
            })
      },

    },
    beforeCreate(){

    },
    created(){
      this.getUser();

      this.getBankList();

    },
    filters: {
      imgUrl: function(value) {
        if (!value) return '';
        value=require("../../../common/image/"+value+".png");
        return value;
      }

    },
    mounted(){
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = 'http://passport.cnblogs.com/scripts/jsencrypt.min.js';
      document.body.appendChild(s);

    }
    }
</script>
