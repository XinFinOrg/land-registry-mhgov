# Users

This section includes apis related to user management. There exist 4 type of users, 

- Individual : Can sell or buy a property
- Financer : Provide finance to individual buying a property
- Corporation : Verifies property
- IGR : Admin, collects stamp duty


## Signup

  This endpoint onboards an user to the platform. <code>/signup</code> adds user to the system, At the same time it automatically creates a Wallet account for the user by assigning the unique wallet address.

  Based on user role, request details vary. On successful request, a system responds with success status.

  Role argument decides the user role. The following roles are defined :

Role | Value
--------- | -------
Individual | individual
Financer | bank
Corporation | corporation
IGR | igr
 

### HTTP Request

`POST http://example.com/signup`

### Individual Signup

Onboards individual to the platform.

> A typical JSON structured individual signup request looks like this:

```bash
  curl -X POST \
  http://api.xinfin.org/api/v1/contact \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
  "userDetails" : {
    "email" : "viral@gmail.com",
    "password" : "123",
    "role" : "individual",
    "salutation" : "Mr",
    "firstName" : "Viral",
    "middleName" : "Mahendra",
    "lastName" : "Pasad",
    "aliasName" : "viral",
    "identityMark1" : "Mole on Left Hand",
    "identityMark2" : "Mark above left eye",
    "dob" : "07/12/1995",
    "age" : 28,
    "uid" : "123456789923",
    "identityTypeID" : "Aadhar",
    "identityDesc" : "Aadhar card",
    "pan" : "BCPPT9089H",
    "occupation" : "Salaried Employee",
    "gender" : "Male",
    "mobileNo" : "9664818286",
    "permAddress" : "Pali Hill, Bandra",
    "tempAddress" : "Pali Hill, Bandra",
    "district" : "Mumbai",
    "taluka" : "Mumbai",
    "village" : "Mumbai"
    }
  }'
```

### Financer Signup

Onboards Financer to the platform.

> A typical JSON structured financer signup requst looks like this:

```bash
  curl -X POST \
  http://api.xinfin.org/api/v1/contact \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
    "userDetails" : {
      "email" : "sbi@123.com",
      "password" : "123",
      "role" : "bank",
      "name" : "State Bank Of India",
      "city" : "Mumbai",
      "branch" : "Pali Hill"
    }
  }'
```

### IGR/Corporation Signup

Onboards IGR or Corporation to the platform.

To onboard IGR, argument role is set to a value "igr".

To onboard Corporation, argument role is set to a value "corporation"

> A typical JSON structured corporation signup request looks like this:

```bash
  curl -X POST \
  http://api.xinfin.org/api/v1/contact \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
    "userDetails" : {
        "email" : "bmc@123.com",
      "password" : "123",
      "role" : "corporation"
      "name" : "BMC",
      "state" : "Maharashtra",
      "dept" : "Housing and Urban Development"
    }
  }'
```

> The above command returns JSON structured like this:

```json
  {
  "status" : true,
  "message": "User added successfully."
  }
```

<aside class="warning">A user account can have only a single role</aside>

## Login

Logs in user to the platform. Returns role specific user details.

### HTTP Request

`POST http://example.com/login`

> A typical JSON structured requst looks like this:11

```bash
  curl -X POST \
  http://api.xinfin.org/api/v1/contact \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
    "email" : "owner@gmail.com",
    "password" : "123"
  }'
```

> The above command returns JSON structured like this. data object contains user details:

```json
  {
    "status" : true,
    "data" : {}
  }
```
<aside class="notice">All api endpoints except /signup and /login requires authentication through login session</aside>

## Get User Details

Get complete user details.

#### HTTP Request

`POST http://example.com/getUserDetails`

> A typical JSON structured requst looks like this:

```bash
  curl -X GET -i 'http://localhost:8001/getUserDetails?email=atul@gmail.com'
```

> The above command returns JSON structured like this. data object contains user details :

```json
  {
  "status" : true,
  "data" : {}
  }
```