import React, { Component } from 'react'
import styled from 'styled-components'

const PaperWrapper = styled.div`
  border-radius: ${props => (props.radius ? props.radius : 6)}px;
  background-color: #ffffff;
  box-shadow: ${props => (props.shadow ? props.shadow : 'none')};
  padding: ${props => (props.padding ? props.padding : '20px 31px')};
  margin: ${props => (props.margin ? props.margin : '0px')};
`
class Paper extends Component {
  render() {
    const { ...props } = this.props
    return <PaperWrapper {...props} />
  }
}
export { Paper }
