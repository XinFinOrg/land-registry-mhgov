import styled from 'styled-components'
import Link from 'react-router-dom/Link'
import { Form } from 'formik'
const PaperTitle = styled.h3`
  font-size: 25px;
  color: ${props => (props.color ? props.color : '#333333')};
  margin-bottom: 10px;
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
  color: ${props => (props.color ? props.color : '#000')};
  cursor: pointer;
`
const MainWrapper = styled.div`
  padding: 107px 95px 0;
  // margin-bottom: 100px;
`
const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  color: ${props =>
    props.selected ? '#1f89f5' : props.disabled ? 'rgba(121, 121, 121, 0.3)' : props.completed ? '#2bad06' : '#797979'};
  border-bottom: 3px solid
    ${props => (props.selected ? '#1f89f5' : props.disabled ? '#fff' : props.completed ? '#2bad06' : '#fff')};
  ${props =>
    props.disabled &&
    `
    pointer-events: none;
  `};
`

const ModalScrollWrapper = styled.div`
  height: 400px;
  overflow-y: scroll;
  padding: 5px 15px;
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #1f89f57d;
    border-radius: 10px;
  }
`

const FormDetailsContainer = styled.div`
  padding-top: ${props => (props.paddingTop ? props.paddingTop : 26)}px;
  display: ${props => (props.display ? props.display : 'flex')};
  justify-content: space-between;
  flex-wrap: wrap;

  & > div {
    flex-basis: ${props => (props.flexBasis ? props.flexBasis : 'calc(33.33% - 10px)')};
    & > div {
      flex-basis: ${props => (props.flexBasis ? props.flexBasis : 'calc(33.33% - 10px)')};
    }
  }
`
const InformTitle = styled.p`
  font-size: 20px;
  color: #1f89f5;
  padding-top: ${props => (props.paddingTop ? props.paddingTop : 26)}px;
  padding-bottom: ${props => (props.paddingBottom ? props.paddingBottom : 26)}px;
`
const InformSubTitle = styled.p`
  font-size: 15.5px;
  line-height: 2.26;
  color: rgba(51, 51, 51, 0.8);
  padding-top: 20px;
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

const Font14 = styled.p`
  font-size: 14px;
  color: #333333;
  padding: 28px 0 16px;
  text-transform: uppercase;
`
const FieldsTuple = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > div {
    flex-basis: ${props => (props.flexBasis ? props.flexBasis : 'calc(33.33% - 10px)')};
    & > div {
      flex-basis: ${props => (props.flexBasis ? props.flexBasis : 'calc(33.33% - 10px)')};
    }
  }
`
const NormalFieldsTuple = styled.div`
  display: flex;
  align-items: center;
  padding-top: 0px;
  & > div {
    margin-right: 22px;
    flex-basis: calc(33.33% - 10px);
    & > div {
      flex-basis: calc(33.33% - 10px);
    }
  }
  ${props =>
    props.shrink &&
    `
    flex-basis: 100% !important;
    padding-top: 10px;
  `} ${props =>
    props.flex &&
    `
    &>div:last-child{
      flex: 1;
      margin-right: 0;
    }
  `};
`
const PaymentTuple = styled.div`
  padding: 26px 0 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(180, 180, 180, 0.3);
  & > p {
    &:first-child {
      flex-basis: 40%;
    }
    &:last-child {
      flex-basis: 60%;
    }
  }
`
const PaymentWrapper = styled.div`
  & > div:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`

const PaymentText = styled.p`
  font-size: 15.5px;
  color: rgba(51, 51, 51, 0.8);
  text-transform: capitalize;
`
const FieldGroupWithTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props => (props.justify ? props.justify : 'space-between')};
  flex-wrap: wrap;
  flex-basis: 100% !important;
  padding-top: 22px;
  & > div {
    ${props =>
      props.margin &&
      `
    margin: 0 15px;
    margin-right:15px !important;

    `}
    margin-right: ${props => (props.marginRight ? props.marginRight : '22px')};
    flex-basis: calc(33.33% - 30px) !important;
    & > div {
      flex-basis: calc(33.33% - 10px) !important;
    }
  }
  ${props =>
    props.flex &&
    `
    &>div:last-child{
      flex: 1;
      margin-right: 0;
    }
  `};
`
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
const FormikForm = styled(Form)`
  margin-bottom: 100px;
`
const ButtonGroup = styled.div`
  margin: 30px 95px 0;
  display: flex;
  justify-content: ${props => (props.justifyContent ? props.justifyContent : 'flex-end')};
  & button {
    margin-left: 14px;
  }
`
const StyledHead = styled.div`
  font-size: 16px;
  text-align: left;
  font-weight: 600;
  color: #333333;
`
const IconCircle = styled.div`
  width: ${props => (props.width ? props.width : '31px')};
  height: ${props => (props.height ? props.height : '31px')};
  opacity: ${props => (props.opacity ? props.opacity : '0.8')};
  background-color: ${props => (props.bgColor ? props.bgColor : '#1b73cd')};
  border: solid 1px ${props => (props.borderColor ? props.borderColor : '#e4e4e4')};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const FlexWrapper = styled.div`
  display: flex;
  flex-direction: ${props => (props.flexDirection ? props.flexDirection : 'row')};
  justify-content: ${props => (props.justifyContent ? props.justifyContent : 'flex-start')};
  align-items: ${props => (props.justifyContent ? props.justifyContent : 'flex-start')};
  padding: ${props => (props.padding ? props.padding : '0px')};
  margin: ${props => (props.margin ? props.margin : '0px')};
  border-width: ${props => (props.borderWidth ? props.borderWidth : '0 0 0 0')};
  border-style: ${props => (props.borderStyle ? props.borderStyle : 'solid')};
  border-color: ${props => (props.borderColor ? props.borderColor : '#ddd')};
`
const MediumText = styled.p`
  font-size: 16px;
`

const ArrowImg = styled.img`
  cursor: pointer;
  transform: ${props => (props.transform ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: all 0.3s;
  height: 24px;
`
const Close = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  border: 1px solid #fff;
  border-radius: 50%;
  &:after {
    position: absolute;
    content: ' ';
    height: 24px;
    width: 2px;
    background-color: #fff;
    transform: rotate(-45deg);
  }
  &:before {
    position: absolute;
    content: ' ';
    height: 24px;
    width: 2px;
    background-color: #fff;
    transform: rotate(45deg);
  }
`
const CloseWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1f89f5;
  color: #fff;
  padding: 5px 15px;
  + form {
    padding: 15px !important;
  }
`
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
  ButtonWrapper,
  Font14,
  FieldsTuple,
  NormalFieldsTuple,
  PaymentText,
  PaymentTuple,
  PaymentWrapper,
  ArrowImg,
  FieldGroupWithTitle,
  StyledHeader,
  IconWrapper,
  FormikForm,
  ButtonGroup,
  StyledHead,
  IconCircle,
  ModalScrollWrapper,
  FlexWrapper,
  MediumText,
  Close,
  CloseWrap
}
