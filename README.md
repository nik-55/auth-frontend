# [Auth-frontend using react](https://github.com/nik-55/auth-frontend)

> [Hello , Myself Nikhil Mahajan studying at iit roorkee.](https://github.com/nik-55)

Many time while developing we require to authorize users. Managing auth state can be trouble.  
This repo is just a simple template creating following routes :

```
/
/signup
/login
/profile
```

## Setup

After downloading the repo code open your editor and in the terminal :

```
npm install
```

This will install all dependencies required.

### Environment Variable

Create a .env file in root folder and also add .env to .gitignore.  
In .env :

```
REACT_APP_SERVER_URL
```

### Starting the React app

Open terminal in root folder and run the following command to start the react app

```
npm start
```

## Routes

`/signup`

- User can signup with email and password.
- Validation checks for password and email is done before sending request to server.
- After signup user will be navigated to login page

`/login`

- User can login with email and password.
- Jwt token provided from server is store in local storage.
- After login user will be navigated to profile page

`/profile`

- Custom axios is used to attach token from local storage to headers while making request automatically.
- It is private route that can be only accessed when user is logged in.
- User can see his details like username here.

### State Management

`AuthContext`

- All the children is wrapped in AuthProvider.
- It provides auth state to all its children.
- Auth : true ==> user is logged in.
- useAuth is custom hooks that helps to easily use useContext hook.
- signup,login,fetchdetails,logout all functions as well as user are passed as value of AuthProvider and import in other components as required.

### Message

```
It will be nice if you report bugs or contribute to improve the code and security.

Thanks !!
Happy Hacking...

- nikhil
```
