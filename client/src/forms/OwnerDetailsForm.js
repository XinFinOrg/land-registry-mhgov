import React, { Component } from 'react'
import { Formik, Field } from 'formik'
import {
  Paper,
  FormikForm,
  FormDetailsContainer,
  TextInput,
  InformTitle,
  NormalFieldsTuple,
  Button,
  ButtonGroup,
  FieldGroupWithTitle,
  // CustomTable,
  // StyledHead,
  SelectBox
} from '../components'
// import { customData, partyDetails } from '../constants'
import withRouter from 'react-router/withRouter'

import get from 'lodash/get'
import axios from 'axios'
import { API_URL } from '../constants'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

class OwnerDetailsForm extends Component {
  state = {
    isLoading: false,
    isLoadingSkip: false,
    addOwnerStatus: false,
    addFinancier: false
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
      toast.error(`${'Some error occurred!'}`, {
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
    const { isLoading, addOwnerStatus, addFinancier, isLoadingSkip } = this.state
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
        <Formik
          enableReinitialize={true}
          initialValues={{
            selectPartyType: 'Admin',
            selectPartyCategory: 'Admin',
            isExecuter: 'Yes',
            salutation: get(userDetails, 'salutation', 'Mr'),
            partyFirstName: get(userDetails, 'firstName', 'Saurav'),
            partyMiddleName: get(userDetails, 'middleName', ''),
            partyLastName: get(userDetails, 'lastName', 'Gupta'),
            aliasName: get(userDetails, 'aliasName', 'saurav'),
            identificationMark1: get(userDetails, 'identityMark1', 'Mole'),
            identificationMark2: get(userDetails, 'identityMark2', 'Mole'),
            dateOfBirth: get(userDetails, 'dob', '22/12/1994'),
            age: get(userDetails, 'age', '24'),
            uid: get(userDetails, 'uid', 'safffa'),
            identificationTypeID: get(userDetails, 'identityTypeID', 'aasas'),
            identificationDescription: get(userDetails, 'identityDesc', 'assa'),
            panForm60: get(userDetails, 'pan', 'BHXHBH99'),
            occupation: get(userDetails, 'occupation', 'Employee'),
            gender: get(userDetails, 'gender', 'Male'),
            email: get(userDetails, 'email', 's@s.com'),
            mobileNo: get(userDetails, 'mobileNo', '999999999999'),
            presentationExemption: 'Yes', //
            pinCode: '110019', //
            addressSame: get(userDetails, 'permAddress', 'Delhi'),
            district: get(userDetails, 'district', 'Delhi'),
            taluka: get(userDetails, 'taluka', 'Delhi'),
            village: get(userDetails, 'village', 'Delhi')
          }}
          onSubmit={async (formData, { resetForm }) => {
            const {
              match: { params }
            } = this.props
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
              toast.error(`${'Some error occurred!'}`, {
                position: toast.POSITION.TOP_CENTER
              })
              console.log('ERROR', error)
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
                        onChange={selectPartyType => formikBag.setFieldValue('selectPartyType', selectPartyType.value)}
                        options={[{ label: 'Admin', value: 'Admin' }, { label: 'User', value: 'User' }]}
                        placeholder="Select Party Type"
                        defaultValue={{ label: 'Admin', value: 'Admin' }}
                        isSearchable={false}
                      />
                    )}
                  />
                  <Field
                    name="selectPartyCategory"
                    render={({ field }) => (
                      <SelectBox
                        label="Select Party Category"
                        onChange={selectPartyCategory =>
                          formikBag.setFieldValue('selectPartyCategory', selectPartyCategory.value)
                        }
                        options={[{ label: 'Admin', value: 'Admin' }, { label: 'User', value: 'User' }]}
                        placeholder="Select Party Type"
                        defaultValue={{ label: 'Admin', value: 'Admin' }}
                        isSearchable={false}
                      />
                    )}
                  />
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

                    <Field
                      name="salutation"
                      render={({ field }) => (
                        <TextInput {...field} disabled label="Salutation" placeholder={'Salutation'} />
                      )}
                    />

                    <Field
                      name="partyFirstName"
                      render={({ field }) => (
                        <TextInput {...field} disabled label="Party First Name" placeholder={'Party First Name'} />
                      )}
                    />

                    <Field
                      name="partyMiddleName"
                      render={({ field }) => (
                        <TextInput {...field} disabled label="Party Middle Name" placeholder={'Party Middle Name'} />
                      )}
                    />

                    <Field
                      name="partyLastName"
                      render={({ field }) => (
                        <TextInput {...field} disabled label="Party Last Name" placeholder={'Party Last Name'} />
                      )}
                    />

                    <Field
                      name="aliasName"
                      render={({ field }) => (
                        <TextInput {...field} disabled label="Alias Name" placeholder={'Alias Name'} />
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
                        />
                      )}
                    />

                    <Field
                      name="dateOfBirth"
                      render={({ field }) => (
                        <TextInput {...field} disabled label="Date of Birth" placeholder={'Date of Birth'} />
                      )}
                    />

                    <Field
                      name="age"
                      render={({ field }) => <TextInput {...field} disabled label="Age" placeholder={'Age'} />}
                    />

                    <Field
                      name="uid"
                      render={({ field }) => <TextInput {...field} disabled label="UID" placeholder={'UID'} />}
                    />

                    <Field
                      name="identificationTypeID"
                      render={({ field }) => (
                        <TextInput
                          {...field}
                          disabled
                          label="Identification Type ID"
                          placeholder={'Identification Type ID'}
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
                        />
                      )}
                    />

                    <Field
                      name="panForm60"
                      render={({ field }) => (
                        <TextInput {...field} disabled label="PAN/Form 60/61" placeholder={'PAN/Form 60/61'} />
                      )}
                    />

                    <Field
                      name="occupation"
                      render={({ field }) => (
                        <TextInput {...field} disabled label="Occupation" placeholder={'Occupation'} />
                      )}
                    />

                    <Field
                      name="gender"
                      render={({ field }) => <TextInput {...field} disabled label="Gender" placeholder={'Gender'} />}
                    />

                    <Field
                      name="email"
                      render={({ field }) => <TextInput {...field} disabled label="E-mail" placeholder={'E-mail'} />}
                    />

                    <Field
                      name="mobileNo"
                      render={({ field }) => (
                        <TextInput {...field} disabled label="Mobile No." placeholder={'Mobile No.'} />
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
                        />
                      )}
                    />

                    <Field
                      name="pinCode"
                      render={({ field }) => (
                        <TextInput {...field} disabled label="PIN Code" placeholder={'PIN Code'} />
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
                        />
                      )}
                    />

                    <Field
                      name="district"
                      render={({ field }) => (
                        <TextInput {...field} disabled label="District" placeholder={'District'} />
                      )}
                    />

                    <Field
                      name="taluka"
                      render={({ field }) => <TextInput {...field} disabled label="Taluka" placeholder={'Taluka'} />}
                    />

                    <Field
                      name="village"
                      render={({ field }) => <TextInput {...field} disabled label="Village" placeholder={'Village'} />}
                    />
                  </FieldGroupWithTitle>
                </FormDetailsContainer>
                {/* <FormDetailsContainer display="block">
                <InformTitle>Details Of Parties</InformTitle>
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
              </FormDetailsContainer> */}
              </Paper>
              <ButtonGroup>
                {addOwnerStatus || Cookies.get('isOwner') === 'yes' ? (
                  <React.Fragment>
                    <Button
                      size={'medium'}
                      width={'150px'}
                      title="Add Financier"
                      type="button"
                      onClick={() => this.setState({ addFinancier: true })}
                    />
                    <Button
                      size={'medium'}
                      width={'150px'}
                      title="Skip Financier"
                      type="button"
                      isLoading={isLoadingSkip}
                      disabled={isLoadingSkip}
                      onClick={() => this.skipFinancier()}
                    />
                  </React.Fragment>
                ) : get(data, 'status', {}) === 'registry_new' ? (
                  <Button
                    size={'medium'}
                    isLoading={isLoading}
                    disabled={isLoading}
                    width={'150px'}
                    title="Add owner"
                    type="submit"
                  />
                ) : null}
              </ButtonGroup>
            </FormikForm>
          )}
        />
        {addFinancier && (
          <React.Fragment>
            <Formik
              enableReinitialize
              initialValues={{
                email: '', //
                city: 'Pune', //
                branch: 'Pune', //
                totalValueOfProperty: '1000000', //
                totalFinanceAmount: '10000', //
                financeAmountDueNow: '1000000', //
                loanAmount: '1000000', //
                outstandingLoan: '100000' //
              }}
              onSubmit={async values => {
                const {
                  match: { params }
                } = this.props

                try {
                  this.setState({ isLoading: true })

                  const { data } = await axios.post(`${API_URL}/addOwner`, {
                    registryId: params.tab3,
                    propertyId: Cookies.get('propertyId'),
                    ownerFinancer: {
                      email: Cookies.get('email'),
                      address: Cookies.get('address'),
                      loanAmount: values.loanAmount,
                      outstandingLoan: values.outstandingLoan
                    },
                    status: 'registry_owner_financer'
                  })
                  console.log('Add financier', data)
                  await toast.success(`${'Owner financier added!'}`, {
                    position: toast.POSITION.TOP_CENTER
                  })
                  await this.setState({ isLoading: false })
                  this.props.history.push('/dashboard')
                } catch (error) {
                  await this.setState({ isLoading: false })
                  toast.error(`${'Some error occurred!'}`, {
                    position: toast.POSITION.TOP_CENTER
                  })
                  console.log('ERROR', error)
                }
              }}
              render={formikBag => (
                <React.Fragment>
                  <FormikForm>
                    <Paper
                      padding={'0 31px 20px'}
                      radius={'0 0 6px 6px'}
                      shadow={'0px 2px 6.5px 0.5px rgba(0, 0, 0, 0.06)'}
                      margin={'0 95px'}>
                      <FormDetailsContainer>
                        <InformTitle>Financier Details</InformTitle>
                        <FieldGroupWithTitle>
                          <Field
                            name="email"
                            render={({ field }) => (
                              <TextInput {...field} label="Email Address" placeholder={'Email Address'} required />
                            )}
                          />

                          {/* <Field
                        name="city"
                        render={({ field }) => <TextInput {...field} label="City" placeholder={'City'} />}
                      />
  
                      <Field
                        name="branch"
                        render={({ field }) => <TextInput {...field} label="Branch" placeholder={'Branch'} />}
                      />
  
                      <Field
                        name="totalValueOfProperty"
                        render={({ field }) => (
                          <TextInput {...field} label="Total Value of Property" placeholder={'Total Value of Property'} />
                        )}
                      />
  
                      <Field
                        name="totalFinanceAmount"
                        render={({ field }) => (
                          <TextInput {...field} label="Total finance amount" placeholder={'Total finance amount'} />
                        )}
                      />
  
                      <Field
                        name="financeAmountDueNow"
                        render={({ field }) => (
                          <TextInput {...field} label="Finance amount due now" placeholder={'Finance amount due now'} />
                        )}
                      /> */}
                        </FieldGroupWithTitle>
                      </FormDetailsContainer>
                      <FormDetailsContainer>
                        <InformTitle>Outstanding Loan Amount</InformTitle>
                        <NormalFieldsTuple shrink>
                          <Field
                            name="loanAmount"
                            render={({ field }) => (
                              <TextInput {...field} label="Loan amount" placeholder={'Loan amount'} />
                            )}
                          />

                          <Field
                            name="outstandingLoan"
                            render={({ field }) => (
                              <TextInput
                                {...field}
                                label="Outstanding Loan amount"
                                placeholder={'Outstanding Loan amount'}
                              />
                            )}
                          />
                        </NormalFieldsTuple>
                      </FormDetailsContainer>
                    </Paper>
                    <ButtonGroup>
                      <Button
                        size={'medium'}
                        isLoading={isLoading}
                        disabled={isLoading}
                        width={'150px'}
                        title="Submit"
                        type="submit"
                      />
                    </ButtonGroup>
                  </FormikForm>
                </React.Fragment>
              )}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

export default withRouter(OwnerDetailsForm)
