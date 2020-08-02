import React, { Component } from 'react'
import {Icon, Image, Menu,Ref,Responsive } from 'semantic-ui-react'
import {Redirect} from 'react-router-dom'
import Sidebar from '../nav/sidebar'

 
const fixedMenuStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)'
  }

const logo = document.getElementById('Logo').value

class Header extends Component {
  constructor(){
    super()
    this.state = { 
        logo:logo,
        propsSidebar:{
         visible: false,
         handleButtonClick: this.handleButtonClick,
         handleSidebarHide: this.handleSidebarHide,
         setRefSidebar: this.setRefSidebar
        }
    }
}

    componentDidMount(){
       this.props.getRefsfromHeader({Menu:this.Menu,Sidebar:this.sideBar})
    }

    // resizeWindow(){
    //     window.addEventListener("resize",()=>{
    //         let height = this.Menu.clientHeight 
    //         this.sideBar.style.setProperty("margin-top",`${height}px`,"important");
    //     })
    // }

    handleButtonClick = () =>{
        let obj =  this.state.propsSidebar;
        obj.visible = !this.state.propsSidebar.visible;
        let height = this.Menu.clientHeight 
        this.sideBar.style.setProperty("margin-top",`${height}px`,"important")
        this.setState({ propsSidebar: obj })
    }

    handleSidebarHide = () => {
        let obj =  this.state.propsSidebar;
        obj.visible = false
        this.setState({ propsSidebar: obj })
    }

    setRefSidebar = (element) => {
        this.sideBar = element;
    }

  render() {
    //console.log(this.props)
    return (   
      <div>
            <Ref innerRef={node => this.Menu = node}>  
                <Menu
                    fixed="top"
                    style={fixedMenuStyle}
                    stackable
                >    
                    <Menu.Item onClick={this.handleButtonClick}>
                        <Icon name="sidebar"/>
                    </Menu.Item>
                    <Responsive minWidth={767}>      
                        <Menu.Item>
                            <Image src={this.props.logo == undefined  ? this.state.logo :this.props.logo } size='mini' circular />
                        </Menu.Item> 
                     </Responsive>
                    <Menu.Item position="right">
                        <a onClick={this.props.Logout} style={{color:'black',cursor:'pointer'}}>
                             <Icon name="sign in alternate" />
                        </a>
                    </Menu.Item>
                </Menu>
            </Ref>
        <Sidebar {...this.state.propsSidebar} />
      </div>
    )
  }
}

export default Header;