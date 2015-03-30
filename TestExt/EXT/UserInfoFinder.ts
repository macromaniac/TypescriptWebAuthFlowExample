//user info returns a dictionary of user information, typing not complete
interface UserInfo {
	[id: string]: any;
}

class UserInfoFinder {
	userInfo: UserInfo = null;
	constructor(private githubAuth:GithubAuth) {
	}

	GetUserInfo = (): Q.Promise<UserInfo> => {
		if (this.userInfo != null)
			return Q.resolve<UserInfo>(this.userInfo);

		//Request user info
		var xhr = new Xhr<UserInfo>(ConfigFile.userInfoUrl);

		return this.githubAuth.GetAccessToken()
			.then(xhr.AccessTokenToData) //AccessTokenToUserInfo
			.then(data => this.userInfo = data);
	}
} 