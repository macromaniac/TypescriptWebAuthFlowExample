var ConfigFile;
(function (ConfigFile) {
    var clientId = 'xxxxxxxxxxxxxxxxxxxx';
    var clientSecret = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
    ConfigFile.redirectUri = chrome.identity.getRedirectURL('provider_cb');
    ConfigFile.userInfoUrl = 'https://api.github.com/user';
    function GetStartingAuthUrl() {
        return 'https://github.com/login/oauth/authorize?' + 'client_id=' + clientId + '&reponse_type=token' + '&access_type=online' + '&redirect_uri=' + encodeURIComponent(ConfigFile.redirectUri);
    }
    ConfigFile.GetStartingAuthUrl = GetStartingAuthUrl;
    function GetCodeSendUrl(code) {
        return 'https://github.com/login/oauth/access_token?' + 'client_id=' + clientId + '&client_secret=' + clientSecret + '&redirect_uri=' + ConfigFile.redirectUri + '&code=' + code;
    }
    ConfigFile.GetCodeSendUrl = GetCodeSendUrl;
})(ConfigFile || (ConfigFile = {}));
//# sourceMappingURL=ConfigFile.js.map