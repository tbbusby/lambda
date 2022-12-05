/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const invocationName = "zoom meeting light";
const { CallTracker } = require('assert');
const fs = require('fs');
const webhookfile = fs.readFileSync('./package.json', 'utf-8');
const webhook= JSON.parse(webhookfile);
const status= (webhook.payload.object.presence_status);

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        console.log("launch request");
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'you have launched the skill successfully, say what is my current status?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const zoomMeetingLightIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
    && Alexa.getIntentName(handlerInput.requestEnvelope) === 'zoomMeetingLightIntent';
  },
  handle(handlerInput) {
    if (status === 'Available') {
        const speakOutput = "The light is green.";
        console.log ("The light is green.")
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
            } 
            else if (status === 'In_Meeting') {
                console.log ("The light is Red");
                const speakOutput = "The light is red.";
                return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
            }
            else if (status === 'Offline') {
                console.log ("The light is Off");
                const speakOutput = "The light is off.";
                return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
            }
            else if (status === 'Inactive') {
                console.log ("The light is Gray");
                const speakOutput = "The light is Gray.";
                return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
            }
            else if (status === 'In_Calendar_Event') {
                console.log ("The light is Blue");
                const speakOutput = "The light is Blue.";
                return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
            }
            else if (status === 'On_Phone_Call') {
                console.log ("The light is Crimson");
                const speakOutput = "The light is Crimson.";
                return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
            }
            else if (status === 'Do_Not_Disturb') {
                console.log ("The light is Orange");
                const speakOutput = "The light is Orange.";
                return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
            }
            else{
                return handlerInput.responseBuilder
                .speak('You need to tell me your favorite color first.')
                .reprompt('Please tell me your favorite color.')
                .addElicitSlotDirective('favoriteColor')
                .getResponse();
            }
        }     
    }
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
            const reason = handlerInput.requestEnvelope.request.reason;
        console.log("==== SESSION ENDED WITH REASON ======");
        console.log(reason); 
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle(handlerInput, error) {
        return true;
    },
    handle(handlerInput, error) {
        console.log("==== ERROR =====")
        console.log(error)
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        zoomMeetingLightIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(ErrorHandler)
    .lambda();
