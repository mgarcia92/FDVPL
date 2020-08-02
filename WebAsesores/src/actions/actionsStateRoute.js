import {GET_LIST_GENERAL_STATE,OPEN_MODAL,CLOSE_MODAL, UPDATE_STATE_ROUTE,LOADER_TABLE_STATE} from './actionsTypes';
import ajax from '../ajax/ajax';

export function getListGeneral(data){
    return{
        type:GET_LIST_GENERAL_STATE,
        payload:data
    }
}

export function loaderTable(data){
    return{
        type:LOADER_TABLE_STATE,
        payload:{
            loader:data
        }
    }
}

export function getListGeneralAsync(){
    return (dispatch) => {
        let url = getListGeneralUrl;
        ajax(url,"GET","JSON",JSON.stringify({}),() =>{
            dispatch(loaderTable(true))
        }).done((result) => {
            //console.log(result.data)
            dispatch(getListGeneral(result.data))
        }).fail((err) =>{
            console.log(err)
        })
    }
}

export function openModal(data){
    return{
        type:OPEN_MODAL,
        payload:{
            openModal:true,
            route:{
                ruta:data.rotCode
                ,nombre:data.rotName
                ,estado:data.gnlStatus
            }
        }
    }
}

export function closeModal(){
    return{
        type:CLOSE_MODAL,
        payload:{
            openModal:false,
            route:{
                ruta:''
                ,nombre:''
                ,estado:''
            }
        }
    }
}

//save state
export function updateState(data){
    return{
        type:UPDATE_STATE_ROUTE,
        payload:data
    }
}

export function updateStateAsync(gnlStatus,rotCode){
    return (dispatch) => {
        let url = updateGeneralStatusRoute;
        ajax(url,"POST","JSON",JSON.stringify({gnlStatus:gnlStatus,rotCode:rotCode})).done((result) => {
            //console.log("LLEGO")
            dispatch(updateState(result))
        }).fail(() =>{

        })
    }
}


