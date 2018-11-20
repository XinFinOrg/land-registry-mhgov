import React, { Component } from 'react'
import styled from 'styled-components'
import Link from 'react-router-dom/Link'
import withRouter from 'react-router/withRouter'
import { IconMenu, Modal, Button, ButtonGroup, PaperTitle, FlexWrapper } from '../components'
import axios from 'axios'
import { API_URL } from '../constants'
import Cookies from 'js-cookie'
import { Formik, Form, Field } from 'formik'
import { TextInput } from './TextInput'
import { toast } from 'react-toastify'

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
  state = {
    balance: null,
    showModal: false,
    isLoading: false
  }
  componentDidMount = async () => {
    try {
      const { data } = await axios.post(`${API_URL}/getBalance`, {
        address: Cookies.get('address')
      })
      this.setState({ balance: data.balance })
      // this.setState({balan})
    } catch (error) {
      console.log('ERROR', error)
    }
  }
  render() {
    const {
      location: { pathname }
    } = this.props
    const { balance, showModal, isLoading } = this.state
    console.log('DATA', balance)
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
                <p>Balance: ${balance || 0}</p>
              </IconWrapper>
              <IconWrapper>
                <IconMenu icon={'user'} iconColor="#fff" iconActiveColor="#fff" component={<UserImage />}>
                  <p onClick={() => this.setState({ showModal: true })}>Buy Token</p>
                  <p onClick={() => this.logout()}>Logout</p>
                </IconMenu>

                <p>
                  {Cookies.get('firstName')} {Cookies.get('lastName')}
                </p>
              </IconWrapper>
            </DashboardWrapper>
          )}
        </HeaderWrapper>
        <Modal maxWidth={'1024px'} show={showModal}>
          <FlexWrapper justifyContent="center">
            <PaperTitle>Buy Token</PaperTitle>
          </FlexWrapper>
          <Formik
            enableReinitialize={true}
            initialValues={{ amount: '' }}
            onSubmit={async values => {
              this.setState({ isLoading: true })
              try {
                const { data } = await axios.post(`${API_URL}/buyTokens`, {
                  address: Cookies.get('address'),
                  amount: values.amount
                })
                console.log('DATA', data)
                this.setState({ isLoading: false, showModal: false })
                toast.success(`${'Token successfully bought'}`, {
                  position: toast.POSITION.TOP_CENTER
                })
              } catch (error) {
                console.log('ERROR', error)
                this.setState({ isLoading: false })
                toast.error(`${'Error!!!'}`, {
                  position: toast.POSITION.TOP_CENTER
                })
              }
            }}
            render={formikBag => (
              <Form>
                <Field
                  name="amount"
                  render={({ field }) => (
                    <TextInput {...field} label="Token Amount" placeholder={'Token Amount'} required />
                  )}
                />
                <ButtonGroup justifyContent="center">
                  <Button
                    size={'medium'}
                    width={'150px'}
                    title="Close"
                    type="button"
                    onClick={() => this.setState({ showModal: false })}
                  />
                  <Button
                    size={'medium'}
                    width={'150px'}
                    isLoading={isLoading}
                    disabled={isLoading}
                    title="Buy"
                    type="submit"
                  />
                </ButtonGroup>
              </Form>
            )}
          />
        </Modal>
      </HeaderOuter>
    )
  }
}

export default withRouter(Header)
