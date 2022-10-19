# Foodie

A food delivery app made with React-native, Expo and Firebase.

## Tech Stack

**Client**: React-native

**Backend**: Nodejs, Firebase

**Database**: Firebase/Firestore

## Demo
Link to dev and prod builds

**Phone Authentication**

![WhatsApp Image 2022-10-19 at 1 40 27 PM](https://user-images.githubusercontent.com/66837202/196637389-f2c85fb7-b98b-4f36-9be2-49b1188bded3.jpeg)

**Products**

**Profile**


## Run Locally

First of all clone this project 

```
https://github.com/bleedingAyush/foodie.git
```

Go to the project directory

```
cd foodie
```

Install dependencies


```
npm run install-packages
```

Register for an account at [Expo](https://expo.io/) and [Firebase](https://firebase.google.com/)

Initialize the project with eas-build [Learn more](https://docs.expo.dev/build/introduction/)

**Backend**

**PORT**: E.g. 5000

To run firebase-admin on a custom server you need to give it certain keys. I have listed them below. Read this medium article to [learn more](https://medium.com/litslink/firebase-admin-sdk-basics-in-examples-ee7e009a1116)

`PROJECT_ID`: Firebase project id

`PRIVATE_KEY`: Firebase private key

`CLIENT_EMAIL`: Firebase client email

`DATABASE_URL`: Firebase database url

**Frontend**

You may be running your dev client in a mobile device for that instead of localhost url like `http://localhost:5000`, change it to `http://<your-ip>:5000` so the mobile can fetch data from the port 5000 on your computer.
Note: Your phone and PC needs to be connected to the same network. 

`API_URL`: E.g. `http://<your-ip-address>:<PORT>`
