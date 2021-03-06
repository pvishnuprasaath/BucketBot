'use strict';

const { ApiAiApp } = require('actions-on-google');
const functions = require('firebase-functions');

const WELCOME_INTENT = 'input.welcome';  // the action name from the API.AI intent
const TASK_INTENT = 'device.task';  // the action name from the API.AI intent
// const NUMBER_ARGUMENT = 'input.mynum'; // the action name from the API.AI intent
var list={
  light:{
    status:""
  },
  fan:{
    status:""
  }
};

function welcomeIntent (app) {
  app.ask('Welcome to Bucket Home!  Automate your actions over voice. What can i do for you?');
}

function taskIntent (app) {
  
  let device = app.getArgument('device');
  let action = app.getArgument('action');
  if(list[device].status==action){
    app.ask(device +' is already switched ' + action + " ! Waiting for your next command.. ");

  }else{
    app.ask(device +' switched ' + action + " succesfully ! Waiting for your next command.. ");
    list[device].status=action;
  }
 
}

function defaultFallback (app) {
    app.data.fallbackCount++;
    // Provide two prompts before ending game
    if (app.data.fallbackCount === 1) {
      app.setContext(DONE_YES_NO_CONTEXT);
      app.ask('Are you done with the tasks?');
    } else {
      app.tell('Since I\'m still having trouble, so I\'ll stop here. Let’s meet soon.');
    }
  }

let actionMap = new Map();
actionMap.set(WELCOME_INTENT, welcomeIntent);
actionMap.set(TASK_INTENT, taskIntent);

const automate = functions.https.onRequest((request, response) => {
     const app = new ApiAiApp({ request, response });
    app.handleRequest(actionMap);
});
module.exports = {
  automate
};