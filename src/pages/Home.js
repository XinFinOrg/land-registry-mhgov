import React, { Component } from 'react'
import styled from 'styled-components'
import { Header, Button, Paper, Footer, Input, PaperTitle, PaperSubTitle } from '../components'
import house from '../static/images/house.jpeg'

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
const Form = styled.form`
  & input:first-child {
    border-radius: 0px 0px 6px 6px;
    border-bottom: none;
  }
  & input:last-child {
    border-radius: 6px 6px 0 0;
  }
`
class Home extends Component {
  render() {
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
              <PaperTitle>Login</PaperTitle>
              <PaperSubTitle>
                Lorem ipsum dolor sit amet, consectetur nteger non placerat nisi. Nullam faucibus cursus.
              </PaperSubTitle>
              <Form>
                <Input width={'100%'} height={64} type="email" placeholder="Email Id" autoFocus required />
                <Input width={'100%'} height={64} type="password" placeholder="Password" required />
                <ForgotPassword>Forgot Password ?</ForgotPassword>
                <Button
                  fontSize={20}
                  width={'100%'}
                  onClick={() => this.props.history.push('/dashboard')}
                  height={'50px'}
                  title="Next"
                />
              </Form>
              <h6>
                New to Home Registry ? <span>Register Now</span>
              </h6>
            </Paper>
          </Wrapper>
        </BackgroundWrapper>
        {/*   <Button size="action" height="action" title="Action" />
        <Paper shadow={'0px 2px 6.5px 0.5px rgba(0, 0, 0, 0.06)'}>Hey</Paper>
        <Input placeholder="Password" height={64} type="password" /> */}
        <Footer color={'#fff'} opacity={0.6} position={'fixed'} background={'rgba(31, 137, 245, 0)'} />
      </Background>
    )
  }
}

export { Home }
