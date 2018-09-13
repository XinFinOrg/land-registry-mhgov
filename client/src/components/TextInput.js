import React, { Component } from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
const TextInputWrapper = styled.div`
  background-color: rgba(235, 235, 235, 0.2);
  /*   min-width: 360px;
  max-width: 360px; */
  // margin-right: 22px;
  margin-bottom: 30px;
  & > div {
    margin: 8px 16px;
    width: 90%;
    & > div:after {
      border-bottom: 0 !important;
    }
    & > div:before {
      border-bottom: none !important;
    }
  }
  & label {
    font-family: 'Open Sans', sans-serif !important;
    font-size: 16px !important;
    color: rgba(51, 51, 51, 0.6);
  }
  .MuiFormLabel-root-10.MuiFormLabel-filled-14 {
    color: #1f89f5 !important;
  }
  .MuiFormLabel-root-10.MuiFormLabel-focused-11 {
    color: #1f89f5 !important;
  }
  & input {
    font-family: 'Open Sans', sans-serif !important;
    font-size: 16px !important;
    color: #333333 !important;
  }
`
class TextInput extends Component {
  render() {
    const { label, placeholder, ...props } = this.props
    return (
      <TextInputWrapper>
        <TextField label={label} placeholder={placeholder} {...props} />
      </TextInputWrapper>
    )
  }
}

export { TextInput }
