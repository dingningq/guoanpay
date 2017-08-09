<template>

  <div class="container">

    <titles tit="修改支付密码"></titles>

    <div class="telEdit">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class=" demo-ruleForm" label-width="120px">

        <el-form-item label="手机号" prop="telephone">
          <el-col :span="24">
            <span>{{tel}}</span>
          </el-col>
        </el-form-item>
        <el-form-item label="当前支付密码"  prop="nowPass">
          <el-col :span="24">
            <el-input type="password"
              placeholder="当前支付密码" v-model="ruleForm.nowPass" >
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item >
          <el-col :span="24">
            <el-button type="primary"  @click="onNext('ruleForm')" >下一步</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    <!--  <textarea id="pubkey" rows="15" cols="65" style="display:block">
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx4HIR4G8FyLgpgyLNUcI
9GYhQTozrrB77jiaOShJjqlQZKWY2nOoon6YUBPySRIHZO/cua2bIhP2LTE2buGM
ofo+mvB6zB5nlgpkPo2JQRdeeYa523fmrI4npnvjA7WiZGaSxTh4ortp8xPWCtd+
sZaqTk9H7xqLTU7mY5aHn2mAITbzLpwoWJ4osJt2WggclIit3DmyzVSfV5eBq5b6
Suzeaxl52kyVTZFP3EMCfwvaad2tHikl87EaS7h8oUx+bLYGbFoxMjRKHnWQnGnY
naJCZsxvw1YycOdn6+JyyIHioN+4FBSRqlCTCibwnAUT8X3PtnGDKUYDMoisXlqc
MwIDAQAB
</textarea><br/>-->
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
<!--<script src="http://passport.cnblogs.com/scripts/jsencrypt.min.js"></script>-->
<script>
//import axios from 'axios';
import util from '../../../common/js/common.js'
import axios from '../../../common/js/axios.js'


require.ensure([], function() {
  let $ = require('../../../common/js/jquery')
});
import titleInfo from '../../title/Title.vue'

export default {
    components:{
           titles:titleInfo
        },
    data() {
      return {
       tel:sessionStorage.getItem('user'),
        ruleForm: {
          nowPass: ''
        },
        rules:{
          nowPass:[
             {  required: true, message: '请输入当前支付密码', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      onNext(formName){

        this.$refs[formName].validate((valid) => {
         if (valid) {
             axios({
              url:'/api/user/update/payPassword/first',
              method: 'get',
              params:{
                accUserId: sessionStorage.getItem('accUserId'),
                payPassword: util.passwordByRsa(this.ruleForm.nowPass)
              }
            }).then((response)=> {
              console.log(response.data);
                if(response.data.code==0){
                    this.$message.error(response.data.msg);
                    this.ruleForm.nowPass=""
                  return;
                 }
                 sessionStorage.setItem('resultId', response.data.data.resultId);

                this.$router.push('/account/nextPassEdit');
              })
         }



        })

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
