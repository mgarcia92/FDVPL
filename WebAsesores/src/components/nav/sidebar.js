import React from 'react'
import { Icon, Menu, Sidebar,Ref } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
const SidebarNav = (props) =>  {
    return (
      <div>
      <Ref innerRef={props.setRefSidebar}>  
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={props.handleSidebarHide}
            vertical
            visible={props.visible}
            width='thin'
            // ref={props.setRefSidebar}
          >
            <Menu.Item as='a'>
            <Link to="/stateRoute">
              <Icon name='sync' />
           Estado de Rutas</Link>
            </Menu.Item>
            <Menu.Item as='a'>
            <Link to='/DeletedRoutes'>
              <Icon name='globe' />
              Rutas Borradas</Link>
            </Menu.Item>
            <Menu.Item as='a'>
            <Link to='/GenerateRoute'>
              <Icon name='wifi' />
              Generacion de Datos</Link>
            </Menu.Item>
          </Sidebar> 
          </Ref>
      </div>
    )
}

export default SidebarNav;