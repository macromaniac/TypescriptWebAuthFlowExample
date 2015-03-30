class GithubTokenFinder {
	public token: string = null;
	private redirectRe = new RegExp(ConfigFile.redirectUri + '[#\?](.*)');


	public RedirectUrlToToken = (redirectUrl: string): Q.Promise<string> => {

		var matches = redirectUrl.match(this.redirectRe);

		if (matches == null || matches.length < 2)
			return Q.reject<string>(new Error("Invalid redirect URI: " + ConfigFile.redirectUri));

		var values = this.ParseRedirectFragment(matches[1]);

		//If the response has the access token we're done
		if (values.hasOwnProperty('access_token')) {
			this.token = values.access_token;
			return Q.resolve<string>(values.access_token);
		}

		//otherwise we need to get it from code
		if (values.hasOwnProperty('code'))
			return this.CodeToToken(values.code);

		return Q.reject<string>(
			new Error("No access token or code in redirect URL"));
	}

	private CodeToToken(code: string): Q.Promise<string> {
		var xhr2 = new Xhr<any>(ConfigFile.GetCodeSendUrl(code));
		xhr2.AddRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr2.AddRequestHeader('Accept', 'application/json');
		return xhr2.GetData()
			.then<string>(response=> {
			if (response.hasOwnProperty('access_token')) {
				this.token = response.access_token;
				return Q.resolve(this.token);
			} else
				return Q.reject("Couldn't get access token from code");
		});
	}

	private ParseRedirectFragment(fragment): any {
		var pairs = fragment.split(/&/);
		var values = {};

		pairs.forEach((pair) => {
			var nameval = pair.split(/=/);
			values[nameval[0]] = nameval[1];
		});

		return values;
	}


} 