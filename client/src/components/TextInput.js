import React, { Component } from 'react'
import styled, { isStyledComponent } from 'styled-components'
import TextField from '@material-ui/core/TextField'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
const TextInputWrapper = styled.div`
  position: relative;
  background-color: rgba(235, 235, 235, 0.2);
  margin-top: ${props => props.marginTop && props.marginTop};
  margin-bottom: 8px;
  border: 1px solid #eaeaea;
  box-shadow: 0px 0px 3px 0px #dedede;
  border-radius: 4px;
  margin-bottom: 25px;
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

const Error = styled.p`
  position: absolute;
  left: 0px;
  bottom: -20px;
  color: #f44336;
  font-size: 12px;
`

class TextInput extends Component {
  render() {
    const { label, placeholder, required, marginTop, error, ...props } = this.props
    return (
      <MuiThemeProvider theme={theme}>
        <TextInputWrapper marginTop={marginTop}>
          <TextField label={label} placeholder={placeholder} required={required} {...props} />
          {error && <Error>{error}</Error>}
        </TextInputWrapper>
      </MuiThemeProvider>
    )
  }
}

export { TextInput }
