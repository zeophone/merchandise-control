import axios from 'axios'
import { Message,Notification,MessageBox,Loading } from 'element-ui';
import config from './config'
import router from '../../router'
import store from '../../vuex'

axios.defaults.withCredentials=true;

const httpClient = axios.create({
  baseURL: config.baseURL,
  timeout: config.timeout,
  headers: config.headers
});

let loading=null;
var shouldLoading=true;

httpClient.interceptors.request.use(function (config) {
  console.log('before request config==',config)
  if(config.loading==true){
    setTimeout(function () {
      if(shouldLoading){
        loading=base.loading();
      }
    },500)

  }
  return config;
}, function (error) {
  console.log('before request error==',error)
  Message.error('请求异常！')
  if(loading){loading.close()}
  return Promise.reject(error);
});

httpClient.interceptors.response.use(function (response) {
  console.log('before response resp==',response)
  shouldLoading = false;
  if(loading){loading.close()}
  if(response.headers['content-type'] && response.headers['content-type'].indexOf('text/html')!=-1){
    document.write(response.data)
  }else{
    if(response.data){
      try{
        switch (response.data.code){
          case 0:return response.data;break;
          case 1:
            base.alert(response.data.message,' 提示',{confirmButtonText: '确定',type: 'warning', center: true})
            return response.data
            break;
          case 100:
            store.commit('updateUser',response.data.data)
            router.push('/index');
            break;
          case 101:
            router.push('/login')
            break;
          default:
            if(response.data.code>0){
              return response.data;
            }else{
              if(response.data.message){
                throw response.data.message;
              }else{
                throw '业务请求处理失败！'
              }
            }
        }
      }catch(err){
        base.error(err)
        return Promise.reject(err)
      }
    }else{
      Message.error('返回数据格式错误！')
      return Promise.reject('返回数据格式错误！')
    }
  }
}, function (error) {
  console.log('before response error==',error)
  if(loading){loading.close()}
  if(error.toString().indexOf('Network Error')!=-1 || error.toString().indexOf('timeout')!=-1){
    Message.error('请求超时,请稍后重试！')
  }else{
    Message.error('系统内部错误！')
  }
  return Promise.reject(error);
});




var base= {

  vueDelegate:{},
  http: httpClient,


  localeMsg: (msg)=>{
    return base.vueDelegate.$t(msg)
  },
  message: (obj)=>{
    Message(obj);
  },
  error: (msg)=>{
    Message.error(base.localeMsg(msg))
  },
  notify: (obj)=>{
    Notification(obj);
  },
  alert: (msg,title,config)=>{
    return MessageBox.alert(base.localeMsg(msg),title,config);
  },
  confirm: (msg,title,config)=>{
    return MessageBox.confirm(base.localeMsg(msg),title,config);
  },
  prompt: (msg,title,config)=>{
    return MessageBox.prompt(base.localeMsg(msg),title,config);
  },
  loading: (options)=>{
    return  Loading.service(options);
  },

  sleep: function sleep(numberMillis) {
  var now = new Date();
  var exitTime = now.getTime() + numberMillis;
  while (true) {
    now = new Date();
    if (now.getTime() > exitTime)
      return;
   }
  },
  copy: function(src,dest){
    if(src && dest){
      for(var attr in src){
        dest[attr]=src[attr]
      }
      return dest;
    }
  },
  clone: function(src){
    if(src) {
      return JSON.parse(JSON.stringify(src))
    }
  },
  showItem: function (code) {
    return true;
    if(!code){return true;}
    const  codes = store.getters.codes;
    if(codes){
      for(let index in codes){
        if(codes[index]=='1' || codes[index].startsWith(code)){return true;}
      }
    }

    return false;
  }

}

export default base;

