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
  .css-vj8t7z {
    min-height: 62px !important;
  }
  .css-2o5izw {
    min-height: 62px !important;
  }
`
const TopWrapper = styled.div`
  & > p {
    font-size: 14px;
    color: rgba(51, 51, 51, 0.6);
    padding-bottom: 2px;
  }
`
class SelectBox extends Component {
  state = {}
  render() {
    const { label, ...props } = this.props
    return (
      <TopWrapper>
        <p>{label}</p>
        <SelectWrapper>
          <Select {...props} />
        </SelectWrapper>
      </TopWrapper>
    )
  }
}

export default SelectBox
