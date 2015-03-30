class Mother {
	constructor() {
		var ga = new GithubAuth(true);
		var uif = new UserInfoFinder(ga);
		var urf = new UserRepoFinder(ga);

		ga.GetAccessToken()
			.then(uif.GetUserInfo)
			.then(urf.UserInfoToUserRepo)
			.then(data => data.forEach(elem=> console.log(elem.name)))
			.catch(e => console.log(e));
	}
}

$(document).ready(() => new Mother());