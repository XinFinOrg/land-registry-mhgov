import React, { Component } from 'react'
import styled from 'styled-components'
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
  IconWrapper
} from '../components'
import { Table } from '../components/Table'
import { data } from '../constants'

class Dashboard extends Component {
  handlePageChange = currentPage => {
    // this.setState({ currentPage })
    console.log('CURRENT PAGE', currentPage)
  }
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
        Cell: props => (
          <Button
            size="action"
            shadow={'none'}
            title="View"
            radius={'4px'}
            onClick={() => this.props.history.push('/dashboard/document-details/property-details')}
          />
        )
      }
    ]
    return (
      <React.Fragment>
        <Header />
        <MainWrapper>
          <TopWrapper>
            <PageTitle>Dashboard</PageTitle>
            <Input
              padding={'14px 36px'}
              type="text"
              icon="search"
              background={'#fff'}
              fill="rgba(46, 55, 59, 0.5)"
              placeholder="Search"
            />
          </TopWrapper>
          <Table
            onSortedChange={(newSorted, column, shiftKey) => {
              console.log(newSorted)
            }}
            data={data}
            columns={columns}
            resizable={false}
            showPagination={false}
            pageSize={10}
            defaultPageSize={10}
            minRows={0}
            totalNumberOfResults={100}
            onPageChange={this.handlePageChange}
          />
        </MainWrapper>
        <Footer position={'fixed'} />
      </React.Fragment>
    )
  }
}

export { Dashboard }
