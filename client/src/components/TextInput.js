import React, { Component } from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'

const TextInputWrapper = styled.div`
  background-color: rgba(235, 235, 235, 0.2);
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
  & input {
    font-family: 'Open Sans', sans-serif !important;
    font-size: 16px !important;
    color: #333333 !important;
  }
`
const theme = createMuiTheme({
  palette: {
    primary: blue
  },
  typography: { useNextVariants: true }
})

class TextInput extends Component {
  render() {
    const { label, placeholder, required, ...props } = this.props
    return (
      <MuiThemeProvider theme={theme}>
        <TextInputWrapper>
          <TextField label={label} placeholder={placeholder} required={required} {...props} />
        </TextInputWrapper>
      </MuiThemeProvider>
    )
  }
}

export { TextInput }
