import React, { Component } from 'react'
import { Icon } from './'
import styled from 'styled-components'
import onClickOutside from 'react-onclickoutside'
const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  cursor: pointer;
  ${props =>
    props.controlByHover &&
    `
 &:hover{
  & > div:last-child{
    display: block;
  }
}
 `};
`
const DropdownMenu = styled.div`
  display: ${props => (props.controlByHover ? 'none' : 'block')};
  top: 30px;
  right: -13px;
  background-color: #ffffff;
  max-height: 160px;
  width: 170px;
  max-width: 170px;
  border-radius: 2px;
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12),
    0 8px 10px -5px rgba(0, 0, 0, 0.4);
  background-color: #ffffff;
  border: solid 1px #e9eff4;
  position: absolute;
  /* &::before {
    content: '';
    position: absolute;
    background: #fffffffa;
    width: 10px;
    height: 10px;
    border-left: 1px solid #e9eff4;
    border-top: 1px solid #e9eff4;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    right: 17px;
    top: -6px;
  } */
`
const DropdownItems = styled.div`
  max-height: 160px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 4px; /* remove scrollbar space */
    background: #ffffff;
    cursor: pointer;
  }
  /* optional: show position indicator in red */
  ::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #9b9b9b;
  }

  & > * {
    background-color: #ffffff;
    border-bottom: solid 1px #e9eff4;
    padding: 10px 15px;
    font-size: 14px;
    line-height: 1.29;
    margin: 0px;
    display: block;
    color: #4a4a4a;
    cursor: pointer;
  }
`
const Icons = styled.div`
  cursor: pointer;
  &:hover {
    & path {
      fill: ${props => props.iconHoverColor && props.iconHoverColor};
    }
  }
`
class IconMenu extends Component {
  state = {
    show: false
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  handleScroll = event => {
    if (this.state.show) this.setState({ show: false })
  }
  handleClickOutside = evt => {
    this.setState({
      show: false
    })
  }
  render() {
    const { show } = this.state
    const {
      children,
      controlByHover,
      icon,
      iconColor = '#D0D7DD',
      iconActiveColor = '#4da1ff',
      iconHoverColor = '#fff',
      scroll,
      component,
      ...props
    } = this.props
    return (
      <Wrapper controlByHover={controlByHover} component={component} {...props}>
        {component ? (
          <div
            onClick={() =>
              this.setState({
                show: !show
              })
            }>
            {component}
          </div>
        ) : (
          <Icons
            iconHoverColor={show ? iconActiveColor : iconHoverColor}
            onClick={() =>
              this.setState({
                show: !show
              })
            }>
            <Icon icon={icon} color={show ? iconActiveColor : iconColor} />
          </Icons>
        )}

        {show || controlByHover ? (
          <DropdownMenu controlByHover={controlByHover}>
            <DropdownItems>{children}</DropdownItems>
          </DropdownMenu>
        ) : null}
      </Wrapper>
    )
  }
}
export default onClickOutside(IconMenu)
