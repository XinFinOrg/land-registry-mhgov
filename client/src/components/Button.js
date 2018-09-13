import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'

const ButtonWrapper = styled.button`
  width: ${props => {
    switch (props.size) {
      case 'action':
        return '100px'
      case 'medium':
        return '138px'
      case 'large':
        return '296px'
      default:
        return props.width
    }
  }};
  height: ${props => {
    switch (props.size) {
      case 'action':
        return '28px'
      case 'medium':
        return '47px'
      case 'large':
        return '47px'
      default:
        return props.height
    }
  }};
  border-radius: ${props => (props.radius ? props.radius : '6px')};
  background-color: ${props => (props.background ? props.background : '#1f89f5')};
  box-shadow: ${props => (props.shadow ? props.shadow : '0px 3px 9.9px 1.1px rgba(18, 101, 131, 0.13)')};
  border: ${props => (props.border ? props.border : 'none')};
  font-size: ${props => (props.fontSize ? props.fontSize : 18)}px;
  cursor: pointer;
  transition: 0.2s;
  &:focus {
    outline: none;
  }
  font-family: 'Open Sans', sans-serif;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${props => (props.color ? props.color : '#ffffff')};
  ${props =>
    props.disabled &&
    `
  
  background-color: #9ca29b;
  box-shadow: 0px 3px 9.9px 1.1px rgba(18, 101, 131, 0.13);
  cursor: not-allowed;
  `};
`
const spin = keyframes`
0% { transform: rotate(0deg) }
100% {transform: rotate(360deg) }
`
const Circle = styled.div`
  border: 3px solid ${props => (props.loadingBgColor ? props.loadingBgColor : '#b0d5ff')};
  border-radius: 50%;
  border-top: 3px solid ${props => (props.loadingFgColor ? props.loadingFgColor : '#ffffff')};
  margin: auto;
  width: 20px;
  height: 20px;
  animation: ${spin} 2s linear infinite;
`
class Button extends Component {
  render() {
    const { title, disbaled, isLoading, loadingBgColor, loadingFgColor, ...props } = this.props
    return (
      <ButtonWrapper disabled={disbaled} {...props} isLoading={isLoading}>
        {isLoading ? <Circle loadingBgColor={loadingBgColor} loadingFgColor={loadingFgColor} /> : title}
      </ButtonWrapper>
    )
  }
}
export { Button }
