import React,{Component} from 'react'
import { Container,Segment } from 'semantic-ui-react'

const styles = {
    height:'auto'
    ,clear:'both'
   ,marginTop: '4em' 
}


class MainContent extends Component{
    componentDidMount(){
        this.props.getRefsfromMainContent({Main: this.container})
    }
    render(){
        return(
            <div ref={element => this.container = element} style={styles}>
                <Container>  
                <Segment>      
                    {this.props.content}
                    </Segment>
                </Container>
            </div>
          )
    }
} 

export default MainContent;