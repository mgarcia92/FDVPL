import {LOGON_USER,LOADER,LOGOUT} from './actionsTypes';
import {path} from '../components/utils/getPath'
import ajax from '../ajax/ajax';

export function LoginUser(data){
    return {
            type:LOGON_USER,
            payload:{
                 userData:{
                     username:data.username
                    ,validate:data.validate
                    ,message: data.message
                    ,loader: data.loader
                 }
            }
    }
}

export function LoginUserAsync(username,password){
    return (dispatch) => {         
      //  let url = "/api/WebApi/LogonUser";
        let url = urlLoginApi;

        let params = {username:username,password:password}
       if(username != "" && password != ""){
        ajax(url,"POST","JSON",JSON.stringify(params),() =>{
            dispatch(showLoader())
        }).done((data) =>{
              //console.log(data)                 
              dispatch(LoginUser(data.data))                
        })
        .fail(() =>{
        })
       }else{
           dispatch(LoginUser({username:username,validate:false,message:'Debe Ingresar Usuario y Clave',loader:false}))
       }
    }  
}


export function Logout(){
    return{
        type:LOGOUT,
        payload:{}
    }
}


export function showLoader(){
    return{
        type:LOADER,
        payload:{
            username:'',
            validate:false,
            message:'',
            loader:true
        }
    }
}