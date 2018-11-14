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
      propertyType: item.landType,
      propertyLocation: item.address,
      city: item.city,
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
        maxWidth: 150,
        Cell: props => {
          return (
            <Button
              size="action"
              title={props.original.status}
              background={'#fff'}
              shadow={'none'}
              fontSize={16}
              color={'#333333'}
              radius={'4px'}
              border={props.original.status === 'new' ? 'solid 1px #ffae01' : 'solid 1px #6faa13'}
            />
          )
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
            defaultPageSize={10}
            pageSize={10}
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
