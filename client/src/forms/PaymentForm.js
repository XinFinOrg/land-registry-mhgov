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
        toast.error(`${'Error!!!'}`, {
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
        await this.setState({ isLoading: false, tokenAmountpaid: true })
        await Cookies.set('amount_paid', 'tokenAmountpaid')
        await toast.success(`${'Token amount paid!'}`, {
          position: toast.POSITION.TOP_CENTER
        })
        this.props.history.push('/dashboard')
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
    const { isLoading } = this.state
    const { data } = this.props
    console.log('object', data)
    return (
      <Paper
        padding={'0 31px 20px'}
        radius={'0 0 6px 6px'}
        shadow={'0px 2px 6.5px 0.5px rgba(0, 0, 0, 0.06)'}
        margin={'0 95px'}>
        <PaymentTuple>
          <PaymentText>Token Amount : {data.tokenAmt}</PaymentText>
          {/* PayTokenAmout */}

          {get(data, 'buyer.email', '') === Cookies.get('email') &&
          (data.status === 'registry_buyer_financer_verified' ||
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
          ) : data.status === 'registry_token_amount' ||
          data.status === 'registry_bank_pay' ||
          data.status === 'registry_buyer_pay' ||
          data.status === 'registry_stamp_duty' ? (
            <StatusPage paid />
          ) : null}
        </PaymentTuple>

        {/* Financer Amount */}
        {get(this.props, 'data', {}).hasOwnProperty('buyerFinancer') && (
          <PaymentTuple>
            <PaymentText>Financer To Pay : {get(data, 'buyerFinancer.financeAmount')} </PaymentText>
            {/* pay financer amount */}
            {get(data, 'buyerFinancer.email', '') === Cookies.get('email') &&
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
            ) : (Cookies.get('amount_paid') === 'financerAmtPaid' && data.status === 'registry_bank_pay') ||
            data.status === 'registry_buyer_pay' ||
            data.status === 'registry_bank_pay' ||
            data.status === 'registry_stamp_duty' ||
            (data.status === 'registry_stamp_duty' && get(data, 'buyerFinancer.email', '') === Cookies.get('email')) ? (
              <StatusPage paid />
            ) : null}
          </PaymentTuple>
        )}
        {/* Buyer Amount */}
        {console.log('payement form get real price', data.tokenAmt)}
        <PaymentTuple>
          <PaymentText>
            Buyer To Pay :{' '}
            {get(data, 'sellPrice', 0) - get(data.buyerFinancer, 'financeAmount', 0) - get(data, 'tokenAmt', 0)}
          </PaymentText>

          {/* Pay Buyer Amount */}
          {get(data, 'buyer.email', '') === Cookies.get('email') &&
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
          ) : (console.log(data.status),
          Cookies.get('amount_paid') === 'financerAmtPaid' && data.status === 'registry_buyer_pay') ||
          data.status === 'registry_buyer_pay' ||
          data.status === 'registry_stamp_duty' ||
          (data.status === 'registry_stamp_duty' && get(data, 'buyerFinancer.email', '') === Cookies.get('email')) ? (
            <StatusPage paid />
          ) : null}
        </PaymentTuple>
      </Paper>
    )
  }
}

export default withRouter(PaymentForm)
