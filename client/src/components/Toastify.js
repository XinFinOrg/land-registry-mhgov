import React, { Component } from 'react'
import styled from 'styled-components'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ToastifyWrapper = styled.div`
  font-family: 'Open Sans', sans-serif !important;
  & > div > div:first-child {
    min-width: 350px;
    font-size: 15px;
  }
  & button {
    box-shadow: none !important;
    width: 24px !important;
  }
  .Toastify__toast--success {
    color: #3089f5;
    background: #fff;
    border: 0.5px solid #3089f5;
  }
  .Toastify__close-button {
    color: #3089f5;
  }
  .Toastify__progress-bar {
    background-color: #8db063;
  }
  .Toastify__toast-body {
    font-size: 16px;
  }
`
class Toastify extends Component {
  render() {
    return (
      <ToastifyWrapper>
        <ToastContainer autoClose={5000} />
      </ToastifyWrapper>
    )
  }
}

export default Toastify
