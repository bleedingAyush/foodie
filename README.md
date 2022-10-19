# Foodie

A food delivery app made with React-native, Expo and Firebase.

## Tech Stack

**Client**: React-native

**Backend**: Nodejs, Firebase

**Database**: Firebase/Firestore

## Demo
Link to dev and prod builds

**Phone Authentication**

![](https://user-images.githubusercontent.com/66837202/196636164-116b4e5e-4c3d-4243-99f9-cf20b5e1250f.jpeg)

**Products**

![](https://user-images.githubusercontent.com/66837202/196636433-6600dcf6-8c10-48a9-bdde-a0c36e80db82.jpeg)

**Profile**

![](https://user-images.githubusercontent.com/66837202/196636515-6cc2a1d2-5929-4a23-9823-b96080f09e98.jpeg)


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
