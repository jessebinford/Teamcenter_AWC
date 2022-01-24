# Custom Clipboard and Panel
This customization is intended to show you how to add a custom clipboard. This customization will add a right-click menu item to tables to perform a copy to the new clipboard. The clipboard panel will be accessible via the far left global menu.

This clipboard has the following functions:
 - There will be a Right-Click menu option to copy objects into the clipboard (Found in table/lists)
 - Copied objects are appended to the top of the custom clipboard
 - Clipboard holds a maximum of 15 objects
 - From the clipboard panel
  - You can select one or more objects and send them to the normal TC clipboard at once
  - You can select two revision objects and open them into a split view easily
  - You can clear your clipboard

This clipboard is stored in the cookie, which means it will be reset if the cookies are deleted.

**This works in AWC 5.2 and has not yet been tested with newer versions. It should work in newer versions.**

## How it will look



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
