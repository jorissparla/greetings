'use strict';
exports.handler = (event, context, callback) => {
  // TODO implement

  try {
    let { request } = event;
    let options = {};

    switch (request.type) {
      case 'LaunchRequest':
        options.speechText =
          'Welcome to the Greetings skill. Jolly good, old chap! Using this skill, you can greet your guests.Whom do you want to Greet';
        options.repromptText = 'You can say for example, say hello to Sherlock';
        options.endSession = false;
        context.succeed(buildResponse(options));
        break;
      case 'IntentRequest':
        if (request.intent.name === 'HelloIntent') {
          let name = request.intent.slots.FirstName.value;
          options.speechText = ` Hello ${name}, ${getWish()}`;
        } else {
          context.fail('Unknown Intent Name');
        }
        options.endSession = true;
        context.succeed(buildResponse(options));
        break;
      case 'SessionEndedRequest':
        break;

      default:
        context.fail('Unknown Intent Type');
        break;
    }
  } catch (e) {
    context.fail('Exception ' + e);
  }
};

function getWish() {
  var myDate = new Date();
  var hours = myDate.getUTCHours();
  console.log('hours', hours);
  if (hours < 0) {
    hours = hours + 24;
  }

  if (hours < 12) {
    return 'Good Morning. ';
  } else if (hours < 18) {
    return 'Good afternoon. ';
  } else {
    return 'Good evening. ';
  }
}
function buildResponse({ speechText, endSession, repromptText }) {
  const response = {
    version: '1.0',
    response: {
      outputSpeech: {
        type: 'PlainText',
        text: speechText
      },

      shouldEndSession: endSession
    }
  };
  if (repromptText) {
    response.response.reprompt = {
      outputSpeech: {
        type: 'PlainText',
        text: repromptText
      }
    };
  }
  return response;
}
