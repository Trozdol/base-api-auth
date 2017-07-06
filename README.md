BASE API AUTHENTICATION
=======================

Update `config-mongodb.yml` to point to where you want MongoDB to point.

    storage:
        dbPath: "/path/to/mongo-auth"

Assuming MongoDB is installed locally...

    mongod -f config-mongod.yml


Start the API Server:

    npm install # if first time.

    npm start


Should now be running on localhost:8080


### Register:

POST: `http://localhost:8080/api/register`

```bash
curl \
-H "Content-Type: application/json" \
-X GET http://localhost:8080/api/login \
-d '{ "email": "example@trozdol.com", "username": "examplename", "password": "123" }'
```

#### Full Example Body:

    {
        "username": "yourhandle",
        "email": "you@example.com",
        "password": "123",
        "name": {
            "first": "John",
            "last": "Doe"
        }
    }

### Login:

POST: `http://localhost:8080/api/login`

```bash
curl \
-H "Content-Type: application/json" \
-X GET http://localhost:8080/api/login \
-d '{ "email": "example@trozdol.com", "password": "123" }'
```    

#### Example Response:

    {
        "code": null,
        "message": "OK",
        "success": true,
        "data": [],
        "token": "xxx.yyy.zzz"
    }


### Authenticating Other Requests

```bash
curl \
-H "Content-Type: application/json" \
-H "Authorization: JWT xxx.yyy.zzz" \
-X GET http://localhost:8080/api/account
```

#### Headers:

    "Authorization" : "JWT <token>"

#### Body: (needs some tweaks/coming soon)

    {
        ...
        "token": "JWT <token>"
    }


#### Query Param: (needs some tweaks/coming soon)

    http://localhost:8080/api/account?token=<token>
