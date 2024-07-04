### Introduction

Simple e-commerce full-stack (MERN stack) project

### Functional Description

- Create MongoDB models
- Validate user account with cookies/sessions
- CRUD products
- Add product to cart
- Create livechat use socket.io
- Manage state with Redux
- Send mail (via nodemailer) when checkout product order
- Deploy FE on Firebase, BE on Render

### Demo Link

- BE: https://vtechshop-be.onrender.com/

- FE:
  + https://vtechshop-deployment-admin.web.app/
  + https://vtechshop-deployment-client.web.app/
 
### Deployment Guide (Local)

Note: The following steps use npm, so users are required to download Nodejs before performing the installation.

1. Open git bash or terminal,... Or download code from .zip file (Skip step 2) 
2. Type git clone https://github.com/v-theemptybox/react-redux-shop.git
3. Open the code folder with code editors (VSCode,...)
4. Create the .env file for server folder and replace these values:
    * MAIL_KEY=YOUR_GMAIL_KEY
    * MONGODB_URI=YOUR_MONGODBURI_URI
    * ADMIN_URL=http://localhost:3001
    * CLIENT_URL=http://localhost:3000
    * PORT=5000
    * BASE_URL=http://localhost:5000
5. Go to each **src** folder of the (admin, server, client) folders and run ```npm install``` then run ```npm start```


