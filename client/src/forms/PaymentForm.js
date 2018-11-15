import React, { Component } from 'react'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import axios from 'axios'
import { API_URL } from '../constants'
import get from 'lodash/get'
import { Paper, PaymentText, Button, PaymentTuple, StatusPage } from '../components'
import withRouter from 'react-router/withRouter'
import { toast } from 'react-toastify'

class PaymentForm extends Component {
  state = { tokenAmtPaid: false }

  handlePay = async () => {
    const {
      match: { params }
    } = this.props
    try {
      this.setState({ isLoading: true })
      const { data } = await axios.post(`${API_URL}/payTokenAmount`, {
        registryId: params.tab3
      })
      await this.setState({ isLoading: false, tokenAmtPaid: true })
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
  render() {
    const { isLoading, tokenAmtPaid } = this.state
    const { data } = this.props
    console.log('data==>', data)
    return (
      <Paper
        padding={'0 31px 20px'}
        radius={'0 0 6px 6px'}
        shadow={'0px 2px 6.5px 0.5px rgba(0, 0, 0, 0.06)'}
        margin={'0 95px'}>
        <PaymentTuple>
          <PaymentText>Token amount to be paid: {data.tokenAmt}</PaymentText>
          {data.status === 'registry_token_amount' ? (
            <StatusPage paid />
          ) : (
            <Button
              size={'medium'}
              width={'150px'}
              title="Pay"
              disabled={isLoading}
              isLoading={isLoading}
              type="button"
              onClick={() => this.handlePay()}
            />
          )}
        </PaymentTuple>
      </Paper>
    )
  }
}

export default withRouter(PaymentForm)
