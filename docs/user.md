# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
  "name": "Dhafa Aryanda",
  "email": "tes@example.com",
  "password": "tes12345",
  "phone": "082382838321234",
  "address?": "Los Santos, st 123131"
}
```

Response Body (Success) :

```json
{
  "data": {
    "name": "Dhafa Aryanda"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Username must not blank, ...."
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "email": "tes@example.com",
  "password": "tes12345"
}
```

Response Body (Success) :

```json
{
  "data": {
    "name": "Dhafa Aryanda",
    "token": "uuid"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Username or password not match, ...."
}
```

## Get User

Endpoint : GET /api/users/current

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "data": {
    "email": "tes@example.com",
    "name": "Dhafa Aryanda"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized, ...."
}
```

## Update User

Endpoint : PATCH /api/users/current

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "password": "tes12345", // opsional
  "name": "Dhafa Aryanda", // opsional
  "phone": "0828328328", // opsional
  "address": "lampriet, jl bawal 01" // opsional
}
```

Response Body (Success) :

```json
{
  "data": {
    "name": "Dhafa Aryanda"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized, ...."
}
```

## Logout User

Endpoint : DELETE /api/users/current

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "data": "SUCCESS DELETE"
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized, ...."
}
```
