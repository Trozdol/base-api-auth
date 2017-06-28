RESTAURANT ORDER MANAGEMENT SYSTEM
==================================

Assuming MongoDB is installed locally...

    mongod -f config-mongod.yml

Start the API Server:

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
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NTJmMDkwMWQ4Mjk4NDU3ZmQ0OTZiMCIsImlhdCI6MTQ5ODYwODM5MH0.WJbI06MKcMDWELZnEfdMUwkxOPllNHjechuXiU0kKq8"
    }



SETUP
-----
```json

{
    "name": "Lunch",
    "description": "Mid day food!",
    "restaurant": "5930a58b9fe5f15b5416418d",
    "available": [{
        "day": "Sunday",
        "start": "11:00",
        "end": "14:00"
    }, {
        "day": "Monday",
        "start": "11:00",
        "end": "14:00"
    }, {
        "day": "Tuesday",
        "start": "11:00",
        "end": "14:00"
    }, {
        "day": "Wednesday",
        "start": "11:00",
        "end": "14:00"
    }, {
        "day": "Thursday",
        "start": "11:00",
        "end": "14:00"
    }, {
        "day": "Friday",
        "start": "11:00",
        "end": "14:00"
    }, {
        "day": "Saturday",
        "start": "11:00",
        "end": "14:00"
    }],
    "products": []
}

```

Product:
-------

```json
// product with options
{
    "name": "Edamame",
    "description": "Cracked Black Pepper & Sea Salt",
    "instock": true,
    "price": 5.00,
    "options": [{
        "name": "Sea Salt",
        "description": "",
        "bump": 0.00
    }, {
        "name": "Garlic Lime",
        "description": "",
        "bump": 1.00
    }, {
        "name": "Spicy",
        "description": "",
        "bump": 2.00
    }],
    "parts": []
}

{
    "name": "Tempura Green Beans",
    "restaurant": "5930a58b9fe5f15b5416418d",
    "descrition":"fresh snipped green beans, tempura fried & served with kimchi aioli",
    "instock": true,
    "price": 7.00,
    "options": [],
    "parts": []
}

```

Part:
----

```json

{

}

```
