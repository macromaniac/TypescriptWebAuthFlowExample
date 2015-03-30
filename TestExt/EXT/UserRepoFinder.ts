//this interface is not complete
interface UserRepo {
	name: string;
}

class UserRepoFinder {
	constructor(private githubAuth:GithubAuth) {
	}

	UserInfoToUserRepo = (ui: UserInfo): Q.Promise<Array<UserRepo>> => {
		var reposUrl: string = ui["repos_url"];
		//request repos
		var xhr = new Xhr<Array<UserRepo>>(reposUrl);
		return this.githubAuth.GetAccessToken()
			.then(xhr.AccessTokenToData); //AccessTokenToArray<UserRepo>
	}

	uif: UserInfoFinder = null;
	GetUserRepo = (): Q.Promise<Array<UserRepo>>=> {
		if (this.uif == null)
			this.uif = new UserInfoFinder(this.githubAuth);

		return this.uif.GetUserInfo()
			.then(this.UserInfoToUserRepo);
		}
} 