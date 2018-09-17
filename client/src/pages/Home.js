import React, { Component } from 'react'
import styled from 'styled-components'
import { Header, Button, Paper, Footer, Input, PaperTitle, PaperSubTitle, Radio, Checkbox } from '../components'
import house from '../static/images/house.jpeg'
import { Formik, Form, Field } from 'formik'

const Background = styled.div`
  content: '';
  background-image: url(${house});
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 9;
  min-height: 100vh;
`
const BackgroundWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 140px 70px;
  background: rgba(31, 137, 245, 0.7);
  min-height: 100vh;
  & > div:first-child {
    flex-basis: 50%;
    padding-top: 80px;
  }
  & > div:last-child {
    flex-basis: 40%;
  }
`
const BigText = styled.h1`
  font-size: 70px;
  font-weight: 300;
  letter-spacing: 0.4px;
  color: #ffffff;
`
const Wrapper = styled.div`
  & > p {
    font-size: 23px;
    color: #ffffff;
    padding-top: 50px;
  }
  & > div > h6 {
    font-size: 15.5px;
    color: #333333;
    padding-top: 33px;
    text-align: center;
    & > span {
      font-weight: bold;
      cursor: pointer;
    }
  }
`
const ForgotPassword = styled.p`
  font-size: 15.5px;
  color: #333333;
  padding: 17px 0 25px 0;
  cursor: pointer;
`
const FormWrapper = styled.div`
  & input:first-child {
    border-radius: 0px 0px 6px 6px;
    border-bottom: none;
  }
  & input:last-child {
    border-radius: 6px 6px 0 0;
  }
`
const SignupFormWrapper = styled.div`
  & > div > input {
    border-radius: 0;
  }
  & > div {
    &:first-child > input {
      border-radius: 6px 6px 0 0;
    }
    &:nth-child(4) > input {
      border-radius: 0 0 6px 6px;
    }
  }
`
const RadioGroup = styled.div``
const RadioWrap = styled.div`
  & > p {
    padding: 10px 0px;
  }
`
const CheckboxWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  & > span {
    font-size: 14px;
    padding-left: 4px;
  }
`
class Home extends Component {
  render() {
    const {
      location: { pathname }
    } = this.props
    return (
      <Background>
        <Header />
        <BackgroundWrapper>
          <Wrapper>
            <BigText>Welcome To Land Registry</BigText>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non placerat nisi. Nullam faucibus
              malesuada cursus.
            </p>
          </Wrapper>
          <Wrapper>
            <Paper padding={'30px 35px'}>
              <PaperTitle>{pathname === '/signup' ? 'Sign Up' : 'Login'}</PaperTitle>
              <PaperSubTitle>
                {pathname === '/signup'
                  ? 'We connect Global Buyers, Suppliers & Financiers'
                  : 'Lorem ipsum dolor sit amet, consectetur nteger non placerat nisi. Nullam faucibus cursus.'}
              </PaperSubTitle>
              {pathname === '/signup' ? (
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    registerAs: 'buyer'
                  }}
                  onSubmit={formData => console.log('FORM DATA', formData)}
                  render={formikBag => (
                    <Form>
                      <SignupFormWrapper>
                        <Field
                          name="firstName"
                          render={({ field }) => (
                            <Input
                              {...field}
                              width={'100%'}
                              height={'64px'}
                              type="text"
                              placeholder="First Name"
                              autoFocus
                              required
                            />
                          )}
                        />
                        <Field
                          name="lastName"
                          render={({ field }) => (
                            <Input
                              {...field}
                              width={'100%'}
                              height={'64px'}
                              type="text"
                              placeholder="Last Name"
                              required
                            />
                          )}
                        />
                        <Field
                          name="email"
                          render={({ field }) => (
                            <Input
                              {...field}
                              width={'100%'}
                              height={'64px'}
                              type="email"
                              placeholder="Email id"
                              required
                            />
                          )}
                        />
                        <Field
                          name="password"
                          render={({ field }) => (
                            <Input
                              {...field}
                              width={'100%'}
                              height={'64px'}
                              type="password"
                              placeholder="Password"
                              required
                            />
                          )}
                        />
                        <RadioWrap>
                          <PaperSubTitle>Register As</PaperSubTitle>
                          <RadioGroup>
                            <Radio
                              label="Buyer"
                              value="buyer"
                              name="registerAs"
                              defaultChecked
                              onChange={e => formikBag.setFieldValue('registerAs', e.target.value)}
                            />
                            <Radio
                              label="Supplier"
                              value="supplier"
                              name="registerAs"
                              onChange={e => formikBag.setFieldValue('registerAs', e.target.value)}
                            />
                            <Radio
                              label="Financer"
                              value="financer"
                              name="registerAs"
                              onChange={e => formikBag.setFieldValue('registerAs', e.target.value)}
                            />
                          </RadioGroup>
                        </RadioWrap>
                        <CheckboxWrap>
                          <Checkbox name="tnc" defaultChecked required />
                          <span>By continuing you agree to Terms & Conditions</span>
                        </CheckboxWrap>
                        <Button
                          fontSize={20}
                          width={'100%'}
                          // onClick={() => this.props.history.push('/dashboard')}
                          height={'50px'}
                          title="Next"
                          type="submit"
                        />
                      </SignupFormWrapper>
                    </Form>
                  )}
                />
              ) : (
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    email: '',
                    password: ''
                  }}
                  onSubmit={formData => console.log('FORM DATA', formData)}
                  render={formikBag => (
                    <Form>
                      <FormWrapper>
                        <Field
                          name="email"
                          render={({ field }) => (
                            <Input
                              {...field}
                              width={'100%'}
                              height={'64px'}
                              type="email"
                              placeholder="Email Id"
                              autoFocus
                              required
                            />
                          )}
                        />
                        <Field
                          name="password"
                          render={({ field }) => (
                            <Input
                              {...field}
                              width={'100%'}
                              height={'64px'}
                              type="password"
                              placeholder="Password"
                              required
                            />
                          )}
                        />
                        <ForgotPassword>Forgot Password ?</ForgotPassword>
                        <Button
                          fontSize={20}
                          width={'100%'}
                          onClick={() => this.props.history.push('/dashboard')}
                          height={'50px'}
                          title={pathname === '/' ? 'Next' : 'Sign Up'}
                          type={'submit'}
                        />
                      </FormWrapper>
                    </Form>
                  )}
                />
              )}
              {pathname === '/signup' ? (
                <h6>
                  Already signed up ? <span onClick={() => this.props.history.push('/')}>Login</span>
                </h6>
              ) : (
                <h6>
                  New to Home Registry ? <span onClick={() => this.props.history.push('/signup')}>Register Now</span>
                </h6>
              )}
            </Paper>
          </Wrapper>
        </BackgroundWrapper>
        {/*   <Button size="action" height="action" title="Action" />
        <Paper shadow={'0px 2px 6.5px 0.5px rgba(0, 0, 0, 0.06)'}>Hey</Paper>
        <Input placeholder="Password" height={"64px"} type="password" /> */}
        <Footer color={'#fff'} opacity={0.6} position={'fixed'} background={'rgba(31, 137, 245, 0)'} />
      </Background>
    )
  }
}

export { Home }
