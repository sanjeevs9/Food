
# Food 2 You

- Using this app, vendors can list their cafes on the platform, and users can order from here using the E-Walllet feature integration (UPI coming soon).
- Real Time responsive project




## Screenshots

**User Interface**
![User Interface](https://github.com/sanjeevs9/Food/assets/88326960/069a53e8-d9d5-4c71-8fc6-718507958b06)

**E-Wallet**
![Second Image](https://github.com/sanjeevs9/Food/assets/88326960/4ec3d827-00fe-4f9a-b53a-32708403a950)

**Add To Cart**
![Second Image](https://github.com/sanjeevs9/Food/assets/88326960/e0832ec2-c243-4aed-bdbd-b9ac7daee9b9)




## Features

- **Cart** Feature
- Vendor have multiple options (Reject/accept/complete..)
**Vendor Dashboard**
![Second Image Description](https://github.com/sanjeevs9/Food/assets/88326960/d823b6f4-0247-4f94-b9da-9f8bb2f9efdd)
- Cafe's can list their menu easily
- **OTP** feature for verification
- **E-Wallet** for transaction
- **Remember me**

## Setting Up the Environment Variables
## Frontend Environment Variables

The frontend requires a `.env` file to store the environment variables. Follow these steps to set it up:

1. **Create the `.env` file**  
   In the root directory of the frontend project, create a file named `.env`.

2. **Add the following variables**  
   Add the following keys to the `.env` file:
   ```env
   VITE_SERVICE_ID=
   VITE_TEMPLATE_ID=
   VITE_PUBLIC_KEY=
   Obtain the values
3.Get these keys from EmailJS to set up the email service for your application.

# Backend Environment Variables

The backend requires a `.env` file to store the environment variables. Follow these steps to set it up:

1. **Create the `.env` file**  
   In the root directory of the backend project, create a file named `.env`.

2. **Add the following variables**  
   Add the following keys to the `.env` file:
   ```env
   MONGO_URI=
   AccountSID=
   AUTHTOKEN=

3.Obtain the values

MONGO_URI: Add your MongoDB connection URL.
AccountSID: Get the SID from Twilio.
AUTHTOKEN: Get the Auth Token from Twilio.

   

   

## Learning
- **JWT** tokens for Authentication
- **Mongo Db** as Database
- **React**
- **Express**
- **Node Js**
- **Recoil**(State Management)
- **Tailwind**
- **Twilio** for OTP
- *bcryptjs* on the way
