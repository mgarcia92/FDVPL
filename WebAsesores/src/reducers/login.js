import {LOGON_USER,LOADER,LOGOUT}  from '../actions/actionsTypes'

const initialState ={   
         username:''
        ,validate:false
        ,message:''
        ,loader:false
}

function Login(state = initialState ,action){
    switch(action.type){
        case LOGON_USER:
        let obj = action.payload.userData;
        if(action.payload.userData.validate){
            sessionStorage.setItem("session",JSON.stringify(action.payload.userData))  
           return obj;
        }else{
           return obj;
        }
        case LOADER:
           return action.payload;
        case LOGOUT:
        sessionStorage.clear();
            return initialState;
        default:
            return state;
    }
}

export default Login;