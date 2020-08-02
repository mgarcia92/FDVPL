import {GET_LIST_GENERAL_STATE,CLOSE_MODAL,OPEN_MODAL,LOADER_TABLE_STATE} from '../actions/actionsTypes';

const initialState = {
    data:[]
    ,openModal:false
    ,route:{
        ruta:''
        ,nombre:''
        ,estado:''
    },
    loader:false
}

function StateRoute(state =  initialState ,action){
    switch(action.type){
        case GET_LIST_GENERAL_STATE:
           // console.log(action)
            return {
                data:action.payload
                ,openModal:false
                ,route:state.route
                ,loader:false
            }
        case OPEN_MODAL:
             //console.log(action)
             //console.log(state)
             return {
                 data:state.data
                 ,openModal:true
                 ,route:action.payload.route
                 ,loader:false
             } 
        case CLOSE_MODAL:
            //  console.log(action)
             return {
                data:state.data
                ,openModal:false
                ,route:state.route
                ,loader:false
            }
        case LOADER_TABLE_STATE:
        return {
            data:state.data
            ,openModal:false
            ,route:state.route
            ,loader:action.payload.loader
        }    
        default:
            return state;
    }
}


export default StateRoute;