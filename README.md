
# User Portal

### A simple api with authentication and authorization that allows the user to create a post and product.


## Installation

Install my-project with npm

```npm
git clone https://github.com/King-diablo/UserPortal.git
cd UserPortal
npm install
npm start
```
or
```
download the zip
cd UserPortal
npm install
npm start
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`DATABASE_URL`

`SALT_ROUND`

`SECRET_KEY`


## Dependencies
- bcrypt (for password encryption)
- body-parser
- dotenv
- express
- express-validations (for data validations eg email validation)
- helmet (for more security)
- jsonwebtoken (for continuous validation)
- mongoose (database)
- uuid (used for id's)
## Project-Structure
- node_modules
- src
  - config
  - controller
  - helper
  - middleware
  - model
  - routes
- .env
- .gitignore
- package-lock.json
- package.json
- server.js
## API-Routes

- PostRoutes
- ProductRoutes

``
baseEndPoint: https://localhost:300/api
``



```
/login
```
>
> this route is responsible for loging in the user
> 
> Method: POST
> 
> Body:{Email, password}


```
/auth
```
>
> this route is responsible for creating a user
> 
> Method: POST
> 
> Body:{Name, Email, Gender, password}

```
/post/add
```
> 
> this route is responsible for creating a post
>
> Method: POST
> 
> Body:{Article, Image, Title, likeCount, Id, userId}
>
> likeCount-> is default to 0 so its not required
> 
> Id-> is generated automatically
> 
> userId-> is passed in aslong as user is logged in

```
/post/find/:Id
```

> this route is responsible for finding a post by it's Id
> 
> Method: GET

```
/post/find
```

> this route is responsible for finding all the post's
> Method: GET

```
/post/delete/:Id
```

> this route is responsible for removing a post by it's Id
> 
> Method: DELETE


```
/product/add
```

> this route is responsible for creating a new product
> 
> Method: POST
> 
> Body:{Article, Image, Title, price, Id, userId}
> 
> Id-> is generated automatically
> 
> userId-> is passed in aslong as user is logged in

```
/product/fetch/:Id
```

> this route is responsible for fetching a single product by it's Id
> 
> Method: GET
>

```
/product/fetch
```

> this route is responsible for fetching all products
> 
> Method: GET

```
/product/delete/:Id
```

> this route is responsible for deleting a product by it's Id
> 
> Method: delete

#####

```
/job/create
```

> this route is responsible for creating a new jobs
> 
> Method: POST
> 
> Body:{title, amount, description, workPlaceType, companyInfo, salary, companyLogo}
> 
> Id-> is generated automatically
> 
> userId-> is passed in aslong as user is logged in

```
/job/find/:jobId
```

> this route is responsible for fetching a single product by it's Id
> 
> Method: GET
>

```
/job/find
```

> this route is responsible for fetching all jobs
> 
> Method: GET

```
/job/delete/:jobId
```

> this route is responsible for deleting a job by it's Id
> 
> Method: delete

## Documentation

[Test Endpoints](https://documenter.getpostman.com/view/22983759/2s9Xy3tC1D)

> Notice

> Authorization token will be given after signup and or login
>
> Authorization is required for all endpoint aside signup and login
>


## Authors

- [@kingdiablo](https://www.github.com/king-diablo)


## Features

- signup & login
- authentication & authorization 
- password encryption