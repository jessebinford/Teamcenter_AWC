# How To Add Group/Role to Login Page
This customization is intended to show how to add the group and role field to the login page on TC AWC.

**This works in AWC 5.2 and has not yet been testing with newer versions. It should work in newer versions.**

## Setting it up
There appears to already be logic in the login JS files to handle the group and role, but the fields are not on the login.html page. We only need to edit the OOTB login page to get this to work.

Edit the file: 
> aws2\stage\repo\tc-aw-framework\src_native\assets\html\login.html

Locate the location of the password field:
````
    <li><input type="password" class="gwt-PasswordTextBox" placeholder={{passwordPlaceHolder}}
            aria-label={{passwordPlaceHolder}} autocomplete="off" autocapitalize="off"
            ng-model="password" aw-enter='login()'></li>
````

Now add our new fields directly after:
````
    <li><input type="password" class="gwt-PasswordTextBox" placeholder={{passwordPlaceHolder}}
            aria-label={{passwordPlaceHolder}} autocomplete="off" autocapitalize="off"
            ng-model="password" aw-enter='login()'></li>
    <li><input type="text" class="gwt-TextBox" placeholder="Group"
            aria-label="Group" name="group" autocomplete="off"
            autocapitalize="off" ng-model="group"></li>
    <li><input type="text" class="gwt-TextBox" placeholder="Role"
            aria-label="Role" name="role" autocomplete="off"
            autocapitalize="off" ng-model="role"></li>
````

Save the HTML file, then build and you should be good to go.


## IMPORTANT NOTE
Since we adjust an out of the box HTML file, it will revert the changes on any patches or upgrades. Make sure to adjust the HTML file again if you plan to do that.
