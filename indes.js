'use strict';

const ApiAiApp = require('actions-on-google').ApiAiApp;

exports.automate = (req, res) => {
    const app = new ApiAiApp({request: request, response: response});
    
    const WELCOME_INTENT = 'input.welcome';  // the action name from the API.AI intent
    const TASK_INTENT = 'device.task';  // the action name from the API.AI intent
   // const NUMBER_ARGUMENT = 'input.mynum'; // the action name from the API.AI intent
    
    function welcomeIntent (app) {
      app.ask('Welcome to Bucket Bot!  Automate your actions over voice. What can i do for you?');
    }
    
    function taskIntent (app) {
      let device = app.getArgument(device);
      let action = app.getArgument(action);
      app.tell(device +'switched ' + action + "succesfully");
    }

    function defaultFallback (app) {
        app.data.fallbackCount++;
        // Provide two prompts before ending game
        if (app.data.fallbackCount === 1) {
          app.setContext(DONE_YES_NO_CONTEXT);
          app.ask('Are you done playing Number Genie?');
        } else {
          app.tell('Since I\'m still having trouble, so I\'ll stop here. Let’s play again soon.');
        }
      }

    let actionMap = new Map();
    actionMap.set(WELCOME_INTENT, welcomeIntent);
    actionMap.set(NUMBER_INTENT, numberIntent);
    app.handleRequest(actionMap);
}