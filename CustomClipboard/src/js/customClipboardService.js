/**
 * @module js/customClipboardService
 */
import * as app from 'app';
import appCtxService from 'js/appCtxService';
import eventBus from 'js/eventBus';
import localStorageSvc from 'js/localStorage';
import cdm from 'soa/kernel/clientDataModel';
import viewModelObjectService from 'js/viewModelObjectService';
import dmSvc from 'soa/dataManagementService';
import AwPromiseService from 'js/awPromiseService';
import $ from 'jquery';
import _ from 'lodash';


var exports = {};



export let customCopyToClipboard = function(data) {
    var storedClipboardObjects = JSON.parse(localStorageSvc.get('customClipboardStore'));

    if (!storedClipboardObjects) {
        storedClipboardObjects = [];
    }

    var ctxObj = appCtxService.ctx;
    var models = ctxObj.mselected;

    if (models) {
        models.forEach(outputElement => {
            var limitedModel = {
                uid: outputElement.uid,
                type: outputElement.type
            };

            var existingIndex = storedClipboardObjects.findIndex(existingObj => existingObj.uid === outputElement.uid);
            if (existingIndex > -1) {
                // If found, move the object to the front of the array
                storedClipboardObjects.unshift(storedClipboardObjects.splice(existingIndex, 1)[0])
            } else {
                // Existing object not found, add to front.
                storedClipboardObjects.splice(0, 0, limitedModel);
            }
        });
    }

    // Reset array to drop all but the top 15 elements.
    storedClipboardObjects = storedClipboardObjects.splice(0, 15);

    localStorageSvc.publish('customClipboardStore', JSON.stringify(storedClipboardObjects));

};


export let getCustomClipboardContent = function(startIndex) {

    // Confirm this is the first load, if not return nothing.
    // If we do not do this, we will keep getting an endless scroll with repeating data in the UI.
    if (startIndex && startIndex > 0) {
        return {
            totalResults: 0,
            searchResults: []
        };
    }

    var deferred = AwPromiseService.instance.defer();

    // Grab the objects from our cookie storage
    var storedClipboardObjects = JSON.parse(localStorageSvc.get('customClipboardStore'));


    var resultValueSet = {
        totalResults: 0,
        searchResults: []
    };

    if (storedClipboardObjects && storedClipboardObjects.length > 0) {
        dmSvc.getPropertiesUnchecked(storedClipboardObjects, ['awp0CellProperties']).then(function(response) {


            if (storedClipboardObjects) {
                storedClipboardObjects.forEach(outputElement => {
                    var modelObject = cdm.getObject(outputElement.uid);
                    // Load the VMO to show on the UI.
                    var vmo = viewModelObjectService.constructViewModelObjectFromModelObject(modelObject);

                    // Load the array for results.
                    resultValueSet.searchResults.push(vmo);
                    resultValueSet.totalResults = resultValueSet.totalResults + 1;
                });
            }


            deferred.resolve(resultValueSet);

        });
    }

    return deferred.promise;

};


export let clearCustomClipboard = function(dataProvider) {
    var storedClipboardObjects = [];

    // Store an empty array in our cookie storage.
    localStorageSvc.publish('customClipboardStore', JSON.stringify(storedClipboardObjects));

    // clear the data provider since it will now be empty. This will reflect in the UI.
    if (dataProvider) {
        dataProvider.getViewModelCollection().clear();
    }
};




export default exports = {
    customCopyToClipboard,
    getCustomClipboardContent,
    clearCustomClipboard
};

app.factory('customClipboardService', () => exports);
