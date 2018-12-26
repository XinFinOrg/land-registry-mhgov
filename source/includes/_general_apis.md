# Dashboard

  Returns user specific property/registry records.

  Depends on user role, different records will be fetched.

  Role | Record restrictions
  -------- | -------
  Individual | Owner or Buyer of property/registry record
  Corporation | All property records
  Financer | Owner Financer or Buyer Financer of property/registry record
  IGR | All property and registry records

### HTTP Request

`POST http://localhost:8001/getDashboard`

> A typical JSON structured request looks like this:

```bash
  curl -X POST 
  http://localhost:8001/getDashboard 
  -H 'cache-control: no-cache' 
  -H 'content-type: application/json' 
  -d '{
      "email" : "atul@123.com",
      "role" : "individual"
  }'
```

> The above command returns JSON structured like this:

```json
  {
    "status" : true,
    "data" : {}
  }
```
# Events

Returns property/registry specific blockchain events.

The following events are defined on property/registry records which are emitetd at different api endpoints.

Event | Description
-------- | --------
<code>AddProperty</code> | Add new Property Record
<code>SetStatus</code> | Set Property/Registry Status 
<code>AddOwner</code> | Ownership Transfer
<code>AddRegistryRecord</code> | Add new Registry Record
<code>AddBuyer</code> | Add Buyer Information to Registry Record
<code>AddOwnerFinancer</code> | Add Owner Financer Information to Registry Record
<code>AddBuyerFinancer</code> | Add Buyer Financer Information to Registry Record
<code>TransferTokens</code> | Transfer Tokens

### HTTP Request

`POST http://localhost:8001/getExplorer`

> A typical JSON structured request looks like this:

```bash
  curl -X POST 
  http://localhost:8001/getExplorer 
  -H 'cache-control: no-cache' 
  -H 'content-type: application/json' 
  -d '{
    "registryId" : "jhgygu657",
    "propertyId" : "htyytyt6123"
  }'
```

> The above command returns JSON structured like this:

```json
  {
    "status" : true,
    "data" : {}
  }
```
