```
I am still not dont with this project, and expect to be done sometime tuesday evening.
```

# preface
This is my first time actually using NestJS. I have heard a lot about it, and it has been on my list of frameworks to learn, but had yet to come up, until now.
Overall it seems brilliant, but i am sure that there will be a lot of things that does not live up to best practices. I am sure i will use NestJS for an upcoming hobby projec though, so i will probably get a lot more experience then.

To run, use 
```
yarn start
```
```
yarn start worker
```

to get started with the API, hit **GET localhost:3000/**






# Solution
### Internal Communication
As internal Communication, RabbitMQ was used. RabbitMQ was chosen as the most popular Message Queue system. 
Message Queuing was chosen, as to decouple the services, allowing for great scalability. 
The system looks for an CLOUD_AMQP_URL entry in .env, you can provide your own, or i can send you the one i set up.
I decided to go with Cloud AMQP, in order to reduce dependency of installing a broker for the system to run.

### Worker endpoint
The worker was made as generic as possible, under the assumption that the end user has a good technical knowledge.
The user can query any URL, and specify their own interval from a list of Cron Enums.
Some issues that arise from this, is the risk of attacks, from quering a malicious API. 

### Data Storage
The data recieved from the worker is stored in memory for now, as the assignment asks to store the data in **data-streams**.
Since this system is rather generic, a persistant storage would probably include some form of NOSQL.

# Welcome to Welds coding-challenge

## Introduction
Here at Weld we use [NestJS](https://nestjs.com/) for our applications. So this project also reflects that. On our front-end we use NextJS and GraphQL. For simplicity we have used the monorepo structure from NestJS.

Fork this repository and create your own repository to get started.

## Challenge
One of our customers wants us to help them build a pipeline for an API (select whichever you want from [Public APIs](https://github.com/public-apis/public-apis)). And they want us to setup a new data-pipeline for them to get information out and into their current data-warehouse.

To accomplish this you will build two services:
- **Data-streams**: Our API that can receive calls and issue commands to **worker**. This service also stores any information that our customer wants to fetch.
- **Worker:** Fetches the data from external API. Makes any transformations you see fit. And sends it back to **data-streams** for storage.

### Steps in challenge
- Configure a message protocol between the two services. You can get inspiration from the [nestjs docs.](https://docs.nestjs.com/microservices/basics) Choose which ever you want but tell us why in your answer.
- Create an endpoint on **data-streams** that tells **worker** to start fetching data on an interval (every 5 minutes).
- Setup an [http module](https://docs.nestjs.com/techniques/http-module) that **worker** can use to communicate with the external API.
- Send the data and store the results on **data-streams** using internal communication protocol.
- Make an endpoint on **data-streams** that can fetch the data stored on **data-streams**. Use whatever storage you see fit but tell us why you chose it.
- Make an endpoint on **data-streams** that can stop the data fetching on **worker**.

## How we evaluate
The test is solely for you to show techniques and design patterns you normally use. Once the techniques and design patterns have been demonstrated then that is enough. No neeed for additional boilerplate. Just include a future work section in your answer and we will include questions in the technical interview.

- We understand that this can be **time consuming**. If you are short on time - then leave something out. But be sure to tell us your approach to the problem in the documentation.
- A documented answer that explains your approach, short-comings, how-to-run and future work.
- A working solution. Preferably with some tests to give us an idea of how you write tests (you don't need to put it all under test).
- Reliability is very important when dealing with data-pipelines. So any measures you can add to keep the data-flowing will be appreciated.
- We appreciate small commits with a trail of messages that shows us how you work.

## Project structure
```
├── README.md
├── apps
│   ├── data-streams
│   └── worker
├── package.json
```
### data-streams:
This is our API. We will be able to issue HTTP requests to this and have it talk to our microservice **worker**.
We also store any information that **worker** sends our way. This project has been setup as a hybrid app. It can both function as an API but also as a microservice with an internal communication layer.

You can start data-streams with:
```
yarn start
```

### worker:
This is the worker microservice that is in charge of talking to the external API. It will fetch data when issued a command from **data-streams** and then return the results. This project only functions as a microservice which means it can only receive commands from the internal communication layer.

You can start worker with:
```
yarn start worker
```
