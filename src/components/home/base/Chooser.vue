<template>
  <div class="gray-link">
    <!--<a class="active inline-item"></a>-->

    <a v-for="(item,index) in selections" @click="chosenSelection(index)" :title="item.label" :class="{active:index === nowIndex}" class="inline-item">{{ item.label }}</a>

  </div>
</template>
<style  lang="less" rel="stylesheet/less" scoped>
    .gray-link a{
      cursor: pointer;
      padding:6px 10px;
      margin-right:8px;
      &:hover{

        background-color: #ebebeb;
      }
      &.active{
        color: #fff;
        background-color: #999;

      }
    }
</style>
<script>

    export default{
      props:{
        selections: {
          type: Array,
          default: [{
            label: 'test',
            value: 0
          }]
        }
      },

      data () {
        return {
          nowIndex: 0
        }
      },
      methods: {
        chosenSelection (index) {
          this.nowIndex = index
          this.$emit('on-change', this.selections[index]);
          //console.log(this.nowIndex);
        }

     }
    }
</script>
