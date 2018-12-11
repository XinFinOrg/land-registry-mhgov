import React, { Component } from 'react'
import styled from 'styled-components'
import { Formik, Form, Field } from 'formik'
import { Collapse } from 'react-collapse'

import {
  Header,
  TopWrapper,
  PageTitle,
  MainWrapper,
  Icon,
  Footer,
  ArrowImg,
  Paper,
  InsideTitle,
  Tabber,
  Tab,
  FormDetailsContainer,
  Input,
  TextInput,
  InformTitle,
  Button,
  // PaymentTuple,
  // PaymentText,
  // PaymentWrapper,
  CustomTable,
  ButtonGroup,
  IconCircle,
  FlexWrapper,
  MediumText,
  FieldsTuple,
  FormikForm
} from '../components'
import { commonUploadDoc } from '../constants'
import {
  PropertyDetailsForm,
  OwnerDetailsForm,
  BuyerDetailsForm,
  StampDutyForm,
  Registeration,
  PaymentForm
} from '../forms'
import Cookies from 'js-cookie'
import axios from 'axios'
import { API_URL, statusMap } from '../constants'
import get from 'lodash/get'
import keys from 'lodash/keys'
// import values from 'lodash/values'
import moment from 'moment'

const HalfWraper = styled.div`
  width: 50%;
  div {
    width: 100%;
  }
`
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
/*const FormikForm = styled(Form)`
  margin-bottom: 100px;
`*/
const SubmissionWrap = styled.div`
  width: 360px;
`

const OgColor = styled.div`
  color: #bf521a;
`

const TupleContainer = styled.div`
  display: flex;
  align-items: center;
`
const TupleWrapper = styled.div``
const Tuple = styled.div`
  border-bottom: 1px solid #ddd;
  margin-bottom: 14px;
  padding: 8px 0;
  padding-right: 14px;
  & > p {
    text-transform: capitalize;
    font-weight: ${props => (props.fontWeight ? props.fontWeight : 'normal')};
  }
`
const TableDataWrapper = styled.div`
  div {
    display: inline-block;
    background: #f6f6f6;
    padding: 10px 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    h3 {
      display: inline-block;
      margin-right: 15px;
      font-size: 18px;
      font-weight: bold;
    }
  }
`
class DocumentDetails extends Component {
  state = {
    activeTab: this.props.match.url,
    dashboardData: [],
    historyData: {},
    isOpened: ''
  }
  async componentDidMount() {
    this.fetchHistory()
    console.log('object', this.props.match.params)
    const type = this.props.match.params.tab2
    const id = this.props.match.params.tab3
    if (type === 'add-property') {
    } else {
      if (type === 'propertyId') {
        try {
          const { data } = await axios.get(`${API_URL}/getPropertyData?propertyId=${id}`)
          // console.log('DATA', data.data)
          this.setState({ dashboardData: data.data })
        } catch (error) {
          console.log('ERROR', error)
        }
      } else {
        try {
          const { data } = await axios.get(`${API_URL}/getPropertyData?registryId=${id}`)
          // console.log('DATA', data.data)
          this.setState({ dashboardData: data.data })
        } catch (error) {
          //console.log('ERROR', error)
        }
      }
    }
  }

  fetchHistory = async () => {
    try {
      const { data } = await axios.post(`${API_URL}/getExplorer`, {
        registryId: Cookies.get('registryId'),
        propertyId: Cookies.get('propertyId')
      })
      this.setState({ historyData: data.data })
    } catch (error) {
      //console.log('ERROR', error)
    }
  }

  changeActiveTab = activeTab => {
    this.setState({ activeTab })
  }

  collapsHandle = index => {
    this.setState({ isOpened: index === this.state.isOpened ? '' : index })
  }

  render() {
    console.log('data for hash', this.props.data)
    console.log('document details page porps==>', this.state.dashboardData)
    // console.log('document details page porps', this.props)
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
            // onClick={() => this.props.history.push('/dashboard/property-details')}
          />
        )
      }
    ]
    /*     const DocumentDutyColumns = [
      {
        Header: <StyledHead>Property Id</StyledHead>,
        accessor: 'propertyId',
        minWidth: 40
      },
      {
        Header: <StyledHead>Land Type</StyledHead>,
        accessor: 'landType',
        maxWidth: 80
      },
      {
        Header: <StyledHead>Owner</StyledHead>,
        accessor: 'owner',
        minwidth: 120
      },
      {
        Header: <StyledHead>Survey Number</StyledHead>,
        accessor: 'surveyNumber',
        minwidth: 50
      },
      {
        Header: <StyledHead>Open Parking</StyledHead>,
        accessor: 'openParking',
        maxwidth: 50
      },
      {
        Header: <StyledHead>Floor Number</StyledHead>,
        accessor: 'floorNumber',
        maxwidth: 30
      },
      {
        Header: <StyledHead>Covered Parking</StyledHead>,
        accessor: 'coveredParking',
        maxwidth: 20
      },
      {
        Header: <StyledHead>Area</StyledHead>,
        accessor: 'area',
        maxwidth: 20
      }
    ]
    const RegistryHistoryColumns = [
      {
        Header: <StyledHead>Property Id</StyledHead>,
        accessor: 'propertyId',
        minWidth: 40
      },
      {
        Header: <StyledHead>Registry Id</StyledHead>,
        accessor: 'registryId',
        minWidth: 80
      },
      {
        Header: <StyledHead>Buyer</StyledHead>,
        accessor: 'buyer',
        minwidth: 120
      }
    ]*/
    const { activeTab, dashboardData, historyData, isOpened } = this.state
    const {
      match: { params }
    } = this.props
    return (
      <React.Fragment>
        <Header />
        <MainWrapper>
          <TopWrapper>
            <PageTitleWrapper>
              <PageTitle color="#1f89f5" onClick={() => this.props.history.push('/dashboard')}>
                Dashboard
              </PageTitle>
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
          {console.log('urllllllllllll', this.props.match.params.tab2)}

          {this.props.match.params.tab2 === 'add-property' ? null : (
            <InsideTitle>
              <p>
                <b>Property ID:</b> {Cookies.get('propertyId')}
              </p>

              <p>
                <b>Registry ID:</b> {Cookies.get('registryId')}
              </p>

              <p>
                <OgColor>
                  <b> Status: </b>
                  {get(statusMap[dashboardData.status], 'statusDesc', 'N.A')}
                </OgColor>
              </p>
            </InsideTitle>
          )}

          <Tabber>
            <Tab
              onClick={() => this.changeActiveTab(`/dashboard/property-details/${params.tab2}/${params.tab3}`)}
              to={`/dashboard/property-details/${params.tab2}/${params.tab3}`}
              completed={dashboardData.status === 'registry_new' || 'registry_buyer_confirmed'}
              // tabIndex={dashboardData.status === 'registry_new' ? -1 : 0}
              selected={activeTab === `/dashboard/property-details/${params.tab2}/${params.tab3}`}>
              Property Details
            </Tab>
            <Tab
              onClick={() => this.changeActiveTab(`/dashboard/owner-details/${params.tab2}/${params.tab3}`)}
              to={`/dashboard/owner-details/${params.tab2}/${params.tab3}`}
              completed={dashboardData.status === 'registry_buyer_confirmed'}
              selected={activeTab === `/dashboard/owner-details/${params.tab2}/${params.tab3}`}>
              Owner Details
            </Tab>
            <Tab
              onClick={() => this.changeActiveTab(`/dashboard/buyer-details/${params.tab2}/${params.tab3}`)}
              to={`/dashboard/buyer-details/${params.tab2}/${params.tab3}`}
              selected={activeTab === `/dashboard/buyer-details/${params.tab2}/${params.tab3}`}>
              Buyer Details
            </Tab>
            <Tab
              onClick={() => this.changeActiveTab(`/dashboard/payment/${params.tab2}/${params.tab3}`)}
              to={`/dashboard/payment/${params.tab2}/${params.tab3}`}
              selected={activeTab === `/dashboard/payment/${params.tab2}/${params.tab3}`}>
              Payment
            </Tab>
            <Tab
              onClick={() => this.changeActiveTab(`/dashboard/stamp-duty/${params.tab2}/${params.tab3}`)}
              to={`/dashboard/stamp-duty/${params.tab2}/${params.tab3}`}
              selected={activeTab === `/dashboard/stamp-duty/${params.tab2}/${params.tab3}`}>
              Stamp Duty
            </Tab>
            {/*<Tab
              onClick={() => this.changeActiveTab(`/dashboard/registeration/${params.tab2}`)}
              to={`/dashboard/registeration/${params.tab2}`}
              type={activeTab === `/dashboard/registeration/${params.tab2}`==="selected"}>
              Registeration
            </Tab>
            <Tab
              onClick={() => this.changeActiveTab(`/dashboard/upload-document/${params.tab2}`)}
              to={`/dashboard/upload-document/${params.tab2}`}
              type={activeTab === `/dashboard/upload-document/${params.tab2}`==="selected"}>
              Upload Document
            </Tab>*/}
          </Tabber>
        </Paper>
        {activeTab === `/dashboard/property-details/${params.tab2}/${params.tab3}` && (
          <PropertyDetailsWrapper>
            <PropertyDetailsForm data={dashboardData} changeActiveTab={this.changeActiveTab} />
          </PropertyDetailsWrapper>
        )}
        {activeTab === `/dashboard/owner-details/${params.tab2}/${params.tab3}` && (
          <OwnerDetailsForm data={dashboardData} changeActiveTab={this.changeActiveTab} />
        )}

        {activeTab === `/dashboard/buyer-details/${params.tab2}/${params.tab3}` && (
          <BuyerDetailsForm data={dashboardData} changeActiveTab={this.changeActiveTab} />
        )}

        {activeTab === `/dashboard/registeration/${params.tab2}/${params.tab3}` && (
          <Registeration changeActiveTab={this.changeActiveTab} />
        )}

        {activeTab === `/dashboard/payment/${params.tab2}/${params.tab3}` && (
          <PaymentForm data={dashboardData} changeActiveTab={this.changeActiveTab} />
        )}
        {activeTab === `/dashboard/stamp-duty/${params.tab2}/${params.tab3}` && (
          <StampDutyForm data={get(this.state, 'dashboardData', [])} />
        )}
        {activeTab === `/dashboard/upload-document/${params.tab2}` && (
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

        {get(historyData, 'propertyData', []).map(item => {
          // console.log('itemssssssssssss>>>>>>>>>>>', item)
          /*           const DocumentDutyTotal = [
            {
              propertyId: item.args.propertyId || 'None',
              landType: item.args.landType || 'None',
              owner: item.args.owner || 'None',
              surveyNumber: item.args.surveyNo || 'None',
              openParking: item.args.openParking || 'None',
              floorNumber: item.args.floorNo || 'None',
              coveredParking: item.args.coveredParking || 'None',
              area: item.args.area || 'None'
            }
          ] */
          const { created, ...rest } = item.args

          return (
            <React.Fragment>
              {/* <Paper
              padding={'26px 31px 20px'}
              radius={'0 0 6px 6px'}
              shadow={'0px 2px 6.5px 0.5px rgba(0, 0, 0, 0.06)'}
              margin={'0px 95px 0px'}
              key={item.blockHash}>
              <HalfWraper>
                <FlexWrapper flexDirection="column">
                  <InformTitle>Finance Amount</InformTitle>
                  <Formik
                    enableReinitialize
                    initialValues={{ financeAmount: '' }}
                    render={formikBag => (
                      <FormikForm marginBottom="0px">
                        <Field
                          name="financeAmount"
                          render={({ field }) => (
                            <TextInput {...field} label="Finance Amount" placeholder={'Finance Amount'} />
                          )}
                        />
                      </FormikForm>
                    )}
                  />
                </FlexWrapper>
              </HalfWraper>
            </Paper> */}

              {params.tab2 === 'add-property' ? null : (
                <Paper
                  padding={'26px 31px 20px'}
                  radius={'0 0 6px 6px'}
                  shadow={'0px 2px 6.5px 0.5px rgba(0, 0, 0, 0.06)'}
                  margin={'30px 95px 30px'}
                  key={item.blockHash}>
                  <FlexWrapper justifyContent={'space-between'}>
                    <InformTitle paddingTop={'0'} paddingBottom={'0'}>
                      Property History - {item.event}
                    </InformTitle>
                    <ArrowImg
                      src={require('../static/images/down-arrow.png')}
                      alt="arrow image"
                      onClick={() => this.collapsHandle(item.blockHash)}
                      transform={isOpened === item.blockHash}
                    />
                  </FlexWrapper>
                  <FlexWrapper
                    margin="20px 0"
                    flexDirection="row"
                    justifyContent="flex-start"
                    padding={'10px 0'}
                    borderWidth={'0 0 1px 0'}>
                    <IconCircle width={'50px'} height={'50px'} bgColor="transparent" borderColor="#ddd">
                      <h1>P</h1>
                    </IconCircle>
                    <FlexWrapper flexDirection="column" justifyContent="flex-start" padding={'0 0 0 10px'}>
                      <MediumText paddingTop={'0'} paddingBottom={'0'}>
                        {item.blockHash}
                      </MediumText>
                      <MediumText paddingTop={'0'} paddingBottom={'0'}>
                        {moment.unix(item.args.created).format('MM/DD/YYYY hh:mm:ss a')}
                      </MediumText>
                    </FlexWrapper>
                  </FlexWrapper>
                  <Collapse isOpened={isOpened === item.blockHash}>
                    <Formik
                      enableReinitialize={true}
                      initialValues={{
                        address: item.address,
                        blockNumber: item.blockNumber,
                        id: '',
                        timestamp: '',
                        remark: ''
                      }}
                      onSubmit={formValues => console.log(formValues)}
                      render={formikBag => (
                        <Form>
                          <FieldsTuple flexBasis={'calc(50% - 10px)'}>
                            <Field
                              name="address"
                              render={({ field }) => (
                                <TextInput {...field} label="Block Address" placeholder={'Block Address'} disabled />
                              )}
                            />
                            <Field
                              name="blockNumber"
                              render={({ field }) => (
                                <TextInput {...field} label="Block Number" placeholder={'Block Number'} disabled />
                              )}
                            />
                          </FieldsTuple>
                        </Form>
                      )}
                    />
                    <TableDataWrapper>
                      {keys(rest).map((item, index) => (
                        <div key={index}>
                          {console.log('item', item)}
                          <div>
                            <h3>{item}</h3>
                            <span>{rest[item]}</span>
                          </div>
                        </div>
                      ))}
                    </TableDataWrapper>
                    {/* <TupleContainer>
                  <TupleWrapper>
                    {keys(rest).map((item, index) => (
                      <Tuple fontWeight="bold" key={index}>
                        <p>{item}</p>
                      </Tuple>
                    ))}
                  </TupleWrapper>
                  <TupleWrapper>
                    {values(rest).map((item, index) => (
                      <Tuple key={index}>
                        <p>{item}</p>
                      </Tuple>
                    ))}
                  </TupleWrapper>
                </TupleContainer> */}
                  </Collapse>

                  {/* <CustomTable
                marginTop
                data={DocumentDutyTotal}
                columns={DocumentDutyColumns}
                resizable={false}
                sortable={false}
                showPagination={false}
                pageSize={10}
                defaultPageSize={10}
                minRows={0}
              /> */}
                </Paper>
              )}
            </React.Fragment>
          )
        })}

        {console.log('paramssssssssssssssssssssssssss>>>', params.tab2)}

        {params.tab2 === 'add-property'
          ? null
          : get(historyData, 'registryData', []).map(item => {
              /*const DocumentDutyTotal = [
              {
                propertyId: item.args.propertyId || 'None',
                registryId: item.args.registryId || 'None',
                buyer: item.args.buyer || 'None'
              }
            ] */
              const { created, ...rest } = item.args
              return (
                <Paper
                  padding={'26px 31px 20px'}
                  radius={'0 0 6px 6px'}
                  shadow={'0px 2px 6.5px 0.5px rgba(0, 0, 0, 0.06)'}
                  margin={'30px 95px 30px'}
                  key={item.blockHash}>
                  <FlexWrapper justifyContent={'space-between'}>
                    <InformTitle paddingTop={'0'} paddingBottom={'0'}>
                      Registry Historyyyy - {item.event}
                    </InformTitle>
                    <ArrowImg
                      src={require('../static/images/down-arrow.png')}
                      alt="arrow image"
                      onClick={() => this.collapsHandle(item.blockHash)}
                      transform={isOpened === item.blockHash}
                    />
                  </FlexWrapper>
                  <FlexWrapper
                    flexDirection="row"
                    justifyContent="flex-start"
                    padding={'10px 0'}
                    borderWidth={'0 0 1px 0'}>
                    <IconCircle width={'50px'} height={'50px'} bgColor="transparent" borderColor="#ddd">
                      <h1>R</h1>
                    </IconCircle>
                    <FlexWrapper flexDirection="column" justifyContent="flex-start" padding={'0 0 0 10px'}>
                      <MediumText paddingTop={'0'} paddingBottom={'0'}>
                        {item.blockHash}
                      </MediumText>
                      <MediumText paddingTop={'0'} paddingBottom={'0'}>
                        {moment.unix(item.args.created).format('MM/DD/YYYY hh:mm:ss a')}
                      </MediumText>
                    </FlexWrapper>
                  </FlexWrapper>
                  <Collapse isOpened={isOpened === item.blockHash}>
                    <Formik
                      enableReinitialize={true}
                      initialValues={{
                        address: item.address,
                        blockNumber: item.blockNumber,
                        id: '',
                        timestamp: '',
                        remark: '',
                        txHash: item.transactionHash
                      }}
                      onSubmit={formValues => console.log(formValues)}
                      render={formikBag => (
                        <Form>
                          <FieldsTuple flexBasis={'calc(50% - 10px)'}>
                            <Field
                              name="address"
                              render={({ field }) => (
                                <TextInput {...field} label="Block Address" placeholder={'Block Address'} disabled />
                              )}
                            />

                            <Field
                              name="blockNumber"
                              render={({ field }) => (
                                <TextInput {...field} label="Block Number" placeholder={'Block Number'} disabled />
                              )}
                            />
                          </FieldsTuple>

                          <Field
                            name="txHash"
                            render={({ field }) => (
                              <TextInput
                                {...field}
                                label="Transaction Hash"
                                placeholder={'Transaction Hash'}
                                disabled
                              />
                            )}
                          />
                        </Form>
                      )}
                    />

                    <TableDataWrapper>
                      {keys(rest).map((item, index) => (
                        <React.Fragment>
                          <div key={index}>
                            <div>
                              <h3>{item}</h3>
                              <span>{rest[item]}</span>
                            </div>
                          </div>
                        </React.Fragment>
                      ))}
                    </TableDataWrapper>

                    {/* <TupleContainer>
                    <TupleWrapper>
                      {keys(rest).map((item, index) => (
                        <Tuple key={index} fontWeight="bold">
                          <p>{item}</p>
                        </Tuple>
                      ))}
                    </TupleWrapper>
                    <TupleWrapper>
                      {values(rest).map((item, index) => (
                        <Tuple key={index}>
                          <p>{item}</p>
                        </Tuple>
                      ))}
                    </TupleWrapper>
                  </TupleContainer> */}
                  </Collapse>
                  {/* <CustomTable
                  marginTop
                  data={DocumentDutyTotal}
                  columns={RegistryHistoryColumns}
                  resizable={false}
                  sortable={false}
                  showPagination={false}
                  pageSize={10}
                  defaultPageSize={10}
                  minRows={0}
                /> */}
                </Paper>
              )
            })}
        {/*  <Paper
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
        </Paper> */}
        <Footer position={'fixed'} />
      </React.Fragment>
    )
  }
}

export { DocumentDetails }
