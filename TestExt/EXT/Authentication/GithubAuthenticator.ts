class GithubAuth {
	constructor(private isInteractive: boolean) { }

	tf: GithubTokenFinder = new GithubTokenFinder();

	public GetAccessToken = (): Q.Promise<string> => {
		if (this.tf.token != null)
			return Q.resolve(this.tf.token);

		return this.WebAuthToRedirectUrl()
			.then(this.tf.RedirectUrlToToken);
	}

	private WebAuthToRedirectUrl(): Q.Promise<string> {
		var details = this.GenDetails(this.isInteractive);
		var defer = Q.defer<string>();

		//launch web auth flow generates a redirect url
		chrome.identity.launchWebAuthFlow(details, redirectUrl => {
			var error = chrome.runtime.lastError;
			if (error)
				defer.reject(error);
			else
				defer.resolve(redirectUrl);
		});

		return defer.promise;
	}


	private GenDetails(interactive: boolean): WebAuthFlowDetails {
		return {
			'interactive': interactive,
			url: ConfigFile.GetStartingAuthUrl() 
		}
	}

} 