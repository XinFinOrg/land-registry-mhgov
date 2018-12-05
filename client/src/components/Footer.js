import React from 'react'
import styled from 'styled-components'

const FooterWrapper = styled.footer`
  background: ${props => (props.background ? props.background : '#ffffff')};
  box-shadow: ${props => (props.shadow ? props.shadow : '0px 2px 6.5px 0.5px rgba(0, 0, 0, 0.06)')};
  position: ${props => (props.position ? 'fixed' : 'static')};
  ${props =>
    !props.position &&
    `
    margin-top: 50px;
  `} width: 100%;
  bottom: 0;
  & > p {
    font-size: 15.5px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: ${props => (props.color ? props.color : '#000')};
    opacity: ${props => (props.opacity ? props.opacity : 0.6)};
    padding: 20px 0;
  }
`
const Footer = props => (
  <FooterWrapper {...props}>
    <p>Copyright ©XinFin 2018. All rights reserved.</p>
  </FooterWrapper>
)

export { Footer }
