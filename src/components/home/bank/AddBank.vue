<template>
  <div class="container">
    <titles tit="请选择绑定提现账户类型"></titles>

    <div class="telEdit">

      <el-form :model="ruleForm"  ref="ruleForm" class=" demo-ruleForm" label-width="80px">

        <el-form-item>

            <el-col :span="24" v-if="!etype">
              <el-radio label="1" v-model="radio" abc="radio1">个人账户（储蓄卡）</el-radio>
            </el-col>
            <el-col :span="24" style="margin-top:15px;" v-else>
            <el-radio v-model="radio" label="2" abc="radio1">对公实体账户</el-radio>
            </el-col>

        </el-form-item>

        <el-form-item >
          <el-col :span="24">
            <el-button type="primary"  @click="onNext" >下一步</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="请输入支付密码" v-model="editFormVisible" size="tiny" show-close>
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
import util from '../../../common/js/common.js'
import titleInfo from '../../title/Title.vue'
import axios from '../../../common/js/axios.js'

export default {
    components:{
           titles:titleInfo
        },
    data() {
      var validatePass = (rule, value, callback) => {
            if (value === '' || value.length != 6||!/^\d{6}$/.test(value)) {
              callback(new Error('请输入6位数字密码'));
            }else{
             callback();
            }
          };
      return {
        etype:Number(sessionStorage.getItem('accBankAccountType')),
        //radio:" ",
        ruleForm: {
          resource: ''
        },
         editForm: {
            password: '',
          },
        editFormVisible:false,////支付密码是否显示
         editFormRules: {
            password: [
              { validator: validatePass, trigger: 'blur', }
            ]
          },

      };
    },
    computed:{
      radio(){
      return this.radio=(this.etype===0)?"1":"2";
        //console.log(this.radio);
      }
    },
    methods: {
      onNext(){
        this.editFormVisible=true;


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
             }else{
              this.editFormVisible=false;
              if(this.radio==1){
                this.$router.push('/bank/bindFirst');
              }else{
                this.$router.push('/bank/merchantBind');
              }
             }
             })
          }
        })
      }
    },
    created(){

    },
    mounted(){
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = 'http://passport.cnblogs.com/scripts/jsencrypt.min.js';
      document.body.appendChild(s);

    }
  }
</script>
