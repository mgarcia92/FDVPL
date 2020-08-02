import {GET_LIST_ROUTE, UPDATE_ROUTE_DELETED,LOADING_UPDATE_DELETED,LOADER_TABLE_DELETED} from './actionsTypes';
import ajax from '../ajax/ajax';

export function getListRoute(data){
    return{
        type:GET_LIST_ROUTE,
        payload:data
    }
}

export function loaderTable(data){
    return{
        type:LOADER_TABLE_DELETED,
        payload:{
            loader:data
        }
    }
}


export function getListRouteAsync(){
    return (dispatch) => {
        let url = getListDeletedRoutesUrl;
        ajax(url,"GET","JSON",JSON.stringify({}),() =>{
            dispatch(loaderTable(true))
        }).done((result) => {
           // console.log(result.data)
            dispatch(getListRoute(result.data))
        }).fail((err) =>{
            console.log(err)
        })
    }
}

//save state
export function updateRoute(data){
    return{
        type:UPDATE_ROUTE_DELETED,
        payload:data
    }
}

export function updateRouteAsync(rotCode,deleted){
    return (dispatch) => {
        let url = updateRouteDeletedUrl;
        ajax(url,"POST","JSON",JSON.stringify({rotCode:rotCode,deleted:deleted}),() =>{
            dispatch(loader())
        }).done((result) => {
           // console.log("LLEGO")
            dispatch(updateRoute(result))
            dispatch(getListRouteAsync())
        }).fail((err) =>{
            console.log(err)
        })
    }
}


export function loader(){
    return{
        type:LOADING_UPDATE_DELETED,
        payload:[]
    }
}