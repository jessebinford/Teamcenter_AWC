# Syslog Information Panel
This customization is intended to show you more information about the users syslog location and the actual content of the syslog.


**This works in AWC 5.2 and has not yet been tested with newer versions. It should work in newer versions.**

## How it will look


## Setting it up
First, you will need to configure a new module in your Teamcenter AWC system if you do not already have one. **This is not covered here.**

#### Add Command View Model Objects
Download the src code files in this repo

In your current/new module, add the commandsViewModel.json contents into your existing commandsViewModel.json of your module.

 - The content of the commandsViewModel will already be structured properly, so you will just need to take each section and put it into the correct spot in your commands file.
 
You will then need to put the HTML and JSON file into their respective locations inside your src folder.

Example:
> src\html\SyslogPanelView.html  should go into  aws2\stage\src\YOURMODULEFOLDER\src\html
