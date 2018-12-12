import React, { Component } from 'react'
import styled from 'styled-components'

const LoaderWrapper = styled.div`
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background: #ffffffeb;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`

class Loader extends Component {
  render() {
    const { title, disbaled, isLoading, loadingBgColor, loadingFgColor, ...props } = this.props
    return (
      <LoaderWrapper>
        <img src={require('../static/images/loader.gif')} alt="" />
      </LoaderWrapper>
    )
  }
}
export { Loader }
