<template>
  <el-button  type="primary" v-on:click="run" :disabled="disabled || time > 0">{{ text }}</el-button>
  <!-- <el-button  type="primary" >{{time | change}}</el-button>-->
 </template>
 <style>

 </style>
 <script>

 export default{
      props: {
           second: {
            type: Number,
            default: 60
           },
           text1: {
             type: String
           },
           text2: {
             type: String
           }
      },
        data:function () {
         return {
           time: 0,
           disabled:false,

         }
        },
        methods: {
          run: function () {

           this.$emit('run');
          },
          start: function(){
           this.time = this.second;
           this.timer();
          },
          stop: function(){
           this.time = 0;
           this.disabled = false;
          },
          setDisabled: function(val){
           this.disabled = val;
          },
          timer: function () {
            if (this.time > 0) {
              this.time--;
              setTimeout(this.timer, 1000);
            }else{
             this.disabled = false;
            }
          }
        },
        computed: {
          text: function () {
            return this.time > 0 ? this.text1 : this.text2;
          }
        }



  }
 </script>
