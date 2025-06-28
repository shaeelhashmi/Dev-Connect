## Overview 
This application allows consiste of two dashboard one for free lancer and the other for clients, using JWT for authentication this app allows developers to take up project made from clients
## Techstack:
* MongoDB
* Express.
* React
* Node.js
## Features:
* Userauthentication: User authentication using JSON Web Token(JWT)
* Create projects: Clients can add or remove projects
* Setting bid: Developers can set bids on client projects
## 🚀 Getting Started
### Pre-requisites:
* Make sure you have node.js run time envirnment installed in your pc.
* You should have either set up a MongoDB Cloud database or have the MongoDB application installed and running locally.
## Video demostration:
Watch the video to see the website in action.Video link [here](https://www.youtube.com/watch?v=jzOGBriucqc)
### 1. Clone the Repository


```bash
git clone https://github.com/shaeelhashmi/Dev-Connect/
cd Dev-Connect
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env` file in the root directory:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

### 4. Run the Server

```bash
nodemon server.js
```

Server will start on `http://localhost:3000`

