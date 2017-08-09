import vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';
import {Message,Loading} from 'element-ui';
vue.use(Router);
//vue.use(Message);
// http response 拦截器
const router = new Router();
var loadingInstance;
axios.interceptors.request.use(
  request => {
    loadingInstance = Loading.service({
      body:false,
      text:'loading...',
    });
    if(sessionStorage.getItem('reflag')==1){
      var path=sessionStorage.getItem('path')
      request.url = request.url.replace('/api/',path+"gacowalletappapi/");
    }

    request.params.sessionId = sessionStorage.getItem('sessionId');
    request.params.loginId = sessionStorage.getItem('loginId');
    request.headers.usType = '3';
    return request;
  }
);
axios.interceptors.response.use(
  response => {
    if(response.data.code == '9000'||response.data.code =='9001'){
      Message.error(response.data.msg);
      router.push({path:'/login',query:{ merId:sessionStorage.getItem('merId') }});
    }
    loadingInstance.close();
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          //store.commit(types.LOGOUT);
          //router.replace({
          //  path: 'login',
          //  query: {redirect: router.currentRoute.fullPath}
          //})
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data);
  });
export default axios;
