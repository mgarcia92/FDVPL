import React ,{Component}from 'react'
import LoginForm from '../login/login'
//import Sidebar from '../nav/sidebar'
//import { Container } from 'semantic-ui-react';
//import Footer from '../footer/footer';
import {connect} from 'react-redux'

import * as actions from '../../actions/actionsLogin'

import { bindActionCreators } from 'redux'

import Home from '../home/home'
import StateRoute from '../stateRoute/index'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter,
    Switch
} from 'react-router-dom'

import DeletedRoutes from '../deletedRoute/index';
import GenerateRoute from  '../generateRoute/index';

class App extends Component{
    constructor(){
        super()
    }

    componentDidMount(){
       this.resizeWindow();
 
     
    }

   
    resizeWindow(){
        window.addEventListener("resize",()=>{
          //  let height = this.refMenu.clientHeight 
          //  this.refSidebar.style.setProperty("margin-top",`${height}px`,"important");
            //descomentar esto de arriba
          
          // this.refMain.style.setProperty("height",window.innerHeight - 164+"px","important");
            // this.refMain.style.height = 200
        })
    }
   
    handleLoginSubmit = (e) => {
        let username = e.target.username.value
        let password = e.target.password.value 
       this.props.actions.LoginUserAsync(username,password)       
    }

    mainMessage(){
        let message = "";
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();

        if (hours >= 8 && minutes >= 1 && hours < 12) {
            message = "Buenos días";
        }
        if (hours >= 12 && minutes >= 1 && hours < 19) {
            message = "Buenas tardes";
        }
        if (hours >= 19 && minutes >= 1) {
            message = "Buenas noches";
        }
        if (hours >= 1 && hours <= 5) {
            message = "Buenas madrugadas";
        }
        return message;
    }

    render(){
        const propsLogin = {
            handleLoginSubmit:this.handleLoginSubmit, 
            Message:this.props.LoginUser.message,
            Validate:this.props.LoginUser.validate,
            loader:this.props.LoginUser.loader
        }
        
        let session = JSON.parse(sessionStorage.getItem("session")) != null ? JSON.parse(sessionStorage.getItem("session")) : {};
        return(      
            <Router>
            <div>
            {
                session.validate == true ? <Redirect to="/Home"/> : <Redirect to="/"/>
            }
                <Switch>
                    <Route  path="/" exact  render={() => <LoginForm {...propsLogin}/>}/>
                    <Route  path="/Home"  render={() => <Home content={<h2>{this.mainMessage()} {session.username} : <span id="reloj"></span></h2>} userValidate={session.validate} />}/>
                    <Route  path="/stateRoute"  render={() => <Home content={<StateRoute/>} userValidate={session.validate} />}/>
                    <Route  path="/DeletedRoutes"  render={() => <Home content={<DeletedRoutes/>} userValidate={session.validate} />}/>
                    <Route  path="/generateRoute"  render={() => <Home content={<GenerateRoute/>} userValidate={session.validate} />}/>
                </Switch>
            </div>
            </Router>   
        )
    }
}

function mapStateToProps(state, props){
   //console.log(state)
   return{
       LoginUser:state.logon
   }
}

function mapDispatchToProps(dispatch){
    return{
        actions:bindActionCreators(actions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);