<template>
  <div>
    <div class="content-box clearfix">
      <div class="balance clearfix">
        <p>账户余额</p>
        <div class="balance-list">
          <ul>
            <li>
              <span v-if="ok">{{basic.balance}}元</span>
              <span v-else>****元</span>
              <i class="el-icon-more" @click=toggleOk></i>
            </li>
            <li v-show="!etype">
              <router-link :to="{path:'/recharge'}">
                <el-button>充值</el-button>
              </router-link>
           </li>
            <li>
              <router-link :to="{path:'/withdraw'}">
                <el-button>提现</el-button>
              </router-link>
            </li>
            <!--<li><a href="">查看</a></li>-->
          </ul>
        </div>
      </div>
      <div class="manage p-r">
        <div class="p-a manage-info">
          我的银行卡：<span>{{ basic.cardCount}}</span>个 &nbsp;&nbsp;
          <router-link :to="{ path:'/index/bankList'}"> <el-button>管理银行卡</el-button></router-link>
        </div>
      </div>
    </div>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <h3>最近交易记录 </h3>
      <!--<a href="">充值记录</a><span class="ui-separator-pd">|</span>
      <a href="">提现记录</a><span class="ui-separator-pd">|</span>
      <a href="">结算记录</a>-->
      <router-link to="/index/record" class="fr">查看所有交易记录</router-link>
    </el-col>
    <el-table :data="datas" highlight-current-row v-loading="listLoading" style="width: 100%;" align="center">

      <el-table-column type="index" width="100" prop="ID" align="center">
      </el-table-column>

      <el-table-column prop="orderType" label="交易类型" align="center" :formatter="formatOrderType">
      </el-table-column>
      <el-table-column prop="amount" label="交易金额" align="center" :formatter="formatAmount">
      </el-table-column>
      <el-table-column prop="payStatus" label="交易状态" align="center" :formatter="formatPayStatus">
      </el-table-column>
      <el-table-column  prop="completeTime" label="交易时间" align="center" :formatter="dateFormat">
      </el-table-column>

    </el-table>
    <el-dialog title="请设置支付密码" v-model="editFormVisible" size="tiny" :before-close="handleClose">
      <el-form :model="editForm"  :rules="editFormRules" ref="editForm"  style="text-align:right;" >
        <el-form-item prop="newPass" label="请设置新支付密码">
          <el-input v-model="editForm.newPass" type="password" placeholder="请设置新支付密码"></el-input>
        </el-form-item>
        <el-form-item prop="affirmNewPass" label="请再次输入新支付密码">
          <el-input type="password"
                    placeholder="请再次输入新支付密码" v-model="editForm.affirmNewPass">
          </el-input>
        </el-form-item>


        <el-button type="primary" @click.native="editSubmit('editForm')" >确定</el-button>

      </el-form>
    </el-dialog>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>

  .content-box {
    border: 1px solid #cdcdcd;
    padding: 25px;
  }

  .balance {
    width: 450px;
    border-right: 1px solid #cdcdcd;

    float: left;
    p {
      font-size: 16px;
      margin: 10px 0;
      padding-left: 5px;
    }
    .balance-list ul li {
      float: left;
      padding: 0 5px;
      line-height: 35px;
      span {
        font-size: 18px
      }
      i {
        margin: 0 15px;
        cursor: pointer;
        color: #20a0ff;
      }
      a {
        font-size: 14px;
        color: #20a0ff;
      }
    }
  }

  .manage {
    width: 450px;
    font-size: 16px;
    float: right;
    margin-left: 20px;
    .manage-info {
      top: 25px;
      left: 10px;
    }
  }

  .toolbar {
    height: 40px;
    background-color: #f5f5f5;
    border: 1px solid #e1e1e1;
    padding: 10px;
    margin-top: 10px;
    h3 {
      float: left;
      color: #656565;
      font-weight: 700;
    }
    a {
      color: #08c;
      margin-left: 10px;
    }
    .ui-separator-pd {
      color: #b2b2b2;
      padding: 0 5px;
    }
  }
</style>
<script>

    //import axios from 'axios';
    import moment from 'moment';
    import util from '../../common/js/common.js'
    import axios from '../../common/js/axios.js'

    export default{
        data(){
           var validatePass = (rule, value, callback) => {
              if (value === '' || value.length != 6) {
                callback(new Error('请输入6位数字密码'));
              }else if(!/^\d{6}$/.test(value)){
                callback(new Error('请输入纯数字密码'));
              }else {
                if (this.editForm.affirmNewPass !== '') {
                  this.$refs.editForm.validateField('affirmNewPass');
                }
                callback();
              }
            };
            var validatePass2 = (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'));
              } else if (value !== this.editForm.newPass) {
                callback(new Error('两次输入密码不一致!'));
              } else {
                callback();
              }
            };
            return{
                ok:true,
                etype:Number(sessionStorage.getItem('accBankAccountType')),
                basic:{},
                userId:'',
                datas:[],
                hasPayPwd:'',
                listLoading:true,
                editForm: {
                 newPass: '',
                 affirmNewPass: ''
                },
                editFormVisible:false,////支付密码是否显示
                editFormRules: {
                  newPass: [
                    { validator: validatePass, trigger: 'blur' }
                  ],
                  affirmNewPass: [
                    { validator: validatePass2, trigger: 'blur' }
                  ],
                },
            }
        },

         methods: {
          //切换效果
             toggleOk(){this.ok = !this.ok},
             handleClose(done) {
              this.$confirm('请先设置支付密码！')
                .then(_ => {
                  return false;
                })
                .catch(_ => {});
            },
          //获取消费数据
            /*getRecord(){
              this.listLoading=true;
              getUserListPage().then((res)=>{
                //this.datas=res.data;
                this.datas.push(res.data);
                this.listLoading = false;
                console.log(res.data);
              })
            }*/

            //格式化金钱
            formatAmount:function(row,column){
              var date = row[column.property];
              if (date == undefined) {
                  return "";
                }
              return (date/100).toFixed(2);
            },
            //格式化日期
             dateFormat: function (row, column) {
                var date = row[column.property];
                if (date == undefined) {
                  return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm:ss");
              },

            //交易类型
              formatOrderType: function (row, column) {
                var data = row[column.property];
                switch (data) {
                  case 1:
                    return "消费"
                    break;
                  case 2:
                    return "退款"
                    break;
                  case 3:
                    return "充值虚户"
                    break;
                  case 4:
                    return "转账"
                    break;
                  case 5:
                    return "接收转账"
                    break;
                  case 6:
                    return "收款"
                    break;
                  case 7:
                    return "代付订单"
                    break;
                  case 8:
                    return "提现"
                    break;
                  case 9:
                    return "充值会员卡"
                    break;
                  case 10:
                    return "发红包"
                    break;
                  case 11:
                    return "商户微信扫码"
                    break;
                  case 12:
                    return "商户支付宝扫码"
                    break;
                  case 13:
                    return "工资"
                    break;
                  default:
                    return "无效"
                }

              },
            //交易状态
              formatPayStatus: function (row, column) {
                var data = row[column.property];
                switch (data) {
                  case 0:
                    return "未支付"
                    break;
                  case 1:
                    return "支付成功"
                    break;
                  case 2:
                    return "支付失败"
                  default:
                    return "无效"
                }

              },
              editSubmit(formName){
                this.$refs[formName].validate((valid) => {
                  if (valid) {
                    axios({
                      url:'/api/user/set/pay/password',
                      method: 'get',
                      params:{
                        accUserId: Number(sessionStorage.getItem('accUserId')),
                        payPassword:util.passwordByRsa(this.editForm.newPass),
                        confirmPassword:util.passwordByRsa(this.editForm.affirmNewPass)
                      }
                    }).then((res)=>{
                        if(res.data.code==0){
                          this.$message.error(res.data.msg);
                          return;
                        }else{
                          this.$message.success("支付密码设置成功");
                           this.editFormVisible=false;
                        }
                    })
                  }
                  })
              }
          },
          created(){
            axios.get('/api/user/account/center', {
                  params: {
                    accUserId: sessionStorage.getItem('accUserId'),
                    bankAccountType: sessionStorage.getItem('accBankAccountType')
                  }
                })
                .then((response)=>{
                console.log(response);
                  this.basic=response.data.data;
                  this.userId=response.data.data.accUserId;
                  this.hasPayPwd=response.data.data.hasPayPwd;

                  sessionStorage.setItem('userId', this.userId);
                  //获取到useid后 在获取交易数据表
                    axios.get('/api/userNew/bill/count', {
                      params: {
                        accUserId:sessionStorage.getItem('accUserId'),
                        pageNo:1,
                        pageSize:10
                      }
                    })
                    .then((response)=>{
                      this.listLoading=true;
                      if(response.data.code==1){
                        this.datas=response.data.data.billList;
                        this.listLoading = false;
                      }
                    });
                  if(!this.hasPayPwd){
                     this.editFormVisible=true;


                  };

                })
          },
          /*filters: {
              formatDate(time) {
                  var date = new Date(time*1);
                  return formatDate(date, 'yyyy-MM-dd hh:mm');
              }
          },*/
          mounted() {
            const s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = 'http://passport.cnblogs.com/scripts/jsencrypt.min.js';
            document.body.appendChild(s);
          }

    }

</script>
