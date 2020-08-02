import React,{Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/actionsDataGeneration';
import {DataTable,tableRef,tableGlobal} from '../utils/dataTable';
import {Button,Icon,Grid, Dimmer,Loader} from 'semantic-ui-react'
import $ from 'jquery';

class GenerateData extends Component{
 
    constructor(){
        super();
        this.routes = new Array();
    }
    componentDidMount(){
      this.props.actions.getListRouteDataGenerateAsync();
      this.handleClickCheckRoute();
    }

    handleGetRoutes = (e) =>{
        this.props.actions.getListRouteDataGenerateAsync();
        this.routes = []
    }

    deleteFromArray(array,element){
        let index = array.indexOf(element);
        if( index > -1)
            return array.splice(index,1);
        else
            return array;
    }

    handleClickCheckRoute(){
        let _this = this;
        $(tableRef).on( 'click', '.check-rotCode', function (e) {
            var data = tableGlobal.row( $(this).parents('tr')).data();
            if($(this).is(":checked")){  
                // _this.props.actions.addRoute(data.codigo);
               if(_this.routes.indexOf(data.codigo) < 0)
                    _this.routes.push(data.codigo);

                console.log(_this.routes)
            }
            else{
                //_this.props.actions.deleteRoute(data.codigo);
                _this.deleteFromArray(_this.routes,data.codigo);

                console.log(_this.routes)
            }
              
        } );
    }
    

    handleGenerateData = (e) =>{
        this.props.actions.dataGenerationAsync(this.routes);
        this.props.actions.getListRouteDataGenerateAsync();
    }

    handleUploadRep = (e) =>{
        this.props.actions.uploadRepServerAsync();
        this.props.actions.getListRouteDataGenerateAsync();
    }

    handleMasterData = (e) => {
        this.props.actions.generateMasterDataAsync();
        this.props.actions.getListRouteDataGenerateAsync();
    }
    render(){
        //console.log(this.props.datatableProps)
        return(
            <div style={{overflowX:'scroll'}}>
            <Grid columns={1} className="buttons-generate-data">
                <Grid.Row textAlign="center">
                    <Grid.Column>
                    <Button icon  content='Primary' primary onClick={this.handleGetRoutes} >
                    <Icon name='sync' />               
                </Button>
                <Button content='Generar Datos'  onClick={this.handleGenerateData} primary icon='right cloud' labelPosition='right' />
                <Button content='Upload de Datos' onClick={this.handleUploadRep}  primary icon='right database' labelPosition='right' />
                <Button content='Data Maestra'  onClick={this.handleMasterData}   primary icon='right download' labelPosition='right' />
                    </Grid.Column>
                </Grid.Row>
            </Grid>         
               <DataTable  {...this.props.datatableProps} /> 
         
              {
                this.props.loading == true && <Dimmer active inverted> <Loader inverted>Cargando Data Desde SAP Espere...</Loader></Dimmer> 
                /* <Modal
                title="Ruta Borrada"
                open={this.props.openModal}
                content={form}
                handlClose={this.handleCloseModal}
                handleAccept={this.handleProcessModal}
            
             /> */}
          </div>
        )
    }
}

function mapStateToProps(state,props){
    const data = [{codigo:"",sname:"",vkbuR_T:"",gnlStatus:"",gnlStatusDate: "",gnlDate:"",gnlPartialStatus:"",gnlPartialStatusDate:""}];
    //console.log(state.GenerationData)
     return{
         data:state.data,
         datatableProps:{
                 settings: {
                 //"sDom": '<"left"flp><"clear">',
                 "searching": true,
                 "showNEntries" : false,
                 //"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
                 language: { search: "Buscar" },
                 "paging": true,
                 "responsive": true,
                // "sPaginationType": "full_numbers",
                 "bLengthChange":false,
                 "pageLength": 10,
                 "scrollX": false,
                 "columnDefs": [],
                     "order": [[ 0, "desc" ]]                        
                 }
                ,columns: [{columnName:"Ruta",label:"Ruta"},{columnName:"Nombre",label:"Nombre",style:{width:"25%",minWidth:'40%'}},{columnName:"Localidad",label:"Localidad"},{columnName:"Status",label:"Status",style:{width:'20px'}},{columnName:"Fecha Total",label:"Fecha Total",style:{width:"15%",minWidth:'15%'}},{columnName:"Fecha Jordana",label:"Fecha Jornada"},{columnName:"Status Parcial",label:"Status Parcial",style:{width:'15px'}},{columnName:"Fecha Parcial",label:"Fecha Parcial",style:{width:"15%",minWidth:'15%'}},{columnName:"Seleccionar",label:"Seleccionar",style:{width:'10px'}}]
                ,options:true
                ,checkbox:false
                ,optionsTwo:false
                ,data: state.GenerationData.data.length > 0 ? state.GenerationData.data: data
                ,buttonsOptions: `<div class="ui checkbox">
                <input type="checkbox" class='check-rotCode' name="example">
                <label></label>
                </div>`
               // ,renderBtnCheckbox:this.renderDatatableCheckbox
               // ,handleCheckboxes:this.handleCheckAll
                ,loader: null
         },
         loading: state.GenerationData.loader
     }
 }
 
 function mapDispacthToProps(dispatch){
     return{
         actions:bindActionCreators(actions,dispatch)
     }
 }
 


export default connect(mapStateToProps,mapDispacthToProps)(GenerateData);