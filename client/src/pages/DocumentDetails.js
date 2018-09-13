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
  FieldGroupWithTitle
} from '../components'

const PageTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  & svg {
    margin: 0 10px;
  }
`
class DocumentDetails extends Component {
  state = {
    activeTab: this.props.location.pathname
  }
  /* componentDidMount = () => {
    this.setState({activeTab: "/dashboard/document-details/property-details"})
  } */

  render() {
    console.log(this.props)
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
            propertyDescription: '',
            selectPartyType: '',
            selectPartyCategory: 'Individual'
          }}
          onSubmit={formData => console.log(formData)}
          render={formikBag => (
            <Form>
              <Paper raidus={6} shadow={'0px 2px 6.5px 0.5px rgba(0, 0, 0, 0.06)'} margin={'0 95px'}>
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
                {activeTab === '/dashboard/document-details/property-details' && (
                  <React.Fragment>
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
                  </React.Fragment>
                )}
                {activeTab === '/dashboard/document-details/owner-details' && (
                  <React.Fragment>
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
                    <FormDetailsContainer>
                      <StaticFieldWrapper>
                        <InformTitle>List of Properties</InformTitle>
                      </StaticFieldWrapper>
                    </FormDetailsContainer>
                    <FormDetailsContainer>
                      <InformTitle>Parties Details</InformTitle>
                      <FieldGroupWithTitle>
                        <TextInput label="Local Governing No." placeholder={'Local Governing No.'} />
                        <TextInput label="Local Governing No." placeholder={'Local Governing No.'} />
                        <TextInput label="Local Governing No." placeholder={'Local Governing No.'} />
                        <TextInput label="Local Governing No." placeholder={'Local Governing No.'} />
                        <TextInput label="Local Governing No." placeholder={'Local Governing No.'} />
                        <TextInput label="Local Governing No." placeholder={'Local Governing No.'} />
                        <TextInput label="Local Governing No." placeholder={'Local Governing No.'} />
                        <TextInput label="Local Governing No." placeholder={'Local Governing No.'} />
                        <TextInput label="Local Governing No." placeholder={'Local Governing No.'} />
                        <TextInput label="Local Governing No." placeholder={'Local Governing No.'} />
                        <TextInput label="Local Governing No." placeholder={'Local Governing No.'} />
                        <TextInput label="Local Governing No." placeholder={'Local Governing No.'} />
                        <TextInput label="Local Governing No." placeholder={'Local Governing No.'} />
                        <TextInput label="Local Governing No." placeholder={'Local Governing No.'} />
                        <TextInput label="Local Governing No." placeholder={'Local Governing No.'} />
                        <TextInput label="Local Governing No." placeholder={'Local Governing No.'} />
                        <TextInput label="Local Governing No." placeholder={'Local Governing No.'} />
                        <TextInput label="Local Governing No." placeholder={'Local Governing No.'} />
                        <TextInput label="Local Governing No." placeholder={'Local Governing No.'} />
                        <TextInput label="Local Governing No." placeholder={'Local Governing No.'} />
                        <TextInput label="Local Governing No." placeholder={'Local Governing No.'} />
                        <TextInput label="Local Governing No." placeholder={'Local Governing No.'} />
                        <TextInput label="Local Governing No." placeholder={'Local Governing No.'} />
                        <TextInput label="Local Governing No." placeholder={'Local Governing No.'} />
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
                        <TextInput label="Local Governing No." placeholder={'Local Governing No.'} />
                        <TextInput label="Local Governing No." placeholder={'Local Governing No.'} />
                        <TextInput label="Local Governing No." placeholder={'Local Governing No.'} />
                        <TextInput label="Local Governing No." placeholder={'Local Governing No.'} />
                        <TextInput label="Local Governing No." placeholder={'Local Governing No.'} />
                        <TextInput label="Local Governing No." placeholder={'Local Governing No.'} />
                      </FieldGroupWithTitle>
                    </FormDetailsContainer>
                    <FormDetailsContainer>
                      <InformTitle>Outstanding Loan Amount</InformTitle>
                      <NormalFieldsTuple shrink>
                        <TextInput label="Local Governing No." placeholder={'Local Governing No.'} />
                        <TextInput label="Local Governing No." placeholder={'Local Governing No.'} />
                      </NormalFieldsTuple>
                    </FormDetailsContainer>
                  </React.Fragment>
                )}
                {activeTab === '/dashboard/document-details/payment' && (
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
                )}
              </Paper>
              <ButtonWrapper>
                {activeTab === '/dashboard/document-details/property-details' && (
                  <React.Fragment>
                    <Button size={'medium'} width={'150px'} title="Save" type="button" />
                    <Button size={'medium'} width={'150px'} title="Submit" type="submit" />
                  </React.Fragment>
                )}
                {activeTab === '/dashboard/document-details/owner-details' && (
                  <Button size={'medium'} width={'150px'} isLoading={false} title="Submit" type="submit" />
                )}
                {activeTab === '/dashboard/document-details/payment' && (
                  <Button size={'medium'} width={'150px'} title="Pay Now" type="submit" />
                )}
              </ButtonWrapper>
            </Form>
          )}
        />
        <Footer />
      </React.Fragment>
    )
  }
}

export { DocumentDetails }
