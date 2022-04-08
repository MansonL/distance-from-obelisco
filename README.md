# Welcome to Distance from Obelisco (Technical Interview) 👋

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/MansonL/distance-from-obelisco/graphs/commit-activity)

> REST API with 3 endpoints: retrieving the currency name of a given country, normalizing an Argentine address and retrieving the distance from a normalized given address to the Obelisco.

### 🏠 [Homepage](https://github.com/MansonL/distance-from-obelisco#readme)

## Install

For installing all packages needed.

```sh
npm install
```

## Usage

First of all, we need an API key of the app OPENCAGE and set it in the .env to the environment variable described in the .envExample, it's a free api limited to 2500 requests per day.

For building and parsing to older syntaxis & then running the API.

```sh
npm run build & npm run start
```

For running the API on development server without building the app. (Uses ts-node-dev library)

```sh
npm run dev
```

## Endpoints

Endpoint that given a normalized address, it will retrieve the possible locations and the distance from the first selected address to the Obelisco. Will retrieve an object with the following structure:
{
message: 'String containing the information about the distance from the address to the Obelisco.',
addresses/address: ['A list of strings containing the addresses found or the unique one.']
}

```sh
http:localhost:8080/api/distance-from-obelisco?address='normalized address'
```

Endpoint that receives three mandatory parameters (street name, street number & province name) and an optional one that's the name of the department. It will retrieve an string or a list of strings that are the normalized addresses.

```sh
http:localhost:8080/api/normalize-address?calle='street name required'&altura='street number required'&provincia='province name required'&departamento='department name optional'
```

Endpoint that given a country name, it will return its currency name.

```sh
http:localhost:8080/api/country='country name required and in English language'
```

## Run tests

No tests for now.

## Author

👤 **MansonL**

- Github: [@MansonL](https://github.com/MansonL)
- LinkedIn: [@https:\/\/www.linkedin.com\/in\/mansonlautaro\/](https://linkedin.com/in/https://www.linkedin.com/in/mansonlautaro/)
