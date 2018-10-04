import React, { Component } from 'react'
import styled from 'styled-components'
import { Formik, Field } from 'formik'
import {
  Paper,
  Radio,
  PaperSubTitle,
  FormikForm,
  FormDetailsContainer,
  TextInput,
  InformTitle,
  NormalFieldsTuple,
  Button,
  ButtonGroup,
  CustomTable,
  StyledHead
} from '../components'
import { partyDetails, dutyDetails, DocumentDutyTotal } from '../constants'

const ConsiderationWrap = styled.div`
  margin-top: 20px;
  display: flex;
`
const ConsiAmtBox = styled.div`
  flex-basis: 40%;
`
const ConButtonWrap = styled.div`
  flex-basis: 60%;
  text-align: right;
  padding-top: 10px;
`

const TotalPaymentText = styled.h4`
  color: #2f89f5;
  text-align: right;
  font-size: 24px;
  padding: 15px 0;
  font-weight: 500;
`

const HandellingChargesWrap = styled.div`
  & p {
    padding: 5px 0 5px 0;
  }
`

const RadioGroup = styled.div``
const RadioWrap = styled.div`
  margin-top: -20px;
  & label {
    cursor: pointer;
  }
  & > p {
    padding: 10px 0px;
  }
`

class StampDutyForm extends Component {
  state = {}
  render() {
    const partyDetailscolumns = [
      {
        Header: <StyledHead>Proprty ID</StyledHead>,
        accessor: 'srNo',
        maxWidth: 100
      },
      {
        Header: <StyledHead>Property Details</StyledHead>,
        accessor: 'partyName',
        maxWidth: 150,
        Cell: props => <span>{props.value}</span>
      },
      {
        Header: <StyledHead>Usage Category</StyledHead>,
        accessor: 'partyType',
        minwidth: 120
      },
      {
        Header: <StyledHead>Location</StyledHead>,
        accessor: 'partyCategory',
        minwidth: 180
      },
      {
        Header: <StyledHead>Action</StyledHead>,
        accessor: 'action',
        maxWidth: 150,
        Cell: props => <Button size="action" shadow={'none'} title="View" radius={'4px'} />
      }
    ]
    const dutyColumns = [
      {
        Header: <StyledHead>Sr.</StyledHead>,
        accessor: 'srNo',
        minWidth: 100
      },
      {
        Header: <StyledHead>Customer </StyledHead>,
        accessor: 'partyName',
        minWidth: 150
      },
      {
        Header: <StyledHead>Chargesss</StyledHead>,
        accessor: 'partyType',
        minwidth: 120
      }
    ]

    const DocumentDutyColumns = [
      {
        Header: <StyledHead>Registration Fee.</StyledHead>,
        accessor: 'srNo',
        minWidth: 100
      },
      {
        Header: <StyledHead>Stamp Duty</StyledHead>,
        accessor: 'partyName',
        minWidth: 150
      },
      {
        Header: <StyledHead>Local Duty</StyledHead>,
        accessor: 'partyType',
        minwidth: 120
      },
      {
        Header: <StyledHead>Total</StyledHead>,
        accessor: 'Total',
        minwidth: 120
      }
    ]
    return (
      <Formik
        enableReinitialize={true}
        initialValues={{
          selectPartyType: '',
          selectPartyCategory: '',
          isExecuter: '',
          salutation: '',
          partyFirstName: '',
          partyMiddleName: '',
          partyLastName: '',
          aliasName: '',
          identificationMark1: '',
          identificationMark2: '',
          dateOfBirth: '',
          age: '',
          uid: '',
          identificationTypeID: '',
          identificationDescription: '',
          panForm60: '',
          occupation: '',
          gender: '',
          email: '',
          mobileNo: '',
          presentationExemption: '',
          pinCode: '',
          addressSame: '',
          district: '',
          taluka: '',
          village: '',
          financierName: '',
          city: '',
          branch: '',
          totalValueOfProperty: '',
          totalFinanceAmount: '',
          financeAmountDueNow: '',
          totalSaveAmount: '',
          tokenAmount: ''
        }}
        onSubmit={formData => console.log(formData)}
        render={formikBag => (
          <FormikForm>
            <Paper
              padding={'0 31px 20px'}
              radius={'0 0 6px 6px'}
              shadow={'0px 2px 6.5px 0.5px rgba(0, 0, 0, 0.06)'}
              margin={'0 95px'}>
              <InformTitle paddingTop="20">Stamp Duty Calculation</InformTitle>
              <FormDetailsContainer paddingTop={'10'} flexBasis={'calc(50% - 10px)'}>
                <Field
                  name="selectPartyType"
                  render={({ field }) => <TextInput {...field} label="Fee Rule" placeholder={'Will'} />}
                />
              </FormDetailsContainer>
              <FormDetailsContainer paddingTop={'0'} display="block">
                <CustomTable
                  data={partyDetails}
                  columns={partyDetailscolumns}
                  resizable={false}
                  sortable={false}
                  showPagination={false}
                  pageSize={10}
                  defaultPageSize={10}
                  minRows={0}
                />
              </FormDetailsContainer>
              <ConsiderationWrap>
                <ConsiAmtBox>
                  <Field
                    name="selectPartyType"
                    render={({ field }) => (
                      <TextInput {...field} label="Consideration Amount" placeholder={'Consideration Amount'} />
                    )}
                  />
                </ConsiAmtBox>

                <ConButtonWrap>
                  <Button width={'180px'} height={'45px'} shadow={'none'} title="Calculate & Save" radius={'4px'} />
                </ConButtonWrap>
              </ConsiderationWrap>

              <HandellingChargesWrap>
                <InformTitle>Stamp Duty Details</InformTitle>
                <p>Fee Rule Scanning and handelling charges</p>
                <CustomTable
                  data={dutyDetails}
                  columns={dutyColumns}
                  resizable={false}
                  sortable={false}
                  showPagination={false}
                  pageSize={10}
                  defaultPageSize={10}
                  minRows={0}
                />
              </HandellingChargesWrap>

              <FormDetailsContainer paddingTop={'0'}>
                <NormalFieldsTuple shrink>
                  <Field
                    name="OnlinePay"
                    render={({ field }) => <TextInput {...field} label="Online Pay" placeholder={'1'} />}
                  />
                  <Field
                    name="CounterPay"
                    render={({ field }) => <TextInput {...field} label="Counter Pay" placeholder={'700'} />}
                  />
                  <Field
                    name="TotalAmount"
                    render={({ field }) => <TextInput {...field} label="Total Amount" placeholder={'700'} />}
                  />
                </NormalFieldsTuple>
              </FormDetailsContainer>

              <FormDetailsContainer paddingTop={'0'}>
                <InformTitle>Stamp Duty Adjustment Details</InformTitle>
                <NormalFieldsTuple shrink paddingTop={'0'}>
                  <Field
                    name="OldDocumentNo"
                    render={({ field }) => (
                      <TextInput {...field} label="Old Document No." placeholder={'Old Document No.'} />
                    )}
                  />
                  <Field
                    name="OldDocumentDate"
                    render={({ field }) => (
                      <TextInput {...field} label="Old Document Date" placeholder={'Old Document Date'} />
                    )}
                  />
                  <Field
                    name="OfficeName"
                    render={({ field }) => <TextInput {...field} label="Office Name" placeholder={'Office Name'} />}
                  />
                </NormalFieldsTuple>
                <NormalFieldsTuple shrink paddingTop={'0'}>
                  <RadioWrap>
                    <PaperSubTitle>Adjustment From Old Data?</PaperSubTitle>
                    <RadioGroup>
                      <Radio
                        label="Yes"
                        value="Yes"
                        name="registerAs"
                        defaultChecked
                        onChange={e => formikBag.setFieldValue('registerAs', e.target.value)}
                      />
                      <Radio
                        label="No"
                        value="No"
                        name="registerAs"
                        onChange={e => formikBag.setFieldValue('registerAs', e.target.value)}
                      />
                    </RadioGroup>
                  </RadioWrap>

                  <Field
                    name="AdjustmentAmount"
                    render={({ field }) => (
                      <TextInput {...field} label="Adjustment Amount" placeholder={'Adjustment Amount'} />
                    )}
                  />
                </NormalFieldsTuple>
              </FormDetailsContainer>

              <CustomTable
                data={DocumentDutyTotal}
                columns={DocumentDutyColumns}
                resizable={false}
                sortable={false}
                showPagination={false}
                pageSize={10}
                defaultPageSize={10}
                minRows={0}
              />

              <TotalPaymentText>Total Payment: $ 1810</TotalPaymentText>
            </Paper>

            <ButtonGroup>
              <Button size={'medium'} width={'150px'} title="Previous" type="submit" disabled={true} />
              <Button size={'medium'} width={'150px'} title="Submit" type="submit" />
            </ButtonGroup>
          </FormikForm>
        )}
      />
    )
  }
}

export default StampDutyForm
