import React,{Component} from 'react';
import {DataTable,tableRef,tableGlobal} from '../utils/dataTable';
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions/actionsDeletedRoutes';
//import Modal from '../utils/modal';
import $ from 'jquery'
import {Dimmer,Loader,Button,Icon,Grid} from 'semantic-ui-react'

class DeletedRoutes extends Component{
    componentDidMount(){
        this.props.actions.getListRouteAsync(); 
        this.handleClickRowTable();
    }

    componentWillUnmount(){
        
    }

    handleClickRowTable(){
        let _this = this;
        $(tableRef).on( 'click', '.deleted-route', function (e) {
            var data = tableGlobal.row( $(this).parents('tr')).data();
            //console.log(data)
           // _this.setState({stateRoute:obj});    
            //_this.props.actions.openModal(data); 
             //  console.log(e.target.checked)
               _this.props.actions.updateRouteAsync(data.rotCode, e.target.checked)
        } );
    }

    // handleCloseModal = () =>{
    //     this.props.actions.closeModal();
    // }

    // handleProcessModal =  (e) =>{
    //     //console.log(e)
    //     let status = this.status.value;
    //     this.props.actions.updateStateAsync(status,this.props.route.ruta);
    //     setTimeout(() =>{
    //         //this.props.actions.getListGeneralAsync(); 
    //     },1500)
    // }

    handleGetListStates = (e) =>{
        this.props.actions.getListRouteAsync();   
    }
    
    render(){

        // let form =  <Ref innerRef={node => this.form = node}>
        //                 <Form>
        //                     <Form.Field>
        //                         <label>Ruta</label>
        //                         <input type="text" placeholder='Ruta'  defaultValue={this.props.route.ruta} readOnly={true}/>
        //                     </Form.Field>
        //                     <Form.Field>
        //                         <label>Nombre</label>
        //                         <input type="text" placeholder='Nombre' defaultValue={this.props.route.nombre} readOnly={true}/>
        //                     </Form.Field>
        //                     <Form.Field>
        //                         <label>Borrado</label>
        //                         <input type="text" ref={e => this.status = e} placeholder='Borrado' defaultValue={this.props.route.borrado} min={0} max={14} />
        //                     </Form.Field>
        //                 </Form>
        //              </Ref>
       // console.log(this.props.datatableProps)
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
                this.props.loading == true && <Dimmer active inverted> <Loader inverted>Cargando...</Loader></Dimmer> 
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
   const data = [{rotCode:"",rotName:"",c_deleted:""}];
  //console.log(state.DeletedRoute.loading)
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
               ,columns: [{columnName:"Ruta",label:"Ruta"},{columnName:"Nombre",label:"Nombre"},{columnName:"Borrado",label:"Borrado",style:{width:'50px'}}]
               ,options:false
               ,checkbox:false
               ,optionsTwo:false
               ,data: state.DeletedRoute.data.length > 0 ? state.DeletedRoute.data: data
               ,buttonsOptions: '<button class="mini ui teal icon button edit-state"><i class="edit icon"></i></button>'
              // ,renderBtnCheckbox:this.renderDatatableCheckbox
              // ,handleCheckboxes:this.handleCheckAll
               ,loader:null
        }
       // ,openModal:state.DeletedRoute.openModal != undefined ? state.DeletedRoute.openModal : false
       // ,route:state.DeletedRoute.route
       ,loading: state.DeletedRoute.loading
    }
}

function mapDispacthToProps(dispatch){
    return{
        actions:bindActionCreators(actions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispacthToProps)(DeletedRoutes);