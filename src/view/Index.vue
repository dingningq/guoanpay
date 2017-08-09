<template>
  <div class="container">
    <div class="nav p-r">
      <ul>
        <router-link v-for="item in navList" :to="{path:item.path}" tag="li" active-class="active" key="index">
            {{item.name}}
        </router-link>
      </ul>
      <div class="exit">
        <el-button type="primary" @click="exit()">退出登录</el-button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .nav{
    height: 40px;
    line-height: 40px;
    padding:20px 0;
    li{

      float:left;
      padding:0 20px;
      cursor:pointer;
      &.active,&:hover{
        background: #20a0ff;
        color: #fff;
      }
      a{
        display: block;
      }
    }
  .exit{
    position: absolute;
    right:0;



  }
  }


</style>
<script>
import axios from '../common/js/axios.js';
import home from '../components/home/Home.vue'
import account from '../components/home/Account.vue'
  export default {
    data() {
      return {
        basic:{},
        navList:[
          {
            name:'首页',
            path:'home',
            acitve:true
          },
          {
            name:'账户设置',
            path:'account',
            acitve:false
          },
          {
            name:'银行卡管理',
            path:'bankList',
            acitve:false
          },
          {
            name:'交易记录',
            path:'record',
            acitve:false
          },
          {
            name:'常见问题',
            path:'question',
            acitve:false
          },
        ]
      }
    },
     components:{
           global,
           account
        },
     methods: {
        exit(){
          axios.get('/api/loginOut',{
            params: {
               accUserId: this.$route.query.mobile
            },
          }).then((response)=>{

            if(response.data.code == '1'){
              sessionStorage.removeItem("sessionId");
              this.$router.push({path:'/login',query:{
                //mobile:sessionStorage.getItem('mobile'),
                merId:sessionStorage.getItem('merId')
                //userSourceType:userSourceType
                }
              });
            }else{
              this.$message.error(response.data.msg);
            }
          }).catch(function (error) {
              console.log(error);
          });
        }
    },
    /*created: function () {
      axios.get('/api/user/account/center', {
            params: {
              accUserId: this.$route.query.mobile
            },
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "imei":"mkhojklkhkdaghjjfdnphfphiaiohkef"
            }
          })
          .then((response)=>{
            this.basic=response.data.data;
            console.log(this.basic);
          })
          .catch(function (error) {
            console.log(error);
          });
    }*/

  }
</script>
