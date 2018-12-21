# land-registry-mhgov
MVP for the Land Registry workflow discussed with associated parties. (Govt, Corporation, IGR, Financer, XinFin)

## Get Started
This Repository includes 2 different projects./server directory contains backend(a node application) which runs on Express and interaction blockchain and /client directory conatins front end(react application)
To get started you should clone the repository first. You need following things to be instlled on your machine to get started.

## Prerequisites

   1. Node
   2. React
   3. MongoDB
   4. Blockchain

## Installation

Note : You’ll need to have Node 8.11.4 version or later on your local development machine.

1. Deploy smart contracts

You'll need to run blockchain on your local machine. Visit XinFinOrg repos to setup private blockchain on your local machine.

   Go to /deployer directory. 
      
   1. Install necessary node packages
   
            npm install

   2. configure smart contracts

      edit truffle.js according to your local setup environment

   3. compile and deploy smart contracts

            truffle compile
            truffle migrate

2. Make sure to start your MongoDB.

3. Installing a Node Application.

a. Setup a project
  create a .env file in /server directory and add following configurations according to your local machine configurations

    PORT=8001
    RPC=http://localhost:22001
    MONGODB_URI=mongodb://localhost:27017/

    if you are using testrpc to simulate private blockchain, add following line

    TESTRPC=true

b. Install Node Modules and start a server.

      npm install
      npm start

c. start server

      npm start

Server will start on http://localhost:8001 port. You can crosscheck either from console or by opening server url on your browser.

4. Installing client application.

a. install yarn (yarn is package manager just like npm, mostly used in react projects)

      npm install -g yarn
    
b. go to /client directory and install packages.

      yarn install

c. create .env file in /client directory with following content

      PORT=8002
      REACT_APP_API_URL="http://localhost:8001"

The PORT variable sets react application port which is 8002 in this case and the REACT_APP_API_URL sets server URL.
As we have setup our severt on port 8001(as in step 3), hence REACT_APP_API_URL is set to http://localhost:8001.

d. start client application

      yarn

This starts react application on port 8002. Open your browser and visit http://localhost:8002.





