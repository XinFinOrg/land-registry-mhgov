import React, { Component } from 'react'
import styled from 'styled-components'
import { Formik } from 'formik'
import { Paper, FormikForm, InformTitle, Button, ButtonGroup, CustomTable, StyledHead } from '../components'
import { DocumentDutyTotal } from '../constants'

const TableWrap = styled.div`
  font-size: 16px;
  display: flex;
  border-top: 1px solid #f1f1f1;
  padding: 10px 0;
`

const TableTitle = styled.p`
  padding: 2px;
  flex-basis: 35%;
`
const TableText = styled.p`
  padding: 2px;
  flex-basis: 65%;
`
const DocketWrap = styled.div`
  padding: 10px;
  font-size: 16px;
  display: flex;
  & span {
    padding: 0px 20px;
  }
  & div {
    flex: 1;
  }
`

const DataParty = styled.div`
  background: ##f1f1f1;
  margin: 20px 0 0px 0;
  border-bottom: 1px solid #f5f5f5;
  pading-bottom: 20px;
  font-size: 16px;
  & p {
    font-size: 16px;
    margin-bottom: 100px;
  }
`
const DataPartyWrap = styled.div`
  display: flex;
  padding-bottom: 20px;
`
const DataOperator = styled.div`
  flex-basis: 40%;
`

const PartySign = styled.div`
  flex-basis: 60%;
`

const RegisterationFotText = styled.p`
  padding: 20px 0;
  font-size: 16px;
`

const PropertyWrapper = styled.div`
  border-bottom: 1px solid #f5f5f5;
`

class Registeration extends Component {
  state = {}
  render() {
    const DocumentDutyColumns = [
      {
        Header: <StyledHead>Registration Fee.</StyledHead>,
        accessor: 'srNo',
        minWidth: 100
      },
      {
        Header: <StyledHead>Stamp Duty</StyledHead>,
        accessor: 'partyName',
        minWidth: 150
      },
      {
        Header: <StyledHead>Local Duty</StyledHead>,
        accessor: 'partyType',
        minwidth: 120
      },
      {
        Header: <StyledHead>Total</StyledHead>,
        accessor: 'Total',
        minwidth: 120
      }
    ]
    return (
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
          <FormikForm>
            <Paper
              padding={'0 31px 20px'}
              radius={'0 0 6px 6px'}
              shadow={'0px 2px 6.5px 0.5px rgba(0, 0, 0, 0.06)'}
              margin={'0 95px'}>
              <InformTitle StampDutyHead="20">Property Id 147</InformTitle>
              <DocketWrap>
                <div>Article: Best Home Here</div>
                <div>Will</div>
                <div>
                  No. of Page: <span> 10</span>
                </div>
              </DocketWrap>

              <DocketWrap>
                <div>Document Registeration Date: </div>
                <div>25 Jul 2017</div>
                <div>
                  Total Fee:
                  <span> $1810</span>
                </div>
              </DocketWrap>
              <PropertyWrapper>
                <InformTitle StampDutyHead="20" StampDutyHeadBot="20">
                  Pre Registration Docket
                </InformTitle>
                <TableWrap>
                  <TableTitle>eiusmod tempor</TableTitle>
                  <TableText>Lorem ipsum dolor sit amet, consectetur adipiscing elit</TableText>
                </TableWrap>
                <TableWrap>
                  <TableTitle>eiusmod tempor</TableTitle>
                  <TableText>Lorem ipsum dolor sit amet, consectetur adipiscing elit</TableText>
                </TableWrap>
                <TableWrap>
                  <TableTitle>eiusmod tempor</TableTitle>
                  <TableText>Lorem ipsum dolor sit amet, consectetur adipiscing elit</TableText>
                </TableWrap>
                <TableWrap>
                  <TableTitle>eiusmod tempor</TableTitle>
                  <TableText>Lorem ipsum dolor sit amet, consectetur adipiscing elit</TableText>
                </TableWrap>
                <TableWrap>
                  <TableTitle>eiusmod tempor</TableTitle>
                  <TableText>Lorem ipsum dolor sit amet, consectetur adipiscing elit</TableText>
                </TableWrap>
              </PropertyWrapper>
              <PropertyWrapper>
                <InformTitle StampDutyHead="20" StampDutyHeadBot="20">
                  Property Id 148
                </InformTitle>
                <TableWrap>
                  <TableTitle>eiusmod tempor</TableTitle>
                  <TableText>Lorem ipsum dolor sit amet, consectetur adipiscing elit</TableText>
                </TableWrap>
                <TableWrap>
                  <TableTitle>eiusmod tempor</TableTitle>
                  <TableText>Lorem ipsum dolor sit amet, consectetur adipiscing elit</TableText>
                </TableWrap>
                <TableWrap>
                  <TableTitle>eiusmod tempor</TableTitle>
                  <TableText>Lorem ipsum dolor sit amet, consectetur adipiscing elit</TableText>
                </TableWrap>
                <TableWrap>
                  <TableTitle>eiusmod tempor</TableTitle>
                  <TableText>Lorem ipsum dolor sit amet, consectetur adipiscing elit</TableText>
                </TableWrap>
                <TableWrap>
                  <TableTitle>eiusmod tempor</TableTitle>
                  <TableText>Lorem ipsum dolor sit amet, consectetur adipiscing elit</TableText>
                </TableWrap>
              </PropertyWrapper>

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

              <DataParty>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore
                </p>
                <DataPartyWrap>
                  <DataOperator>
                    {' '}
                    <b> Data Entry</b>
                  </DataOperator>
                  <PartySign>
                    <b>Party Signature</b>
                  </PartySign>
                </DataPartyWrap>
              </DataParty>
              <RegisterationFotText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore
              </RegisterationFotText>
            </Paper>

            <ButtonGroup>
              <Button size={'medium'} width={'150px'} title="Previous" type="submit" disabled={true} />
              <Button size={'medium'} width={'150px'} title="Submit" type="submit" />
            </ButtonGroup>
          </FormikForm>
        )}
      />
    )
  }
}

export default Registeration
