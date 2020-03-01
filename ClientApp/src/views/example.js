import React, { Component } from 'react';
import Modal from 'react-foundation-modal';

const overlayStyle = {
    'backgroundColor': 'rgba(33,10,10,.45)'
    };

export default class example extends Component{

    constructor(){
        super();
        this.state = {
            modalIsOpen: false
        }
    }
    showPopup = (status) => {
        this.setState({
            modalIsOpen: status
        });
    }
    render(){
        return (
            <div>
              <p><button className="button" onClick={() => this.showPopup(true)}>Click me for a modal</button></p>
                  <Modal 
                      open={this.state.modalIsOpen}
                      closeModal={this.showPopup}
                      isModal={true}
                      size="large"
                      overlayStyle={overlayStyle} >
                      <h1>Awesome. I Have It.</h1>
                      <p className="lead">Your couch. It is mine.</p>
                      <p>I'm a cool paragraph that lives inside of an even cooler modal. Wins!</p>
                      <button className="button" type="button" onClick={() => this.showPopup(false)} >
                          Close
                      </button>
                  </Modal>  
            </div>
          );
    }
}