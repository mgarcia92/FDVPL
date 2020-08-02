import {DATA_GENERATION, LIST_ROUTE_GENERATE, LOADER_TABLE,GENERATE_MASTER_DATA,UPLOAD_REP } from './actionsTypes';
import ajax from '../ajax/ajax';


export function dataGeneration(data){
    return{
        type:DATA_GENERATION,
        payload:data
    }
}

export function dataGenerationAsync(rotCode){
    return (dispatch) => {
        let url = dataGenerationAsyncUrl;
        ajax(url,"POST","JSON",JSON.stringify({rotCode:rotCode}))
            .done((result) => {
            console.log(result.data)
            dispatch(dataGeneration(result.data))
        }).fail((err) =>{
            console.log(err)
        })
    }
}


export function getListRouteDataGenerate(data){
    return{
        type:LIST_ROUTE_GENERATE,
        payload:{
            data:data
        }
    }
}


export function getListRouteDataGenerateAsync(){
    return (dispatch) => {
        let url = getListRouteDataUrl;
        ajax(url,"GET","JSON",JSON.stringify({}),() =>{
            dispatch(loaderTable(true));
        })
        .done((result) => {
           // console.log(result.data)
           // dispatch(loaderTable(null));
            dispatch(getListRouteDataGenerate(result.data))
        }).fail((err) =>{
            console.log(err)
        })
    }
}

export function masterData(){
    return{
        type:GENERATE_MASTER_DATA,
        payload:{}
    }
}
export function generateMasterDataAsync(){
    return (dispatch) => {
        let url = generateMasterDataUrl;
        ajax(url,"GET","JSON",JSON.stringify({}),() =>{
            dispatch(loaderTable(true));
        })
        .done((result) => {
           // console.log(result.data)
           // dispatch(loaderTable(null));
            dispatch(masterData())
        }).fail((err) =>{
            console.log(err)
        })
    }
}

export function uploadRep(){
    return{
        type:UPLOAD_REP,
        payload:{}
    }
}
export function uploadRepServerAsync(){
    return (dispatch) => {
        let url = uploadDataUrl;
        ajax(url,"GET","JSON",JSON.stringify({}),() =>{
            dispatch(loaderTable(true));
        })
        .done((result) => {
           // console.log(result.data)
           // dispatch(loaderTable(null));
            dispatch(uploadRep())
        }).fail((err) =>{
            console.log(err)
        })
    }
}


export function loaderTable(data){
    return{
        type:LOADER_TABLE,
        payload:{
            loader:data
        }
    }
}




