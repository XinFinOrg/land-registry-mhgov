import React, { Component } from 'react'
import styled from 'styled-components'
import { Header, Footer, MainWrapper, PageTitle, TopWrapper, Input, Button, Icon } from '../components'
import { Table } from '../components/Table'
/* const Pagination = styled.div`
  width: 10px;
  height: 10px;
` */
const StyledHeader = styled.div`
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  color: #333333;
  display: flex;
  align-items: center;
`
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 8px;
`
class Dashboard extends Component {
  handlePageChange = currentPage => {
    // this.setState({ currentPage })
    console.log('CURRENT PAGE', currentPage)
  }
  render() {
    const data = [
      {
        srNo: 1,
        propertyId: 'ABC',
        propertyType: 'Residential',
        propertyLocation: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
        city: 'Delhi',
        status: 'pending',
        view: 'view'
      },
      {
        srNo: 1,
        propertyId: 'ABC',
        propertyType: 'Residential',
        propertyLocation: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
        city: 'Delhi',
        status: 'approved',
        view: 'view'
      },
      {
        srNo: 1,
        propertyId: 'ABC',
        propertyType: 'Residential',
        propertyLocation: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
        city: 'Delhi',
        status: 'pending',
        view: 'view'
      },
      {
        srNo: 1,
        propertyId: 'ABC',
        propertyType: 'Residential',
        propertyLocation: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
        city: 'Delhi',
        status: 'approved',
        view: 'view'
      },
      {
        srNo: 1,
        propertyId: 'ABC',
        propertyType: 'Residential',
        propertyLocation: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
        city: 'Delhi',
        status: 'pending',
        view: 'view'
      },
      {
        srNo: 1,
        propertyId: 'ABC',
        propertyType: 'Residential',
        propertyLocation: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
        city: 'Delhi',
        status: 'pending',
        view: 'view'
      },
      {
        srNo: 1,
        propertyId: 'ABC',
        propertyType: 'Residential',
        propertyLocation: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
        city: 'Delhi',
        status: 'approved',
        view: 'view'
      },
      {
        srNo: 1,
        propertyId: 'ABC',
        propertyType: 'Residential',
        propertyLocation: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
        city: 'Delhi',
        status: 'pending',
        view: 'view'
      },
      {
        srNo: 1,
        propertyId: 'ABC',
        propertyType: 'Residential',
        propertyLocation: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
        city: 'Delhi',
        status: 'approved',
        view: 'view'
      },
      {
        srNo: 1,
        propertyId: 'ABC',
        propertyType: 'Residential',
        propertyLocation: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
        city: 'Delhi',
        status: 'pending',
        view: 'view'
      },
      {
        srNo: 1,
        propertyId: 'ABC',
        propertyType: 'Residential',
        propertyLocation: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
        city: 'Delhi',
        status: 'pending',
        view: 'view'
      },
      {
        srNo: 1,
        propertyId: 'ABC',
        propertyType: 'Residential',
        propertyLocation: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
        city: 'Delhi',
        status: 'approved',
        view: 'view'
      },
      {
        srNo: 1,
        propertyId: 'ABC',
        propertyType: 'Residential',
        propertyLocation: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
        city: 'Delhi',
        status: 'pending',
        view: 'view'
      },
      {
        srNo: 1,
        propertyId: 'ABC',
        propertyType: 'Residential',
        propertyLocation: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
        city: 'Delhi',
        status: 'approved',
        view: 'view'
      },
      {
        srNo: 1,
        propertyId: 'ABC',
        propertyType: 'Residential',
        propertyLocation: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
        city: 'Delhi',
        status: 'pending',
        view: 'view'
      },
      {
        srNo: 1,
        propertyId: 'ABC',
        propertyType: 'Residential',
        propertyLocation: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
        city: 'Delhi',
        status: 'pending',
        view: 'view'
      },
      {
        srNo: 1,
        propertyId: 'ABC',
        propertyType: 'Residential',
        propertyLocation: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
        city: 'Delhi',
        status: 'approved',
        view: 'view'
      },
      {
        srNo: 1,
        propertyId: 'ABC',
        propertyType: 'Residential',
        propertyLocation: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
        city: 'Delhi',
        status: 'pending',
        view: 'view'
      },
      {
        srNo: 1,
        propertyId: 'ABC',
        propertyType: 'Residential',
        propertyLocation: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
        city: 'Delhi',
        status: 'approved',
        view: 'view'
      },
      {
        srNo: 1,
        propertyId: 'ABC',
        propertyType: 'Residential',
        propertyLocation: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
        city: 'Delhi',
        status: 'pending',
        view: 'view'
      }
    ]

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
    return (
      <React.Fragment>
        <Header />
        <MainWrapper>
          <TopWrapper>
            <PageTitle>Dashboard</PageTitle>
            <Input padding={'14px 36px'} type="text" icon="facebook" placeholder="Search" />
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
        <Footer />
      </React.Fragment>
    )
  }
}

export { Dashboard }
