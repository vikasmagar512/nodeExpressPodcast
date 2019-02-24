# Passport JWT Authentication
Refer to this [postman collection](https://www.getpostman.com/collections/1d204568e75cd9aaf385)

Node.js authentication tutorial using Passport.js

### Prerequisites

Make sure you have these installed on your machine

* [Node.js](https://nodejs.org/en/download/)
* [MongoDB](https://www.mongodb.com)
* **npm** This comes with Node.js, but make sure you check if you have it anyway

### Installing packages & pre-requisites

Obtain keys from azure cognitive services from following url
https://azure.microsoft.com/en-us/try/cognitive-services/my-apis/?apiSlug=speech-services&country=India&allowContact=true&fromLogin=True

End point: https://westus.api.cognitive.microsoft.com/sts/v1.0

Create a .env file on the root directory to declare the environment variables for the following:
touch .env
```
DB_CLIENT=<your MongoDB client> (observe the below connection string with user and password)
DB_CLIENT=mongodb://admin:admin123@localhost/voxsnap?authSource=admin
JSON_WEBTOKEN_SECRET=<your custom JWT secret key>
NODE_ENV=<development | production>
AZURE_USER_AGENT_RESOURCE_NAME=<azure resource name>
AZURE_KEY1=<azure api key1>
AZURE_KEY2= <azure api key2>
```

Create MongoDb Database named 'voxsnap' and set up the connection string in app.js with appropriate username and password

```
database name = voxsnap
```


Install packages

```
npm i
```

### Running the app

To run the app (dev. mode)

```
npm start
```

## Built With

* [Node.js](https://nodejs.org) - The backend framework used
* [Express.js](https://github.com/expressjs/express) - Node.js framework used
* [MongoDB](https://www.mongodb.com/) - Database platform used


## Authors

* **Antonio Erdeljac** - *Initial work* - [Passport-Tutorial](https://github.com/AntonioErdeljac/Blog-Tutorial)

## Acknowledgments

* This was a tutorial for my [Medium article](https://medium.com/p/4a56ed18e81e)
