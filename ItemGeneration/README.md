# Item Generation Guide
This customization will show you how to add a button to an object stylesheet that will generate a new item object and perform an attachment of that new object.

This button performs the following:
 1. Grabs current selected object
 2. Generates one item id value (You can do multiple, see JS file)
 3. Generate a new Item object
    - The default object name is set to the selected objects name (they will match once made)
 4. Filters the results from step 3 and generates a list of new item revision objects
 5. Attaches the new revision(s) to the current selection via the IMAN_specification relation

**This works in AWC 5.2 and has not yet been testing with newer versions. It should work in newer versions.**

## How it will look
Once you add the button to the stylesheet, it should appear like below.

![image](https://user-images.githubusercontent.com/12979360/151733307-bdf8af35-efd2-4100-81de-265af713b65a.png)


## Setting it up
First, you will need to configure a new module in your Teamcenter AWC system if you do not already have one. **This is not covered here.**

### Stage AWC Files
Download the src code files in this repo

Place the SRC files into their appropriate locations in your module folder structure.
Example:
> Repo content: src\html\ItemGenerationView.html<br/>
> Should go into:  aws2\stage\src\YOURMODULEFOLDER\src\html
> 
> Repo content: src\js\itemGenerationService.js<br/>
> Should go into:  aws2\stage\src\YOURMODULEFOLDER\src\js
> 
> Repo content: src\viewmodel\ItemGenerationViewModel.json<br/>
> Should go into:  aws2\stage\src\YOURMODULEFOLDER\src\viewmodel

### Add New Button to Stylesheet
Find the stylesheet you want this button to show up on for AWC.

This example went on the general Item object stylesheet:

![image](https://user-images.githubusercontent.com/12979360/151733660-3fbabe42-fe52-41e9-ba09-3d4f66b470cf.png)

The line of code you need to add would be:
````
  <htmlPanel declarativeKey="ItemGeneration"/>
````


**Now build your AWC code and it should be good to go.**
