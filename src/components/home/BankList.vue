<template>
  <div class="container">
    <titles tit="我的银行卡"></titles>
    <div class="card-box-list">
      <div v-if="!etype">
        <h3>银联鉴权：</h3>
        <bank-list :selections="bankBox" @on-click="handleDel"></bank-list>
      </div>
      <div v-else>
        <h3>小额鉴权：</h3>
        <penny-list :selections="pennyBox" @on-click="handleDel"></penny-list>
      </div>

      <router-link  to="/bank/addBank" class="add-card">
        <i class="el-icon-plus"></i>
        添加银行卡
      </router-link>
    </div>
    <el-dialog title="请输入支付密码" v-model="editFormVisible" size="tiny">
      <el-form :model="editForm"  :rules="editFormRules" ref="editForm"  style="text-align:right;" >
        <el-form-item prop="password">
          <el-input v-model="editForm.password" type="password" v-on:keyup.enter.native="editSubmit('editForm')"></el-input>
        </el-form-item>
        <el-button type="primary" @click.native="editSubmit('editForm')" >确定</el-button>

        </el-form>
    </el-dialog>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .card-box-list{margin-top:20px; padding:0 50px;
    h3{
      font-size:18px;
      line-height: 40px;
    }
  }
  .gray-link{
    border-bottom:1px solid #cdcdcd;
    margin-bottom: 20px;
  }
  .add-card{
    border: 1px dashed #DDDDDD;
    text-align: center;
    line-height: 50px;
    width:260px;
    float: left;
    height:50px;
    margin: 0 20px 20px 0;

    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  }


</style>
<script>
//import axios from 'axios'
import util from '../../common/js/common.js'
import titleInfo from '../title/Title.vue'
import bankList from './base/List.vue'
import pennyList from './base/PennyList.vue'
import axios from '../../common/js/axios.js'

    export default{
        components:{
           titles:titleInfo,
           bankList,
           pennyList
        },
        data(){
        //验证密码
          var validatePass = (rule, value, callback) => {
            if (value === '' || value.length != 6||!/^\d{6}$/.test(value)) {
              callback(new Error('请输入6位数字密码'));
            }else{
             callback();
            }
          };
          return{
             etype:Number(sessionStorage.getItem('accBankAccountType')),
             bankNum:'',
             box:[],
             bankBox:[],
             del:{},
             num:'',
             pennyBox:[],
             bindStatus:'',
             editForm: {
              password: '',
            },
            editLoading: false,
             editFormVisible:false,////支付密码是否显示
             editFormRules: {
                password: [
                  { validator: validatePass, trigger: 'blur', }
                ]
             },

          }
        },
        methods:{
          handleDel(obj){
              console.log(obj);
               /*this.$prompt('请输入支付密码', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^\d{6}$/,
                inputErrorMessage: '6位数字密码'
              })*/
              sessionStorage.setItem('num',obj.b);
              this.editFormVisible=true;
              this.editForm.password="";
          },
          editSubmit(formName){
              this.$refs[formName].validate((valid) => {
                if (valid) {


                  axios({
                    url:'/api/user/update/payPassword/first',
                    method: 'get',
                    params:{
                      accUserId: sessionStorage.getItem('accUserId'),
                      payPassword: util.passwordByRsa(this.editForm.password)
                    }
                  }).then((response)=> {
                    if(response.data.code==0){
                      this.$message.error(response.data.msg);
                      this.editForm.password=""
                      return;
                     }

                      axios({
                        url:'/api/userNew/bank/unbindCard',
                        method: 'get',
                        params:{
                          accUserId: sessionStorage.getItem('accUserId'),
                          bindBankId:sessionStorage.getItem('num')
                        }
                      }).then((response)=>{
                      if(response.data.code == '1'){
                        this.listLoading = false;
                        this.$message({
                          message: '解绑成功',
                          type: 'success'
                        });
                        this.editFormVisible = false;
                        sessionStorage.removeItem('num')
                        this.getBankList();
                      }else{
                        this.$message.error(response.data.msg);
                        this.editForm.password=""
                        this.editFormVisible = false;
                      }

                      })

                })
                }
              })

          },


            //获取银行列表
            getBankList(){
              axios.get('/api/userNew/bank/bind/list', {
                params: {
                  accUserId:sessionStorage.getItem('accUserId')
                }
              }).then((response)=>{
                if(response.data.code==1){
                 console.log(response.data);
                 this.bankBox=[];
                 this.pennyBox=[];
                 var len=response.data.data.bindBankList.length;
                 for(var i=0;i<len;i++){
                  var cur=response.data.data.bindBankList[i];
                  if(cur.bankAccountType==0){
                    this.bankBox.push(cur);
                  }else{
                    this.pennyBox.push(cur);
                    //console.log(this.pennyBox);

                  }
                 }
                }else{
                  if(response.data.code != '9000'){
                    this.$message.error(response.data.msg);
                  }
                }
              })
            }
        },
        created(){
          this.getBankList()
        },
        mounted() {
          const s = document.createElement('script');
          s.type = 'text/javascript';
          s.src = 'http://passport.cnblogs.com/scripts/jsencrypt.min.js';
          document.body.appendChild(s);

        }
    }
</script>
