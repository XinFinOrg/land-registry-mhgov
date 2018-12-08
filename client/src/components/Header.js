import React, { Component } from 'react'
import styled from 'styled-components'
import Link from 'react-router-dom/Link'
import withRouter from 'react-router/withRouter'
import { IconMenu, Modal, Button, ButtonGroup, PaperTitle, Close, CloseWrap, Icon, FlexWrapper } from '../components'
import axios from 'axios'
import { API_URL, CURRENCY } from '../constants'
import Cookies from 'js-cookie'
import { Formik, Form, Field } from 'formik'
import { TextInput } from './TextInput'
import { toast } from 'react-toastify'
import { amountValidation } from '../utils/validator'
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
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  h1 {
    margin-top: 5px;
  }
`
const StyledImage = styled.img``

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
    const [firstLetter] = [...(Cookies.get('firstName') || '')]
    return (
      <HeaderOuter>
        <HeaderWrapper>
          <FlexWrapper flexDirection="row-reverse" alignItems="center">
            <LogoLink to="/">Land Registry</LogoLink>
            <StyledImage src={require('../static/images/logo.png')} />
          </FlexWrapper>
          {pathname === '/' || pathname === '/signup' ? (
            <MenuItemsWrapper>
              <MenuItems to="/">Home</MenuItems>
              <MenuItems to="/">Support</MenuItems>
              <MenuItems to="/signup">SignUp</MenuItems>
            </MenuItemsWrapper>
          ) : (
            <DashboardWrapper>
              <IconWrapper>
                <p>
                  Balance: {CURRENCY}
                  {balance || 0}
                </p>
              </IconWrapper>
              <IconWrapper>
                <IconMenu
                  icon={'user'}
                  iconColor="#fff"
                  iconActiveColor="#fff"
                  component={
                    <UserImage>
                      <h1>{Cookies.get('gender') === 'Male' && <Icon icon="male" />}</h1>
                      <h1>{Cookies.get('gender') === 'Female' && <Icon icon="female" />}</h1>
                      <h1>{Cookies.get('role') === 'bank' && <Icon icon="bank" color="#fff" />}</h1>
                      <h1>{Cookies.get('role') === 'corporation' && <Icon icon="corporate" />}</h1>

                      {console.log(Cookies.get('role'))}
                    </UserImage>
                  }>
                  <p onClick={() => this.setState({ showModal: true })}>Deposit funds</p>
                </IconMenu>

                <p>{Cookies.get('name') || 'John Doe'}</p>
              </IconWrapper>
            </DashboardWrapper>
          )}
        </HeaderWrapper>
        <Modal maxWidth={'450px'} show={showModal}>
          <CloseWrap>
            <PaperTitle color="#fff">Deposit funds</PaperTitle>
            <Close onClick={() => this.setState({ showModal: !showModal })} />
          </CloseWrap>
          <Formik
            enableReinitialize={true}
            initialValues={{ amount: '' }}
            validate={amountValidation}
            validateOnChange
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
                    <TextInput {...field} label="Amount" placeholder={'Amount'} error={formikBag.errors.amount} />
                  )}
                />
                <ButtonGroup justifyContent="center">
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
