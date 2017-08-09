import Vue from 'vue'
import Router from 'vue-router'
import 'element-ui/lib/theme-default/index.css'
import A from '@/view/A'
import Error from '@/view/Error'
import Login from '@/view/Login'
import Index from '@/view/Index'
import Recharge from '@/view/Recharge'
import Withdraw from '@/view/Withdraw'
import NextWithdraw from '@/view/NextWithdraw'

import Home from '@/components/home/Home'
import Account from '@/components/home/Account'
import BankList from '@/components/home/BankList'
import Record from '@/components/home/Record'
import Question from '@/components/home/Question'
import TelEdit from '@/components/home/account/TelEdit'
import PassEdit from '@/components/home/account/PassEdit'
import NextPassEdit from '@/components/home/account/NextPassEdit'
import PassForget from '@/components/home/account/PassForget'
import NextPassForget from '@/components/home/account/NextPassForget'
import AddBank from '@/components/home/bank/AddBank'
import BindFirst from '@/components/home/bank/BindFirst'
import BindSecond from '@/components/home/bank/BindSecond'
import MerchantBind from '@/components/home/bank/MerchantBind'
import BindMoney from '@/components/home/bank/BindMoney'
Vue.use(Router);

export default new Router({

  routes: [
    {
      path: '/',
      redirect: '/login',

    },
    {
      path: '/error',
      component: Error
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/index',
      component: Index,
      redirect: '/index/home',
      children: [
        {
          path: 'home',
          component: Home
        },
        {
          path: 'account',
          component: Account,
        },
        {
          path: 'bankList',
          component: BankList
        },
        {
          path: 'record',
          component: Record
        },
        {
          path: 'question',
          component: Question
        }
      ]
    },

    {
      path: '/recharge',
      component: Recharge
    },
    {
      path: '/withdraw',
      component: Withdraw
    },
    {
      path: '/nextWithdraw',
      component: NextWithdraw
    },

    {
      path: '/account/telEdit',
      component: TelEdit
    },
    {
      path: '/account/passEdit',
      component: PassEdit
    },
    {
      path: '/account/nextPassEdit',
      component: NextPassEdit
    },
    {
      path: '/account/passForget',
      component: PassForget
    },
    {
      path: '/account/nextPassForget',
      component: NextPassForget
    },
    {
      path: '/bank/addBank',
      component: AddBank
    },
    {
      path: '/bank/bindFirst',
      component: BindFirst
    },
    {
      path: '/bank/bindSecond',
      component: BindSecond
    },
    {
      path: '/bank/merchantBind',
      component: MerchantBind
    },
    {
      path: '/bank/bindMoney',
      component: BindMoney
    }
  ]
})
