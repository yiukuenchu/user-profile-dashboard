# User Profile Dashboard with Authentication

This is a user profile dashboard application.

[![user_profile_dashboard_home-min](https://i.im.ge/2023/10/06/Nezfuh.user-profile-dashboard-home-min.md.png)](https://im.ge/i/Nezfuh)
[![user_profile_dashboard_profile-min](https://i.im.ge/2023/10/06/Nekz7c.user-profile-dashboard-profile-min.md.png)](https://im.ge/i/Nekz7c)

It includes:
- Backend API with Express and MongoDB
- Routes for auth, login, register, profile page
- JWT authentication stored in browser local storage
- Middleware for verifying JWT token
- Error messages with Toast library
- React frontend for login, register, profile page
- Tailwind CSS

## Usage
### /frontend/.ENV
1. In the frontend folder, create a file named ``.env``, and put the following inside it, remember to change the server domain to yours:
```
REACT_APP_SERVER_DOMAIN=<YOUR_SERVER_DOMAIN>
```

### /backend/config.js
1. In the backend folder, create a file named ``config.js`` and put the following inside it:
```
export default {
  JWT_SECRET: <'YOUR_JWT_SECRET_KEY'>,
  ATLAS_URI:
    <'YOUR_ATLAS_URI'>,
};
```
2. Open the termial, and type in:
```
openssl rand -base64 32
```
3. Press enter, copy the returned value, and replace it in the ``JWT_SECRET`` in the ``config.js`` file.
4. Go to [MongoDB Atlas](https://cloud.mongodb.com/), sign in and create a new database, copy the ``Atlas URI`` and replace it in the ``ATLAS_URI`` in the ``config.js` file.

### Install dependencies
1. fontend
```
cd frontend
npm install
```

2. backend
```
cd backend
npm install
```

### Build
1. fontend
```
cd frontend
npm start
```

2. backend
```
cd backend
npm start
```

