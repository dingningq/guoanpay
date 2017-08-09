<template>
  <div class="container">
    <titles tit="小额鉴权" style="margin-bottom:40px;"></titles>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="125px" class="demo-ruleForm">
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-form-item label="开户名称" prop="CustName">
            <el-input v-model="ruleForm.CustName" :disabled=this.falg></el-input>
          </el-form-item>
          <el-form-item label="开户证件类型" prop="IdType">
            <el-select v-model="ruleForm.IdType" placeholder="请选择证件类型">
              <el-option label="身份证" value="1"></el-option>
              <el-option label="法人代码证" value="51"></el-option>
              <el-option label="组织机构代码证" value="52"></el-option>
              <el-option label="营业执照" value="68"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码" prop="IdCode">
            <el-input v-model="ruleForm.IdCode" :disabled=this.falg></el-input>
          </el-form-item>
          <el-form-item label="银行" prop="bank">
                    <el-select v-model="ruleForm.bank" filterable placeholder="请选择银行" @change="bankChange">
                      <el-option v-for="item in bankList" :key="item.bankCode" :label="item.shortName" :value="item.bankCode+','+item.sbankCode+','+item.shortName" class="option">
                        <span style="float: left">
                        <!--<img :src=item.sbankCode|imgUrl width="16" height="16">-->
                        <b class="user"> {{ item.shortName }}</b></span>
                      </el-option>
                    </el-select>
          </el-form-item>
          <el-form-item label="单笔金额限制" prop="limitType">
            <el-select v-model="ruleForm.limitType" filterable placeholder="请选择" @change="limitTypeChange">
               <el-option v-for="item in limitTypeList" :key="item.value" :label="item.label" :value="item.value" class="option">
                  <span style="float: left">
                     <b class="user"> {{ item.label }}</b>
                  </span>
               </el-option>
            </el-select>
            <span style="float:right;">{{limitDesc}}</span>
          </el-form-item>
          <el-row :style="noLimitStyle">
            <el-form-item label="省份" prop="province">
              <el-select v-model="ruleForm.province" filterable placeholder="请选择" @change="provinceChange">
                 <el-option v-for="item in provinceList" :key="item.nodeCode" :label="item.nodeName" :value="item.nodeCode" class="option">
                    <span style="float: left">
                       <b class="user"> {{ item.nodeName }}</b>
                    </span>
                 </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="城市" prop="city">
              <el-select v-model="ruleForm.city" filterable placeholder="请选择" @change="cityChange">
                 <el-option v-for="item in cityList" :key="item.cityAreaCode" :label="item.cityAreaName" :value="item.cityAreaCode" class="option">
                    <span style="float: left">
                       <b class="user"> {{ item.cityAreaName }}</b>
                    </span>
                 </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="区县" prop="district">
              <el-select v-model="ruleForm.district" filterable placeholder="请选择" @change="districtChange">
                 <el-option v-for="item in districtList" :key="item.oraareaCode" :label="item.cityAreaName" :value="item.oraareaCode" class="option">
                    <span style="float: left">
                       <b class="user"> {{ item.cityAreaName }}</b>
                    </span>
                 </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="支行" prop="subBank">
              <el-select v-model="ruleForm.subBank" filterable placeholder="请先选择“银行”和“区县”" @change="subBankChange" style="width:100%;">
                 <el-option v-for="item in subBankList" :key="item.bankno" :label="item.bankname" :value="item.bankno" class="option">
                    <span style="float: left">
                       <b class="user"> {{ item.bankname }}</b>
                    </span>
                 </el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-form-item label="会员账号" prop="AcctId">
            <el-input v-model="ruleForm.AcctId"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="MobilePhone">
            <el-input v-model="ruleForm.MobilePhone"></el-input>
          </el-form-item>
        </div>
      </el-col>
    </el-row>
       <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
       </el-form-item>
      </el-form>
    </div>
</template>
<style>
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
//import axios from 'axios';
import titleInfo from '../../title/Title.vue';
import moment from 'moment';
import util from '../../../common/js/common.js';
import axios from '../../../common/js/axios.js';
    export default{
        components:{
           titles:titleInfo
        },
        data() {
        var checkTel=(rule,value,callback)=>{
        if(!value){
          return callback(new Error('手机号不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value.toString().length != 11) {
              callback(new Error('手机号必须为11位'));
            } else {
              callback();
            }
          }
        }, 100);

      }
      return {
        limitDesc:'',
        falg:false,
        limitDescOption:{
          limit:'单笔转账金额不超过5万，不限制笔数，只用选XX银行，不用具体到支行。',
          noLimit:'单笔转账可超过5万，需具体到支行。金额超过5万的，在工作日的8点30-17点间才会成功。'
        },
        noLimitStyle:{
          display:'none', //none|block
        },
        limitTypeList:[{
          label:"单笔提现小于5万",
          value:"0",
        },{
          label:"无限制",
          value:"1",
        }],
        bankList:[],
        provinceList:[],
        cityList:[],
        districtList:[],
        subBankList:[],
        ruleForm: {
          limitType:'0',
          CustName: '',
          IdCode: '',
          AcctId:'',
          BankType:'',
          BankName:'',
          BankCode:'',
          SBankCode:'',
          SupAcctId: '',
          province: '',
          city:'',
          district:'',
          subBank:'',
          IdType: '',
          bank: '',
          MobilePhone:'',
        },
        rules: {
          sellerId: [
            { required: true }

          ],
          CustAcctId: [
            { required: true}
          ],
          CustName: [
            { required: true,message: '开户名称不能为空' }
          ],
          IdCode: [
            { required: true,message: '证件号码不能为空'}
          ],
          AcctId:[
             {  required: true,message: '会员账号不能为空'}
          ],
          BankType:[
             {  required: true,message: 'BankType不能为空'}
          ],
          SupAcctId: [
            { required: true,message: 'SupAcctId不能为空' }

          ],
          ThirdCustId: [
            { required: true}
          ],
          IdType: [
            { required: true,message: '请选择证件类型' }
          ],
          bank: [
            { required: true,message: '请选择银行列表不能为空'}
          ],
          MobilePhone:[
             {  required: true,message: '手机号码不能为空'}
          ]

        }
      };
    },
    filters: {
      imgUrl: function(value) {
        if (!value) return '';
          value=require("../../../common/image/"+value+".png");
          return value;
      }
    },
    created(){

        var accUserId = sessionStorage.getItem('accUserId');
        //加载支持小额鉴权的银行
        axios.get('/api/merchant/bankList', {
          params: {
            accUserId: accUserId
          }
        }) .then((response)=>{
           this.bankList=response.data;
        }).catch(function (error) {
          console.log(error);
        });
        //加载所有省份
        axios.get('/api/merchant/payNodeList', {
          params: {
            accUserId: accUserId
          }
        }) .then((response)=>{
           this.provinceList=response.data;
        }).catch(function (error) {
          console.log(error);
        });
        this.getUser();
        this.limitDesc = this.limitDescOption.limit;
      },
    methods: {
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
              //console.log(response.data);
              if(response.data.code==1){
                if(response.data.data.isAuthentication==true){
                console.log(response.data.data);
                  //是会员的绑卡请求
                  this.ruleForm.CustName=response.data.data.realityName;
                  this.ruleForm.IdCode=response.data.data.idNumber
                  this.falg=true;
                }else{
                  //不是会员的绑卡
                }
              //console.log(response.data.data)
              }else{

              }
            })
      },
      limitTypeChange(e){
        var arrStr;
        if(this.ruleForm.bank){
          arrStr = this.ruleForm.bank.split(',');
        }
        if(e === '0'){
          this.noLimitStyle.display = 'none';
          this.limitDesc = this.limitDescOption.limit;
          if(arrStr){
            this.ruleForm.subBank = '';
            this.ruleForm.SBankCode = arrStr[1];
          }
        }else{
          this.noLimitStyle.display = 'block';
          this.limitDesc = this.limitDescOption.noLimit;
          if(arrStr){
            this.ruleForm.SBankCode = '';
          }
        }
      },
      bankChange(e){
        var arrStr = e.split(',');
        if('307584007998' == arrStr[1]){
          this.ruleForm.BankType = '1';
        }else{
          this.ruleForm.BankType = '2';
        }
        this.ruleForm.BankCode = arrStr[0];
        this.ruleForm.SBankCode = arrStr[1];
        this.ruleForm.BankName = arrStr[2];
        if(this.ruleForm.bank && this.ruleForm.district){
          axios.get('/api/merchant/getCnapsBankList', {
            params: {
              bankCode : arrStr[0],
              areaCode : this.ruleForm.district
            }
          }) .then((response)=>{
             this.subBankList=response.data;
          }).catch(function (error) {
            console.log(error);
          });
        }
      },
      provinceChange(e){
        axios.get('/api/merchant/getCityList', {
          params: {
            nodeCode : e
          }
        }) .then((response)=>{
           this.cityList=response.data;
           this.ruleForm.city = '';
        }).catch(function (error) {
          console.log(error);
        });
      },
      cityChange(e){
        axios.get('/api/merchant/getCountyList', {
          params: {
            cityCode : e
          }
        }) .then((response)=>{
           this.districtList=response.data;
           this.ruleForm.district = '';
           this.ruleForm.subBank = '';
           this.subBankList = [];
        }).catch(function (error) {
          console.log(error);
        });
      },
      districtChange(e){
        if(this.ruleForm.bank && this.ruleForm.district){
          axios.get('/api/merchant/getCnapsBankList', {
            params: {
              bankCode : this.ruleForm.BankCode,
              areaCode : e
            }
          }) .then((response)=>{
             this.subBankList=response.data;
             this.ruleForm.subBank = '';
          }).catch(function (error) {
            console.log(error);
          });
        }
      },
      subBankChange(e){
      },
      submitForm(formName) {
        var accuserid = sessionStorage.getItem('accUserId');
        this.$refs[formName].validate((valid) => {
          if(this.ruleForm.limitType === '1' && this.ruleForm.subBank == ''){
            this.$message.error('请选择支行');
            return false;
          }
          if (!valid) {
            return false;
          }
          //小额鉴权第一步
          axios.get('/api/merchant/getMerchantBindOneData', {
            params:{
              accUserId : accuserid,
              CustName : this.ruleForm.CustName,
              IdType:this.ruleForm.IdType,
              IdCode:util.byRsa(this.ruleForm.IdCode),
              AcctId:util.byRsa(this.ruleForm.AcctId),
              BankType:this.ruleForm.BankType,
              BankName:this.ruleForm.BankName,
              SBankCode:this.ruleForm.SBankCode,
              MobilePhone:this.ruleForm.MobilePhone,
              BankCode:this.ruleForm.subBank
            }
          }) .then((response)=>{
            if(response.data.code != '1'){
              this.$message.error('操作失败：'+response.data.msg);
            }else{
              this.$message.success('操作成功');
              this.$router.push({path:'/bank/bindMoney',query:{id:response.data.data.id,AcctId:this.ruleForm.AcctId}});
            }
          }).catch(function (error) {
            console.log(error);
          });
        });
      },
      onVerify() {
        console.log('Verify!')
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
