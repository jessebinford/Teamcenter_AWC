/**
 * @module js/itemGenerationService
 */


import * as app from 'app';
import logger from 'js/logger';
import $ from 'jquery';
import _ from 'lodash';


var exports = {};


export let getPrimarySelectedObject = function( context ) {
	
	// This logic is going to make sure we grab the correct object in our view. Since AWC can have the selected
	// object in different places, based on what view you are in, we need to look at the selected and pselected
	// object and determine which one we are supposed to have. I am doing this by simply checking the object type.
	
	// This is solely used for the pasting of the relation in this example.
	
	var requestObj;
	
	if (context.selected && context.selected.type === "ItemRevision"){
		requestObj = context.selected;
	}
	else if (context.pselected && context.pselected.type === "ItemRevision"){
		requestObj = context.pselected;
	}
	else {
		logger.error( 'Failed to find the correct selected object.' );
	}
	
	return { selectedObject: requestObj };
};


export let formatItemIdGenerationInput = function( data ) {	
	var formattedGenerationArray = [];
	
	// We are only going to generate one in this example, but you can request multiple in the sample commented out below.
	// Make sure to set the businessObjectName to the type you want to make.
	// IMPORTANT
	//    You need to make sure the item_id pattern works for the object type you are planning to generate here.
	//    Just adjust the field below where I have 'NNNNNN' inputted.
	
	var exampleInput = {
		additionalInputParams: {},
		businessObjectName: 'Item',
		clientId: "",
		compoundObjectInput: {},
		operationType: 1,
		propValues: {},
		propertyNameWithSelectedPattern: {
			item_id: 'NNNNNN'
		}
	};
	formattedGenerationArray.push(exampleInput);
	
	/*
	    This example would queue up 10 id requests...
		
	for( var ii = 0; ii < 10; ii++ ) {
		var exampleInput = {
			additionalInputParams: {},
			businessObjectName: 'Item',
			clientId: "",
			compoundObjectInput: {},
			operationType: 1,
			propValues: {},
			propertyNameWithSelectedPattern: {
				item_id: 'NNNNNN'
			}
		};
		formattedGenerationArray.push(exampleInput);
	}
	*/
	
	return formattedGenerationArray;
	
};


export let formatItemCreationInput = function( data ) {
	
	var formattedGenerationArray = [];
	
	// In this example, we will be setting the new objects name to match our parent objects name.
	
	for ( var currentIdx = 0; currentIdx < data.generatedIdValues.length; currentIdx++ ) {
		
		var idValue = data.generatedIdValues[currentIdx].generatedValues.item_id.nextValue;
		
		var itemProperties = {
			item_id: [ idValue ],
			object_name: [ data.primarySelectedObject.props.object_name.dbValue ]
		};
		
		var revisionProperties = {
			item_revision_id: ["A"]
		};
		
		var revisionDefinition = [{
			boName: "ItemRevision",
			compoundCreateInput: {},
			propertyNameValues: revisionProperties
		}];
		
		var itemDefinition = {
			boName: "Item",
			compoundCreateInput: {
				revision: revisionDefinition
			},
			propertyNameValues: itemProperties
		};
		
		var creationDefinition = {
			clientId: "CreateObject",
			createData: itemDefinition,
			dataToBeRelated: {},
			pasteProp: "",
			targetObject: null,
			workflowData: {}
		};
		
		formattedGenerationArray.push( creationDefinition );
		
	}
	
	return formattedGenerationArray;
	
};


export let parseCreatedObjectsForRevisions = function( response ) {
	var resultValueSet = [];
	var outputs = response.output;
	
	outputs.forEach(outputElement => {
		outputElement.objects.forEach(outputObjElement => {
			if (outputObjElement.type === "ItemRevision"){
				resultValueSet.push(outputObjElement);
			}
		});
	});
	
	return resultValueSet;
};



export default exports = {
	getPrimarySelectedObject,
	formatItemIdGenerationInput,
	formatItemCreationInput,
	parseCreatedObjectsForRevisions
};


app.factory( 'itemGenerationService', () => exports );