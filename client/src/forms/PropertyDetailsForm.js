import React, { Component } from 'react'
import { Formik, Field, Form } from 'formik'
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
  ButtonGroup,
  SelectBox,
  Modal
} from '../components'
import axios from 'axios'
import { API_URL } from '../constants'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import get from 'lodash/get'
import withRouter from 'react-router/withRouter'

class PropertyDetailsForm extends Component {
  state = {
    isLoading: false,
    isLoadingReject: false,
    openModal: false
  }

  rejectProperty = async values => {
    const {
      match: { params }
    } = this.props
    try {
      this.setState({ isLoadingReject: true })
      const { data } = await axios.post(`${API_URL}/confirmProperty`, {
        propertyId: params.tab3,
        status: 'property_rejected',
        email: Cookies.get('email'),
        role: Cookies.get('role')
      })
      await this.setState({ isLoadingReject: false })
      await toast.success(`${'Property rejected!'}`, {
        position: toast.POSITION.TOP_CENTER
      })
      this.props.history.push('/dashboard')
      console.log('DATA', data)
    } catch (error) {
      await this.setState({ isLoadingReject: false })
      toast.error(`${'Some error occurred!'}`, {
        position: toast.POSITION.TOP_CENTER
      })
      console.log('ERROR', error)
    }
  }

  render() {
    const { isLoading, isLoadingReject, openModal } = this.state
    const {
      match: { params },
      data
    } = this.props
    console.log('PROPS data==>', data)
    return (
      <React.Fragment>
        <Formik
          enableReinitialize={true}
          initialValues={{
            district: get(this.props.data, 'district', 'Pune'),
            landType: get(this.props.data, 'landType', 'Agricultural'),
            taluka: get(this.props.data, 'taluka', 'Pune'),
            localGoverning: get(this.props.data, 'localGovNo', 'MV123'),
            cityVillage: get(this.props.data, 'city', 'Pune'),
            location: get(this.props.data, 'location', 'Maharastra'),
            surveyNumber: get(this.props.data, 'surveyNo', 'S12345'),
            propertyUsage: get(this.props.data, 'propertyUsage', 'Shop'),
            usage: get(this.props.data, 'usage', 'Non-Agriculture'),
            areaOfConstructurePropertySquareMeter: get(this.props.data, 'constructedArea', '20'),
            areaOfConstructurePropertyBuildUpArea: '30',
            areaOfConstructureProperty: '30',
            openParking: get(this.props.data, 'openParking', 'yes'),
            openParkingSquareMeter: '10',
            coveredParking: get(this.props.data, 'coveredParking', '10'),
            coveredParkingSquareMeter: '10',
            coveredParkingBulidArea: '10',
            shopFloorBasement: get(this.props.data, 'shopFloor', 'Yes'),
            propertyAddress: get(this.props.data, 'address', 'Street Address'),
            propertyDescription: get(this.props.data, 'description', 'Ground floor')
          }}
          onSubmit={async values => {
            this.setState({ isLoading: true })
            if (Cookies.get('role') === 'corporation') {
              try {
                this.setState({ isLoading: true })
                const { data } = await axios.post(`${API_URL}/confirmProperty`, {
                  propertyId: params.tab3,
                  status: 'property_verified',
                  email: Cookies.get('email'),
                  role: Cookies.get('role')
                })
                await this.setState({ isLoading: false })
                await toast.success(`${'Property confirmed!'}`, {
                  position: toast.POSITION.TOP_CENTER
                })
                this.props.history.push('/dashboard')
                console.log('DATA', data)
              } catch (error) {
                await this.setState({ isLoading: false })
                toast.error(`${'Some error occurred!'}`, {
                  position: toast.POSITION.TOP_CENTER
                })
                console.log('ERROR', error)
              }
            } else {
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
                    owner: {
                      email: Cookies.get('email'),
                      address: Cookies.get('address')
                    }
                    /* address:values.,
                  description:values.,
                  currentOwner:values., */
                  }
                })
                await this.setState({ isLoading: false })
                await toast.success(`${'Property added successfully'}`, {
                  position: toast.POSITION.TOP_CENTER
                })
                this.props.history.push('/dashboard')
                // show toast
                console.log('DATA', data)
              } catch (error) {
                await this.setState({ isLoading: false })
                toast.error(`${'Error!!!'}`, {
                  position: toast.POSITION.TOP_CENTER
                })
                console.log('ERROR', error)
                // show toast
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
                    render={({ field }) => <TextInput {...field} label="City" placeholder={'City'} />}
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
                    <Field
                      name="propertyUsage"
                      render={({ field }) => (
                        <SelectBox
                          onChange={propertyUsage => formikBag.setFieldValue('propertyUsage', propertyUsage.value)}
                          options={[{ label: 'Shop', value: 'Shop' }]}
                          placeholder="Property Usage"
                          defaultValue={{ label: 'Shop', value: 'Shop' }}
                          isSearchable={false}
                        />
                      )}
                    />
                  </StaticField>
                  <StaticField>
                    <InformTitle>Usage Main Category</InformTitle>
                    <Field
                      name="usage"
                      render={({ field }) => (
                        <SelectBox
                          onChange={usage => formikBag.setFieldValue('usage', usage.value)}
                          options={[{ label: 'Non-Agriculture', value: 'Non-Agriculture' }]}
                          placeholder="Usage Main Category"
                          value={{ label: 'Non-Agriculture', value: 'Non-Agriculture' }}
                          isSearchable={false}
                        />
                      )}
                    />
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
                {/* <Button size={'medium'} width={'150px'} disabled title="Save" type="button" /> */}
                {Cookies.get('role') === 'corporation' && get(data, 'status', {}) === 'property_new' ? (
                  <React.Fragment>
                    <Button
                      size={'medium'}
                      width={'150px'}
                      isLoading={isLoadingReject}
                      disabled={isLoadingReject}
                      title="reject"
                      type="button"
                      onClick={() => this.rejectProperty()}
                    />
                    <Button
                      size={'medium'}
                      width={'150px'}
                      isLoading={isLoading}
                      disabled={isLoading}
                      title="Confirm"
                      type="submit"
                    />
                  </React.Fragment>
                ) : Cookies.get('role') === 'individual' &&
                get(data, 'owner.email', {}) === Cookies.get('email') &&
                get(data, 'status', {}) === 'property_verified' ? (
                  <Button
                    size={'medium'}
                    width={'150px'}
                    isLoading={isLoading}
                    disabled={isLoading}
                    title="Sell"
                    type="button"
                    onClick={() => this.setState({ openModal: true })}
                  />
                ) : (
                  <Button
                    size={'medium'}
                    width={'150px'}
                    isLoading={isLoading}
                    disabled={isLoading}
                    title="submit"
                    type="submit"
                  />
                )}
              </ButtonGroup>
            </FormikForm>
          )}
        />

        <Modal show={openModal}>
          <Formik
            enableReinitialize={true}
            initialValues={{
              sellPrice: 10000000,
              tokenAmt: 50000
            }}
            onSubmit={async values => {
              this.setState({ isLoading: true })
              try {
                const { data } = await axios.post(`${API_URL}/sellProperty`, {
                  propertyId: params.tab3,
                  owner: {
                    email: Cookies.get('email'),
                    address: Cookies.get('address')
                  },
                  sellPrice: values.sellPrice,
                  tokenAmt: values.tokenAmt
                })
                await this.setState({ isLoading: false })
                await toast.success(`${'Property sold!'}`, {
                  position: toast.POSITION.TOP_CENTER
                })
                this.props.history.push('/dashboard')
                console.log('DATA', data)
              } catch (error) {
                await this.setState({ isLoading: false })
                toast.error(`${'Some error occurred!'}`, {
                  position: toast.POSITION.TOP_CENTER
                })
                console.log('ERROR', error)
              }
            }}
            render={formikBag => (
              <Form>
                <Field
                  name="sellPrice"
                  render={({ field }) => (
                    <TextInput {...field} label="Sell Price" placeholder={'Sell Price'} required />
                  )}
                />
                <Field
                  name="tokenAmt"
                  render={({ field }) => (
                    <TextInput {...field} label="Token Amount" placeholder={'Token Amount'} required />
                  )}
                />
                <ButtonGroup>
                  <Button
                    size={'medium'}
                    width={'150px'}
                    title="Cancel"
                    type="button"
                    onClick={() => this.setState({ openModal: false })}
                  />
                  <Button
                    size={'medium'}
                    width={'150px'}
                    isLoading={isLoading}
                    disabled={isLoading}
                    title="Confirm"
                    type="submit"
                  />
                </ButtonGroup>
              </Form>
            )}
          />
        </Modal>
      </React.Fragment>
    )
  }
}

export default withRouter(PropertyDetailsForm)
