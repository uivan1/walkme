import React, { Component } from 'react';
import Modal from 'react-foundation-modal';
import { ButtonGroup,Link,Button,Colors } from 'react-foundation';
const overlayStyle = {
    'backgroundColor': 'rgba(33,10,10,.45)'
    };
export default class ModalConfirmación extends Component{
    constructor(props){
        super(props);
        this.state={
            functionTrue:this.props.functionTrue,
            btnTrue:this.props.btnTrue,
            functionFalse:this.props.functionFalse,
            btnFalse:this.props.btnFalse,
            title:this.props.title,
            message:this.props.message,
            modalIsOpen:this.props.modalIsOpen,
        }
    }
    componentWillReceiveProps(newProps){
        console.log(newProps.data);
        this.setState({
            modalIsOpen: newProps.modalIsOpen,
            functionTrue: newProps.functionTrue,
            btnTrue: newProps.btnTrue,
            functionFalse: newProps.functionFalse,
            btnFalse: newProps.btnFalse,
            title: newProps.title,
            message: newProps.message,
        });
    }
    render(){
        const{modalIsOpen,functionFalse,functionTrue,title,message,btnTrue,btnFalse}=this.state;
        return <Modal
        open={modalIsOpen}
        closeModal={this.props.close}
        isModal={true}
        size="large"
        overlayStyle={overlayStyle}>
        <h1>{title}</h1>
            <p className="lead">{message}</p>
            <div style={{width:100}}>
            <div className="button-group-sizes-example">
              <ButtonGroup>
                <Link color={Colors.SUCCESS} onClick={this.props.functionTrue}>{btnTrue}</Link>
                <Link color={Colors.WARNING} onClick={this.props.functionFalse}>{btnFalse}</Link>
              </ButtonGroup>
               </div>
            </div>
        </Modal>  
    }
}