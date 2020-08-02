import React,{Component} from 'react'
import $ from 'jquery';
import datatables from 'datatables.net-se'
//import button from 'datatables.net-buttons'
//import './stylesTable.css';
import '../../../node_modules/datatables.net-se/css/dataTables.semanticui.css'
import '../../../node_modules/datatables/media/js/jquery.dataTables'


var tableRef;
var tableGlobal;

const setRef = (element) => {
    tableRef = element;
}

const setDataTableGlobal = (table) => {
    tableGlobal = table;
}

class  DataTable extends Component {
    constructor(props){
        super(props)
        this.settings = {
            "columns": new Array()           
       }
       this.state = {
           loading:false,
           loaded:false
       }
    }
    

    componentDidMount(){
        $.DataTable = datatables;
        $.fn.DataTable.ext.buttons.alert = {
            className: 'buttons-alert',
         
            action: function ( e, dt, node, config ) {
                alert( this.text() );
            }
        };
        this.refTable = tableRef
        let json = this.buildSettings()
        //console.log(json)
        this.DataTable = $(this.refTable).DataTable(json); 
        setDataTableGlobal(this.DataTable);  
        window.tabled = tableGlobal   
        
        this.DataTable.clear();
        let data = this.modifyDataDatatable();
        this.DataTable.rows.add(data); 
        //console.log('l')
        this.DataTable.draw();
        this.setRefDatatable(this.refTable)
        this.setDatatableObject(this.DataTable);
    }
    //metodo para setear referencia de datatable
    setRefDatatable(element){
        if(this.props.setRef){
            this.props.setRef(element);
        }
    }
    //metodo para setear el objeto de datatable
    setDatatableObject(table){
        if(this.props.setDatatable){
            this.props.setDatatable(table);
        }
    }

    buildSettings(){
    if(this.props.data.length > 0){ 
            if(this.props.options){           
                let obj =  this.props.data[0]
                //solo si viene activado el checkbox
                // console.log(obj)
                        if(this.props.checkbox){
                                let newObj = Object.create({})
                                newObj['checkbox_data'] = null
                                let Keys =  Object.keys(obj)
                                    Keys.map((obj) =>{
                                        newObj[obj] = obj[obj]
                                })
                                obj = newObj;
                        }              
                        let objClone;
                            if(!this.props.optionsTwo)
                                objClone = this.ObjectDefineProperty(obj,'options')  
                            else{
                                objClone = this.ObjectDefineProperty(obj,'options')
                                objClone = this.ObjectDefineProperty(obj,'optionsTwo')
                            }                    
                        //  console.log(objClone)     
                        let arrayKeys =  Object.keys(objClone)
                    //console.log(objClone)
                    arrayKeys.map((obj) => {
                            if(obj == "options" && this.props.buttonsOptions)
                                this.settings.columns.push({data:null,defaultContent:this.props.buttonsOptions}) 
                            else if(obj == "optionsTwo" && this.props.buttonsOptionsTwo)
                                this.settings.columns.push({data:null,defaultContent:this.props.buttonsOptionsTwo})
                        else if(obj == "checkbox_data"){
                            if(this.props.renderBtnCheckbox)
                                this.settings.columns.push({data:null,render:this.props.renderBtnCheckbox})
                            else
                                this.settings.columns.push({data:null,defaultContent:this.props.checkboxButtons})
                        }
                            
                            else
                                this.settings.columns.push({data:obj})   
                            
                        })                                  
                    //console.log(this.settings.columns)
        }else{
                if(this.props.checkbox){
                    let obj = this.props.data[0]
                    let newObj = Object.create({})
                    newObj['checkbox_data'] = null
                    let arrayKeys =  Object.keys(obj)
                    arrayKeys.map((obj) =>{
                        newObj[obj] = obj[obj]
                    })

                    let Keys =  Object.keys(newObj)
                    Keys.map((obj) => {
                        if(obj == "checkbox_data"){
                            if(this.props.renderBtnCheckbox)
                            this.settings.columns.push({data:null,render:this.props.renderBtnCheckbox})
                        else
                            this.settings.columns.push({data:null,defaultContent:this.props.checkboxButtons})
                        }
                        // this.settings.columns.push({data:null,defaultContent:this.props.checkboxButtons})
                        else
                            this.settings.columns.push({data:obj}) 
                    })
                }else{ 
            // .map((obj) => {  
                    let obj = this.props.data[0]
                    let arrayKeys =  Object.keys(obj)
                    //console.log(arrayKeys)
                    arrayKeys.map((obj) => {
                    this.settings.columns.push({data:obj}) 
                    })
                }   
                //}) 
        }
        
        let keysSettings =  Object.keys(this.props.settings)
        if(keysSettings.indexOf("columns") == -1){
            // let ajax = this.settings.ajax
            this.settings = this.ObjectDefineProperty(this.props.settings,"columns",this.settings.columns)
            // this.settings = this.ObjectDefineProperty(this.props.settings,"ajax",ajax)
        }else{
            this.settings = this.props.settings; 
        }
    
        return this.settings;  
        }else{
            return {}
        } 
    }

    ObjectDefineProperty(obj,nameProperty,value){
      return  Object.defineProperty(obj,nameProperty,{
            enumerable: true,
            configurable: true,
            writable: true,
            value:value
            });
    }
 
    componentWillReceiveProps(next_props){
        //console.log(next_props)
        if(next_props.loader){
             this.setState({loading:true})
        }
        else if(!next_props.loader && next_props.loader != undefined){
            this.setState({loading:false})
           // console.log(next_props)
        }
    }

    componentDidUpdate(){
        //se agregar columnas al dom de jquery
        if(!this.state.loading){
            this.DataTable.clear();
            let data = this.modifyDataDatatable();
            this.DataTable.rows.add(data); 
            //console.log('l')
            this.DataTable.draw();
       }       
    }


    modifyDataDatatable(){
        let newData = [];
        if(this.props.options){
         newData = this.props.data.map((obj) => {
                let objClone = obj;                   
                if(this.props.optionsTwo){                                  
                    Object.defineProperty(objClone,'options',{
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value:null
                    });
                    
                    Object.defineProperty(objClone,'optionsTwo',{
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value:null
                        });

                }else{                                 
                    Object.defineProperty(objClone,'options',{
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value:null
                        });
                }

                if(this.props.checkbox){                                     
                    let newObj = Object.create({});
                    let keys = Object.keys(objClone);
                    newObj["checkbox_data"] = null
                    keys.map((item) => {
                        newObj[item] = objClone[item]
                    })
                    objClone = newObj
                   // console.log(Object.keys(objClone))
                 }
                 return objClone;
            })

            //let keys = Object.keys(objClone)
           // console.log(newData);
        }else{
          newData =  this.props.data.map((obj) => {
                let objClone = obj
                if(this.props.checkbox){                                     
                    let newObj = Object.create({});
                    let keys = Object.keys(objClone);
                    newObj["checkbox_data"] = null
                    keys.map((item) => {
                        newObj[item] = objClone[item]
                    })
                    objClone = newObj
                   // console.log(Object.keys(objClone))
                 }
                 return objClone;
            })
        }
       // console.log(newData)
        return newData;
    }
    
    render(){  
    return(
            <table  ref={setRef}  id="DataTable"  className="stripe responsive order-column display DataTable-react" >
                 <thead className="datatable-thead">
                 <tr>
                    {
                          this.props.columns.map((obj) => {
                        
                           return   (() => {
                               let th;
                                        this.props.checkbox === true && obj.columnName == '' ? 
                                      th = <th className={obj.className} style={obj.style} id={obj.id} data-label={obj.label}>  
                                             <div class="col s2" style={{width:'30px',marginLeft:'-8px',marginBottom:'-15px'}}>
                                                <input type="checkbox" id="checkAll" className="filled-in"  onClick={this.props.handleCheckboxes}/>
                                                <label for="checkAll"></label> 
                                                </div>
                                             </th>
                                        :                                    
                                      th =  <th style={obj.style} className={obj.className} id={obj.id} data-label={obj.label}>{obj.columnName}</th>
                                    
                                      return th;
                                    })()
                        })
                    }
                 </tr>
            </thead>
            <tbody className="datatable-tbody"></tbody>
            <tfoot className='datatable-tfoot'></tfoot>
            </table>
        )
    }
}

export{
    DataTable,
    tableRef,
    tableGlobal
}



