import React, { Component } from 'react'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import axios from 'axios'
import { API_URL } from '../constants'
import get from 'lodash/get'
import { Paper, PaymentText, Button, PaymentTuple, StatusPage } from '../components'
import withRouter from 'react-router/withRouter'
import { toast } from 'react-toastify'

const TransferButton = styled.div`
  padding-top: 15px;
  display: flex;
  justify-content: flex-end;
  button {
    margin: 0px 5px;
  }
`

const InformTitle = styled.p`
  font-size: 20px;
  color: #1f89f5;
  padding-top: ${props => (props.paddingTop ? props.paddingTop : 26)}px;
`

class Transfer extends Component {
  state = { financerAmtPaid: false, tokenAmountpaid: false, buyerAmtPaid: false }
  handlePay = async () => {
    const {
      data,
      match: { params }
    } = this.props
    if (get(data, 'buyerFinancer.email', '') === Cookies.get('email') && data.status === 'registry_token_amount') {
      try {
        this.setState({ isLoading: true })
        const { data } = await axios.post(`${API_URL}/financerPayment`, {
          registryId: params.tab3,
          propertyId: Cookies.get('propertyId')
        })
        await this.setState({ isLoading: false, financerAmtPaid: true })
        await Cookies.set('amount_paid', 'financerAmtPaid')
        await toast.success(`${'Financer amount paid!'}`, {
          position: toast.POSITION.TOP_CENTER
        })
        this.props.history.push('/dashboard')
        console.log('DATA', data)
      } catch (error) {
        await this.setState({ isLoading: false })
        toast.error(error.response.data.errMessage, {
          position: toast.POSITION.TOP_CENTER
        })
        console.log('ERROR', error)
      }
    } else if (
      get(data, 'buyer.email', '') === Cookies.get('email') &&
      (data.status === 'registry_bank_pay' || (data.status === 'registry_token_amount' && !data.buyerFinancer))
    ) {
      try {
        this.setState({ isLoading: true })
        const { data } = await axios.post(`${API_URL}/buyerPayment`, {
          propertyId: Cookies.get('propertyId'),
          registryId: params.tab3
        })
        await this.setState({ isLoading: false, buyerAmtPaid: true })
        await Cookies.set('amount_paid', 'buyerAmtPaid')
        await toast.success(`${'Buyer amount paid!'}`, {
          position: toast.POSITION.TOP_CENTER
        })
        this.props.history.push('/dashboard')
        console.log('DATA', data)
      } catch (error) {
        await this.setState({ isLoading: false })
        toast.error(error.response.data.errMessage, {
          position: toast.POSITION.TOP_CENTER
        })
        console.log('ERROR', error)
      }
    } else {
      try {
        this.setState({ isLoading: true })
        const { data } = await axios.post(`${API_URL}/payTokenAmount`, {
          propertyId: Cookies.get('propertyId'),
          registryId: params.tab3
        })
        await this.setState({ isLoading: false, tokenAmountpaid: true })
        await Cookies.set('amount_paid', 'tokenAmountpaid')
        await toast.success(`${'Token amount paid!'}`, {
          position: toast.POSITION.TOP_CENTER
        })
        this.props.history.push('/dashboard')
        console.log('DATA', data)
      } catch (error) {
        await this.setState({ isLoading: false })
        toast.error(error.response.data.errMessage, {
          position: toast.POSITION.TOP_CENTER
        })
        console.log('ERROR', error)
      }
    }
  }
  render() {
    const { isLoading } = this.state
    const { data } = this.props
    console.log('object', data)
    return (
      <Paper
        padding={'0 31px 20px'}
        radius={'0 0 6px 6px'}
        shadow={'0px 2px 6.5px 0.5px rgba(0, 0, 0, 0.06)'}
        margin={'0 95px'}>
        <InformTitle>IGR Dashboard</InformTitle>
        <h3>Sale Summary</h3>

        <PaymentTuple>
          <PaymentText>Previous Owner : {data.tokenAmt}</PaymentText>
        </PaymentTuple>
        <PaymentTuple>
          <PaymentText>Current Owner : {data.tokenAmt}</PaymentText>
        </PaymentTuple>
        <PaymentTuple>
          <PaymentText>Sell Price : {data.tokenAmt}</PaymentText>
        </PaymentTuple>
        <PaymentTuple>
          <PaymentText>Date : {data.tokenAmt}</PaymentText>
        </PaymentTuple>

        <React.Fragment>
          <TransferButton>
            <Button
              size={'medium'}
              width={'150px'}
              isLoading={isLoading}
              disabled={true}
              title="Gift Property"
              type="button"
              onClick={() => this.setState({ openModal: true })}
            />
            <Button
              size={'medium'}
              width={'150px'}
              isLoading={isLoading}
              disabled={true}
              title="Rent Property"
              type="button"
              onClick={() => this.setState({ openModal: true })}
            />

            <Button
              size={'medium'}
              width={'150px'}
              isLoading={isLoading}
              disabled={isLoading}
              title="Sale Property"
              type="button"
              onClick={() => this.setState({ openModal: true })}
            />
          </TransferButton>
        </React.Fragment>
      </Paper>
    )
  }
}

export default withRouter(Transfer)
