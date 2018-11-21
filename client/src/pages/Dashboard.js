import React, { Component } from 'react'

import {
  Header,
  Footer,
  MainWrapper,
  PageTitle,
  TopWrapper,
  Input,
  Button,
  Icon,
  StyledHeader,
  IconWrapper,
  FlexWrapper
} from '../components'
import { Table } from '../components/Table'
import { data } from '../constants'
import Cookies from 'js-cookie'
import axios from 'axios'
import { API_URL } from '../constants'
import styled from 'styled-components'

const Status = styled.div`
  border-radius: 4px;
  background: #fff;
  color: #6faa13;
  border: 1px solid #6faa13;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  padding: 0 4px;
  max-width: 150px;
  word-break: break-all;
`

class Dashboard extends Component {
  state = {
    dashboardData: []
  }
  handlePageChange = currentPage => {
    // this.setState({ currentPage })
    // console.log('CURRENT PAGE', currentPage)
  }
  async componentDidMount() {
    try {
      const { data } = await axios.post(`${API_URL}/getDashboard`, {
        email: Cookies.get('email'),
        role: Cookies.get('role')
      })
      // console.log('DATA', data.data)
      this.setState({ dashboardData: data.data })
    } catch (error) {
      console.log('ERROR', error)
    }
  }

  handleRedirect = (registryId, propertyId) => {
    Cookies.set('propertyId', propertyId)
    Cookies.set('registryId', registryId)
    if (registryId === '') {
      this.props.history.push(`/dashboard/property-details/propertyId/${propertyId}`)
    } else {
      this.props.history.push(`/dashboard/property-details/registryId/${registryId}`)
    }
  }
  render() {
    const { dashboardData } = this.state
    // console.log('dashboardData=====>', dashboardData)
    const tableData = dashboardData.map((item, index) => ({
      srNo: index + 1,
      propertyId: item.propertyId,
      registryId: item.registryId || '',
      propertyType: item.landType || item.propertyDetails.landType,
      propertyLocation: item.address || item.propertyDetails.address,
      city: item.city || item.propertyDetails.city,
      status: item.status
    }))
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
        minWidth: 100,
        maxWidth: 250,
        Cell: props => {
          return <Status>{props.original.status}</Status>
        }
      },
      {
        Header: 'View',
        accessor: 'view',
        maxWidth: 150,
        Cell: props => {
          return (
            <Button
              size="action"
              shadow={'none'}
              title="View"
              radius={'4px'}
              onClick={() => this.handleRedirect(props.original.registryId, props.original.propertyId)}
            />
          )
        }
      }
    ]
    return (
      <React.Fragment>
        <Header />
        <MainWrapper>
          <TopWrapper>
            <PageTitle>Dashboard</PageTitle>
            <FlexWrapper>
              {Cookies.get('role') === 'individual' && (
                <Button
                  size={'medium'}
                  width={'150px'}
                  title="Add Property"
                  type="submit"
                  onClick={() => this.props.history.push('/dashboard/property-details/add-property/undefined')}
                />
              )}

              {/* <Input
                padding={'14px 36px'}
                type="text"
                icon="search"
                background={'#fff'}
                fill="rgba(46, 55, 59, 0.5)"
                placeholder="Search"
              /> */}
            </FlexWrapper>
          </TopWrapper>
          <Table
            onSortedChange={(newSorted, column, shiftKey) => {
              console.log(newSorted)
            }}
            data={tableData}
            columns={columns}
            resizable={false}
            pageSize={10000}
            minRows={0}
            showPagination={false}
            totalNumberOfResults={222}
            onPageChange={this.handlePageChange}
          />
        </MainWrapper>
        <Footer position={'fixed'} />
      </React.Fragment>
    )
  }
}

export { Dashboard }
