# CalculatorService
Assignment for WEB course
https://docs.google.com/document/d/1R4T4fGA5pt1w6ElWLhKVhKrreuQ4m5-lSrwepodqf_w/edit#
this calculator is designed to simulate linux calculator (which is differenet from windows)
but it supports signed integers only.

## Prerequisites
1. nodejs
2. npm
3. mocha
4. docker
5. docker compose

## Installing
 - git clone https://www.github.com/karinfor/CalculatorService
 - npm install

## Run Server
 - route terminal to the git clone directory
 - run serever.js using terminal $ node server.js

### Unit testing and Intergation testing:
  - run in terminal $ mocha testing.js

## Docker 
### Docker Container
 - route terminal to the git clone directory  
 - sudo docker build -t "karin:CalculatorService" .
 - sudo docker run -p 3000:3000 karin:CalculatorService

### Intergation testing:
 - run in terminal $ mocha testing.js

### Docker Compose
 - get images:
   - sudo docker pull redis/alpine
   - sudo docker pull webdevtoolsandtech/user-service
   - sudo docker pull webdevtoolsandtech/currency-frontend
   - sudo docker pull webdevtoolsandtech/currency-backend
 - docker-compose build
 - docker-compse run
