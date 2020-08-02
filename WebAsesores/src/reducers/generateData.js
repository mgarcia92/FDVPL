import { DATA_GENERATION,LIST_ROUTE_GENERATE,LOADER_TABLE,UPLOAD_REP,GENERATE_MASTER_DATA } from '../actions/actionsTypes';

const initialState = {
    data:[],
    loader:false
}

function GenerationData(state =  initialState ,action){
    switch(action.type){
        case DATA_GENERATION:
            console.log("DATA_GENERATION") 
            let response = action.payload.responseRoutes
           if(response.length > 0)
           {
            response.map(obj =>{
                let color = "";
                if(obj.clearRoute == "OK!" && obj.general == "OK!" && obj.GeneralDownload == "OK!"){
                    color = "#19c3aa"
                }else{
                    color = "#DB2828"
                }
                
                 window.$.uiAlert({
                     textHead: 'Notificacion', // header
                     text: obj.message, // Text
                     bgcolor: color, // background-color
                     textcolor: '#fff', // color
                     position: 'top-right',// position . top And bottom ||  left / center / right
                     icon: 'checkmark box', // icon in semantic-UI
                     time: 15, // time
                       })
                
           });          
        }
            return state;
        case LIST_ROUTE_GENERATE:
             return{
                 data:action.payload.data,
                 loader:false
             }   
        case GENERATE_MASTER_DATA:
             return state;
        case UPLOAD_REP:
             return state;
        case LOADER_TABLE:
        //console.log(state) 
            return{
                data:state.data,
                loader:action.payload.loader
            }   
        default:
            return state;
    }
}


// function ListoObjectoToArray(obj){
//         try{
//             return obj.map((item) =>{
//                 let array =  Object.keys(item).reduce(function(array, key) {
//                                    let collection;
//                                    if(Array.isArray(item[key])) //is Array
//                                    {
//                                        collection = [String("isArray")];
//                                    }
//                                    else if(typeof item[key] === 'boolean')
//                                    {
//                                        if( item[key] === false)
//                                        collection = [String("0")];
//                                        else
//                                        collection = [String("1")];
//                                    }
//                                    else
//                                    {
//                                        collection = [String(item[key]).trim()];
//                                    }
//                                    return array.concat(collection);
//                                }, []);

//                         let index = array.indexOf("isArray");
//                         if(index > -1 )
//                                array.splice(index, 1);

//                        return array;
//                        });
//        }catch(e){
//            console.log('an error occurred when converting to an array',e.message);
//            new Error(e.message);
//        }
    
// }

// function deleteFromArray(array,element){
//     let index = array.indexOf(element);
//     if( index > -1)
//         return array.splice(index);
//     else
//         return array;
// }

export default GenerationData;