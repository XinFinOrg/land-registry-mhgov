# land-registry-mhgov
MVP for the Land Registry workflow discussed with associated parties. (Govt, Corporation, IGR, Financer, XinFin)

##Get Started
This Repository includes 2 different projects./server directory contains backend(a node application) which runs on Express and interaction blockchain and /client directory conatins front end(react application)
To get started you should clone the repository first. You need following things to be instlled on your machine to get started.
node, npm or yarn, mongoDB, react, truffle.

## Installation

Note : You’ll need to have Node 8.11.4 version or later on your local development machine.

1. Deploy smart contracts
      You'll need to run blockchain on your local machine. Visit XinFinOrg repos to setup private blockchain on your local machine.
      Go to deployer directory. Run following commands to compile and deploy contracts.
      You can edit truffle configurations from /deployer/truffle.js
            a. Compile Contract
                truffle compile
            b. Deploy Contract
                truffle migrate

2. Make sure to start your Mongo Application.

3. Installing a Node Application.

1. Setup a project
  create a .env file in /server directory and add following configurations according to your local machine configurations

    PORT=8001
    RPC=http://localhost:22001
    MONGODB_URI=mongodb://localhost:27017/

    if you are using testrpc to simulate private blockchain, add following line

    TESTRPC=true

2. Install Node Modules and start a server.
      npm install
      npm start
