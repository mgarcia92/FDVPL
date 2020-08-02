import React,{Component} from 'react';
import {DataTable,tableRef,tableGlobal} from '../utils/dataTable';
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions/actionsStateRoute';
import Modal from '../utils/modal';
import $ from 'jquery'
import {Form,Ref,Button,Icon,Grid,Dimmer,Loader} from 'semantic-ui-react'

class StateRoute extends Component{
state ={
    openModal:false
    ,stateRoute:{
        ruta:''
        ,nombre:''
        ,estado:0
    }
}
    componentDidMount(){
        this.props.actions.getListGeneralAsync(); 
        this.handleClickRowTable();
    }

    componentWillUnmount(){
        
    }

    handleClickRowTable(){
        let _this = this;
        $(tableRef).on( 'click', '.edit-state', function () {
            var data = tableGlobal.row( $(this).parents('tr')).data();
            //console.log(data)
           // _this.setState({stateRoute:obj});    
            _this.props.actions.openModal(data);    
        } );
    }

    handleCloseModal = () =>{
        this.props.actions.closeModal();
    }

    handleProcessModal =  (e) =>{
        //console.log(e)
        let status = this.status.value;
        this.props.actions.updateStateAsync(status,this.props.route.ruta);
        setTimeout(() =>{
            this.props.actions.getListGeneralAsync(); 
        },1500)
    }

    handleGetListStates = (e) =>{
        this.props.actions.getListGeneralAsync(); 
    }
    
    render(){

        let form =  <Ref innerRef={node => this.form = node}>
                        <Form>
                            <Form.Field>
                                <label>Ruta</label>
                                <input type="text" placeholder='Ruta'  defaultValue={this.props.route.ruta} readOnly={true}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Nombre</label>
                                <input type="text" placeholder='Nombre' defaultValue={this.props.route.nombre} readOnly={true}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Estatus</label>
                                <input type="number" ref={e => this.status = e} placeholder='Estatus' defaultValue={this.props.route.estado} min={0} max={14} />
                            </Form.Field>
                        </Form>
                     </Ref>
        return(
          <div>
            <Grid columns={1}>
                <Grid.Row textAlign="center">
                    <Grid.Column>
                    <Button icon  content='Primary' primary onClick={this.handleGetListStates} >
                    <Icon name='sync' />
                </Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>         
              <DataTable  {...this.props.datatableProps} />
              {
                this.props.loader == true && <Dimmer active inverted> <Loader inverted>Cargando...</Loader></Dimmer> 
                /* <Modal
                title="Ruta Borrada"
                open={this.props.openModal}
                content={form}
                handlClose={this.handleCloseModal}
                handleAccept={this.handleProcessModal}
            
             /> */}
            <Modal
                title="Editar Status"
                open={this.props.openModal}
                content={form}
                handlClose={this.handleCloseModal}
                handleAccept={this.handleProcessModal}
            
             />
          </div>
        )
    }
}

function mapStateToProps(state,props){
   const data = [{rotCode:"",rotName:"",gnlStatus:""}];
   ///console.log(state)
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
               ,columns: [{columnName:"Ruta",label:"Ruta"},{columnName:"Nombre",label:"Nombre"},{columnName:"Status",label:"Status",style:{width:'20px'}},{columnName:"edit",label:"edit",style:{width:'20px'}}]
               ,options:true
               ,checkbox:false
               ,optionsTwo:false
               ,data: state.StateRoute.data.length > 0 ? state.StateRoute.data: data
               ,buttonsOptions: '<button class="mini ui teal icon button edit-state"><i class="edit icon"></i></button>'
              // ,renderBtnCheckbox:this.renderDatatableCheckbox
              // ,handleCheckboxes:this.handleCheckAll
               ,loader:null
        }
        ,openModal:state.StateRoute.openModal != undefined ? state.StateRoute.openModal : false
        ,route:state.StateRoute.route
        ,loader: state.StateRoute.loader
    }
}

function mapDispacthToProps(dispatch){
    return{
        actions:bindActionCreators(actions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispacthToProps)(StateRoute);


