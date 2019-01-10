import React, { Component } from 'react'

import {
  Header,
  Footer,
  MainWrapper,
  PageTitle,
  TopWrapper,
  Loader,
  // Input,
  Button,
  Icon,
  StyledHeader,
  IconWrapper,
  FlexWrapper
} from '../components'
import { Table } from '../components/Table'
import moment from 'moment'
import Cookies from 'js-cookie'
import axios from 'axios'
import { API_URL, statusMap, statusColor, nextTab } from '../constants'
import styled from 'styled-components'
import { get, has } from 'lodash'

const Status = styled.div`
  border-radius: 4px;
  color: #fff;
  margin-right: 5px;
  text-align: center;
  background: ${props => {
    switch (props.type) {
      case 'rejected':
        return '#C62828'
      case 'financer':
        return '#CDDC39'
      case 'verified':
        return '#2E7D32'
      default:
        return '#fff'
    }
  }};
  text-transform: capitalize;
  display: flex;
  align-items: center;
  padding: 4px;
  max-width: 150px;
  word-break: break-all;
`

const PaperWrapper = styled.div`
  border-radius: 6px 6px 0 0;
  background-color: #ffffff;
  box-shadow: 0px 2px 6.5px 0.5px rgba(0, 0, 0, 0.06);
  padding: 20px;
  margin-bottom: 20px;
`

const TableDataWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  div {
    display: inline-block;
    background: #fbfbfb;
    padding: 5px;
    margin-right: 10px;
    margin-bottom: 10px;
    width: 48%;
    span {
      width: 60%;
    }
    h3 {
      display: inline-block;
      margin-left: 5px;
      font-size: 18px;
      font-weight: bold;
    }
  }
`

class Dashboard extends Component {
  state = {
    dashboardData: [],
    stampDutySummary: {}
  }
  async componentDidMount() {
    try {
      const { data } = await axios.post(`${API_URL}/getDashboard`, {
        email: Cookies.get('email'),
        role: Cookies.get('role')
      })
      this.setState({ dashboardData: data.data })
    } catch (error) {
      console.log('ERROR', error)
    }
    if (Cookies.get('role') === 'igr') {
      try {
        const { data } = await axios.get(`${API_URL}/getStampdutySummary`)
        this.setState({ stampDutySummary: data })
      } catch (error) {
        console.log(error)
      }
    }
  }

  handleRedirect = (registryId, propertyId, nextTab) => {
    Cookies.set('propertyId', propertyId)
    Cookies.set('registryId', registryId)
    if (registryId === '') {
      this.props.history.push(`/dashboard/${nextTab}/propertyId/${propertyId}`)
    } else {
      this.props.history.push(`/dashboard/${nextTab}/registryId/${registryId}`)
    }
  }
  handleIgrRedirect = obj => {
    console.log('OBJ', obj)
    Cookies.set('propertyId', obj.propertyId)
    Cookies.set('registryId', obj.registryId)
    if (has(obj, 'propertyId')) {
      this.props.history.push(`/dashboard/${obj.nextTab}/propertyId/${obj.propertyId}`)
    } else if (has(obj, 'registryId')) {
      this.props.history.push(`/dashboard/${obj.nextTab}/registryId/${obj.registryId}`)
    } else {
      return null
    }
  }
  render() {
    const { dashboardData, stampDutySummary } = this.state
    const tableData = dashboardData.map((item, index) => {
      console.log('STATUS', get(statusMap[item.status], 'statusName', ''))
      return {
        srNo: index + 1,
        propertyId: item.propertyId,
        registryId: item.registryId || '',
        propertyType: item.landType || get(item, 'propertyDetails.landType', ''),
        propertyLocation: item.address || get(item, 'propertyDetails.address', ''),
        city: item.city || get(item, 'propertyDetails.city', ''),
        statusStyle: item.status,
        status: get(statusMap[item.status], 'statusName', 'N.A'),
        nextTab: nextTab[item.status]
      }
    })
    const igrData = dashboardData.map((item, index) => {
      console.log('STATUS', get(statusMap[item.status], 'statusName', ''))
      return {
        srNo: index + 1,
        propertyId: item.propertyId,
        txType: item.txType || 'NA',
        sellPrice: has(item, 'sellPrice') ? `₹ ${get(item, 'sellPrice', 'NA')}` : 'NA',
        stampDuty: has(item, 'stampDuty') ? `₹ ${get(item, 'stampDuty', '')}` : 'NA',
        date:
          get(item, 'stampDutyDate', '') === false
            ? 'NA'
            : moment(get(item, 'stampDutyDate', '')).format('DD MMM YYYY hh:mm:ss A'),
        statusStyle: item.status,
        status: get(statusMap[item.status], 'statusName', 'N.A'),
        nextTab: nextTab[item.status]
      }
    })
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
          const {
            original: { status, statusStyle }
          } = props
          console.log('props', statusStyle)
          return (
            <Status
              type={
                statusColor[statusStyle] === 'yellow'
                  ? 'financer'
                  : statusColor[statusStyle] === 'red'
                    ? 'rejected'
                    : 'verified'
              }>
              {status}
            </Status>
          )
        }
      },
      {
        Header: 'View',
        accessor: 'view',
        maxWidth: 150,
        Cell: props => {
          const {
            original,
            original: { nextTab }
          } = props
          return (
            <Button
              size="action"
              shadow={'none'}
              title="View"
              radius={'4px'}
              onClick={() => this.handleRedirect(original.registryId, original.propertyId, nextTab)}
            />
          )
        }
      }
    ]
    const igrColumns = [
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
        minWidth: 60,
        Cell: props => <span>{props.value}</span>
      },
      {
        Header: (
          <StyledHeader>
            Txn Type
            <IconWrapper>
              <Icon icon="downarrow" /> <Icon icon="uparrow" />
            </IconWrapper>
          </StyledHeader>
        ),
        accessor: 'txType',
        minwidth: 60
      },
      {
        Header: (
          <StyledHeader>
            Sell Price
            <IconWrapper>
              <Icon icon="downarrow" /> <Icon icon="uparrow" />
            </IconWrapper>
          </StyledHeader>
        ),
        accessor: 'sellPrice',
        minwidth: 80
      },
      {
        Header: (
          <StyledHeader>
            Stamp Duty
            <IconWrapper>
              <Icon icon="downarrow" /> <Icon icon="uparrow" />
            </IconWrapper>
          </StyledHeader>
        ),
        accessor: 'stampDuty',
        maxWidth: 150
      },
      {
        Header: (
          <StyledHeader>
            Date
            <IconWrapper>
              <Icon icon="downarrow" /> <Icon icon="uparrow" />
            </IconWrapper>
          </StyledHeader>
        ),
        accessor: 'date',
        minWidth: 100
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
          const {
            original: { status, statusStyle }
          } = props
          return (
            <Status
              type={
                statusColor[statusStyle] === 'yellow'
                  ? 'financer'
                  : statusColor[statusStyle] === 'red'
                    ? 'rejected'
                    : 'verified'
              }>
              {status}
            </Status>
          )
        }
      },
      {
        Header: 'View',
        accessor: 'view',
        maxWidth: 150,
        Cell: props => {
          console.log('props', props.original)
          const {
            original,
            original: { nextTab }
          } = props
          return (
            <Button
              size="action"
              shadow={'none'}
              title="View"
              radius={'4px'}
              onClick={() => this.handleIgrRedirect(original)}
            />
          )
        }
      }
    ]
    return (
      <React.Fragment>
        <Header />
        <MainWrapper>
          {Cookies.get('role') === 'igr' && (
            <PaperWrapper>
              <h2>Stamp Duty Summary</h2>
              <TableDataWrapper>
                <div>
                  <span>Today: </span>
                  <h3> ₹ {get(stampDutySummary, 'data.day', 'NA')}</h3>
                </div>
                <div>
                  <span>Last Week:</span>
                  <h3> ₹ {get(stampDutySummary, 'data.week', 'NA')}</h3>
                </div>
                <div>
                  <span>Last Month:</span>
                  <h3> ₹ {get(stampDutySummary, 'data.month', 'NA')}</h3>
                </div>
                <div>
                  <span>Last Year:</span>
                  <h3> ₹ {get(stampDutySummary, 'data.year', 'NA')}</h3>
                </div>
                <div>
                  <span>Pending:</span>
                  <h3> ₹ {get(stampDutySummary, 'data.pending', 'NA')}</h3>
                </div>
              </TableDataWrapper>
            </PaperWrapper>
          )}

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
              {/*<Input
                padding={'14px 36px'}
                type="text"
                icon="search"
                background={'#fff'}
                fill="rgba(46, 55, 59, 0.5)"
                placeholder="Search"
              />*/}
            </FlexWrapper>
          </TopWrapper>
          <Table
            onSortedChange={(newSorted, column, shiftKey) => {
              console.log(newSorted)
            }}
            data={Cookies.get('role') === 'igr' ? igrData : tableData}
            columns={Cookies.get('role') === 'igr' ? igrColumns : columns}
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
