# TypescriptWebAuthFlowExample
An example chrome extension that uses web auth flow to access github.

SETUP
-----------------
[Register a new github application](https://github.com/settings/applications/new), set its callback to provider_cb then 
get the clientId and clientSecret, put them into ConfigFile.ts

[Publish a chrome extension](https://chrome.google.com/webstore/developer/dashboard) (make it so only you can see it)
copy the public key found under more info in the dashboard (do not inclue the -----BEGIN PUBLIC KEY----- part) into 
the "key" field within the manifest.json file.

Run the extension by enabling developer mode in chrome and hitting the "load unpacked extension" button under manage extension and selecting the 
[EXT](/TestExt/EXT) folder

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
			
GithubAuth generates the access token that we need to call the github API.
We use the token to get the user info, and we use the user info to grab a link to the users github repositories, which are displayed in the console.
