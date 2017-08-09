<template>
  <div class="container">
    <titles tit="余额充值"></titles>

    <div class="telEdit">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class=" demo-ruleForm" label-width="100px">
        <el-form-item label="银行卡类型" prop="bankType">
          <el-select v-model="ruleForm.bankType" filterable placeholder="请选择银行卡类型">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.plantBankName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="充值金额" prop="recharge" >
          <el-col :span="24">
            <el-input v-model.number="ruleForm.recharge" placeholder="请输入充值金额"></el-input>
          </el-col>
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
            <!--<el-button type="primary" @click="onVerify">获取验证码</el-button>-->
            <timer-btn ref="timerbtn" class="btn btn-default" v-on:run="sendCode('ruleForm')" ></timer-btn>

          </el-col>
        </el-form-item>
        <el-form-item >
          <el-col :span="14">

            <!--<timer-btns ref="timerbtns" class="btn btn-default" v-on:run="submitForm('ruleForm')" ></timer-btns>-->
            <!--<time-btn ref="timerbtns"  :text1="txt1" :text2="txt2" class="btn btn-default" v-on:run="submitForm('ruleForm')" ></time-btn>-->
            <el-button type="primary"  @click="submitForm('ruleForm')" >充值</el-button>

          </el-col>
          <el-col :span="10">
            <!--<a href='http://10.16.70.62:8080/gacowalletappapi/quick/pay/open?accUserId=18811190692'>添加新卡充值</a>-->
            <a @click="getPay()" class="poiner">添加新卡充值</a>
          </el-col>
        </el-form-item>
      </el-form>
      <form id="NetPayForm" name="NetPayForm" :ACTION=this.action
            target=_blank METHOD=POST>
        <input type=hidden name=sign :value=this.sign>
        <input type=hidden name=orig :value=this.orig>
        <input type=hidden name=returnurl :value=this.returnUrl>
        <input type=hidden name=NOTIFYURL :value=this.NOTIFYURL>
        <!-- <br> <br> <br> <br> <br> <br> 原数据：
        ${orig} <br> 签名数据：${sign} <br>
        <input type="submit"  style="display:none;">-->
      </form>
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
  .poiner{
    cursor: pointer;
  }

</style>
<script>
import titleInfo from '../components/title/Title.vue';
//import axios from 'axios';
import moment from 'moment';
import timerBtn from '../components/TimerBtn.vue';
import axios from '../common/js/axios.js';
export default {
    components:{
           titles:titleInfo,
            timerBtn:timerBtn
        },
    data() {

      return {
        options:[],
         txt1:'处理中...',
          txt2:'充值',
          sign:'',
          orig:'',
          returnUrl:'',
          NOTIFYURL:'',
          action:'',
        ruleForm: {
          recharge: '',
          verify: '',
          bankType:''
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

        axios.get('/api/userNew/bank/recharge/list', {
          params: {
            accUserId:accuseid
          }
        }).then((response)=>{
          this.options=response.data.data.quickbindBankList;
          }).catch(function (error) {
            console.log(error);
          });

         axios.get('/api/quick/pay/open/params', {
          params: {
            accUserId: accuseid
          }
        }).then((res)=>{
            if(res.data.code==0){
               this.$message.error(res.data.msg);
               return;
            }
            this.sign=res.data.data.sign;
            this.orig=res.data.data.orig;
            this.returnUrl=res.data.data.returnUrl;
            this.NOTIFYURL=res.data.data.NOTIFYURL;
            this.action=res.data.data.action;


        });

//    axios.get('/api/userNew/bank/bind/available',
//      {
//      params: {
//        accUserId:sessionStorage.getItem("user"),
//      }
//    }).then((request)=>{
//      this.options = request.data.data.availableBinkList;
//      console.log(request.data.data.availableBinkList);
//    }).catch(function(error){
//      console.log(error);
//    });
  },
    methods: {
      getPay(){
       document.getElementById("NetPayForm").submit();
      },

      submitForm() {
        //this.$refs.timerbtns.setDisabled(true); //设置按钮不可用
        //this.$refs.timerbtns.start(); //启动倒计时
        var accuseid = sessionStorage.getItem('accUserId');
        var orderIds = sessionStorage.getItem('orderId');
        var payDates = sessionStorage.getItem('payDate');
        if(this.ruleForm.verify == '' || this.ruleForm.verify == null || this.ruleForm.verify == 'undefined'){
          this.$message.error("请输入验证码");
          return;
        }

          axios.get('/api/quick/pay/submit', {
            params: {
              accUserId:accuseid,
              smsCode:this.ruleForm.verify,
              amount:(this.ruleForm.recharge)*100,
              bindBankId:this.ruleForm.bankType,
              orderId:orderIds,
              payDate:payDates
            }
          }).then((response)=>{
           // this.options=response.data.data.quickbindBankList;
            console.log(response);

            if(response.data.code==1){
            this.$message.success("充值成功");
              this.$router.push({ path:'/index/home', query: { mobile:accuseid} });
            }else{
              //this.$refs.timerbtns.stop(); //启动倒计时
              this.$message.error("充值失败");
            }

          }).catch(function (error) {
            console.log(error);
          });

      },
      onVerify() {
        console.log('Verify!')
      },
      sendCode(formName){
        var accuseid = sessionStorage.getItem('accUserId');
        this.$refs[formName].validate((valid) => {
          if (valid||this.ruleForm.verify!='') {
            this.$refs.timerbtn.setDisabled(true); //设置按钮不可用
            this.$refs.timerbtn.start(); //启动倒计时

              axios({
                url:'/api/quick/pay/smss',
                method: 'get',
                params:{
                  accUserId:accuseid,
                  amount:(this.ruleForm.recharge)*100,
                  bindBankId:this.ruleForm.bankType
                }
              }).then(function (response) {
                console.log(response.data.data.orderId);
                sessionStorage.setItem('orderId',response.data.data.orderId);
                sessionStorage.setItem('payDate',response.data.data.payDate);

                this.$message.success("短信验证码发送成功，请注意查收。");
              }.bind(this))
                .catch(function (error) {
                  console.log(error);
                  this.$refs.timerbtn.stop(); //停止倒计时
                }.bind(this));

          } else {
            return false;
          }
        });
      }
    }
  }
</script>
