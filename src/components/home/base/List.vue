<template>
  <div class="gray-link clearfix">

    <div class="card-box" v-for="(item,index) in selections">
      <div class="card-box-name p-r">
            <span class="bank-logo">
            <!--<img src="../../../common/image/102100099996.png" width="16" height="16">-->
               <img :src=item.sbankCode|imgUrl width="20" height="20"/>
             </span>
         <span class="bank-name">{{item.bankName}}</span>
         <span class="bank-num">尾号{{item.lastCardNo}}</span>
         <span class="bank-del" @click="chosenSelection(index,item.bindBankId)">解绑</span>

       </div>
     </div>
     <!-- <a v-for="(item,index) in selections" @click="chosenSelection(index)" :title="item.label" :class="{active:index === nowIndex}" class="inline-item">{{ item.label }}</a>-->

   </div>
 </template>
 <style  lang="less" rel="stylesheet/less" scoped>
   .gray-link{
     border-bottom:1px solid #ececec;
   }
   .card-box{
     width:260px;
     float: left;
     height:50px;
     margin: 0 20px 20px 0;
     background: #EFF0F1;
     border: 1px solid #DDDDDD;
     border-radius: 4px;
     box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);


     .bank-logo {
       position: absolute;
       top: 16px;
       left: 10px;
     }
     .bank-name{
       position: absolute;
       top: 18px;
       left: 33px;
       overflow: hidden;
       width: 84px;
       text-overflow: ellipsis;
       white-space: nowrap;
     }
     .bank-num{
       position: absolute;
       top: 18px;
       right:60px;
     }
     .bank-del{
       position: absolute;
       top: 18px;
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
      filters: {

        imgUrl: function(value) {
          if (!value) return '';
          value=require("../../../common/image/"+value+".png");
          return value;
        }

      },
      mounted(){
       // console.log(this.selections);
        }
     }
 </script>
