import React,{Component} from 'react'
import { Button, Form, Grid, Header, Message, Segment,Dimmer,Loader } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom'
class LoginForm extends Component{ 
  
  componentWillReceiveProps(next_props){
    if(!next_props.validate){

    }
  }
  
  render(){
    return(
      <Router>
        {
          this.props.Validate == true ? <Redirect to="/Home" /> :
          <div className='login-form'>
      {/*
        Heads up! The styles below are necessary for the correct render of this example.
        You can do same with CSS, the main idea is that all the elements up to the `Grid`
        below must have a height of 100%.
      */}
      <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
        }
      `}</style>
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
           {  
            // <Image src='/logo.png' />
           }
             Gestion FDV Plumrose
          </Header>
          <Form size='large' onSubmit={this.props.handleLoginSubmit}>
            <Segment stacked>
              <Form.Input fluid icon='user'required={true} iconPosition='left' name="username" placeholder='UserName' />
              <Form.Input
                fluid
                icon='lock'
                required={true}
                iconPosition='left'
                placeholder='Password'
                type='password'
                name="password"
              />
              <Button color='teal' fluid size='large' type="submit">
                Iniciar Sesion
              </Button>
            </Segment>
          </Form>
         { 
              this.props.loader == true ?  <Dimmer active inverted> <Loader inverted>Autenticando Con Active Directory Espere...</Loader></Dimmer>
                                            : this.props.Message != '' ?  <Message>{ this.props.Message } </Message>: ''
         }       
        </Grid.Column>
      </Grid>
    </div>
        }
      </Router>
    )
  }
}

export default LoginForm