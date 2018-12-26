# Wallet

Land Registry has pre-integrated wallet with ERC-20 token standard. When user signs up for the platform, a wallet address is created for the user.

## Get Balance

Returns a token balance for specified address.

### HTTP Request

`POST http://example.com/getBalance`

> A typical JSON structured requst looks like this:

```bash
  curl -X POST \
  http://localhost:8001/getBalance \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
	  "address" : "0x0640523060f197f8f57a56c74f78f4fab8378c5e"
  }'
```

> The above command returns JSON structured like this:

```json
  {
	  "balance" : 10000
  }
```

## Buy Tokens

Transfer tokens to a specified address from coinbase account(token pool).

### HTTP Request

`POST http://example.com/buyTokens`

> A typical JSON structured requst looks like this:

```bash
  curl -X POST \
  http://localhost:8001/buyTokens \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
	  "address" : "0x0640523060f197f8f57a56c74f78f4fab8378c5e",
	  "amount" : 500
  }'
```

> The above command returns JSON structured like this:

```json
  {
	  "status" : true
  }
```