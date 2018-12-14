import React, { Component } from 'react'
import styled from 'styled-components'
import { Formik, Field } from 'formik'
import {
  Paper,
  FormikForm,
  FormDetailsContainer,
  TextInput,
  InformTitle,
  Button,
  ButtonGroup,
  FieldGroupWithTitle,
  SelectBox,
  Close,
  CloseWrap,
  PaperTitle,
  Modal,
  FlexWrapper,
  StyledFlex,
  Loader
} from '../components'
import withRouter from 'react-router/withRouter'
import get from 'lodash/get'
import axios from 'axios'
import { API_URL } from '../constants'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { addFinancer } from '../utils/validator'
const SingleForm = styled('div')`
  margin-top: -30px;
`

const DesignForm = styled.div`
  display: flex;

  div {
    margin-right: 10px;
  }
`
class OwnerDetailsForm extends Component {
  state = {
    isLoading: false,
    isLoadingSkip: false,
    isLoadingReject: false,
    addOwnerStatus: false,
    addFinancier: false,
    openModal: false,
    addFinancerData: false,
    isVerified: false,
    financerAddress: '',
    isloader: true
  }
  skipFinancier = async () => {
    const {
      match: { params }
    } = this.props
    try {
      this.setState({ isLoadingSkip: true })
      await axios.post(`${API_URL}/addOwnerFinancer`, {
        registryId: params.tab3,
        propertyId: Cookies.get('propertyId'),
        ownerFinancer: false,
        status: 'registry_skip_owner_financer'
      })
      await this.setState({ isLoadingSkip: false })
      await this.props.changeActiveTab(`/dashboard/buyer-details/${params.tab2}/${params.tab3}`)
      this.props.history.push(`/dashboard/buyer-details/${params.tab2}/${params.tab3}`)
      /* await toast.success(`${'Owner Added!'}`, {
        position: toast.POSITION.TOP_CENTER
      }) */
      // this.props.history.push('/dashboard')
    } catch (error) {
      toast.error(error.response.data.errMessage, {
        position: toast.POSITION.TOP_CENTER
      })
      console.log('ERROR', error)
    }
  }
  rejectBuyerFinancer = async values => {
    const {
      match: { params }
    } = this.props
    try {
      this.setState({ isLoading: true })
      await axios.post(`${API_URL}/confirmFinancer`, {
        registryId: params.tab3,
        propertyId: Cookies.get('propertyId'),
        currentStatus: 'registry_owner_financer',
        approved: false
      })
      await this.setState({ isLoading: false })
      await toast.success(`${'Financier Rejected!'}`, {
        position: toast.POSITION.TOP_CENTER
      })
      this.props.history.push('/dashboard')
      // console.log('DATA', data)
    } catch (error) {
      await this.setState({ isLoading: false })
      toast.error(error.response.data.errMessage, {
        position: toast.POSITION.TOP_CENTER
      })
      console.log('ERROR', error)
    }
  }
  render() {
    console.log('OwnerDetailsForm', this.props)
    const {
      data,
      data: { userDetails }
    } = this.props
    console.log('OWNER', data)
    const userData = get(data, 'owner.userDetails', '')
    const {
      isLoading,
      addOwnerStatus,
      addFinancier,
      isLoadingSkip,
      isLoadingReject,
      openModal,
      isVerified,
      addFinancerData
    } = this.state
    /*     const columns = [
      {
        Header: <StyledHead>Sr. No.</StyledHead>,
        accessor: 'srNo',
        maxWidth: 100
      },
      {
        Header: <StyledHead>Location</StyledHead>,
        accessor: 'location',
        minWidth: 100,
        Cell: props => <span>{props.value}</span>
      },
      {
        Header: <StyledHead>Usage Category</StyledHead>,
        accessor: 'usageCategory',
        minwidth: 120
      },
      {
        Header: <StyledHead>Property Details</StyledHead>,
        accessor: 'propertyDetails',
        minwidth: 180
      }
    ]
    const partyDetailscolumns = [
      {
        Header: <StyledHead>Sr. No.</StyledHead>,
        accessor: 'srNo',
        maxWidth: 100
      },
      {
        Header: <StyledHead>Party Name</StyledHead>,
        accessor: 'partyName',
        maxWidth: 150,
        Cell: props => <span>{props.value}</span>
      },
      {
        Header: <StyledHead>Party Type</StyledHead>,
        accessor: 'partyType',
        minwidth: 120
      },
      {
        Header: <StyledHead>Party Category</StyledHead>,
        accessor: 'partyCategory',
        minwidth: 180
      },
      {
        Header: <StyledHead>Action</StyledHead>,
        accessor: 'action',
        maxWidth: 150,
        Cell: props => <Button size="action" shadow={'none'} title="View" radius={'4px'} />
      }
    ] */
    return (
      <React.Fragment>
        {
          <Formik
            enableReinitialize={true}
            initialValues={{
              selectPartyType: 'Admin',
              selectPartyCategory: 'Admin',
              isExecuter: 'Yes',
              salutation: get(userData, 'salutation', 'Mr'),
              partyFirstName: get(userData, 'firstName', 'Saurav'),
              partyMiddleName: get(userData, 'middleName', ''),
              partyLastName: get(userData, 'lastName', 'Gupta'),
              aliasName: get(userData, 'aliasName', 'saurav'),
              identificationMark1: get(userData, 'identityMark1', 'Mole'),
              identificationMark2: get(userData, 'identityMark2', 'Mole'),
              dateOfBirth: get(userData, 'dob', '22/12/1994'),
              age: get(userData, 'age', '24'),
              uid: get(userData, 'uid', 'safffa'),
              identificationTypeID: get(userData, 'identityTypeID', 'aasas'),
              identificationDescription: get(userData, 'identityDesc', 'assa'),
              panForm60: get(userData, 'pan', 'BHXHBH99'),
              occupation: get(userData, 'occupation', 'Employee'),
              gender: get(userData, 'gender', 'Male'),
              email: get(userData, 'email', 's@s.com'),
              mobileNo: get(userData, 'mobileNo', '999999999999'),
              presentationExemption: 'Yes', //
              pinCode: '110019', //
              addressSame: get(userData, 'permAddress', 'Delhi'),
              district: get(userData, 'district', 'Delhi'),
              taluka: get(userData, 'taluka', 'Delhi'),
              village: get(userData, 'village', 'Delhi')
            }}
            onSubmit={async (formData, { resetForm }) => {
              const {
                match: { params }
              } = this.props
              if (addOwnerStatus || get(data, 'status', {}) === 'registry_owner') {
                try {
                  this.setState({ isLoading: true })
                  await axios.post(`${API_URL}/addOwner`, {
                    registryId: params.tab3,
                    propertyId: Cookies.get('propertyId'),
                    owner: {
                      email: Cookies.get('email'),
                      address: Cookies.get('address'),
                      partyType: formData.selectPartyType,
                      partyCategory: formData.selectPartyCategory,
                      isExecuter: formData.isExecuter === 'Yes' ? true : false
                    }
                  })
                  await this.setState({ addOwnerStatus: true, isLoading: false })
                  Cookies.set('isOwner', 'yes')
                  await toast.success(`${'Owner Added!'}`, {
                    position: toast.POSITION.TOP_CENTER
                  })
                  // this.props.history.push('/dashboard')
                } catch (error) {
                  await this.setState({ isLoading: false })
                  toast.error(error.response.data.errMessage, {
                    position: toast.POSITION.TOP_CENTER
                  })
                  console.log('ERROR', error)
                }
              } else if (
                Cookies.get('email') === get(data, 'ownerFinancer.email', Cookies.get('email')) &&
                get(data, 'status', {}) === 'registry_owner_financer'
              ) {
                try {
                  this.setState({ isLoading: true })
                  await axios.post(`${API_URL}/confirmFinancer`, {
                    registryId: params.tab3,
                    propertyId: Cookies.get('propertyId'),
                    currentStatus: 'registry_owner_financer',
                    approved: true
                  })
                  await this.setState({ isLoading: false })
                  await toast.success(`${'Financier confirmed!'}`, {
                    position: toast.POSITION.TOP_CENTER
                  })
                  this.props.history.push('/dashboard')
                  // console.log('DATA', data)
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
                  await axios.post(`${API_URL}/addOwner`, {
                    registryId: params.tab3,
                    propertyId: Cookies.get('propertyId'),
                    owner: {
                      email: Cookies.get('email'),
                      address: Cookies.get('address'),
                      partyType: formData.selectPartyType,
                      partyCategory: formData.selectPartyCategory,
                      isExecuter: formData.isExecuter === 'Yes' ? true : false
                    }
                  })
                  await this.setState({ addOwnerStatus: true, isLoading: false })
                  Cookies.set('isOwner', 'yes')
                  await toast.success(`${'Owner Added!'}`, {
                    position: toast.POSITION.TOP_CENTER
                  })
                  // this.props.history.push('/dashboard')
                } catch (error) {
                  await this.setState({ isLoading: false })
                  toast.error(error.response.data.errMessage, {
                    position: toast.POSITION.TOP_CENTER
                  })
                  console.log('ERROR', error)
                }
              }
            }}
            render={formikBag => (
              <FormikForm>
                <Paper
                  padding={'0 31px 20px'}
                  radius={'0 0 6px 6px'}
                  shadow={'0px 2px 6.5px 0.5px rgba(0, 0, 0, 0.06)'}
                  margin={'0 95px'}>
                  <FormDetailsContainer flexBasis={'calc(50% - 10px)'}>
                    <Field
                      name="selectPartyType"
                      render={({ field }) => (
                        <SelectBox
                          label="Select Party Type"
                          onChange={selectPartyType =>
                            formikBag.setFieldValue('selectPartyType', selectPartyType.value)
                          }
                          options={[
                            { label: 'Individual', value: 'Individual' },
                            { label: 'Corporate', value: 'Corporate' }
                          ]}
                          placeholder="Select Party Type"
                          defaultValue={{ label: 'Individual', value: 'Individual' }}
                          isSearchable={false}
                        />
                      )}
                    />
                    {/* <Field
                      name="selectPartyCategory"
                      render={({ field }) => (
                        <SelectBox
                          label="Select Party Category"
                          onChange={selectPartyCategory =>
                            formikBag.setFieldValue('selectPartyCategory', selectPartyCategory.value)
                          }
                          options={[
                            { label: 'Individual', value: 'Individual' },
                            { label: 'Corporate', value: 'Corporate' }
                          ]}
                          placeholder="Select Party Type"
                          defaultValue={{ label: 'Individual', value: 'Individual' }}
                          isSearchable={false}
                        />
                      )}
                    /> */}
                  </FormDetailsContainer>
                  {/* <FormDetailsContainer paddingTop={'0'} display={'block'}>
                <InformTitle>List of Properties</InformTitle>
                <CustomTable
                  data={customData}
                  columns={columns}
                  resizable={false}
                  sortable={false}
                  showPagination={false}
                  pageSize={10}
                  defaultPageSize={10}
                  minRows={0}
                />{' '}
              </FormDetailsContainer> */}
                  <FormDetailsContainer>
                    <InformTitle>Parties Details</InformTitle>
                    <FieldGroupWithTitle>
                      <SingleForm>
                        <Field
                          name="isExecuter"
                          render={({ field }) => (
                            <SelectBox
                              label="Is Executer?"
                              onChange={isExecuter => formikBag.setFieldValue('isExecuter', isExecuter.value)}
                              options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
                              placeholder="Select Party Type"
                              defaultValue={{ label: 'Yes', value: 'Yes' }}
                              isSearchable={false}
                            />
                          )}
                        />
                      </SingleForm>

                      <Field
                        name="salutation"
                        render={({ field }) => (
                          <TextInput {...field} disabled label="Salutation" placeholder={'Salutation'} required />
                        )}
                      />

                      <Field
                        name="partyFirstName"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            disabled
                            label="Party First Name"
                            placeholder={'Party First Name'}
                            required
                          />
                        )}
                      />

                      <Field
                        name="partyMiddleName"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            disabled
                            label="Party Middle Name"
                            placeholder={'Party Middle Name'}
                            required
                          />
                        )}
                      />

                      <Field
                        name="partyLastName"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            disabled
                            label="Party Last Name"
                            placeholder={'Party Last Name'}
                            required
                          />
                        )}
                      />

                      <Field
                        name="aliasName"
                        render={({ field }) => (
                          <TextInput {...field} disabled label="Alias Name" placeholder={'Alias Name'} required />
                        )}
                      />

                      <Field
                        name="identificationMark1"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            disabled
                            label="Identification Mark 1"
                            placeholder={'Identification Mark 1'}
                            required
                          />
                        )}
                      />

                      <Field
                        name="identificationMark2"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            disabled
                            label="Identification Mark 2"
                            placeholder={'Identification Mark 2'}
                            required
                          />
                        )}
                      />

                      <Field
                        name="dateOfBirth"
                        render={({ field }) => (
                          <TextInput {...field} disabled label="Date of Birth" placeholder={'Date of Birth'} required />
                        )}
                      />

                      <Field
                        name="age"
                        render={({ field }) => (
                          <TextInput {...field} disabled label="Age" placeholder={'Age'} required />
                        )}
                      />

                      <Field
                        name="uid"
                        render={({ field }) => (
                          <TextInput {...field} disabled label="UID" placeholder={'UID'} required />
                        )}
                      />

                      <Field
                        name="identificationTypeID"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            disabled
                            label="Identification Type ID"
                            placeholder={'Identification Type ID'}
                            required
                          />
                        )}
                      />

                      <Field
                        name="identificationDescription"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            disabled
                            label="Identification Description"
                            placeholder={'Identification Description'}
                            required
                          />
                        )}
                      />
                      <Field
                        name="panForm60"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            disabled
                            label="PAN/Form 60/61"
                            placeholder={'PAN/Form 60/61'}
                            required
                          />
                        )}
                      />
                      <Field
                        name="occupation"
                        render={({ field }) => (
                          <TextInput {...field} disabled label="Occupation" placeholder={'Occupation'} required />
                        )}
                      />
                      <Field
                        name="gender"
                        render={({ field }) => (
                          <TextInput {...field} disabled label="Gender" placeholder={'Gender'} required />
                        )}
                      />
                      <Field
                        name="email"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            disabled
                            label="E-mail"
                            placeholder={'E-mail'}
                            required
                            error={formikBag.errors.email}
                          />
                        )}
                      />
                      <Field
                        name="mobileNo"
                        render={({ field }) => (
                          <TextInput {...field} disabled label="Mobile No." placeholder={'Mobile No.'} required />
                        )}
                      />
                      <Field
                        name="presentationExemption"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            disabled
                            label="Presentation Exemption"
                            placeholder={'Presentation Exemption'}
                            required
                          />
                        )}
                      />
                      <Field
                        name="pinCode"
                        render={({ field }) => (
                          <TextInput {...field} disabled label="PIN Code" placeholder={'PIN Code'} required />
                        )}
                      />
                      <Field
                        name="addressSame"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            disabled
                            label="Address Same As Above"
                            placeholder={'Address Same As Above'}
                            required
                          />
                        )}
                      />
                      <Field
                        name="district"
                        render={({ field }) => (
                          <TextInput {...field} disabled label="District" placeholder={'District'} required />
                        )}
                      />
                      <Field
                        name="taluka"
                        render={({ field }) => (
                          <TextInput {...field} disabled label="Taluka" placeholder={'Taluka'} required />
                        )}
                      />
                      <Field
                        name="village"
                        render={({ field }) => (
                          <TextInput {...field} disabled label="Village" placeholder={'Village'} required />
                        )}
                      />
                    </FieldGroupWithTitle>
                  </FormDetailsContainer>
                </Paper>

                {get(this.props, 'data', {}).hasOwnProperty('ownerFinancer') && (
                  <Paper
                    padding={'26px 31px 20px'}
                    radius={'0 0 6px 6px'}
                    shadow={'0px 2px 6.5px 0.5px rgba(0, 0, 0, 0.06)'}
                    margin={'0px 95px 0px'}>
                    <FlexWrapper flexDirection="column">
                      <InformTitle>Owner Finance Details</InformTitle>
                      <Formik
                        enableReinitialize
                        initialValues={{
                          email: get(data.ownerFinancer, 'email', 'N.A'),
                          name: get(data.ownerFinancer.userDetails, 'name', 'N.A'),
                          city: get(data.ownerFinancer.userDetails, 'city', 'N.A'),
                          branch: get(data.ownerFinancer.userDetails, 'branch', 'N.A'),
                          loanAmount: get(data.ownerFinancer, 'loanAmount', 'N.A'),
                          outstandingLoan: get(data.ownerFinancer, 'outstandingLoan', 'N.A')
                        }}
                        render={formikBag => (
                          <React.Fragment>
                            <FieldGroupWithTitle>
                              <Field
                                name="name"
                                render={({ field }) => (
                                  <TextInput {...field} label="Name" disabled placeholder={'Name'} />
                                )}
                              />

                              <Field
                                name="email"
                                render={({ field }) => (
                                  <TextInput {...field} disabled label="E-mail" placeholder={'E-mail'} required />
                                )}
                              />

                              <Field
                                name="city"
                                render={({ field }) => (
                                  <TextInput {...field} label="City" disabled placeholder={'City'} />
                                )}
                              />
                              <Field
                                name="branch"
                                render={({ field }) => (
                                  <TextInput {...field} label="Branch" disabled placeholder={'Branch'} />
                                )}
                              />
                            </FieldGroupWithTitle>

                            <InformTitle>Outstanding Loan Amount</InformTitle>
                            <DesignForm>
                              <Field
                                name="loanAmount"
                                render={({ field }) => (
                                  <TextInput
                                    {...field}
                                    label="Total Loan amount"
                                    placeholder={'Total  Loan amount'}
                                    error={formikBag.errors.loanAmount}
                                  />
                                )}
                              />
                              <Field
                                name="outstandingLoan"
                                render={({ field }) => (
                                  <TextInput
                                    {...field}
                                    label="Outstanding Loan amount"
                                    placeholder={'Outstanding Loan amount'}
                                    error={formikBag.errors.outstandingLoan}
                                  />
                                )}
                              />
                            </DesignForm>
                          </React.Fragment>
                        )}
                      />
                    </FlexWrapper>
                  </Paper>
                )}
                <ButtonGroup>
                  {addOwnerStatus || get(data, 'status', {}) === 'registry_owner' ? (
                    <React.Fragment>
                      <Button
                        size={'medium'}
                        width={'150px'}
                        title="Add Financer"
                        type="button"
                        onClick={() => this.setState({ addFinancier: true, openModal: true })}
                      />
                      <Button
                        size={'medium'}
                        width={'150px'}
                        title="Skip Financer"
                        type="button"
                        isLoading={isLoadingSkip}
                        disabled={isLoadingSkip}
                        onClick={() => this.skipFinancier()}
                      />
                    </React.Fragment>
                  ) : Cookies.get('email') === get(data, 'ownerFinancer.email', '') &&
                  data.status === 'registry_owner_financer' &&
                  Cookies.get('role') === 'bank' ? (
                    <React.Fragment>
                      <Button
                        size={'large'}
                        width={'150px'}
                        isLoading={isLoadingReject}
                        title="Reject Finance Details"
                        type="button"
                        disabled={isLoadingReject}
                        onClick={() => this.rejectBuyerFinancer()}
                      />
                      <Button
                        size={'large'}
                        width={'150px'}
                        isLoading={isLoading}
                        disabled={isLoading}
                        title="Confirm Finance Details"
                        type="submit"
                      />
                    </React.Fragment>
                  ) : get(data, 'status', {}) === 'registry_new' &&
                  get(data, 'owner.email', {}) === Cookies.get('email') ? (
                    <Button
                      size={'medium'}
                      isLoading={isLoading}
                      disabled={isLoading}
                      width={'150px'}
                      title="Confirm owner"
                      type="submit"
                    />
                  ) : null}
                </ButtonGroup>
              </FormikForm>
            )}
          />
        }
        {addFinancier && (
          <React.Fragment>
            <Modal show={openModal}>
              <CloseWrap>
                <PaperTitle color="#fff">Financer Details</PaperTitle>
                <Close onClick={() => this.setState({ openModal: !openModal })} />
              </CloseWrap>
              <Formik
                enableReinitialize
                initialValues={{
                  name: get(addFinancerData, 'name', ''),
                  email: get(addFinancerData, 'email', ''),
                  city: get(addFinancerData, 'city', ''),
                  branch: get(addFinancerData, 'branch', ''),
                  totalValueOfProperty: '1000000',
                  totalFinanceAmount: '10000',
                  financeAmountDueNow: '1000000',
                  loanAmount: '1000000',
                  outstandingLoan: '100000'
                }}
                validate={addFinancer}
                validateOnChange
                onSubmit={async values => {
                  const {
                    match: { params }
                  } = this.props
                  if (isVerified) {
                    try {
                      this.setState({ isLoading: true })
                      const { data } = await axios.post(`${API_URL}/addOwnerFinancer`, {
                        registryId: params.tab3,
                        propertyId: Cookies.get('propertyId'),
                        ownerFinancer: {
                          email: values.email,
                          address: this.state.financerAddress,
                          loanAmount: values.loanAmount,
                          outstandingLoan: values.outstandingLoan
                        },
                        status: 'registry_owner_financer'
                      })
                      console.log('Add financier', data)
                      await toast.success(`${'Owner financier added!'}`, {
                        position: toast.POSITION.TOP_CENTER
                      })
                      await this.setState({ isLoading: false, addFinancer: false })
                      this.props.history.push('/dashboard')
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
                      const { data } = await axios.get(`${API_URL}/getUserDetails?email=${values.email}`)
                      console.log('Add financier', data)
                      await this.setState({ financerAddress: data.data.address })
                      await toast.success(`${'Email is verified!'}`, {
                        position: toast.POSITION.TOP_CENTER
                      })
                      await this.setState({
                        isLoading: false,
                        addFinancerData: data.data,
                        isVerified: get(data.data, 'role', '') === 'bank' ? true : false
                      })
                    } catch (error) {
                      await this.setState({ isLoading: false })
                      toast.error(error.response.data.errMessage, {
                        position: toast.POSITION.TOP_CENTER
                      })
                      console.log('ERROR', error)
                    }
                  }
                }}
                render={formikBag => (
                  <React.Fragment>
                    <FormikForm marginBottom="10px">
                      <Field
                        name="email"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            label="Email Address"
                            placeholder={'Email Address'}
                            error={formikBag.errors.email}
                          />
                        )}
                      />
                      {isVerified && (
                        <React.Fragment>
                          <Field
                            name="name"
                            render={({ field }) => <TextInput {...field} label="Name" disabled placeholder={'Name'} />}
                          />
                          <StyledFlex justify="flex-start">
                            <Field
                              name="city"
                              render={({ field }) => (
                                <TextInput {...field} label="City" disabled placeholder={'City'} />
                              )}
                            />
                            <Field
                              name="branch"
                              render={({ field }) => (
                                <TextInput {...field} label="Branch" disabled placeholder={'Branch'} />
                              )}
                            />
                          </StyledFlex>
                          <InformTitle>Outstanding Loan Amount</InformTitle>
                          <StyledFlex>
                            <Field
                              name="loanAmount"
                              render={({ field }) => (
                                <TextInput
                                  {...field}
                                  label="Total Loan amount"
                                  placeholder={'Total  Loan amount'}
                                  error={formikBag.errors.loanAmount}
                                />
                              )}
                            />

                            <Field
                              name="outstandingLoan"
                              render={({ field }) => (
                                <TextInput
                                  {...field}
                                  label="Outstanding Loan amount"
                                  placeholder={'Outstanding Loan amount'}
                                  error={formikBag.errors.outstandingLoan}
                                />
                              )}
                            />
                          </StyledFlex>
                        </React.Fragment>
                      )}
                      <FlexWrapper justifyContent="center">
                        <Button
                          size={'medium'}
                          isLoading={isLoading}
                          disabled={isLoading}
                          width={'150px'}
                          title="Submit"
                          type="submit"
                        />
                      </FlexWrapper>
                    </FormikForm>
                  </React.Fragment>
                )}
              />
            </Modal>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

export default withRouter(OwnerDetailsForm)
