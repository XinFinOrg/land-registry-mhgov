import React, { Component } from 'react'
import styled from 'styled-components'
import Select from 'react-select'

const SelectWrapper = styled.div`
  .css-1aya2g8 {
    background-color: transparent;
    border-color: rgba(221, 221, 221, 0.6);
    border-radius: 0;
    box-shadow: 0px 1px 5.7px 0.3px rgba(124, 124, 124, 0.13);
  }
  .css-d8oujb {
    background: none !important;
  }
  .css-1rtrksz {
    padding: 16px 8px;
  }
  .css-1aya2g8:hover {
    border-color: rgba(221, 221, 221, 0.6);
  }
`
class SelectBox extends Component {
  state = {}
  render() {
    const { ...props } = this.props
    return (
      <SelectWrapper>
        <Select {...props} />
      </SelectWrapper>
    )
  }
}

export default SelectBox
