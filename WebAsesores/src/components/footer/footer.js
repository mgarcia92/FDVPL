import React,{Component} from 'react';
import { Container,Segment,Grid,Header,Ref } from 'semantic-ui-react'
import $ from 'jquery'
class Footer extends Component{
   
    componentDidMount(){
      this.positionFooterBottom()
    }

    positionFooterBottom(){
      let bodyHeight = document.body.clientHeight;
      let windowHeight = window.innerHeight;
      console.log($('body').height())
      if($('body').height() <= $(window).height()){
        let valor = $('.contenedor-MainSection').height()
        $('.contenedor-MainSection').css({"height":valor + 50})
        $(this.footer).css({"position":"absolute","bottom":"0px"})
      }
    }
  
    render(){
        return(
          <Ref innerRef={node  => this.footer = node}>
            <Segment className="footer" inverted vertical style={{ margin: '1em 0em 0em'}} >
            <Container textAlign='center'>
              <Grid columns={16} textAlign="center" inverted stackable>
                <Grid.Row columns={8}>
                  <Grid.Column width={5} textAlign="justified">
                    <Header inverted as='h5' content='Copyright © 2018 All rights reserved.' />
                  </Grid.Column>
                </Grid.Row>
                </Grid>
            </Container>
          </Segment>
          </Ref>
        )
    }
}

export default Footer;