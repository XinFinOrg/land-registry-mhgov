import React, { Component } from 'react'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import axios from 'axios'
import { API_URL } from '../constants'
import get from 'lodash/get'
import {
  Paper,
  TextInput,
  PaymentText,
  Button,
  PaymentTuple,
  FlexWrapper,
  Modal,
  CloseWrap,
  PaperTitle,
  Close,
  InformTitle
} from '../components'
import withRouter from 'react-router/withRouter'
import { toast } from 'react-toastify'
import { Formik, Form, Field } from 'formik'

import moment from 'moment'

const TransferButton = styled.div`
  padding-top: 15px;
  display: flex;
  justify-content: flex-end;
  button {
    margin: 0px 5px;
  }
`
/* 
const InformTitle = styled.p`
  font-size: 20px;
  color: #1f89f5;
  padding-top: ${props => (props.paddingTop ? props.paddingTop : 26)}px;
` */

class Transfer extends Component {
  state = { financerAmtPaid: false, tokenAmountpaid: false, buyerAmtPaid: false, openModal: false, ownerDetails: {} }
  async componentDidMount() {
    try {
      const { data } = await axios.post(`${API_URL}/getCurrentOwner`, {
        propertyId: Cookies.get('propertyId')
      })
      this.setState({ ownerDetails: data })
      console.log('DATA', data)
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    const { isLoading, openModal, ownerDetails } = this.state
    const {
      match: { params },
      data
    } = this.props
    console.log('DATA', data)
    return (
      <React.Fragment>
        <Paper
          padding={'0 31px 20px'}
          radius={'0 0 6px 6px'}
          shadow={'0px 2px 6.5px 0.5px rgba(0, 0, 0, 0.06)'}
          margin={'0 95px'}>
          {data.status === 'registry_stamp_duty' ? (
            <React.Fragment>
              <FlexWrapper padding="10px 0">
                <InformTitle>Ownership Transfer Details</InformTitle>
              </FlexWrapper>
              <PaymentTuple>
                <PaymentText>
                  <b>Previous Owner</b> :{' '}
                  {get(data.owner, 'userDetails.firstName', 'NA') + ' ' + get(data.owner, 'userDetails.lastName', '')}
                </PaymentText>
              </PaymentTuple>
              <PaymentTuple>
                <PaymentText>
                  <b>Current Owner</b> :{' '}
                  {get(data.buyer, 'userDetails.firstName', 'NA') + ' ' + get(data.buyer, 'userDetails.lastName', '')}
                </PaymentText>
              </PaymentTuple>
              <PaymentTuple>
                <PaymentText>
                  <b>Sell Price</b> : ₹ {get(data, 'sellPrice', 'NA')}
                </PaymentText>
              </PaymentTuple>
              <PaymentTuple>
                <PaymentText>
                  <b>Date</b> : {moment(get(data, 'modified', '')).format('DD MMM YYYY hh:mm:ss A')}
                </PaymentText>
              </PaymentTuple>
            </React.Fragment>
          ) : (
            <FlexWrapper justifyContent="center" padding="20px 0">
              <h1>No data available</h1>
            </FlexWrapper>
          )}
        </Paper>
        {Cookies.get('email') === get(data, 'buyer.email', '') &&
          Cookies.get('email') === get(ownerDetails, 'data.owner.email', '') && (
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
                  title="Sell Property"
                  type="button"
                  onClick={() => this.setState({ openModal: true })}
                />
              </TransferButton>
            </React.Fragment>
          )}
        <Modal show={openModal}>
          <CloseWrap>
            <PaperTitle color="#fff">Sell property</PaperTitle>
            <Close onClick={() => this.setState({ openModal: !openModal })} />
          </CloseWrap>
          <Formik
            enableReinitialize={true}
            initialValues={{
              sellPrice: 10000000,
              tokenAmt: 50000
            }}
            onSubmit={async values => {
              this.setState({ isLoading: true })
              try {
                console.log('property id ................', get(data, 'propertyId', ''))
                await axios.post(`${API_URL}/sellProperty`, {
                  propertyId: get(data, 'propertyId', ''),
                  owner: {
                    email: get(data, 'buyer.email', ''),
                    address: get(data, 'buyer.address', '')
                  },
                  sellPrice: values.sellPrice,
                  tokenAmt: values.tokenAmt
                })
                await this.setState({ isLoading: false, openModal: false })
                await toast.success(`${'Property on sale!'}`, {
                  position: toast.POSITION.TOP_CENTER
                })
                this.props.history.push('/dashboard')
              } catch (error) {
                await this.setState({ isLoading: false })
                toast.error(error.response.data.errMessage, {
                  position: toast.POSITION.TOP_CENTER
                })
                console.log('ERROR', error)
              }
            }}
            render={formikBag => (
              <Form>
                <Field
                  name="sellPrice"
                  render={({ field }) => (
                    <TextInput {...field} label="Sell Price" placeholder={'Sell Price'} required />
                  )}
                />
                <Field
                  name="tokenAmt"
                  render={({ field }) => (
                    <TextInput {...field} label="Token Amount" placeholder={'Token Amount'} required />
                  )}
                />
                <FlexWrapper justifyContent="center">
                  <Button
                    size={'medium'}
                    width={'150px'}
                    isLoading={isLoading}
                    disabled={isLoading}
                    title="Confirm"
                    type="submit"
                  />
                </FlexWrapper>
              </Form>
            )}
          />
        </Modal>
      </React.Fragment>
    )
  }
}

export default withRouter(Transfer)
