import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'

const Overlay = styled.div`
  position: fixed;
  display: block;
  min-width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(211, 211, 211, 0.7);
  z-index: 99999;
  cursor: pointer;
  max-width: 768px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const zoomIn = keyframes`
  from {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3);
  }

  50% {
    opacity: 1;
  }
`
const ModalWrapper = styled.div`
  animation: ${zoomIn} 0.2s linear;
  width: 100%;
  padding: 24px;
  padding: 20px;
  max-width: ${props => (props.maxWidth ? props.maxWidth : '650px')};
  border-radius: 2px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px 2px rgba(204, 204, 204, 0.5);
  display: ${props => (props.show ? 'block' : 'none')};
  margin: 0 auto;
`
class Modal extends Component {
  state = {}
  render() {
    const { show, ...props } = this.props
    return (
      <React.Fragment>
        {show && (
          <Overlay>
            <ModalWrapper show={show} {...props}>
              {this.props.children}
            </ModalWrapper>
          </Overlay>
        )}
      </React.Fragment>
    )
  }
}

export default Modal
