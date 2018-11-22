import React, { Component } from 'react'
import styled from 'styled-components'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
// import slice from 'lodash/slice'
// import { ReactTableDefaults } from 'react-table'
/* const Pagination = styled.div`
  width: 10px;
  height: 10px;
`
Object.assign(ReactTableDefaults, {
  PaginationComponent: <Pagination />
}) */
const TableWrapper = styled.div`
  margin-bottom: 100px;
  .ReactTable {
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0px 2px 6.5px 0.5px rgba(0, 0, 0, 0.06);
  }

  .rt-thead.-header {
    box-shadow: none !important;
    border-bottom: 2px solid #f2f2f2;
    padding: 20px;
  }
  .rt-resizable-header-content {
    text-align: left;
    color: #333333 !important;
    font-weight: 600;
  }
  .rt-th.rt-resizable-header {
    padding: 20px !important;
    border-right: none !important;
  }
  .rt-th.-cursor-pointer {
    box-shadow: none !important;
    border-right: none !important;
    padding: 0 !important;
    & > div {
      font-weight: 600;
      color: #333333;
      text-align: left;
    }
    :focus {
      outline: none;
    }
  }

  .rt-tr-group {
    border-bottom: solid 1px #f2f2f2 !important;
    padding: 20px !important;
    // flex: auto !important;
  }
  .rt-td {
    padding: 0 !important;
    white-space: initial !important;
    text-overflow: initial !important;
  }
`
const StyledTable = styled(ReactTable)`
  // min-height: 600px;
  max-height: 600px;
`
/* const Pager = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  margin-top: 18px;
`
const PagerGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
` */
/* const Page = styled.div`
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
` */
/* const Label = styled.p`
  font-size: 16px;
  color: #333333;
  cursor: pointer;
` */
class Table extends Component {
  state = { activePage: 1 }
  render() {
    // const pagesize = 10

    const {
      resizable,
      sortable,
      data,
      columns,
      onPageChange,
      // defaultPageSize = pagesize,
      totalNumberOfResults,
      ...props
    } = this.props

    /*  const { activePage } = this.state

    const pageNumbers = []

    const totalPage = Math.ceil(totalNumberOfResults / defaultPageSize)
    // console.log('MODE', totalPage % 10)

    for (let i = 1; i <= totalPage; i++) {
      pageNumbers.push(i)
    }

    let array = pageNumbers
    let current = activePage
    let start = 0
    let end = array.length
    // console.log('CURRENT', current)
    if (current - 5 > 0) {
      start = current - 5
    } else {
      start = 0
    }
    if (start + 10 < array.length) {
      end = start + 10
    } else {
      end = array.length
    } */
    /* 
    const renderPageNumbers = slice(array, start, end).map(number => {
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
    }) */

    return (
      <TableWrapper>
        <StyledTable data={data} columns={columns} resizable={resizable} sortable={sortable} {...props} />
        {/*********** Pagination ****************/}
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

export { Table }
