export const loginValidator = values => {
  let errors = {}
  if (!values.email) {
    errors.email = 'Field is required'
  } else if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(values.email)) {
    errors.email = 'Enter a valid email address'
  }
  if (!values.password) {
    errors.password = 'Field is required'
  }

  return errors
}
export const signUpValidator = values => {
  let errors = {}
  if (!values.email) {
    errors.email = 'Field is required '
  } else if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(values.email)) {
    errors.email = 'Enter a valid email '
  }

  if (!values.password) {
    errors.password = 'Field is required  '
  }

  if (!values.firstName || !values.firstName.match(/^[a-zA-Z]+$/)) {
    errors.firstName = 'Please enter only alphabets'
  }
  return errors
}

export const individualValidator = values => {
  let errors = {}
  if (!values.email) {
    errors.email = 'Field is required '
  } else if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(values.email)) {
    errors.email = 'Enter a valid email '
  }
  return errors
}
export const bankValidator = values => {
  let errors = {}
  if (!values.name || !values.name.match(/^[a-zA-Z]+$/)) {
    errors.name = 'Please enter only alphabets'
  }
  if (!values.city || !values.city.match(/^[a-zA-Z]+$/)) {
    errors.city = 'Please enter city'
  }
  if (!values.branch || !values.branch.match(/^[a-zA-Z]+$/)) {
    errors.branch = 'Please enter branch'
  }
  return errors
}
export const governmentValidator = values => {
  let errors = {}
  //only number
  if (!values.surveyNumber || !values.surveyNumber.match(/^\d+$/)) {
    errors.surveyNumber = 'Please enter survey number'
  }
  //only letter
  if (!values.landType || !values.landType.match(/^[a-zA-Z]+$/)) {
    errors.landType = 'Please enter land type'
  }
  //only number
  if (!values.areaOfConstructureProperty || !values.areaOfConstructureProperty.match(/^\d+$/)) {
    errors.areaOfConstructureProperty = 'Please enter area'
  }
  //only number
  if (!values.areaOfConstructurePropertySquareMeter || !values.areaOfConstructurePropertySquareMeter.match(/^\d+$/)) {
    errors.areaOfConstructurePropertySquareMeter = 'Please enter area'
  }
  //only number
  if (!values.areaOfConstructurePropertyBuildUpArea || !values.areaOfConstructurePropertyBuildUpArea.match(/^\d+$/)) {
    errors.areaOfConstructurePropertyBuildUpArea = 'Please enter area'
  }
  //only number
  if (!values.openParkingSquareMeter || !values.openParkingSquareMeter.match(/^\d+$/)) {
    errors.openParkingSquareMeter = 'Please enter area'
  }
  //only number
  if (!values.coveredParking || !values.coveredParking.match(/^\d+$/)) {
    errors.coveredParking = 'Please enter area'
  }
  //only number
  if (!values.coveredParkingSquareMeter || !values.coveredParkingSquareMeter.match(/^\d+$/)) {
    errors.coveredParkingSquareMeter = 'Please enter area'
  }
  //only number
  if (!values.coveredParkingBulidArea || !values.coveredParkingBulidArea.match(/^\d+$/)) {
    errors.coveredParkingBulidArea = 'Please enter area'
  }
  //only number
  if (!values.shopFloorBasement || !values.shopFloorBasement.match(/^\d+$/)) {
    errors.shopFloorBasement = 'Please enter area'
  }

  return errors
}

export const addFinancer = values => {
  let errors = {}
  if (!values.email) {
    errors.email = 'Field is required '
  } else if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(values.email)) {
    errors.email = 'Enter a valid email '
  }

  //only number
  if (!values.loanAmount || !values.loanAmount.match(/^\d+$/)) {
    errors.loanAmount = 'Please enter Loan Amount'
  }
  //only number
  if (!values.outstandingLoan || !values.outstandingLoan.match(/^\d+$/)) {
    errors.outstandingLoan = 'Please enter outstanding loan'
  }

  return errors
}

export const buyerDetail = values => {
  let errors = {}
  if (!values.email) {
    errors.email = 'Field is required '
  } else if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(values.email)) {
    errors.email = 'Enter a valid email '
  }
  //only number
  if (!values.amount || !values.amount.match(/^\d+$/)) {
    errors.amount = 'Please enter numbers'
  }
  return errors
}

export const buyerDetailValidation = values => {
  let errors = {}
  if (!values.email) {
    errors.email = 'Field is required '
  } else if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(values.email)) {
    errors.email = 'Enter a valid email '
  }

  return errors
}

export const amountValidation = values => {
  let errors = {}
  //only number
  if (!values.amount || !values.amount.match(/^\d+$/)) {
    errors.amount = 'Please enter numbers'
  }
  return errors
}
