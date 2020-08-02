import {GET_LIST_ROUTE,UPDATE_ROUTE_DELETED,LOADING_UPDATE_DELETED,LOADER_TABLE_DELETED} from '../actions/actionsTypes';

const initialState = {
    data:[]
    ,loading:false
}

function StateRoute(state =  initialState ,action){
    switch(action.type){
        case GET_LIST_ROUTE:
           // console.log("list")
            return {
                data:action.payload
                ,loading:false
            }
        case UPDATE_ROUTE_DELETED:
             //console.log(action)
             //console.log(state)
             return {
                 data:state.data
                 ,loading:false
               
             } 
        case LOADING_UPDATE_DELETED:
             //console.log(action)
             //console.log(state)
             return {
                 data:state.data
                 ,loading:true
               
             }
        case LOADER_TABLE_DELETED:
                return {
                    data:state.data
                    ,loading:true               
                }   
        default:
            return state;
    }
}


export default StateRoute;