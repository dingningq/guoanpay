<template>
  <h3 class="title">{{tit}}
    <div class="fr">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">返回首页</el-breadcrumb-item>

      </el-breadcrumb></div>
  </h3>
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
      line-height:40px!important ;
    }
  }
</style>
<script>

    export default{
        name:'title',
        data(){
          return {}
        },
        props: ['tit']
    }
</script>
