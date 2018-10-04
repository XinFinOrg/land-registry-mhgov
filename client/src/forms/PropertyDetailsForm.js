import React, { Component } from 'react'
import styled from 'styled-components'
import { Formik, Form, Field } from 'formik'
import {
  Paper,
  FormikForm,
  FormDetailsContainer,
  TextInput,
  StaticFieldWrapper,
  StaticField,
  InformTitle,
  InformSubTitle,
  Font14,
  FieldsTuple,
  Input,
  NormalFieldsTuple,
  Button,
  ButtonGroup
} from '../components'
import axios from 'axios'
import { API_URL } from '../constants'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

class PropertyDetailsForm extends Component {
  state = {
    isLoading: false
  }
  handleFormSubmit = async values => {
    this.setState({ isLoading: true })
    try {
      const { data } = await axios.post(`${API_URL}/addProperty`, {
        propertyDetails: {
          district: values.district,
          landType: values.landType,
          taluka: values.taluka,
          localGovNo: values.localGoverning,
          city: values.cityVillage,
          location: values.location,
          surveyNo: values.surveyNumber,
          usage: 'shop',
          usageCategory: 'Non-Agriculture',
          constructedArea: values.areaOfConstructurePropertySquareMeter,
          openParking: values.openParking,
          coveredParking: values.coveredParking,
          shopFloor: values.shopFloorBasement,
          address: values.propertyAddress,
          description: values.propertyDescription,
          currentOwner: Cookies.get('email')
          /* address:values.,
          description:values.,
          currentOwner:values., */
        }
      })
      this.setState({ isLoading: false })
      console.log('DATA', data)
    } catch (error) {
      this.setState({ isLoading: false })
      console.log('ERROR', error)
    }
  }
  render() {
    const { isLoading } = this.state
    return (
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
        onSubmit={formData => this.handleFormSubmit(formData)}
        render={formikBag => (
          <FormikForm>
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
                  render={({ field }) => <TextInput {...field} label="City Village" placeholder={'City Village'} />}
                />
                <Field
                  name="location"
                  render={({ field }) => <TextInput {...field} label="Location" placeholder={'Location'} />}
                />
                <Field
                  name="surveyNumber"
                  render={({ field }) => <TextInput {...field} label="Survey Number" placeholder={'Survey Number'} />}
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
                      render={({ field }) => <TextInput {...field} label="Sqaure Meter" placeholder={'Sqaure Meter'} />}
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
                      render={({ field }) => <TextInput {...field} label="Sqaure Meter" placeholder={'Sqaure Meter'} />}
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
                      render={({ field }) => <TextInput {...field} label="Sqaure Meter" placeholder={'Sqaure Meter'} />}
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
              <Button size={'medium'} width={'150px'} disabled title="Save" type="button" />
              <Button size={'medium'} width={'150px'} isLoading={isLoading} title="Submit" type="submit" />
            </ButtonGroup>
          </FormikForm>
        )}
      />
    )
  }
}

export default PropertyDetailsForm
