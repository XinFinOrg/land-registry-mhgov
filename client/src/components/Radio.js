import React, { Component } from 'react'
import styled from 'styled-components'

const Label = styled.label`
  position: relative;
  display: inline-flex;
  padding: 0 8px 0 0;
  flex-direction: row;
  align-items: center;
  & span {
    font-size: 15px;
    line-height: 1.2;
    letter-spacing: normal;
    color: #333333;
    padding-left: 10px;
    padding-right: 6px;
  }
`

const Input = styled.input`
  display: none;
  &:checked + div {
    border-color: ${props => props.activeColor && props.activeColor};
  }
  &:checked + div:before {
    background: ${props => props.activeColor && props.activeColor};
  }
`

const Circle = styled.div`
  width: ${props => props.iconSize && props.iconSize};
  height: ${props => props.iconSize && props.iconSize};
  border-radius: 50%;
  position: relative;
  border: 1.5px solid #333333;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  &:before {
    width: 8px;
    height: 8px;
    transition: 0.2s;
    content: '';
    position: absolute;
    margin: auto;
    background: transparent;
    border-radius: 50%;
  }
`

class Radio extends Component {
  render() {
    const { label, iconSize = '16px', activeColor = '#1f89f5', labelStyle, ...props } = this.props

    return (
      <Label>
        <Input {...props} type="radio" activeColor={activeColor} />
        <Circle iconSize={iconSize} />
        {label && <span style={labelStyle}>{label}</span>}
      </Label>
    )
  }
}
export { Radio }
