import config from '@/common/js/config'
import common from '@/common/js/common'
import service from '@/common/js/service'


String.prototype.format = function(args) {
  var result = this;
  if (arguments.length > 0) {
    if (arguments.length == 1 && typeof (args) == "object") {
      for (var key in args) {
        if(args[key]!=undefined){
          var reg = new RegExp("({" + key + "})", "g");
          result = result.replace(reg, args[key]);
        }
      }
    }
    else {
      for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] != undefined) {
          //var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题
          var reg= new RegExp("({)" + i + "(})", "g");
          result = result.replace(reg, arguments[i]);
        }
      }
    }
  }
  return result;
}

export default {
  config:config,
  common: common,
  service: service,
  info (msg){
    common.message({type:'info',message:msg})
  },
  success (msg){
    common.message({type:'success',message:msg})
  },
  warn (msg){
    common.message({type:'warning',message:msg})
  },
  error (msg){
    common.message({type:'error',message:msg})
  },
  alert (msg){
    return common.alert(msg,' 提示',{confirmButtonText: '确定',type: 'warning', center: true})
  },
  confirm (msg){
    return common.confirm(msg,' 提示',{confirmButtonText: '确定', cancelButtonText: '取消',type: 'warning', center: true})
  },
  prompt (msg){
    return common.prompt(msg,' 提示',{confirmButtonText: '确定', cancelButtonText: '取消',type: 'info', center: true})
  }

}
