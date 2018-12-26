# Property

Land registry stores and manages land records(properties) data. A individual user(owner) can add property to blockchain which is then verified by corporation. A property is invalid if rejected by corporation.

## Add Poperty

This api endpoint enables property owner(individual) to add property to land records data on blockchain.

<aside class="warning">The added property is invalid until it is verified by corporation</aside>

### HTTP Request

`POST http://localhost:8001/addPoperty`

> A typical JSON structured request looks like this:

```bash
  curl -X POST 
  http://localhost:8001/addPoperty 
  -H 'cache-control: no-cache' 
  -H 'content-type: application/json' 
  -d '{
      "propertyDetails" : {
          "district" : "sangli",
          "landType" : "Shop",
          "taluka" : "Maval",
          "localGovNo" : "MV123",
          "city" : "Pune",
          "location" : "Pune",
          "surveyNo" : "S12345",
          "usage" : "Shop",
          "usageCategory" : "Non-Agriculture",
          "constructedArea" : 1000,
          "openParking" : 100,
          "coveredParking" : 100,
          "shopFloor" : 1,
          "address" : "Maval, Pune",
          "description" : "Shop",
          "owner" : "owner@123.com"
      }
  }'
```

> The above command returns JSON structured like this. propertyDetails object contains property details submitted by user along with system generated propertyId :

```json
  {
	  "status" : true,
    "propertyDetails" : {}
  }
```
## Verify Property

This endpoint enables user(corporation) to verify the property. The <code>status</code> parameter sets property status. The following status are defined to verify property.

Status | Description
--------- | -------
<code>property_verified</code> | Property details are correct and verified
<code>property_rejected</code> | Property details are incorrect and property is rejected

### HTTP Request

`POST http://localhost:8001/confirmProperty`

> A typical confirm property JSON structured request looks like this:

```bash
  curl -X POST 
  http://localhost:8001/confirmProperty 
  -H 'cache-control: no-cache' 
  -H 'content-type: application/json' 
  -d '{
      "propertyId" : "5447763e-3a97-48c5-a114-8d33069737a3",
      "status" : "property_verified",
  }'
```

> The above command returns JSON structured like this:

```json
  {
	  "status" : true
  }
```
<aside class="notice">Only corporation can verify/reject the property. Once property is rejected, No other operation is allowed to the rejected property.</aside>

## List Property For Sell

This enpoint allows property owner to list a property for sell. By listing property, a new registry record is created, Where owner can add sell price, token amount, financer, buyer and other information of the porperty for sell.

Returns a regisryId of newly created registry record. <code>registryId</code> is used for all registry related operations.

### HTTP Request

`POST http://localhost:8001/sellProperty`

> A typical sell property JSON structured request looks like this:

```bash
  curl -X POST 
  http://localhost:8001/sellProperty 
  -H 'cache-control: no-cache' 
  -H 'content-type: application/json' 
  -d '{
      "propertyId" : "5447763e-3a97-48c5-a114-8d33069737a3",
      "owner" : "atul@123.com",
      "sellPrice" : 10000000,
      "tokenAmt" : 50000
  }'
```

> The above command returns JSON structured like this:

```json
  {
	  "status" : true,
    "data" : {
      "propertyId" : "ygfgteru",
      "registryId" : "fdtheryf"
    }
  }
```
<aside class="notice">The Land registry application maintains Land records and Registry records seperately. By listing property for sell, a new registry record is added to the blockchain</aside>

## Get Property Details

Returns Property Details from Land Records.

### HTTP Request

`GET http://localhost:8001/getPropertyDetails`

> A typical request looks like this:

```bash
  curl -X GET -i http://localhost:8001/getPropertyDetails?propertyId=5447763e-3a97-48c5-a114-8d33069737a3'
```
> The above command returns JSON structured like this. data object contains property detailes submitted by owner while adding property to land records:

```json
  {
	  "status" : true,
    "data" : {}
  }
```