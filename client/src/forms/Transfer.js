import React, { Component } from 'react'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import axios from 'axios'
import { API_URL } from '../constants'
import get from 'lodash/get'
import { Paper, PaymentText, Button, PaymentTuple, StatusPage, FlexWrapper } from '../components'
import withRouter from 'react-router/withRouter'
import { toast } from 'react-toastify'
import moment from 'moment'

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

  render() {
    const { isLoading } = this.state
    const { data } = this.props
    console.log('DATA', data)
    return (
      <Paper
        padding={'0 31px 20px'}
        radius={'0 0 6px 6px'}
        shadow={'0px 2px 6.5px 0.5px rgba(0, 0, 0, 0.06)'}
        margin={'0 95px'}>
        {data.status === 'completed' ? (
          <FlexWrapper justifyContent="center" padding="20px 0">
            <h1>No data available</h1>
          </FlexWrapper>
        ) : (
          <React.Fragment>
            <FlexWrapper padding="10px 0">
              <h3>Ownership Transfer Details</h3>
            </FlexWrapper>
            <PaymentTuple>
              <PaymentText>
                Previous Owner :{' '}
                {get(data.owner, 'userDetails.firstName', 'NA') + ' ' + get(data.owner, 'userDetails.lastName', '')}
              </PaymentText>
            </PaymentTuple>
            <PaymentTuple>
              <PaymentText>
                Current Owner :{' '}
                {get(data.buyer, 'userDetails.firstName', 'NA') + ' ' + get(data.buyer, 'userDetails.lastName', '')}
              </PaymentText>
            </PaymentTuple>
            <PaymentTuple>
              <PaymentText>Sell Price : {get(data, 'sellPrice', 'NA')}</PaymentText>
            </PaymentTuple>
            <PaymentTuple>
              <PaymentText>Date : {moment(get(data, 'modified', '')).format('DD MMM YYYY hh:mm:ss A')}</PaymentText>
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
          </React.Fragment>
        )}
      </Paper>
    )
  }
}

export default withRouter(Transfer)
