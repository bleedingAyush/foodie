# Foodie

A food delivery app made with React-native, Expo and Firebase.

## Tech Stack

**Client**: React-native

**Backend**: Nodejs, Firebase

**Database**: Firebase/Firestore

## Demo
Link to dev and prod builds

**Phone Authentication**

![Screenshot_20221019_131146](https://user-images.githubusercontent.com/66837202/196639330-65916b0a-8a52-4c32-a9d7-66f8cceb2852.jpg)

**Products**

![Screenshot_20221019_131229](https://user-images.githubusercontent.com/66837202/196639790-77e07fdf-4962-4d19-b2ed-0cc019010663.jpg)

**Cart**

![Screenshot_20221019_131236](https://user-images.githubusercontent.com/66837202/196639887-23441f06-397a-436f-8258-962c2eb8edcc.jpg)


**Profile**

![Screenshot_20221019_131243](https://user-images.githubusercontent.com/66837202/196639825-bd089b02-585f-4eb0-ae74-45cdbb4c5a8a.jpg)


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
