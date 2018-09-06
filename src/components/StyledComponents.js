import styled from 'styled-components'
import Link from 'react-router-dom/Link'

const PaperTitle = styled.h3`
  font-size: 25px;
  color: #333333;
`
const PaperSubTitle = styled.p`
  font-size: 15.5px;
  line-height: 1.29;
  letter-spacing: -0.1px;
  color: #333333;
  padding: 20px 0;
`
const PageTitle = styled.h1`
  opacity: 0.7;
  font-size: 30px;
  color: #000;
`
const MainWrapper = styled.div`
  padding: 107px 95px 50px;
`
const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 32px;
`
const InsideTitle = styled.h3`
  font-size: 20px;
  font-weight: 300;
  color: #333333;
`
const Tabber = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 26px;
  border-bottom: 1px solid rgba(180, 180, 180, 0.3);
`
const Tab = styled(Link)`
  font-size: 20px;
  letter-spacing: -0.1px;
  padding-bottom: 22px;
  color: ${props => (props.selected ? '#1f89f5' : '#797979')};
  border-bottom: ${props => props.selected && '3px solid #1f89f5'};
`
const FormDetailsContainer = styled.div`
  padding-top: 26px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  & > div {
    flex-basis: calc(33.33% - 10px);
    & > div {
      flex-basis: calc(33.33% - 10px);
    }
  }
`
const InformTitle = styled.p`
  font-size: 20px;
  color: #1f89f5;
`
const InformSubTitle = styled.p`
  font-size: 15.5px;
  line-height: 2.26;
  color: rgba(51, 51, 51, 0.8);
`
const StaticFieldWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 20px;
  & > div {
    flex-basis: calc(50% - 20px);
  }
`
const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 22px;
  padding: 0 95px;
  justify-content: flex-end;
  & > button {
    margin-left: 15px;
  }
`
const StaticField = styled.div``
export {
  PaperTitle,
  PaperSubTitle,
  PageTitle,
  MainWrapper,
  TopWrapper,
  InsideTitle,
  Tabber,
  Tab,
  FormDetailsContainer,
  InformTitle,
  StaticFieldWrapper,
  StaticField,
  InformSubTitle,
  ButtonWrapper
}
