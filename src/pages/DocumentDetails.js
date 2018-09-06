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
  ButtonWrapper
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
    activeTab: '/dashboard/document-details/property-details'
  }
  render() {
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
            surveyNumber: ''
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
                  </React.Fragment>
                )}
              </Paper>
              <ButtonWrapper>
                <Button size={'medium'} width={'150px'} title="Save" type="button" />
                <Button size={'medium'} width={'150px'} title="Submit" type="submit" />
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
