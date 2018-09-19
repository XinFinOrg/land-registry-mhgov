import React, { Component } from 'react'
import styled from 'styled-components'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

const TableWrapper = styled.section`
  margin-top: ${props => props.marginTop && '20px'};
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
  .rt-th:focus {
    outline: none;
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

class CustomTable extends Component {
  state = { activePage: 1 }
  render() {
    const { resizable, sortable, data, columns, marginTop, ...props } = this.props
    return (
      <TableWrapper marginTop={marginTop}>
        <StyledTable data={data} columns={columns} resizable={resizable} sortable={sortable} {...props} />
      </TableWrapper>
    )
  }
}

export default CustomTable
