# TypescriptWebAuthFlowExample
An example chrome extension that uses web auth flow to access github.

SETUP
-----------------

[Publish a chrome extension](https://chrome.google.com/webstore/developer/dashboard) (make it so only you can see it)

Get the public key found in the dashboard under "more info" (do not inclue the -----BEGIN PUBLIC KEY----- part) 

Copy this into the "key" field within the manifest.json file. There should be no spaces.

[Register a new github application](https://github.com/settings/applications/new)

set its callback to "https://<extension-id>.chromiumapp.org/provider_cb" where extension ID is found from the chrome developer dashboard

Get the clientId and clientSecret from the github application dashboard and put them into the appropriate fields of ConfigFile.ts. 


Install the extension by enabling developer mode in chrome and hitting the "load unpacked extension" button under manage extension and selecting the 
[EXT](/TestExt/EXT) folder.

Run the extension and you should see a login to github popup, and then after logging in your repositories should show up in the extension's console. This console can be found under the manage extensions page under the appropriate inspect background.html.

Remarks
------------------
I put the important part in Mother.ts

		var ga = new GithubAuth(true);
		var uif = new UserInfoFinder(ga);
		var urf = new UserRepoFinder(ga);

		ga.GetAccessToken()
			.then(uif.GetUserInfo)
			.then(urf.UserInfoToUserRepo)
			.then(data => data.forEach(elem=> console.log(elem.name)))
			.catch(e => console.log(e));
			
You need to get an access token to make calls to the github api. GithubAuth does just that. 

Once we get a users info we can get a users repository, that's why we have the accesstoken->userInfo->userRepo promise chain.
