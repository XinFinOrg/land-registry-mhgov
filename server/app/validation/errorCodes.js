/*error : {
	status : 'failed',
	responseStatus : 200,
	error : {
		code : '400',
		appErrorCode : '1001'
		message : 'type mismatch'
		fieldName : '',
		info : ''		
	}	
}*/
/*Bad Request 400
Unauthorized 401
Not Found 404
conflict 409
OutOfRange 416
Forbidden 403*/
var getErrorCodes = function(errorKey) {
	var errorCodes = {
		MissingParameter : {
			statusCode : 400,
			appErrorCode : 1001,
			errMessage : 'The request was unacceptable, often due to missing a required parameter'
		},
		EmptyResource : {
			statusCode : 400,
			appErrorCode : 1002,
			errMessage : 'No value provided for mandatory resource'
		},
		ResourceTypeMismatch : {
			statusCode : 400,
			appErrorCode : 1003,
			errMessage : 'The specified resource type does not match the required type'
		},
		ResourceNotFound : {
			statusCode : 404,
			appErrorCode : 1004,
			errMessage : 'The specified resource does not exist'
		},
		MessageTooLarge : {
			statusCode : 400,
			appErrorCode : 1005,
			errMessage : 'The resource exceeds the maximum allowed value of {{MAX}}'
		},
		MessageTooSmall : {
			statusCode : 400,
			appErrorCode : 1006,
			errMessage : 'The resource does not meet minimum required value of {{MIN}}'
		},
		ResourceSizeMismatch : {
			statusCode : 400,
			appErrorCode : 1007,
			errMessage : 'The resource does not match required size of {{SIZE}}'
		},
		InvalidEmail : {
			statusCode : 409,
			appErrorCode : 1008,
			errMessage : 'Invalid email'
		},
		InvalidBuyer : {
			statusCode : 409,
			appErrorCode : 1008,
			errMessage : 'Buyer can not be same as owner'
		},
		TokenAmtCheck : {
			statusCode : 409,
			appErrorCode : 1008,
			errMessage : "Token amount can not be greater than Sell Price"
		},
		LoanAmountCheck : {
			statusCode : 409,
			appErrorCode : 1008,
			errMessage : "Loan amount can not be greater than sell price"
		},
		OutstandingLoanCheck : {
			statusCode : 409,
			appErrorCode : 1008,
			errMessage : "Outstanding loan can not be greater than loan amount"
		},
		FinanceAmountCheck : {
			statusCode : 409,
			appErrorCode : 1008,
			errMessage : "Finance amount can not be greater than Sell Price"
		},
		InvalidDate : {
			statusCode : 400,
			appErrorCode : 1009,
			errMessage : 'Invalid date format'
		},
		InvalidAddress : {
			statusCode : 400,
			appErrorCode : 1010,
			errMessage : 'Invalid XDC address'
		},
		OutOfRange : {
			statusCode : 400,
			appErrorCode : 1011,
			errMessage : 'The specified resource is out of range'
		},
		InvalidValue : {
			statusCode : 409,
			appErrorCode : 1012,
			errMessage : 'Invalid value'
		},
		Unauthorized : {
			statusCode : 401,
			appErrorCode : 1101,
			errMessage : 'No valid API key provided'
		},
		RateLimitError : {
			statusCode : 429,
			appErrorCode : 1102,
			errMessage : 'Rate limit exceeded'
		},
		UserAlreadyExists : {
			statusCode : 409,
			appErrorCode : 1103,
			errMessage : 'User already exists'
		},
		AuthenticationFailed : {
			statusCode : 403,
			appErrorCode : 1104,
			errMessage : 'Server failed to authenticate the request'
		},
		InternalError : {
			statusCode : 500,
			appErrorCode : 1105,
			errMessage : 'Internal Error'
		},
		DbError : {
			statusCode : 500,
			appErrorCode : 1106,
			errMessage: 'DB Error'
		},
		EmailErrorActivation:{
			statusCode : 500,
			appErrorCode : 1107,
			errMessage: 'Cannot send activation email to the user'
		},
		EmailErrorForgot:{
			statusCode : 500,
			appErrorCode : 1110,
			errMessage: 'Cannot send forgot password/reset email to the user'
		},
		EmailErrorForgotInvalid:{
			statusCode : 404,
			appErrorCode : 1111,
			errMessage: 'Given email id does not exist'
		},
		Web3UnlockAccount:{
			statusCode : 500,
			appErrorCode : 1108,
			errMessage: 'Cannot unlock account.'
		},
		Web3NewAccount:{
			statusCode : 500,
			appErrorCode : 1109,
			errMessage: 'Cannot create new account.'
		},
		ResetLinkExpired:{
			statusCode : 404,
			appErrorCode : 1112,
			errMessage: 'Reset Link Expired'
		},
		PasswordResetMismatch:{
			statusCode : 400,
			appErrorCode : 1113,
			errMessage: 'Cannot change password. Enter correct details'
		},
		GenericErr1:{
			statusCode : 500,
			appErrorCode : 1115,
			errMessage: 'Something went wrong. Cannot process the request'
		},
		XdcAccountInvalid:{
			statusCode : 400,
			appErrorCode : 1117,
			errMessage: 'Account is invalid'
		},
		IncorrectPassword:{
			statusCode : 400,
			appErrorCode : 1118,
			errMessage: 'Incorrect Password'
		},
		AccSetup:{
			statusCode : 400,
			appErrorCode : 1120,
			errMessage: 'Cannot setup new account'
		},
		AccNotExists:{
			statusCode : 404,
			appErrorCode : 1121,
			errMessage: 'Account does not exists'
		},
		ApiKeyInvalid:{
			statusCode : 400,
			appErrorCode : 1123,
			errMessage: 'API Key is invalid'
		},
		NotAllowed : {
			statusCode : 400,
			appErrorCode : 1126,
			errMessage: 'Not accessible'
		},
		InvalidPhone : {
			statusCode : 409,
			appErrorCode : 1008,
			errMessage : 'Invalid Phone Number'
		},
		InvalidOptions : {
			statusCode : 409,
			appErrorCode : 1008,
			errMessage : 'Invalid value'
		},
		maxLengthError : {
			statusCode : 409,
			appErrorCode : 1008,
			errMessage : 'Resource crossed maximum allowed length'
		},
		InvalidPan : {
			statusCode : 409,
			appErrorCode : 1008,
			errMessage : 'Invalid PAN No'
		},
		InvalidPincode : {
			statusCode : 409,
			appErrorCode : 1008,
			errMessage : 'Invalid Pincode'
		},
		IncorrectEmailOrPassword:{
			statusCode : 400,
			appErrorCode : 1119,
			errMessage: 'Incorrect Email or Password'
		},
	};
	return errorCodes[errorKey];
};

module.exports = {
	getErrorCodes : getErrorCodes
};