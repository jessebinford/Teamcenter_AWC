
/**
 * @module js/customExampleService
 */



import * as app from 'app';
import appCtxService from 'js/appCtxService';
import soaService from 'soa/kernel/soaService';
import parsingUtils from 'js/parsingUtils';
import policySvc from 'soa/kernel/propertyPolicyService';
import eventBus from 'js/eventBus';
import logger from 'js/logger';
import localStorageSvc from 'js/localStorage';
import $ from 'jquery';
import _ from 'lodash';


var exports = {};


/**
 * Force the default user session bar to be at the bottom of the screen.
 * This is to override the default new session where it hides your session bar in the user menu.
 *
 * @param {Object} siteContext - (Required) Site Context Object.
 */
export let forceDefaultUserSessionBottomBar = function( siteContext ) {
	
	var userSettingsBarValue = localStorageSvc.get('showUserSettingsBar');
	if (!userSettingsBarValue){
		// This means its a fresh session with no default... Likely a fresh cookie, so lets use our default...
		console.log("Overriding User Session Bar Location...");
		localStorageSvc.publish('showUserSettingsBar', 'true');
	}
  
};





export default exports = {
  forceDefaultUserSessionBottomBar
};

app.factory( 'customExampleService', () => exports );