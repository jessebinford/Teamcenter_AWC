# Pin User Session Bar by Default
This customization will explain how to set the user session bar to be pinned to the bottom of the AWC page by default.


**This works in AWC 5.2 -> 6.1. It should work in newer versions as well.**

## Setting it up
First, you will need to configure a new module in your Teamcenter AWC system if you do not already have one. **This is not covered here.**

#### Add New JS Service
Download the src code files from this repo

In your module, add the new service javascript file.

#### Adjust the commonRootViewModel
Now that we have our js file staged, we need to modify the commonRootViewModel json file.

Location of file
> TCROOT\aws2\stage\repo\tc-aw-framework\src_native\assets\viewmodel\commonRootViewModel.json

First, we add a new action to this file

```
        "overrideDefaultSessionBarLocation": {
            "actionType": "JSFunction",
            "method": "forceDefaultUserSessionBottomBar",
            "deps": "js/customExampleService",
            "inputData": {
                "siteContext": "{{ctx}}"
            }
        },
```

Now we adjust the action 'checkShowUserSettingsBarValue' to include our new action above.

```
        "checkShowUserSettingsBarValue": {
            "actionType": "batchJob",
            "steps": [ {
                    "action": "checkNarrowMode"
                },
                {
                    "action": "overrideDefaultSessionBarLocation"
                },
                {
                    "action": "getShowUserSettingsBarValueInLocalStorage"
                },
                {
                    "action": "setShowUserSettingsBarValueInCtx"
                },
                {
                    "action": "initializeSkipToMainListener"
                }
            ]
        },
```


## IMPORTANT NOTE
Since we adjust an out of the box JSON file, it will revert the changes on any patches or upgrades. Make sure to adjust the JSON file again if you plan to do that.
