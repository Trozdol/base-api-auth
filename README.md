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


### Creating an Account:

POST: `http://localhost:8080/api/register`

    {
        "username": "your_handle",
        "email": "you@example.com",
        "password": "123",
        "name": {
            "first": "John",
            "last": "Doe"
        }
    }

POST: `http://localhost:8080/api/login`

    {
    	"email": "shayne@trozdol.com",
    	"password": "123"
    }

    # Successful Auth Example Response:

    {
        "code": null,
        "message": "OK",
        "success": true,
        "data": [],
        "token": "yyy.xxx.zzz"
    }


### Authenticating Other Requests

#### Headers:

    "Authorization" : "JWT <token>"

#### Body: (needs some tweaks)

    {
        ...
        "token": "JWT <token>"
    }


#### Query Param: (needs some tweaks)

    http://localhost:8080/api/account?token=<token>
