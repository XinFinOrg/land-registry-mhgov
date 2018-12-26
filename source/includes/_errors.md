# Errors

<aside class="notice">This error section is stored in a separate file in `includes/_errors.md`. Slate allows you to optionally separate out your docs into many files...just save them to the `includes` folder and add them to the top of your `index.md`'s frontmatter. Files are included in the order listed.
</aside>

The Land Registry API uses the following error codes:

Error Code | Status Code | Error Message 
---------- | ----------- | -------------
400 | 1001 | The request was unacceptable, often due to missing a required parameter
400 | 1002 | No value provided for mandatory resource
400 | 1003 | The specified resource type does not match the required type
404 | 1004 | The specified resource does not exist
400 | 1005 | The resource exceeds the maximum allowed value of {{MAX}}
400 | 1006 | The resource does not meet minimum required value of {{MIN}}
400 | 1007 | The resource does not match required size of {{SIZE}}
409 | 1008 | Invalid email
409 | 1008 | Buyer can not be same as owner
409 | 1008 | Token amount can not be greater than Sell Price
409 | 1008 | Loan amount can not be greater than sell price
409 | 1008 | Outstanding loan can not be greater than loan amount
409 | 1008 | Finance amount can not be greater than Sell Price
400 | 1009 | Invalid date format
400 | 1010 | Invalid XDC address
400 | 1011 | The specified resource is out of range
409 | 1012 | Invalid value
401 | 1101 | No valid API key provided
429 | 1102 | Rate limit exceeded
409 | 1103 | User already exists
403 | 1104 | Server failed to authenticate the request
500 | 1105 | Internal Error
500 | 1106 | DB Error
500 | 1107 | Cannot send activation email to the user
500 | 1108 | Cannot unlock account.
500 | 1109 | Cannot create new account.
500 | 1110 | Cannot send forgot password/reset email to the user
404 | 1111 | Given email id does not exist
404 | 1112 | Reset Link Expired
400 | 1113 | Cannot change password. Enter correct details
500 | 1115 | Something went wrong. Cannot process the request
400 | 1117 | Account is invalid
400 | 1118 | Incorrect Password
400 | 1120 | Cannot setup new account
404 | 1121 | Account does not exists
400 | 1123 | API Key is invalid
400 | 1126 | Not accessible
409 | 1008 | Invalid Phone Number
409 | 1008 | Invalid value
409 | 1008 | Resource crossed maximum allowed length
409 | 1008 | Invalid PAN No
409 | 1008 | Invalid Pincode
400 | 1119 | Incorrect Email or Password
