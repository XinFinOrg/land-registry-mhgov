import React, { Component } from 'react'
import styled from 'styled-components'
import Link from 'react-router-dom/Link'
import withRouter from 'react-router/withRouter'
import { Icon } from '../components'
const HeaderOuter = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  background-color: #1f89f5;
  z-index: 999;
`
const HeaderWrapper = styled.div`
  box-shadow: 0px 1px 13.8px 2.2px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px 0 44px;
`
const MenuItems = styled(Link)`
  font-size: 16px;
  color: #ffffff;
  transition: 0.4s linear;
  padding: 24px 30px;
`
const LogoLink = styled(Link)`
  font-size: 38px;
  color: #ffffff;
  cursor: pointer;
`
const MenuItemsWrapper = styled.div`
  display: flex;
  align-items: center;
`
const DashboardWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 24px 0;
`
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-right: 30px;
  & > p {
    color: #ffffff;
    padding-left: 10px;
  }
`
const UserImage = styled.div`
  border: 1px solid #fff;
  width: 31px;
  height: 31px;
  border-radius: 50%;
`
class Header extends Component {
  render() {
    const {
      location: { pathname }
    } = this.props
    return (
      <HeaderOuter>
        <HeaderWrapper>
          <LogoLink to="/">Home Registry</LogoLink>
          {pathname === '/' || pathname === '/signup' ? (
            <MenuItemsWrapper>
              <MenuItems to="/">Home</MenuItems>
              <MenuItems to="/support">Support</MenuItems>
              <MenuItems to="/signup">SignUp</MenuItems>
            </MenuItemsWrapper>
          ) : (
            <DashboardWrapper>
              <IconWrapper>
                <Icon icon="facebook" width={31} height={31} />
                <p>Notification</p>
              </IconWrapper>
              <IconWrapper>
                <UserImage />
                <p>Michael</p>
              </IconWrapper>
            </DashboardWrapper>
          )}
        </HeaderWrapper>
      </HeaderOuter>
    )
  }
}

export default withRouter(Header)
