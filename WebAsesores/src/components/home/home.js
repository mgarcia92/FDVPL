import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import Header from '../header/header'
import MainContent from '../mainContent/mainContent'
import {Redirect} from 'react-router-dom'

import {connect} from 'react-redux'

import * as actions from '../../actions/actionsLogin'

import { bindActionCreators } from 'redux'

class Home extends Component{
    
    getRefsfromHeader = (refs) => {
        this.refMenu = refs.Menu;
        this.refSidebar = refs.Sidebar
    }
   
    getRefsfromMainContent = (refs) =>{
        this.refMain = refs.Main;
    }

    Logout =  (e) =>{
       // console.log(e)
    clearInterval(window.idIntervalID)
      this.props.actions.Logout();
    }

    componentDidMount(){
        if(window.location.pathname == "/Home"){
            window.idIntervalID  = setInterval(()=>{
                document.getElementById('reloj').textContent = this.getHours();
            },1000)
         }
    }
    
    getHours(){
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let horario = ""
        
        if (hours >= 0 && hours < 10){
            hours="0"+hours;
          }

        if (minutes <= 9){
            minutes="0"+minutes;
        }

        if (seconds <= 9){
            seconds="0"+seconds;
        }

        if (hours >= 0 && hours <= 12){
              horario="AM";
        }else{
              horario = "PM"
        }

        return `${hours}:${minutes}:${seconds} ${horario}`;
    }


    componentDidUpdate(){
        console.log(window.location.pathname)
        if(window.location.pathname == "/Home"){
            console.log("se creo")
            clearInterval( window.idIntervalID)
            window.idIntervalID = setInterval(()=>{
                document.getElementById('reloj').textContent  = this.getHours();
            
            },1000)
         }else{
             console.log("se limpio")
             clearInterval( window.idIntervalID)
         }


    }
    
    render(){
        let session = JSON.parse(sessionStorage.getItem("session"))
        //console.log(session)
        return(                   
                session != null ?
                    <div>
                        <div className="contenedor-header">               
                            <Header getRefsfromHeader={this.getRefsfromHeader} Logout={this.Logout}/>  
                        </div>  
                        <div className="contenedor-MainSection">
                            <MainContent getRefsfromMainContent={this.getRefsfromMainContent} content={this.props.content} />
                        </div> 
                    </div>   
                        : <Redirect to="/"/>
                  
        )
    }
}

function mapStateToProps(state,props){
    return{
       LoginUser:state.logon
    }
}

function mapDispatchToProps(dispatch){
    return{
        actions:bindActionCreators(actions,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);