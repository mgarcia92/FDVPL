import React from 'react'
import { Button, Modal } from 'semantic-ui-react'

const ModalComponent = (props) =>  {

 // show = dimmer => () => this.setState({ dimmer, open: true })
 // close = () => this.setState({ open: false }
    return (
      <div>
        <Modal trigger={props.button}  open={props.open} onClose={props.close}>
          <Modal.Header>{props.title}</Modal.Header>
          <Modal.Content content>
          {props.content}
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={props.handlClose}>
              Cerrar
            </Button>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content="Aceptar"
              onClick={props.handleAccept}
            />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }

export default ModalComponent