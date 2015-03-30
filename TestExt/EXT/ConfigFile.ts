module ConfigFile {
	var clientId = 'xxxxxxxxxxxxxxxxxxxx';
	var clientSecret = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
	export var redirectUri = chrome.identity.getRedirectURL('provider_cb');
	export var userInfoUrl = 'https://api.github.com/user';

	export function GetStartingAuthUrl(): string {
		return 'https://github.com/login/oauth/authorize?' +
			'client_id=' + clientId +
			'&reponse_type=token' +
			'&access_type=online' +
			'&redirect_uri=' + encodeURIComponent(redirectUri);
	}

	export function GetCodeSendUrl(code: string): string {
		return 'https://github.com/login/oauth/access_token?' +
			'client_id=' + clientId +
			'&client_secret=' + clientSecret +
			'&redirect_uri=' + redirectUri +
			'&code=' + code;
	}
}