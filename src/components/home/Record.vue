<template>
  <div class="container a">
    <titles tit="我的交易记录" style="margin-bottom:20px;"></titles>

    <div class="record-search-cate line">
      <label class="label-text">时间：</label>
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="选择日期范围"
        :picker-options="pickerOptions0" @change="start" :editable="false" format="yyyy-MM-dd" range-separator="/">
      </el-date-picker>
      <span>-</span>
      <el-date-picker
        v-model="value2"
        align="right"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions1" @change="end" :editable="false">
      </el-date-picker>
    </div>
    <div class="record-search-cate">
      <label class="label-text">分类：</label>
      <chooser :selections="classList"
        @on-change="onParamChange('period', $event)"></chooser>
    </div>
    <div class="record-search-cate">
      <label class="label-text">状态：</label>
      <chooser :selections="statusList"
               @on-change="onParamChange('statusId', $event)"></chooser>
    </div>
    <el-table :data="datas" highlight-current-row v-loading="listLoading" style="width: 100%;" align="center">

      <el-table-column type="index" width="100" prop="ID" align="center">
      </el-table-column>

      <el-table-column prop="orderType" label="交易类型" align="center" :formatter="formatOrderType">
      </el-table-column>
      <el-table-column prop="amount" label="交易金额" align="center" :formatter="formatAmount">
      </el-table-column>
      <el-table-column prop="payStatus" label="交易状态" align="center" :formatter="formatPayStatus">
      </el-table-column>
      <el-table-column  prop="completeTime" label="交易时间" align="center" :formatter="dateFormat">
      </el-table-column>

    </el-table>
    <el-col :span="24" class="toolbar">

      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="20" :total="total" style="float:right;">
      </el-pagination>
    </el-col>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .record-search-cate{
    font-size: 14px;
    background: #f4f5fa;
    padding:15px 0;
    border-bottom: 1px dashed #d4d4d4;
    .label-text{
      padding:0 20px;
      float: left;
      text-align: center;
      width: 55px;
      height: 30px;
      line-height: 26px;
      font-weight: 700;
    }
  }
  .line{
    .label-text{

      line-height: 33px;

    }

  }

</style>
<script>
//import axios from 'axios';
import moment from 'moment';
import util from '../../common/js/common.js'
import titleInfo from '../title/Title.vue'
import Chooser from './base/Chooser'
import axios from '../../common/js/axios.js'

export default {
        components:{
           titles:titleInfo,
           Chooser
        },
        data(){
            return{
                datas:[{
                  id:1,
                  type:'充值',
                  price:"200",
                  status:"1",
                  timer:"2012-05-31 17:23:00"
                }],
                period: {},
                statusId:{},
                //默认数据总数
                total: 100,
                //当前页码
                currentPage: 1,
                //当面条数
                pagesize:20,
                listLoading:true,
                value1: '',
                value2: '',
                classList: [
                {
                  label: '全部',
                  value: -1
                },
                {
                  label: '充值',
                  value: 3
                },
                {
                  label: '提现',
                  value: 8
                },
                {
                  label: '消费',
                  value: 1
                },
                {
                  label: '结算',
                  value: 47
                }
              ],
               statusList: [
                {
                  label: '全部',
                  value: -1
                },
                {
                  label: '成功',
                  value: 1
                },
                {
                  label: '失败',
                  value: 2
                },
                {
                  label: '进行中',
                  value: 0
                }
              ],

            }
        },
        methods:{
        //格式化金钱
          formatAmount:function(row,column){
              var date = row[column.property];
              if (date == undefined) {
                  return "";
                }
              return (date/100).toFixed(2);
            },
            //格式化日期
           dateFormat: function (row, column) {
                var date = row[column.property];
                if (date == undefined) {
                  return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm:ss");
              },

            //交易类型
              formatOrderType: function (row, column) {
                var data = row[column.property];
                switch (data) {
                  case 1:
                    return "消费"
                    break;
                  case 2:
                    return "退款"
                    break;
                  case 3:
                    return "充值虚户"
                    break;
                  case 4:
                    return "转账"
                    break;
                  case 5:
                    return "接收转账"
                    break;
                  case 6:
                    return "收款"
                    break;
                  case 7:
                    return "代付订单"
                    break;
                  case 8:
                    return "提现"
                    break;
                  case 9:
                    return "充值会员卡"
                    break;
                  case 10:
                    return "发红包"
                    break;
                  case 11:
                    return "商户微信扫码"
                    break;
                  case 12:
                    return "商户支付宝扫码"
                    break;
                  case 13:
                    return "工资"
                    break;
                  default:
                    return "无效"
                }

              },
            //交易状态
              formatPayStatus: function (row, column) {
                var data = row[column.property];
                switch (data) {
                  case 0:
                    return "未支付"
                    break;
                  case 1:
                    return "支付成功"
                    break;
                  case 2:
                    return "支付失败"
                  default:
                    return "无效"
                }

              },
          //改变选项时加载
          onParamChange (attr, val) {
            this[attr] = val
            console.log(attr,val)
            //this.getPrice()
            // this.getAllRecord (this.currentPage,this.pagesize,this.period.value,this.statusId.value);
             this.getAllRecord(this.currentPage,this.pagesize,this.period.value,this.statusId.value,this.value1,this.value2);
          },
          //改变选项时加载
          /*onStatusChange (attr, val) {
            this[attr] = val
            //this.getPrice()
             this.getAllRecord (this.currentPage,this.pagesize,this.period.value,this.statusId.value);
          },*/

          //一进来获取全部时加载数据
            getAll (pageNo,pageSize) {
            if(this.period.value==-1 && this.statusId.value==-1){
              axios.get('/api/userNew/bill/count', {
                params: {
                  accUserId:sessionStorage.getItem('accUserId'),
                  pageNo:pageNo,
                  pageSize:pageSize

                }
              })
              .then((response)=>{
                   if(response.data.code==1){
                    this.listLoading=true;
                    console.log(response);
                    this.datas=response.data.data.billList;
                    this.total=response.data.data.total;
                    this.listLoading = false;
                   }

              })
              .catch(function (error) {
                this.$message.error(error);
              });
            }
         },

           //获取全部时加载数据
         //获取全部时加载数据
          getAllRecord (pageNo,pageSize,orderType,payStatus,startTime,endTime) {
            console.log("period="+this.period.value)
            console.log("statusId="+this.statusId.value)
            if(this.period.value==-1 && this.statusId.value==-1){
              axios.get('/api/userNew/bill/count', {
                params: {
                  accUserId:sessionStorage.getItem('accUserId'),
                  pageNo:pageNo,
                  pageSize:pageSize,
                  startTime:startTime,
                  endTime:endTime
                }
              })
              .then((response)=>{
                  if(response.data.code==1){
                    this.listLoading=true;
                    console.log(response);
                    this.datas=response.data.data.billList;
                    this.total=response.data.data.total;
                    this.listLoading = false;
                  }

              })
              .catch(function (error) {
                this.$message.error(error);
              });
            }else{
               axios.get('/api/userNew/getOrdersByOrderTypeAndPayStatus', {
                params: {
                  accUserId:sessionStorage.getItem('accUserId'),
                  orderType:orderType,
                  payStatus:payStatus,
                  pageNo:pageNo,
                  pageSize:pageSize,
                  startTime:startTime,
                  endTime:endTime
                }
              })
              .then((response)=>{
                if(response.data.code==1){
                    this.listLoading=true;
                    console.log(response);
                    this.datas=response.data.data.billList;
                    this.total=response.data.data.total;
                    this.listLoading = false;
                }

              })
              .catch(function (error) {
                this.$message.error(error);
              });
            }
          },

          handleCurrentChange(val) {
              this.currentPage = val;
               this.getAll(this.currentPage,this.pagesize);
              this.getAllRecord(this.currentPage,this.pagesize,this.period.value,this.statusId.value,this.value1,this.value2);
          },
          start(){
            let vm=this
            this.value1=util.formatDate(vm.value1);
            console.log(this.value1);


            this.getAllRecord(this.currentPage,this.pagesize,this.period.value,this.statusId.value,this.value1,this.value2);
          },
          end(){
               let vm=this
              this.value2=util.formatDate(vm.value2);
              this.getAllRecord(this.currentPage,this.pagesize,this.period.value,this.statusId.value,this.value1,this.value2);
           }
        },
        computed: {
         //日期插件
            pickerOptions0() {
            let vm=this;
                  return{
                     disabledDate(time) {
                       if(vm.value2){
                          // 11319代表1天的时间戳
                          return time.getTime() > new Date(vm.value2);
                      }
                      return false;
                  }
                }
            },
            pickerOptions1() {
                let vm = this;
                return {
                    disabledDate(time) {
                        if (vm.value1) {
                            // 11319代表1天的时间戳
                            return time.getTime() < new Date(vm.value1) - 8.64e7 + 11319;
                        }
                        // 没有选择开始时间，结束时间不让选
                        //return true;
                    }
                }
            }
        },
        mounted () {
          this.period = this.classList[0],
          this.statusId=this.statusList[0],
          //this.getAllRecord (this.currentPage,this.pagesize,this.period.value,this.statusId.value);
          this.getAll(this.currentPage,this.pagesize);

        }
    }


</script>
