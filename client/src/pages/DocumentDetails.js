import React, { Component } from 'react'
import styled from 'styled-components'
import { Formik, Form, Field } from 'formik'
import {
  Header,
  TopWrapper,
  PageTitle,
  MainWrapper,
  Icon,
  Footer,
  Paper,
  InsideTitle,
  Tabber,
  Tab,
  FormDetailsContainer,
  Input,
  TextInput,
  InformTitle,
  Button,
  PaymentTuple,
  PaymentText,
  PaymentWrapper,
  CustomTable,
  ButtonGroup,
  IconCircle,
  FlexWrapper,
  MediumText
} from '../components'
import { commonUploadDoc, DocumentDutyTotal } from '../constants'
import { PropertyDetailsForm, OwnerDetailsForm, SellerDetailsForm, StampDutyForm, Registeration } from '../forms'

const PageTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  & svg {
    margin: 0 10px;
  }
`

const StyledHead = styled.div`
  font-size: 16px;
  text-align: left;
  font-weight: 600;
  color: #333333;
`
const PropertyDetailsWrapper = styled.div``
const FormikForm = styled(Form)`
  margin-bottom: 100px;
`

const SubmissionWrap = styled.div`
  width: 360px;
`

class DocumentDetails extends Component {
  state = {
    activeTab: this.props.location.pathname
  }
  /* componentDidMount = () => {
    this.setState({activeTab: "/dashboard/document-details/property-details"})
  } */

  render() {
    const columns = [
      {
        Header: <StyledHead>Document Details</StyledHead>,
        accessor: 'docDetails',
        minWidth: 100
      },
      {
        Header: <StyledHead>Select</StyledHead>,
        accessor: 'select',
        minWidth: 100,
        Cell: props => <Input accept="image/*" name="newImage" type="file" onChange={e => console.log('e', e)} />
      },
      {
        Header: <StyledHead>Download</StyledHead>,
        accessor: 'download',
        minwidth: 120
      },
      {
        Header: <StyledHead>Action</StyledHead>,
        accessor: 'action',
        minwidth: 180,
        Cell: props => (
          <Button
            width={'150px'}
            height={'32px'}
            shadow={'none'}
            title="Upload/Update"
            radius={'4px'}
            // onClick={() => this.props.history.push('/dashboard/document-details/property-details')}
          />
        )
      }
    ]
    const DocumentDutyColumns = [
      {
        Header: <StyledHead>Transaction Info</StyledHead>,
        accessor: 'txInfo',
        minWidth: 100
      },
      {
        Header: <StyledHead>Date</StyledHead>,
        accessor: 'date',
        minWidth: 100
      },
      {
        Header: <StyledHead>Amount</StyledHead>,
        accessor: 'amount',
        minwidth: 120
      }
    ]
    const { activeTab } = this.state
    return (
      <React.Fragment>
        <Header />
        <MainWrapper>
          <TopWrapper>
            <PageTitleWrapper>
              <PageTitle>Dashboard</PageTitle>
              <Icon icon="arrow" width={16} height={16} />
              <PageTitle>Document Details</PageTitle>
            </PageTitleWrapper>
          </TopWrapper>
        </MainWrapper>
        <Paper
          padding={'20px 31px 0'}
          radius={'6px 6px 0 0'}
          shadow={'0px 2px 6.5px 0.5px rgba(0, 0, 0, 0.06)'}
          margin={'0 95px'}>
          <InsideTitle>Pre Reg. No.: 20170000092</InsideTitle>
          <Tabber>
            <Tab
              onClick={() => this.setState({ activeTab: '/dashboard/document-details/property-details' })}
              to="/dashboard/document-details/property-details"
              selected={activeTab === '/dashboard/document-details/property-details'}>
              Property Details
            </Tab>
            <Tab
              onClick={() => this.setState({ activeTab: '/dashboard/document-details/owner-details' })}
              to="/dashboard/document-details/owner-details"
              selected={activeTab === '/dashboard/document-details/owner-details'}>
              Owner Details
            </Tab>
            <Tab
              onClick={() => this.setState({ activeTab: '/dashboard/document-details/seller-details' })}
              to="/dashboard/document-details/seller-details"
              selected={activeTab === '/dashboard/document-details/seller-details'}>
              Buyer Details
            </Tab>
            <Tab
              onClick={() => this.setState({ activeTab: '/dashboard/document-details/payment' })}
              to="/dashboard/document-details/payment"
              selected={activeTab === '/dashboard/document-details/payment'}>
              Payment
            </Tab>
            <Tab
              onClick={() => this.setState({ activeTab: '/dashboard/document-details/stamp-duty' })}
              to="/dashboard/document-details/stamp-duty"
              selected={activeTab === '/dashboard/document-details/stamp-duty'}>
              Stamp Duty
            </Tab>
            <Tab
              onClick={() => this.setState({ activeTab: '/dashboard/document-details/registeration' })}
              to="/dashboard/document-details/registeration"
              selected={activeTab === '/dashboard/document-details/registeration'}>
              Registeration
            </Tab>
            <Tab
              onClick={() => this.setState({ activeTab: '/dashboard/document-details/upload-document' })}
              to="/dashboard/document-details/upload-document"
              selected={activeTab === '/dashboard/document-details/upload-document'}>
              Upload Document
            </Tab>
          </Tabber>
        </Paper>
        {activeTab === '/dashboard/document-details/property-details' && (
          <PropertyDetailsWrapper>
            <PropertyDetailsForm />
          </PropertyDetailsWrapper>
        )}
        {activeTab === '/dashboard/document-details/owner-details' && <OwnerDetailsForm />}

        {activeTab === '/dashboard/document-details/seller-details' && <SellerDetailsForm />}

        {activeTab === '/dashboard/document-details/registeration' && <Registeration />}

        {activeTab === '/dashboard/document-details/payment' && (
          <Paper
            padding={'0 31px 20px'}
            radius={'0 0 6px 6px'}
            shadow={'0px 2px 6.5px 0.5px rgba(0, 0, 0, 0.06)'}
            margin={'0 95px'}>
            <PaymentWrapper>
              <PaymentTuple>
                <PaymentText>Total Amount</PaymentText>
                <PaymentText>Rs. 1,00,000</PaymentText>
              </PaymentTuple>
              <PaymentTuple>
                <PaymentText>Total Amount</PaymentText>
                <PaymentText>Rs. 1,00,000</PaymentText>
              </PaymentTuple>
              <PaymentTuple>
                <PaymentText>Total Amount</PaymentText>
                <PaymentText>Rs. 1,00,000</PaymentText>
              </PaymentTuple>
            </PaymentWrapper>
          </Paper>
        )}
        {activeTab === '/dashboard/document-details/stamp-duty' && <StampDutyForm />}
        {activeTab === '/dashboard/document-details/upload-document' && (
          <React.Fragment>
            <Paper
              padding={'26px 31px 20px'}
              radius={'0 0 6px 6px'}
              shadow={'0px 2px 6.5px 0.5px rgba(0, 0, 0, 0.06)'}
              margin={'0 95px'}>
              <FormDetailsContainer paddingTop={'0'} display={'block'}>
                <InformTitle>Common Upload Document</InformTitle>
                <CustomTable
                  data={commonUploadDoc}
                  columns={columns}
                  resizable={false}
                  sortable={false}
                  showPagination={false}
                  pageSize={10}
                  defaultPageSize={10}
                  minRows={0}
                />{' '}
              </FormDetailsContainer>
              <FormDetailsContainer paddingTop={'0'} display={'block'}>
                <InformTitle>Final Submission</InformTitle>
                <SubmissionWrap>
                  <TextInput label="Select Party Category" placeholder={'Select Party Category'} />
                </SubmissionWrap>
              </FormDetailsContainer>
            </Paper>
            <ButtonGroup>
              <Button size={'medium'} width={'150px'} title="Previous" disabled={true} type="button" />
              <Button size={'medium'} width={'150px'} title="Next" type="submit" />
            </ButtonGroup>
          </React.Fragment>
        )}
        <Paper
          padding={'26px 31px 20px'}
          radius={'0 0 6px 6px'}
          shadow={'0px 2px 6.5px 0.5px rgba(0, 0, 0, 0.06)'}
          margin={'40px 95px 100px'}>
          <InformTitle paddingTop={'0'} paddingBottom={'0'}>
            Invoice History - Buyer Invoice Payment
          </InformTitle>
          <FlexWrapper flexDirection="row" justifyContent="flex-start" padding={'10px 0'} borderWidth={'0 0 1px 0'}>
            <IconCircle width={'50px'} height={'50px'} bgColor="transparent" borderColor="#ddd">
              <Icon icon="notification" fill="#1f89f5" width={15} height={19} />
            </IconCircle>
            <FlexWrapper flexDirection="column" justifyContent="flex-start" padding={'0 0 0 10px'}>
              <MediumText paddingTop={'0'} paddingBottom={'0'}>
                #0ada0da0eggq0wgegw89s89f8g9g8yv67c5ty
              </MediumText>
              <MediumText paddingTop={'0'} paddingBottom={'0'}>
                27 Jul 2018, 01:11
              </MediumText>
            </FlexWrapper>
          </FlexWrapper>
          <Formik
            enableReinitialize={true}
            initialValues={{
              address: '',
              blockNumber: '',
              id: '',
              timestamp: '',
              remark: ''
            }}
            onSubmit={formValues => console.log(formValues)}
            render={formikBag => (
              <Form>
                <FormDetailsContainer flexBasis={'100%'}>
                  <Field
                    name="address"
                    render={({ field }) => <TextInput {...field} label="Address" placeholder={'Address'} />}
                  />
                </FormDetailsContainer>
                <FormDetailsContainer>
                  <Field
                    name="blockNumber"
                    render={({ field }) => <TextInput {...field} label="Block Number" placeholder={'Block Number'} />}
                  />

                  <Field name="id" render={({ field }) => <TextInput {...field} label="Id" placeholder={'Id'} />} />

                  <Field
                    name="timestamp"
                    render={({ field }) => <TextInput {...field} label="Timestamp" placeholder={'Timestamp'} />}
                  />
                </FormDetailsContainer>
                <FormDetailsContainer>
                  <Field
                    name="remark"
                    render={({ field }) => <TextInput {...field} label="Remark" placeholder={'Remark'} />}
                  />
                </FormDetailsContainer>
              </Form>
            )}
          />
        </Paper>
        <Paper
          padding={'26px 31px 20px'}
          radius={'0 0 6px 6px'}
          shadow={'0px 2px 6.5px 0.5px rgba(0, 0, 0, 0.06)'}
          margin={'40px 95px 100px'}>
          <InformTitle paddingTop={'0'} paddingBottom={'0'}>
            Payment Details
          </InformTitle>
          <CustomTable
            marginTop
            data={DocumentDutyTotal}
            columns={DocumentDutyColumns}
            resizable={false}
            sortable={false}
            showPagination={false}
            pageSize={10}
            defaultPageSize={10}
            minRows={0}
          />
        </Paper>
        <Footer position={'fixed'} />
      </React.Fragment>
    )
  }
}

export { DocumentDetails }
