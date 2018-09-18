import React, { Component } from 'react'
import styled from 'styled-components'
import { Icon } from './Icon'
const Container = styled.div`
  position: relative;
  width: ${props => (props.width ? props.width : '293px')};
`
const InputWrapper = styled.input`
  width: ${props => (props.width ? props.width : '293px')};
  height: ${props => (props.height ? props.height : '40px')};
  border-radius: ${props => (props.radius ? props.radius : 6)}px;
  border: ${props => (props.border ? props.border : 'solid 1px rgba(221, 221, 221, 0.6)')};
  box-shadow: ${props => (props.shadow ? props.shadow : '0px 1px 5.7px 0.3px rgba(124, 124, 124, 0.13)')};
  background: ${props => (props.background ? props.background : 'transparent')};
  line-height: 1.2;
  letter-spacing: 0.1px;
  color: #000;
  outline: none;
  padding: ${props => (props.padding ? props.padding : '26px 16px')};
  font-family: 'Open Sans', sans-serif;
  font-size: 15px;
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : 0)}px;
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #000000;
    opacity: 0.5;
    /* Firefox */
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #000000;
    opacity: 0.5;
  }
  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #000000;
    opacity: 0.5;
  }
`
const Show = styled.div`
  font-size: 15.5px;
  font-weight: 300;
  color: #5fae58;
  position: absolute;
  right: 16px;
  top: 22px;
  cursor: pointer;
`
const Image = styled.div`
  // z-index: 0;
  position: absolute;
  left: 10px;
  top: 10px;
`
class Input extends Component {
  state = {
    password: false
  }
  render() {
    const { icon, width, height, changeColor, type,fill, ...props } = this.props
    const { password } = this.state
    return (
      <Container width={width}>
        <InputWrapper width={width} height={height} type={password ? 'text' : type} {...props} />
        {type === 'password' && (
          <Show onClick={() => this.setState({ password: !password })} height={height}>
            {password ? 'Hide' : 'Show'}
          </Show>
        )}
        {icon && (
          <Image>
            <Icon icon={icon} fill={fill} />
          </Image>
        )}
      </Container>
    )
  }
}

export { Input }
