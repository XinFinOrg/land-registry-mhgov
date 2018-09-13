import React from 'react'
import styled from 'styled-components'
const Wrapper = styled.div`
  display: inline-block;
  max-width: ${props => (props.circle ? '15px' : '18px')};
  max-height: ${props => (props.circle ? '15px' : '18px')};
  box-sizing: border-box;
  & * {
    box-sizing: border-box;
  }
`
const StyledInput = styled.input`
  opacity: 0;
  position: absolute;
  z-index: 9;
  cursor: pointer;
  &:checked + label {
    background-color: #1f89f5;
    border-color: #1f89f5;
    &:before {
      border-color: #fff;
    }
  }
`
const Circle = styled.label`
  position: relative;
  width: ${props => (props.circle ? '15px' : '18px')};
  height: ${props => (props.circle ? '15px' : '18px')};
  min-width: ${props => (props.circle ? '15px' : '18px')};
  min-height: ${props => (props.circle ? '15px' : '18px')};
  border-radius: ${props => (props.circle ? '50%' : '2px')};
  display: block;
  border: ${props => (props.circle ? ' 1px solid #e0e0e0' : ' 2px solid #4a4a4a')};
  z-index: 0;
  transition: 0.2s;
  ${props =>
    !props.circle &&
    `
    &:before{
      content: '';
      width: 10px;
      height: 5px;
      position: absolute;
      border-left: 2px solid transparent;
      border-bottom: 2px solid transparent;
      transform: rotate(-45deg);
      top: 2px;
      left: 1px;
    }
  `};
`
const Checkbox = ({ circle, ...props }) => {
  return (
    <Wrapper circle={circle}>
      <StyledInput type="checkbox" {...props} />
      <Circle circle={circle} />
    </Wrapper>
  )
}

export { Checkbox }