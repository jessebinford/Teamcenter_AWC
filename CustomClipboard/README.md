# What is the main purpose of this new clipboard?
This clipboard will provide you a way to keep appending objects to a clipboard you can easily access. Each individual copy will add the object(s) to your normal TC clipboard as well as the new custom clipboard. 

**The copy will not append to your normal TC clipboard, it functions like normal where it is overridden. However, you can still get everything into one copy by opening this new clipboard at any time and clicking the button 'Copy All To TC Clipboard' and then pasting it as desired.**

# Custom Clipboard and Panel
This customization is intended to show you how to add a custom clipboard. This customization will do two things:
1. Add a copy to clipboard right-click menu option
   - Called *Custom Clipboard Copy*
3. Provide you a panel to view your clipboard and perform actions.

This clipboard has the following functions:
 - Copy to clipboard is only in the right-click menu
 - Copied objects are appended to the top of the custom clipboard
 - Clipboard holds a maximum of 15 objects
 - Custom Clipboard Panel
   - You can copy all clipboard objects to your normal TC clipboard with one click
     - This will override your current TC clipboard with all the objects in your custom clipboard
   - You can select two revision objects and open them into a split view easily
     - Can be useful if you want to do a split view to compare BOM's of two revisions but dont have the objects in one location for dual selection
   - You can clear your clipboard

This clipboard is stored in the cookie, which means it will be reset if the cookies are deleted.

**This works in AWC 5.2 and has not yet been tested with newer versions. It should work in newer versions.**

## How it will look
Example of Right-Click menu:

![image](https://user-images.githubusercontent.com/12979360/150722599-f4d4a67a-7fae-48ee-b80c-4d6366efda94.png)

Example of Panel Button:

![image](https://user-images.githubusercontent.com/12979360/150722613-7559381d-4261-4a32-9ab9-7e9afb9a18e6.png)

Example of Panel Open:

![image](https://user-images.githubusercontent.com/12979360/150722623-c994d1be-a5ba-4a52-a76f-187ed1dfac46.png)


## Setting it up
First, you will need to configure a new module in your Teamcenter AWC system if you do not already have one. **This is not covered here.**

#### Add Command View Model Objects
Download the src code files in this repo

In your current/new module, add the commandsViewModel.json contents into your existing commandsViewModel.json of your module.

 - The content of the commandsViewModel will already be structured properly, so you will just need to take each section and put it into the correct spot in your commands file.
 
#### Add Other Files
You will then need to put the JSON, HTML, and Javascript file into their respective locations inside your aws2 module src folder.

Example:
> Repo content: src\html\CustomClipboardPanelView.html<br/>
> Should go into:  aws2\stage\src\YOURMODULEFOLDER\src\html
> 
> Repo content: src\viewmodel\CustomClipboardPanelViewModel.json<br/>
> Should go into:  aws2\stage\src\YOURMODULEFOLDER\src\viewmodel
> 
> Repo content: src\js\customClipboardService.js<br/>
> Should go into:  aws2\stage\src\YOURMODULEFOLDER\src\js
