import React, { Component } from 'react'
// import styled from 'styled-components'
import Cookies from 'js-cookie'
import axios from 'axios'
import { API_URL } from '../constants'
import get from 'lodash/get'
import { Paper, PaymentText, Button, PaymentTuple, StatusPage } from '../components'
import withRouter from 'react-router/withRouter'
import { toast } from 'react-toastify'

class PaymentForm extends Component {
  state = { amtPaid: false }

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
        await this.setState({ isLoading: false, amtPaid: true })
        await toast.success(`${'Financer amount paid!'}`, {
          position: toast.POSITION.TOP_CENTER
        })
        console.log('DATA', data)
      } catch (error) {
        await this.setState({ isLoading: false })
        toast.error(`${'Error!!!'}`, {
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
        await this.setState({ isLoading: false, amtPaid: true })
        await toast.success(`${'Token amount paid!'}`, {
          position: toast.POSITION.TOP_CENTER
        })
        console.log('DATA', data)
      } catch (error) {
        await this.setState({ isLoading: false })
        toast.error(`${'Error!!!'}`, {
          position: toast.POSITION.TOP_CENTER
        })
        console.log('ERROR', error)
      }
    }
  }
  render() {
    const { isLoading, amtPaid } = this.state
    const { data } = this.props
    console.log('data==>', data)
    return (
      <Paper
        padding={'0 31px 20px'}
        radius={'0 0 6px 6px'}
        shadow={'0px 2px 6.5px 0.5px rgba(0, 0, 0, 0.06)'}
        margin={'0 95px'}>
        <PaymentTuple>
          <PaymentText>
            {get(data, 'buyerFinancer.email', '') === Cookies.get('email')
              ? `Finance amount to be paid: ${get(data, 'buyerFinancer.financeAmount')}`
              : `Token amount to be paid: ${data.tokenAmt}`}
          </PaymentText>
          {/* PayTokenAmout */}
          {(get(data, 'buyer.email', '') === Cookies.get('email') && data.status === 'registry_token_amount') ||
          amtPaid ? (
            <StatusPage paid />
          ) : get(data, 'buyer.email', '') === Cookies.get('email') &&
          (data.status === 'registry_buyer_financer_confirmed' ||
            (data.status === 'registry_skip_buyer_financer' && !data.buyerFinancer)) ? (
            <Button
              size={'large'}
              width={'150px'}
              title="Pay Token Amount"
              disabled={isLoading}
              isLoading={isLoading}
              type="button"
              onClick={() => this.handlePay()}
            />
          ) : null}

          {/* Pay Finance amount */}
          {(get(data, 'buyerFinancer.email', '') === Cookies.get('email') && data.status === 'registry_bank_pay') ||
          amtPaid ? (
            <StatusPage paid />
          ) : get(data, 'buyerFinacer.email', '') === Cookies.get('email') &&
          data.status === 'registry_token_amount' ? (
            <Button
              size={'large'}
              width={'150px'}
              title="Pay Financer Amount"
              disabled={isLoading}
              isLoading={isLoading}
              type="button"
              onClick={() => this.handlePay()}
            />
          ) : null}

          {/* Pay Buyer */}
          {(get(data, 'buyer.email', '') === Cookies.get('email') && data.status === 'registry_buyer_pay') ||
          amtPaid ? (
            <StatusPage paid />
          ) : get(data, 'buyer.email', '') === Cookies.get('email') &&
          (data.status === 'registry_bank_pay' || (data.status === 'registry_token_amount' && !data.buyerFinancer)) ? (
            <Button
              size={'large'}
              width={'150px'}
              title="Pay Buyer Amount"
              disabled={isLoading}
              isLoading={isLoading}
              type="button"
              onClick={() => this.handlePay()}
            />
          ) : null}
        </PaymentTuple>
      </Paper>
    )
  }
}

export default withRouter(PaymentForm)
