<template>
  <div class="container">
    <titles tit="修改手机号"></titles>

    <div class="telEdit">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class=" demo-ruleForm" label-width="80px">

        <el-form-item label="新手机号" prop="telephone">
          <el-col :span="24">
            <el-input v-model.number="ruleForm.telephone" placeholder="请输入新手机号"></el-input>
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
            <el-button type="primary" @click="onVerify">获取验证码</el-button>
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
import titleInfo from '../../title/Title.vue'
export default {
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
        ruleForm: {
          telephone: '',
          verify: ''
        },
        rules:{
          telephone:[
             { validator: checkTel, trigger: 'blur' }

          ]
        }
      };
    },
    methods: {
      onSubmit() {
        console.log('submit!')
      },
      onVerify() {
        console.log('Verify!')
      }
    }
  }
</script>
