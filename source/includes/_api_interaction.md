# API Interaction

## Status Code
- <code>200 OK</code> Successful request
- <code>400 Bad Request</code> Validation error
- <code>401 Unauthorized</code> Invalid API Key
- <code>404 Not Found</code> The specified resource does not exist
- <code>409 Not Found</code> Not Found
- <code>500 Internal Server Error</code> Something went wrong

## Response format

Depending on whether the request is successful or not the response format will change. The response object is encapsulated in high level keys and underline data is different based on request.

	A typical response on successful request :

	{
		status : true,
		data : {
			key_n : value_n
			.
			key_n : value_n
		}
	}
	A typical response on failed request : 
	{
		status : false
		statusCode : 409,
		appErrorCode : 1008,
		errMessage : "message"
	}

## Errors

Errors are defined by error codes and error messages. On failed request status is set to false and http status code is set to error code. For detailed error codes, see error section.