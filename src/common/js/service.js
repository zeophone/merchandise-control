import common from '@/common/js/common'

const urlPrefix='/appstore'
export default {
  auth: {
    login(){
    },
    logout(){
    },
    checklogin(){
      return common.http.get(urlPrefix+'/check/login')
    },
    register(obj){
      return common.http.post(urlPrefix+'/access/register',obj,{loading:true})
    },
  },
  pattern: {
    get(id){
      return common.http.post(urlPrefix+'/admin/pattern/get',{id:id},{loading:true})
    },
    delete(id){
      return common.http.post(urlPrefix+'/admin/pattern/delete',{id:id},{loading:true})
    },
    save(pattern){
      return common.http.post(urlPrefix+'/admin/pattern/save',pattern,{loading:true})
    },
    query(q){
      return common.http.post(urlPrefix+'/admin/patternQueryWithChildrens',q,{loading:true})
    }
  },
  role: {
    get(id){
      return common.http.post(urlPrefix+'/admin/role/get',{id:id},{loading:true})
    },
    delete(id){
      return common.http.post(urlPrefix+'/admin/role/delete',{id:id},{loading:true})
    },
    save(pattern){
      return common.http.post(urlPrefix+'/admin/role/save',pattern,{loading:true})
    },
    query(q){
      return common.http.post(urlPrefix+'/admin/roleQuery',q,{loading:true})
    }
  },
  account: {
    get(id){
      return common.http.post(urlPrefix+'/admin/account/get',{id:id},{loading:true})
    },
    delete(id){
      return common.http.post(urlPrefix+'/admin/account/delete',{id:id},{loading:true})
    },
    save(pattern){
      return common.http.post(urlPrefix+'/admin/account/save',pattern,{loading:true})
    },
    query(q){
      return common.http.post(urlPrefix+'/admin/accountQuery',q,{loading:true})
    }
  },
  userinfo: {
    getUserinfo(){
      return common.http.post(urlPrefix+'/userinfo/getUserinfo',{},{loading:true})
    },
    saveUserinfo(info){
      return common.http.post(urlPrefix+'/userinfo/saveUserinfo',info,{loading:true})
    },
    updatePassword(param){
      return common.http.post(urlPrefix+'/userinfo/updatePassword',param,{loading:true})
    },

  },


}
