# Registry

Registry maintains registry records. A property can have multiple registry records. The complete buy/sell process is recorded in registry record. When buy/sell process is completed a new owner is added to the land record(property).

## Add Owner

adds extra information about the property owner.

### HTTP Request

`POST http://localhost:8001/addOwner`

> A typical JSON structured request looks like this:

```bash
  curl -X POST 
  http://localhost:8001/addOwner 
  -H 'cache-control: no-cache' 
  -H 'content-type: application/json' 
  -d '{
    "registryId" : "3d69be4d-6976-47ac-9206-cd7de90f04a1",
    "owner" : {
      "email" : "atul@123.com",
      "address" : "0x40aece087558d1585e1c4e92e68f20e88562345f",
      "partyType" : "Executor",
      "partyCategory" : "Vendor",
      "isExecuter" : true
    }
  }'
```

> The above command returns JSON structured like this:

```json
  {
	  "status" : true
  }
```
## Add Owner Financer

This endpoint enables owner to add owner financer to the registry record. If there is no financer involved or owner can skip adding financer using the same api endpoint.

<aside>To skip adding owner finacer. set <code>ownerFinancer</code> object to <code>false</code>value</aside>

### HTTP Request

`POST http://localhost:8001/addOwnerFinancer`

> A typical add owener financer JSON structured request looks like this:

```bash
  curl -X POST 
  http://localhost:8001/addOwnerFinancer 
  -H 'cache-control: no-cache' 
  -H 'content-type: application/json' 
  -d '{
    "registryId" : "3d69be4d-6976-47ac-9206-cd7de90f04a1"
    "ownerFinancer" : {
      "email" : "bank1@123.com",
      "address" : "0x40aece087558d1585e1c4e92e68f20e88562345f",
      "loanAmount;" : 700000,
      "outstandingLoan" : 200000
    }
  }'
```

> The above command returns JSON structured like this:

```json
  {
	  "status" : true
  }
```
## Confirm Financer

This api enpoint enables financer to approve or reject finance details in registry records.

Both owner and buyer can add fiancer to registry record. Financer can approve or reject finance details added by owner or buyer. The <code>approved</code> flag in request object confirms fianancer.

Approved Flag | Description
--------- | -------
<code>true</code> | Finance details are correct and approved
<code>false</code>| Finance details are incorrect and rejected


<aside class="notice">If owner/buyer choose not to add financer, then this step is not required.</aside>


### HTTP Request

`POST http://localhost:8001/confirmFinancer`

> A typical verify financer JSON structured request looks like this:

```bash
  curl -X POST 
  http://localhost:8001/confirmFinancer 
  -H 'cache-control: no-cache' 
  -H 'content-type: application/json' 
  -d '{
      "registryId" : "3d69be4d-6976-47ac-9206-cd7de90f04a1",
      "currentStatus" : "currentStatus",
      "approved" : true
  }'
```

> The above command returns JSON structured like this:

```json
  {
	  "status" : true
  }
```
## Add Buyer

This endpoint enables property owner to add buyer to registry record.

### HTTP Request

`POST http://localhost:8001/addBuyer`

> A typical JSON structured request looks like this:

```bash
  curl -X POST 
  http://localhost:8001/addBuyer 
  -H 'cache-control: no-cache' 
  -H 'content-type: application/json' 
  -d '{
    "registryId" : "3d69be4d-6976-47ac-9206-cd7de90f04a1",
    "buyer" : {
      "email" : "buyer@123.com",
      "partyType" : "Executer",
      "partyCategory" : "Vendor",
      "isExecuter" : true|false
    }
  }'
```

> The above command returns JSON structured like this:

```json
  {
	  "status" : true
  }
```
## Confirm Buyer

This endpoints enables buyer to confirm registry buyer details added by owner.

The <code>status</code> flag is used to set the confirmation of buyer.

Status | Description
--------- | -------
<code>registry_buyer_confirmed</code> | Buyer details are correct and approved
<code>registry_buyer_confirmed</code>| Buyer details are incorrect and rejected


### HTTP Request

`POST http://localhost:8001/confirmBuyer`

> A typical confirm buyer JSON structured request looks like this:

```bash
  curl -X POST 
  http://localhost:8001/confirmBuyer 
  -H 'cache-control: no-cache' 
  -H 'content-type: application/json' 
  -d '{
      "registryId" : "3d69be4d-6976-47ac-9206-cd7de90f04a1",
      "status" : "registry_buyer_confirmed"
  }'
```

> The above command returns JSON structured like this:

```json
  {
	  "status" : true
  }
```
## Add Buyer Financer

This endpoint enables buyer to add owner financer to the registry record. If there is no financer involved or owner can skip adding financer using the same api endpoint.

### HTTP Request

`POST http://localhost:8001/addBuyerFinancer`

> A typical JSON structured request looks like this:

```bash
  curl -X POST 
  http://localhost:8001/addBuyerFinancer 
  -H 'cache-control: no-cache' 
  -H 'content-type: application/json' 
  -d '{
      "registryId" : "3d69be4d-6976-47ac-9206-cd7de90f04a1",
      "buyerFinancer" : {
        "email" : "bank2@123.com",
        "financeAmount" : 500000
      }
  }'
```

> The above command returns JSON structured like this:

```json
  {
	  "status" : true
  }
```
## Pay Token Amount

This enpoint transfers token amount from buyers wallet to Owners wallet. Returns error if there is no enough balance in buyers account.

<aside class="notice">Token amount is decided when a registry record is created(List property for sell).</aside>

### HTTP Request

`POST http://localhost:8001/payTokenAmount`

> A typical JSON structured request looks like this:

```bash
  curl -X POST 
  http://localhost:8001/payTokenAmount 
  -H 'cache-control: no-cache' 
  -H 'content-type: application/json' 
  -d '{
    "registryId" : "3d69be4d-6976-47ac-9206-cd7de90f04a1"
  }'
```

> The above command returns JSON structured like this:

```json
  {
	  "status" : true
  }
```
## Financer Payment

This enpoint transfers Finance amount from Financers wallet to Owner and/or Ownerfinancer's wallet. Returns error if there is no enough balance in financers account.

<aside class="notice">Buyer Financer first transfers outstanding amount to Owner Financer if applicable. Remaining finance amount is transferred to Owner, if applicable. Smart contract takes care of everything.</aside>

### HTTP Request

`POST http://localhost:8001/financerPayment`

> A typical JSON structured request looks like this:

```bash
  curl -X POST 
  http://localhost:8001/financerPayment 
  -H 'cache-control: no-cache' 
  -H 'content-type: application/json' 
  -d '{
    registryId : "3d69be4d-6976-47ac-9206-cd7de90f04a1",
  }'
```

> The above command returns JSON structured like this:

```json
  {
	  "status" : true
  }
```
## Buyer Payment

This enpoint transfers Remaining amount from Buyers wallet to Owner and/or Ownerfinancer's wallet. Returns error if there is no enough balance in buyers account.

<aside class="notice">Buyer transfers outstanding amount to Owner Financer if applicable. Remaining amount is transferred to Owner, if applicable. Smart contract takes care of everything.</aside>

### HTTP Request

`POST http://localhost:8001/buyerPayment`

> A typical JSON structured request looks like this:

```bash
  curl -X POST 
  http://localhost:8001/buyerPayment 
  -H 'cache-control: no-cache' 
  -H 'content-type: application/json' 
  -d '{
    registryId : "3d69be4d-6976-47ac-9206-cd7de90f04a1"
  }'
```

> The above command returns JSON structured like this:

```json
  {
	  "status" : true
  }
```
## Pay Stamp Duty

This enpoint transfers Stamp duty amount from Owners wallet to IGR(admin). Returns error if there is no enough balance in owners account.

<aside class="notice">Stamp Duty calculation is done by the system based on predefined formula.</aside>

<aside class="success">On successful stamp duty transfer, Ownership of the property is transferred to buyer. Henceforth, the new owner of the property is buyer.</aside>

### HTTP Request

`POST http://localhost:8001/payStampDuty`

> A typical JSON structured request looks like this:

```bash
  curl -X POST 
  http://localhost:8001/payStampDuty 
  -H 'cache-control: no-cache' 
  -H 'content-type: application/json' 
  -d '{
    registryId : "3d69be4d-6976-47ac-9206-cd7de90f04a1"
  }'
```

> The above command returns JSON structured like this:

```json
  {
	  "status" : true
  }
```
## Get Property Data

Returns complete registry/property Data.

A typical completed registry record containes following key objects.

key | Description
--------- | -------
<code>propertyId</code> | Property ID
<code>registryId</code> | Registry ID
<code>status</code> | Registry Status
<code>propertyDetails</code> | Property Details
<code>owner</code> | Owner Details
<code>ownerFinancer</code> | Owner Financers Details
<code>buyer</code> | Buyer Details
<code>buyerFinancer</code> | Buyer FInancers Details
<code>sellPrice</code> | Sell Price
<code>tokenAmount</code> | Token Amount
<code>stampDuty</code> | Stamp Duty Amount

### HTTP Request

`GET http://localhost:8001/getPropertyData`

> A typical JSON structured request looks like this:

```bash
  curl -X GET -i http://localhost:8001/getPropertyData?registryId=5447763e-3a97-48c5-a114-8d33069737a3'
```

> The above command returns JSON structured like this:

```json
  {
    "status" : true,
    "data" : {
        "propertyId" : "5447763e-3a97-48c5-a114-8d33069737a3",
        "registryId" : "3d69be4d-6976-47ac-9206-cd7de90f04a1",
        "status" : "registry_owner_financer",
        "propertyDetails" : {},
        "owner" : {},
        "ownerFinancer" : {},
        "buyer" : {},
        "buyerFinancer" : {},
        "sellPrice" : 1000000,
        "tokenAmount" : 50000,
        "stampDuty" : 35000,
        "created" : 1545120324,
        "modified" : 1545120324
    }
  }
```