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
  StaticFieldWrapper,
  StaticField,
  InformTitle,
  InformSubTitle,
  Button,
  ButtonWrapper,
  Font14,
  FieldsTuple,
  NormalFieldsTuple,
  PaymentTuple,
  PaymentText,
  PaymentWrapper,
  FieldGroupWithTitle,
  StyledHeader,
  IconWrapper,
  Table
} from '../components'
import { data } from '../constants'
const PageTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  & svg {
    margin: 0 10px;
  }
`
const ButtonGroup = styled.div`
  margin: 30px 95px 0;
  display: flex;
  justify-content: flex-end;
  & button {
    margin-left: 14px;
  }
`
const PropertyDetailsWrapper = styled.div``
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
        Header: (
          <StyledHeader>
            Sr. No.
            <IconWrapper>
              <Icon icon="downarrow" /> <Icon icon="uparrow" />
            </IconWrapper>
          </StyledHeader>
        ),
        accessor: 'srNo',
        maxWidth: 100
      },
      {
        Header: (
          <StyledHeader>
            Property Id
            <IconWrapper>
              <Icon icon="downarrow" /> <Icon icon="uparrow" />
            </IconWrapper>
          </StyledHeader>
        ),
        accessor: 'propertyId',
        minWidth: 100,
        Cell: props => <span>{props.value}</span>
      },
      {
        Header: (
          <StyledHeader>
            Property Type
            <IconWrapper>
              <Icon icon="downarrow" /> <Icon icon="uparrow" />
            </IconWrapper>
          </StyledHeader>
        ),
        accessor: 'propertyType',
        minwidth: 120
      },
      {
        Header: (
          <StyledHeader>
            Property Location
            <IconWrapper>
              <Icon icon="downarrow" /> <Icon icon="uparrow" />
            </IconWrapper>
          </StyledHeader>
        ),
        accessor: 'propertyLocation',
        minwidth: 180
      },
      {
        Header: (
          <StyledHeader>
            City
            <IconWrapper>
              <Icon icon="downarrow" /> <Icon icon="uparrow" />
            </IconWrapper>
          </StyledHeader>
        ),
        accessor: 'city',
        maxWidth: 150
      },
      {
        Header: (
          <StyledHeader>
            Status
            <IconWrapper>
              <Icon icon="downarrow" /> <Icon icon="uparrow" />
            </IconWrapper>
          </StyledHeader>
        ),
        accessor: 'status',
        maxWidth: 150,
        Cell: props => (
          <Button
            size="action"
            title="View"
            background={'#fff'}
            shadow={'none'}
            fontSize={16}
            color={'#333333'}
            radius={'4px'}
            border={props.original.status === 'pending' ? 'solid 1px #ffae01' : 'solid 1px #6faa13'}
          />
        )
      },
      {
        Header: 'View',
        accessor: 'view',
        maxWidth: 150,
        Cell: props => <Button size="action" shadow={'none'} title="View" radius={'4px'} />
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
              <Icon icon="uparrow" />
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
              Seller Details
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
          </Tabber>
        </Paper>
        {activeTab === '/dashboard/document-details/property-details' && (
          <PropertyDetailsWrapper>
            <Formik
              enableReinitialize={true}
              initialValues={{
                district: '',
                landType: '',
                taluka: '',
                localGoverning: '',
                cityVillage: '',
                location: '',
                surveyNumber: '',
                areaOfConstructurePropertySquareMeter: '',
                areaOfConstructurePropertyBuildUpArea: '',
                areaOfConstructureProperty: 0,
                openParking: 0,
                openParkingSquareMeter: '',
                coveredParking: 0,
                coveredParkingSquareMeter: '',
                coveredParkingBulidArea: '',
                shopFloorBasement: '',
                propertyAddress: '',
                propertyDescription: ''
              }}
              onSubmit={formData => console.log(formData)}
              render={formikBag => (
                <Form>
                  <Paper
                    padding={'0 31px 20px'}
                    radius={'0 0 6px 6px'}
                    shadow={'0px 2px 6.5px 0.5px rgba(0, 0, 0, 0.06)'}
                    margin={'0 95px'}>
                    <FormDetailsContainer>
                      <Field
                        name="district"
                        render={({ field }) => <TextInput {...field} label="District" placeholder={'District'} />}
                      />

                      <Field
                        name="landType"
                        render={({ field }) => <TextInput {...field} label="Land Type" placeholder={'Land Type'} />}
                      />
                      <Field
                        name="taluka"
                        render={({ field }) => <TextInput {...field} label="Taluka" placeholder={'Taluka'} />}
                      />
                      <Field
                        name="localGoverning"
                        render={({ field }) => (
                          <TextInput {...field} label="Local Governing No." placeholder={'Local Governing No.'} />
                        )}
                      />
                      <Field
                        name="cityVillage"
                        render={({ field }) => (
                          <TextInput {...field} label="City Village" placeholder={'City Village'} />
                        )}
                      />
                      <Field
                        name="location"
                        render={({ field }) => <TextInput {...field} label="Location" placeholder={'Location'} />}
                      />
                      <Field
                        name="surveyNumber"
                        render={({ field }) => (
                          <TextInput {...field} label="Survey Number" placeholder={'Survey Number'} />
                        )}
                      />
                    </FormDetailsContainer>
                    <StaticFieldWrapper>
                      <StaticField>
                        <InformTitle>Property Usage</InformTitle>
                        <InformSubTitle>Non Developed Solar Energy / Wind Mill Project 20 Page 13</InformSubTitle>
                      </StaticField>
                      <StaticField>
                        <InformTitle>Usage Main Category</InformTitle>
                        <InformSubTitle>Non Agriculture Build And Open > Shop</InformSubTitle>
                      </StaticField>
                    </StaticFieldWrapper>
                    <FormDetailsContainer display={'block'} paddingTop={46}>
                      <InformTitle>Non Agriculture Build and open >> Shop >> Big Shop in Complex</InformTitle>
                      <StaticField>
                        <Font14>Area of constructure Property</Font14>
                        <FieldsTuple>
                          <Field
                            name="areaOfConstructureProperty"
                            render={({ field }) => (
                              <Input
                                {...field}
                                width={'100%'}
                                height={'100%'}
                                marginBottom={30}
                                padding={'18px 16px 23px'}
                                background={'rgba(235,235,235,0.2)'}
                                radius={'0'}
                                border={'none'}
                                shadow={'none'}
                                type="text"
                              />
                            )}
                          />
                          <Field
                            name="areaOfConstructurePropertySquareMeter"
                            render={({ field }) => (
                              <TextInput {...field} label="Sqaure Meter" placeholder={'Sqaure Meter'} />
                            )}
                          />
                          <Field
                            name="areaOfConstructurePropertyBuildUpArea"
                            render={({ field }) => (
                              <TextInput {...field} label="Build Up Area" placeholder={'Build Up Area'} />
                            )}
                          />
                        </FieldsTuple>
                      </StaticField>
                      <StaticField>
                        <Font14>Open Parking</Font14>
                        <NormalFieldsTuple>
                          <Field
                            name="openParking"
                            render={({ field }) => (
                              <Input
                                {...field}
                                width={'100%'}
                                height={'100%'}
                                marginBottom={30}
                                padding={'18px 16px 23px'}
                                background={'rgba(235,235,235,0.2)'}
                                radius={'0'}
                                border={'none'}
                                shadow={'none'}
                                type="text"
                              />
                            )}
                          />
                          <Field
                            name="openParkingSquareMeter"
                            render={({ field }) => (
                              <TextInput {...field} label="Sqaure Meter" placeholder={'Sqaure Meter'} />
                            )}
                          />
                        </NormalFieldsTuple>
                      </StaticField>
                      <StaticField>
                        <Font14>Covered Parking</Font14>
                        <FieldsTuple>
                          <Field
                            name="coveredParking"
                            render={({ field }) => (
                              <Input
                                {...field}
                                width={'100%'}
                                height={'100%'}
                                marginBottom={30}
                                padding={'18px 16px 23px'}
                                background={'rgba(235,235,235,0.2)'}
                                radius={'0'}
                                border={'none'}
                                shadow={'none'}
                                type="text"
                              />
                            )}
                          />
                          <Field
                            name="coveredParkingSquareMeter"
                            render={({ field }) => (
                              <TextInput {...field} label="Sqaure Meter" placeholder={'Sqaure Meter'} />
                            )}
                          />
                          <Field
                            name="coveredParkingBulidArea"
                            render={({ field }) => (
                              <TextInput {...field} label="Build Up Area" placeholder={'Build Up Area'} />
                            )}
                          />
                        </FieldsTuple>
                      </StaticField>
                      <StaticField>
                        <Font14>Shop Floor</Font14>
                        <FieldsTuple>
                          <Field
                            name="shopFloorBasement"
                            render={({ field }) => <TextInput {...field} label="Basement" placeholder={'Basement'} />}
                          />
                        </FieldsTuple>
                      </StaticField>
                    </FormDetailsContainer>
                    <FormDetailsContainer display={'block'} paddingTop={46}>
                      <InformTitle>Property Details</InformTitle>
                      <NormalFieldsTuple flex>
                        <Field
                          name="propertyAddress"
                          render={({ field }) => (
                            <TextInput {...field} label="Property Address" placeholder={'Property Address'} />
                          )}
                        />
                        <Field
                          name="propertyDescription"
                          render={({ field }) => (
                            <TextInput {...field} label="Property Description" placeholder={'Property Description'} />
                          )}
                        />
                      </NormalFieldsTuple>
                    </FormDetailsContainer>
                  </Paper>
                  <ButtonGroup>
                    <Button size={'medium'} width={'150px'} title="Save" type="button" />
                    <Button size={'medium'} width={'150px'} title="Submit" type="submit" />
                  </ButtonGroup>
                </Form>
              )}
            />
          </PropertyDetailsWrapper>
        )}
        {activeTab === '/dashboard/document-details/owner-details' && (
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
              <Form>
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
                  <FormDetailsContainer paddingTop={'0'}>
                    <StaticFieldWrapper>
                      <InformTitle>List of Properties</InformTitle>
                      {/*  <Table
                        data={data}
                        columns={columns}
                        resizable={false}
                        showPagination={false}
                        pageSize={10}
                        defaultPageSize={10}
                        minRows={0}
                      /> */}
                    </StaticFieldWrapper>
                  </FormDetailsContainer>
                  <FormDetailsContainer>
                    <InformTitle>Parties Details</InformTitle>
                    <FieldGroupWithTitle>
                      <Field
                        name="isExecuter"
                        render={({ field }) => (
                          <TextInput {...field} label="Is Executer?" placeholder={'Is Executer?'} />
                        )}
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
                        render={({ field }) => (
                          <TextInput {...field} label="Date of Birth" placeholder={'Date of Birth'} />
                        )}
                      />

                      <Field
                        name="age"
                        render={({ field }) => <TextInput {...field} label="Age" placeholder={'Age'} />}
                      />

                      <Field
                        name="uid"
                        render={({ field }) => <TextInput {...field} label="UID" placeholder={'UID'} />}
                      />

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
                  <FormDetailsContainer>
                    <StaticFieldWrapper>
                      <InformTitle>Details Of Parties</InformTitle>
                    </StaticFieldWrapper>
                  </FormDetailsContainer>
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
                        name="totalValueOfproperty"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            label="Total value of property"
                            placeholder={'Total value of property'}
                          />
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
                        render={({ field }) => (
                          <TextInput {...field} label="Token amount" placeholder={'Token amount'} />
                        )}
                      />
                    </NormalFieldsTuple>
                  </FormDetailsContainer>
                </Paper>
                <ButtonGroup>
                  <Button size={'medium'} width={'150px'} title="Submit" type="submit" />
                </ButtonGroup>
              </Form>
            )}
          />
        )}
        {/*   <ButtonWrapper>
          {activeTab === '/dashboard/document-details/owner-details' && (
            <Button size={'medium'} width={'150px'} isLoading={false} title="Submit" type="submit" />
          )}
          {activeTab === '/dashboard/document-details/payment' && (
            <Button size={'medium'} width={'150px'} title="Pay Now" type="submit" />
          )}
        </ButtonWrapper> */}
        <Footer />
      </React.Fragment>
    )
  }
}

export { DocumentDetails }
