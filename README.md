# Phonebook microservice in nodeJS

This microservice is a RESTful API that allows CRUD operations for a Phonebook
database in Postgresql.

## Installation

This software can be easily installed via Docker Compose: https://docs.docker.com/compose/install/.

Once you have Docker Compose on your machine, run:

```
git clone https://github.com/FixingTheBug/phonebook-microservice

cd phonebook-microservice

docker-compose up
```

### Ports

SwaggerUI runs on localhost:8080

The database runs on 0.0.0.0:5432

The NodeJS application runs on 0.0.0.0:3001

If any of these ports are busy in your machine, please change them in the
`docker-compose.yml` file before building.

### Env file

For this example, the .env file is already included.

### Response format

All the responses use the JSend specification, with the `status` and `data` objects:

```
{
    status : "success",
    data : {
        "contact" : { ... }
     }
}
```

More info at https://github.com/omniti-labs/jsend.

### Errors
For this exercise, all faulty requests return a 500 error, with a generic
message and a custom error code.

### Authentication
A small authentication middleware is available. To activate it, uncomment the
following line in /index.js:

```
// app.use(checkAccess)
```

Once activated, it allows access the all the other endpoints only with an
`access_token` cookie which contains a valid JWT token. Refer to
the `/v1/auth/login` endpoint for more  information.

### Logs
An access log is available at `log/access.log`

### Phone number format
When retrieving data for a contact, all the non-digit characters are stripped
out from the cell_number column.

So, the following strings: `(512) 123 4567`, `512-123-4567`, `512-123/4567`
all become 5121234567.

### Endpoints

```
GET /v1/companies/:id
```
Shows information for the specified company.
Adding the ?include=contacts parameter to the query displays the related contacts, too

Example:

```
GET /v1/companies/1
```
returns:
```
{
    "status": "success",
    "data": {
        "companies": {
            "phone": "8009256278",
            "id": 1,
            "name": "Walmart"
        }
    }
}
```
```
GET /v1/companies/1?include=contacts
```
returns:

```
{
    "status": "success",
    "data": {
        "companies": {
            "phone": "8009256278",
            "id": 1,
            "name": "Walmart",
            "Contacts": [
                {
                    "cell_number": "5128795485",
                    "id": 2,
                    "first_name": "Robert",
                    "last_name": "Martinez",
                    "email": "r.martinez@gmail.com",
                    "company_id": 1
                },
                ...
            ]
        }
    }
}
```
---
```
POST /v1/companies
```
Create a new company and add it to the phonebook

Example:
```
POST /v1/companies
```
With the following body:
```
{
    "name": "Texas Instruments",
    "phone": "800-842-2737"
}
```
returns
```
{
    "status": "success",
    "data": {
        "company": {
            "phone": "8008422737",
            "id": 6,
            "name": "Texas Instruments"
        }
    }
}
```
---
```
GET /v1/contacts
```

Returns all the contacts.

Adding the ?id or the ?email parameters will return a single contact.

Example:
```
GET /v1/contacts?id=1
```
or
```
GET /v1/contacts?email=j.garcia@gmail.com
```
returns:
```
{
    "status": "success",
    "data": {
        "contact": [
            {
                "cell_number": "1244354354",
                "id": 1,
                "first_name": "James",
                "last_name": "Garcia",
                "email": "j.garcia@gmail.com",
                "company_id": 1
            }
        ]
    }
}
```
---
```
POST /v1/contacts
```
Create a new contact and add it to the phonebook

Example:
```
POST /v1/contacts
```
with the following body:
```
{
    "first_name": "Bill",
    "last_name": "Smith",
    "email": "b.smith@aol.com",
    "cell_number": "(512) 192 8377",
    "company_id": 1
}
```
returns:
```
{
    "status": "success",
    "data": {
        "contact": {
            "cell_number": "5121928377",
            "id": 9,
            "first_name": "Bill",
            "last_name": "Smith",
            "email": "b.smith@aol.com",
            "company_id": 1
        }
    }
}
```
---
```
PUT /v1/contacts/:id
```
Update a contact's information. Only available for the cell_number field.
Other fields will be ignored

Example:
```
PUT /v1/contacts/1
```
with the following body:
```
{
    "cell_number": "512-372-9898"
}
```
returns
```
{
    "status": "success",
    "data": {
        "contact": {
            "cell_number": "5123729898",
            "id": 1,
            "first_name": "James",
            "last_name": "Garcia",
            "email": "j.garcia@gmail.com",
            "company_id": 1
        }
    }
}
```
---
```
GET /v1/contacts/export
```
Export contacts to CSV file

An example of response is:
```
"ID","First Name","Last Name","Email","Cell Number","Company Name","Company Phone"
1,"James","Garcia","j.garcia@gmail.com","5123729898","Walmart","8009256278"
9,"Bill","Smith","b.smith@aol.com","5121928377","Walmart","8009256278"
3,"Patricia","Johnson","pat.john@hotmail.com","5129333453","Walmart","8009256278"
2,"Robert","Martinez","r.martinez@gmail.com","5128795485","Walmart","8009256278"
...
```
---
```
POST /auth/login
```
A new JWT token can be retrieved by sending the right credentials.

The JWT token is then stored in the access_token cookie.

For example, calling this endpoint with the following body:
```
{
    "email": "chri.pasti@gmail.com",
    "password": "password"
}
```
returns:
```
{
    "status": "success",
    "data": {
        "token": {
            "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNocmkucGFzdGlAZ21haWwuY29tIiwiaWF0IjoxNjE2ODUwMTk4fQ.-HM4M-bOHzFg_RnGA9IzoNz45-e9x7To9POEhPiVzPI"
        }
    }
}
```

### Author
To contact the author, send an email to chri.pasti@gmail.com
