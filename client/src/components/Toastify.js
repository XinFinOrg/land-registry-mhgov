import React, { Component } from 'react'
import styled from 'styled-components'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ToastifyWrapper = styled.div`
  & > div > div:first-child {
    min-width: 350px;
    font-size: 15px;
  }
  & button {
    box-shadow: none !important;
    width: 24px !important;
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
