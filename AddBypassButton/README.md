# Bypass Button Guide
This customization is intended to show how to enable the bypass ability for DBA members. This will add a button onto the left most vertical menu in Teamcenter.


**This works in AWC 5.2 and has not yet been testing with newer versions. It should work in newer versions.**

## Setting it up
First, you will need to configure a new module in your Teamcenter AWC system if you do not already have one. **This is not covered here.**

#### Add Command View Model Objects
Download the src code files in this repo

In your current/new module, add the commandsViewModel.json contents into your existing commandsViewModel.json of your module.

 - The content of the commandsViewModel will already be structured properly, so you will just need to take each section and put it into the correct spot in your commands file.

#### Add icons for bypass button
The new command buttons will be using a icon that is configured in the commandsViewModel.json file.

You can use pre-existing icons or add new ones if you want.

 - Add New Icon
If you want to use a new icon, you will need to copy the icon into your 'aws2\stage\src\image' folder and then adjust the json 'iconId' value to match the name.

 - Use Existing Icon
You can use any of the pre-existing icons in the images folder instead of making / adding a new one. Simply replace the iconId value in the json with the icon you wish to use.

```
    "commands": {
        "customBtnEnableDBABypassCommand": {
            "iconId": "cmdBypassDisabled",
            "title": "Bypass Disabled"
        },
        "customBtnDisableDBABypassCommand": {
            "iconId": "cmdBypassEnabled",
            "title": "Bypass Enabled"
        }
    },
```

#### Add Bypass Flag to Session Generation
In order to make your bypass persist and allow you to easily disable it, we will need to adjust one of the Repo Javascript files.

We will adjust the user session JS file to ensure the fnd0bypassflag is always loaded into the context.

File we want to edit:
> aws2\stage\repo\tc-aw-framework\src_native\assets\js\soa\kernel\soaService.js

Inside of the file, browse to the function:
> export const getTCSessionInfo = function() {

Now inside of this section of logic, we want to add our new property. Here is the original logic:
```
export const getTCSessionInfo = function() {
    // Ensure we have the required properties for the UserSession.
    const policyId = propPolicySvc.register( {
        types: [ {
            name: 'UserSession',
            properties: [ {
                name: 'awp0RevRule',
                modifiers: [ {
                    name: 'includeIsModifiable',
                    Value: 'true'
                } ]
            }, {
                name: 'user',
                modifiers: [ {
                    name: 'withProperties',
                    Value: 'true'
                } ]
            }, {
                name: 'user_id'
            }, {
                name: 'group',
                modifiers: [ {
                    name: 'withProperties',
                    Value: 'true'
                } ]
            }, {
                name: 'group_name'
            }, {
                name: 'project'
            }, {
                name: 'role'
            }, {
                name: 'role_name'
            }, {
                name: 'fnd0locale'
            }, {
                name: 'fnd0LocationCode'
            }, {
                name: 'fnd0groupmember'
            } ]
        }, {
            name: 'Group',
            properties: [ {
                name: 'privilege'
            } ]
        } ]
    } );
    return exports.post( GET_SESSION_INFO.serviceName, GET_SESSION_INFO.operationName ).then( function( response ) {
        propPolicySvc.unregister( policyId );
        exports.setSessionInfo();
        return response;
    } ).catch( function( err ) {
        propPolicySvc.unregister( policyId );

        // Since we have no session, clear the session from localStorage to ensure we don't try to use it.
        localStrg.removeItem( 'awSession' );

        throw err;
    } );
};
```

Now just add our property we want (fnd0bypassflag):
```
            }, {
                name: 'fnd0groupmember'
            }, {
                name: 'fnd0bypassflag'
            } ]
        }, {
            name: 'Group',
            properties: [ {
                name: 'privilege'
            } ]
        } ]
```
