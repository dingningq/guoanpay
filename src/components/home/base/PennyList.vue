<template>
  <div class="gray-link clearfix">
    <div class="card-box p-r" v-for="(item,index) in selections">
      <div class="card-box-name">
        <!-- <span class="bank-logo">
           <img src="../../../common/image/102100099996.png" width="16" height="16">
                <img :src=item.sbankCode|imgUrl width="20" height="20"/>
              </span>-->
        <span class="bank-name">{{item.bankName}}</span>
        <span class="bank-num">尾号{{item.lastCardNo}}</span>
        <span v-if="item.bindStatus"class="bank-state">状态: <b>已绑定</b></span>
        <span  v-else class="bank-state">状态: <b> <router-link :to="{ path: '/bank/bindMoney', query: { AcctId: item.lastCardNo,id:item.bindBankId}}">小额鉴权未完成</router-link></b></span>
        <span class="bank-del" :class="{none:!item.bindStatus}"  @click="chosenSelection(index,item.bindBankId)">解绑</span>
      </div>
    </div>
  </div>

 </template>
 <style  lang="less" rel="stylesheet/less" scoped>
   .gray-link{
     border-bottom:1px solid #ececec;
   }
   .none{display: none}
   .card-box{
     width:260px;
     font-size: 14px;
     float: left;
     height:100px;
     margin: 0 20px 20px 0;
     background: #EFF0F1;
     border: 1px solid #DDDDDD;
     border-radius: 4px;
     box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);


     .bank-logo {
       position: absolute;
       top: 18px;
       left: 10px;
     }
     .bank-name{
       position: absolute;
       top: 18px;
       left: 10px;
       overflow: hidden;
       width: 84px;
       text-overflow: ellipsis;
       white-space: nowrap;
     }
     .bank-num{
       position: absolute;
       top: 18px;
       right:10px;
     }
     .bank-state{
       position: absolute;
       bottom: 10px;
       left:10px;
     }
     .bank-del{
       position: absolute;
       bottom: 10px;
       right:10px;
       color: #ff0000;
       cursor: pointer;
     }
   }

 </style>
 <script>

     export default{
       props:{
         selections: {
           type: Array,
           default: [{
           }]
         }
       },

       data () {
         return {
           states:0,
           nowIndex: 0,
           nowNum:''
         }
       },
       methods: {
         chosenSelection (index,num) {
            this.nowIndex = index
            //this.nowNum = num
            let obj={
              //a:this.selections[index],
              b:num
            }

            this.$emit('on-click', obj);
            //console.log(this.nowIndex,num);
         }

      },
      /*filters: {

        imgUrl: function(value) {
          if (!value) return '';
          value1=require("../../../common/image/"+value+".png");
          if(!value1){
            value1=require("../../../common/image/mo.png");
          }
          return value1;
        }

      },*/
      mounted(){
       // console.log(this.selections);
        }
     }
 </script>
