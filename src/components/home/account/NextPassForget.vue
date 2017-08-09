<template>
  <div class="container">
    <titles tit="重置支付密码"></titles>

    <div class="telEdit">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class=" demo-ruleForm" label-width="120px">

        <el-form-item label="手机号" prop="telephone">
          <span>{{this.ruleForm.telephone}}</span>
        </el-form-item>

        <el-form-item label="新支付密码"  prop="newPass">
          <el-col :span="24">
            <el-input type="password"
                      placeholder="请输入新支付密码" v-model="ruleForm.newPass" auto-complete="off">
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="确认新支付密码"  prop="affirmNewPass">
          <el-col :span="24">
            <el-input type="password"
                        placeholder="请确认输入新支付密码" v-model="ruleForm.affirmNewPass"  auto-complete="off">
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item >
          <el-col :span="24">
            <el-button type="primary"  @click="submitForm('ruleForm')" >确 定</el-button>
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
        if (value === '' || value.length != 6) {
          callback(new Error('请输入6位数字密码'));
        }else if(!/^\d{6}$/.test(value)){
          callback(new Error('请输入纯数字密码'));
        }else {
          if (this.ruleForm.affirmNewPass !== '') {
            this.$refs.ruleForm.validateField('affirmNewPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.newPass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        accUserId:sessionStorage.getItem('accUserId'),
        resultId:sessionStorage.getItem('resultId'),
        ruleForm: {
          telephone:sessionStorage.getItem('user'),
          newPass: '',
          affirmNewPass: ''
        },
        rules:{
           newPass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          affirmNewPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
       this.$refs[formName].validate((valid) => {
        if (valid) {

            axios({
              url:'/api/user/set/payPassword',
              method: 'get',
              params:{
                accUserId: this.accUserId,
                payPassword:util.passwordByRsa(this.ruleForm.newPass),
                confirmPassword:util.passwordByRsa(this.ruleForm.affirmNewPass),
                resultId:this.resultId
              }
            }).then((res)=>{
              if(res.data.code==0){
                this.$message.error(res.data.msg);
                this.$router.push('/index/account');
                return;
              }
              //console.log(res.data);
              this.$message.success("重置支付密码成功");
              sessionStorage.removeItem('resultId');
              this.$router.push('/index/home');
            })

          } else {
            console.log('error submit!!');
            return false;
}

      });
      }
      },
    mounted() {
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = 'http://passport.cnblogs.com/scripts/jsencrypt.min.js';
      document.body.appendChild(s);
    },
  }
</script>
