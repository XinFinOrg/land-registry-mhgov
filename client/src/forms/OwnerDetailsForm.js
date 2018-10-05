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
  CustomTable,
  StyledHead
} from '../components'
import { customData, partyDetails } from '../constants'
import get from 'lodash/get'

class OwnerDetailsForm extends Component {
  state = {}
  render() {
    console.log('OwnerDetailsForm', this.props)
    const columns = [
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
    ]
    return (
      <Formik
        enableReinitialize={true}
        initialValues={{
          selectPartyType: 'Admin',
          selectPartyCategory: 'Admin',
          isExecuter: 'Yes',
          salutation: get(this.props.data, 'salutation', ''),
          partyFirstName: get(this.props.data, 'firstName', ''),
          partyMiddleName: get(this.props.data, 'middleName', ''),
          partyLastName: get(this.props.data, 'lastName', ''),
          aliasName: get(this.props.data, 'aliasName', ''),
          identificationMark1: get(this.props.data, 'identityMark1', ''),
          identificationMark2: get(this.props.data, 'identityMark2', ''),
          dateOfBirth: get(this.props.data, 'dob', ''),
          age: get(this.props.data, 'age', ''),
          uid: get(this.props.data, 'uid', ''),
          identificationTypeID: get(this.props.data, 'identityTypeID', ''),
          identificationDescription: get(this.props.data, 'identityDesc', ''),
          panForm60: get(this.props.data, 'pan', ''),
          occupation: get(this.props.data, 'occupation', ''),
          gender: get(this.props.data, 'gender', ''),
          email: get(this.props.data, 'email', ''),
          mobileNo: get(this.props.data, 'mobileNo', ''),
          presentationExemption: 'Yes', //
          pinCode: '110019', //
          addressSame: get(this.props.data, 'permAddress', ''),
          district: get(this.props.data, 'district', ''),
          taluka: get(this.props.data, 'taluka', ''),
          village: get(this.props.data, 'village', ''),
          financierName: 'Yes', //
          city: 'Pune', //
          branch: 'Pune', //
          totalValueOfProperty: '1000000', //
          totalFinanceAmount: '10000', //
          financeAmountDueNow: '1000000', //
          totalSaveAmount: '1000000', //
          tokenAmount: '100000' //
        }}
        onSubmit={formData => console.log(formData)}
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
                    <TextInput {...field} label="Select Party Type" placeholder={'Select Party Type'} />
                  )}
                />

                <Field
                  name="selectPartyCategory"
                  render={({ field }) => (
                    <TextInput {...field} label="Select Party Category" placeholder={'Select Party Category'} />
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
                    render={({ field }) => <TextInput {...field} label="Is Executer?" placeholder={'Is Executer?'} />}
                  />

                  <Field
                    name="salutation"
                    render={({ field }) => <TextInput {...field} label="Salutation" placeholder={'Salutation'} />}
                  />

                  <Field
                    name="partyFirstName"
                    render={({ field }) => (
                      <TextInput {...field} label="Party First Name" placeholder={'Party First Name'} />
                    )}
                  />

                  <Field
                    name="partyMiddleName"
                    render={({ field }) => (
                      <TextInput {...field} label="Party Middle Name" placeholder={'Party Middle Name'} />
                    )}
                  />

                  <Field
                    name="partyLastName"
                    render={({ field }) => (
                      <TextInput {...field} label="Party Last Name" placeholder={'Party Last Name'} />
                    )}
                  />

                  <Field
                    name="aliasName"
                    render={({ field }) => <TextInput {...field} label="Alias Name" placeholder={'Alias Name'} />}
                  />

                  <Field
                    name="identificationMark1"
                    render={({ field }) => (
                      <TextInput {...field} label="Identification Mark 1" placeholder={'Identification Mark 1'} />
                    )}
                  />

                  <Field
                    name="identificationMark2"
                    render={({ field }) => (
                      <TextInput {...field} label="Identification Mark 2" placeholder={'Identification Mark 2'} />
                    )}
                  />

                  <Field
                    name="dateOfBirth"
                    render={({ field }) => <TextInput {...field} label="Date of Birth" placeholder={'Date of Birth'} />}
                  />

                  <Field name="age" render={({ field }) => <TextInput {...field} label="Age" placeholder={'Age'} />} />

                  <Field name="uid" render={({ field }) => <TextInput {...field} label="UID" placeholder={'UID'} />} />

                  <Field
                    name="identificationTypeID"
                    render={({ field }) => (
                      <TextInput {...field} label="Identification Type ID" placeholder={'Identification Type ID'} />
                    )}
                  />

                  <Field
                    name="identificationDescription"
                    render={({ field }) => (
                      <TextInput
                        {...field}
                        label="Identification Description"
                        placeholder={'Identification Description'}
                      />
                    )}
                  />

                  <Field
                    name="panForm60"
                    render={({ field }) => (
                      <TextInput {...field} label="PAN/Form 60/61" placeholder={'PAN/Form 60/61'} />
                    )}
                  />

                  <Field
                    name="occupation"
                    render={({ field }) => <TextInput {...field} label="Occupation" placeholder={'Occupation'} />}
                  />

                  <Field
                    name="gender"
                    render={({ field }) => <TextInput {...field} label="Gender" placeholder={'Gender'} />}
                  />

                  <Field
                    name="email"
                    render={({ field }) => <TextInput {...field} label="E-mail" placeholder={'E-mail'} />}
                  />

                  <Field
                    name="mobileNo"
                    render={({ field }) => <TextInput {...field} label="Mobile No." placeholder={'Mobile No.'} />}
                  />

                  <Field
                    name="presentationExemption"
                    render={({ field }) => (
                      <TextInput {...field} label="Presentation Exemption" placeholder={'Presentation Exemption'} />
                    )}
                  />

                  <Field
                    name="pinCode"
                    render={({ field }) => <TextInput {...field} label="PIN Code" placeholder={'PIN Code'} />}
                  />

                  <Field
                    name="addressSame"
                    render={({ field }) => (
                      <TextInput {...field} label="Address Same As Above" placeholder={'Address Same As Above'} />
                    )}
                  />

                  <Field
                    name="district"
                    render={({ field }) => <TextInput {...field} label="District" placeholder={'District'} />}
                  />

                  <Field
                    name="taluka"
                    render={({ field }) => <TextInput {...field} label="Taluka" placeholder={'Taluka'} />}
                  />

                  <Field
                    name="village"
                    render={({ field }) => <TextInput {...field} label="Village" placeholder={'Village'} />}
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
              <FormDetailsContainer>
                <InformTitle>Financier Details</InformTitle>
                <FieldGroupWithTitle>
                  <Field
                    name="financierName"
                    render={({ field }) => (
                      <TextInput {...field} label="Financier Name" placeholder={'Financier Name'} />
                    )}
                  />

                  <Field
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
                  />
                </FieldGroupWithTitle>
              </FormDetailsContainer>
              <FormDetailsContainer>
                <InformTitle>Outstanding Loan Amount</InformTitle>
                <NormalFieldsTuple shrink>
                  <Field
                    name="totalSaveAmount"
                    render={({ field }) => (
                      <TextInput {...field} label="Total save amount" placeholder={'Total save amount'} />
                    )}
                  />

                  <Field
                    name="tokenAmount"
                    render={({ field }) => <TextInput {...field} label="Token amount" placeholder={'Token amount'} />}
                  />
                </NormalFieldsTuple>
              </FormDetailsContainer>
            </Paper>
            <ButtonGroup>
              <Button size={'medium'} width={'150px'} title="Submit" type="submit" />
            </ButtonGroup>
          </FormikForm>
        )}
      />
    )
  }
}

export default OwnerDetailsForm
