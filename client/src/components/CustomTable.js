import React, { Component } from 'react'
import styled from 'styled-components'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { Icon } from './Icon'
// import { ReactTableDefaults } from 'react-table'
/* const Pagination = styled.div`
  width: 10px;
  height: 10px;
`
Object.assign(ReactTableDefaults, {
  PaginationComponent: <Pagination />
}) */
const TableWrapper = styled.section`
  .ReactTable {
    border: none !important;
  }
  .ReactTable .rt-thead.-header {
    box-shadow: none !important;
  }
  .rt-th {
    border-right: none !important;
    padding: 16px 4px !important;
  }
  .rt-td {
    border-right: none !important;
    padding: 16px 4px !important;
    white-space: pre-wrap !important;
  }
  .rt-tr-group {
    border-bottom: 2px solid #f2f2f2 !important;
  }
  .rt-thead.-header {
    border-bottom: 2px solid #f2f2f2 !important;
  }
`
const StyledTable = styled(ReactTable)`
  min-height: 100px;
  max-height: 600px;
`

const Page = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: ${props => (props.active ? '#fff' : '#333333')};
  background-color: ${props => (props.active ? '#1f89f5' : 'transparent')};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 10px;
  ${props =>
    props.disabled &&
    `
    opacity: 0.5;
    pointer-events:none;
    `};
`

class CustomTable extends Component {
  state = { activePage: 1 }
  render() {
    const pagesize = 10
    const {
      resizable,
      sortable,
      data,
      columns,
      onPageChange,
      defaultPageSize = pagesize,
      totalNumberOfResults,
      ...props
    } = this.props
    const { activePage } = this.state
    const pageNumbers = []
    const totalPage = Math.ceil(totalNumberOfResults / defaultPageSize)
    for (let i = 1; i <= totalPage; i++) {
      pageNumbers.push(i)
    }
    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <Page
          active={number === activePage}
          key={number}
          id={number}
          onClick={() => {
            onPageChange && onPageChange(number)
            this.setState({ activePage: number })
          }}>
          {number}
        </Page>
      )
    })
    return (
      <TableWrapper>
        <StyledTable data={data} columns={columns} resizable={resizable} sortable={sortable} {...props} />
        {/* <Pager>
          <PagerGroup>
            <Page
              disabled={activePage === 1}
              onClick={
                activePage > 1
                  ? () => {
                      onPageChange(activePage - 1)
                      this.setState({ activePage: activePage - 1 })
                    }
                  : () => null
              }>
              <Label>Prev</Label>
            </Page>
            {renderPageNumbers}
            <Page
              disabled={activePage === totalPage}
              onClick={
                activePage < totalPage
                  ? () => {
                      onPageChange(activePage + 1)
                      this.setState({ activePage: activePage + 1 })
                    }
                  : () => null
              }>
              <Label>Next</Label>
            </Page>
          </PagerGroup>
        </Pager> */}
      </TableWrapper>
    )
  }
}

export default CustomTable
