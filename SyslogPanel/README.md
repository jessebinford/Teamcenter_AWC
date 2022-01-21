# Syslog Information Panel
This customization is intended to show you more information about the users syslog location and the actual content of the syslog. This can help you narrow down which pool server the user is on, and even allows the user to email you the syslog contents directly.

**This works in AWC 5.2 and has not yet been tested with newer versions. It should work in newer versions.**

## How it will look
The button will be inside of the Settings menu, at the bottom (or near).

![image](https://user-images.githubusercontent.com/12979360/150596962-e3c8f999-2c3d-4176-849e-2c9c9c4356d7.png)

The panel that is opened, will show you:

![image](https://user-images.githubusercontent.com/12979360/150597027-2219dac4-ffac-47c6-b868-e954be1c1519.png)


## Setting it up
First, you will need to configure a new module in your Teamcenter AWC system if you do not already have one. **This is not covered here.**

#### Add Command View Model Objects
Download the src code files in this repo

In your current/new module, add the commandsViewModel.json contents into your existing commandsViewModel.json of your module.

 - The content of the commandsViewModel will already be structured properly, so you will just need to take each section and put it into the correct spot in your commands file.
 
You will then need to put the HTML and JSON file into their respective locations inside your aws2 module src folder.

Example:
> Repo content: src\html\SyslogPanelView.html<br/>
> Should go into:  aws2\stage\src\YOURMODULEFOLDER\src\html
> 
> Repo content: src\viewmodel\SyslogPanelViewModel.json<br/>
> Should go into:  aws2\stage\src\YOURMODULEFOLDER\src\viewmodel
